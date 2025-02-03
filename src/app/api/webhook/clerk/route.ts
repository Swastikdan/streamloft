import { Webhook } from "svix";
import { headers } from "next/headers";
import { type WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import { env } from "@/env";

export async function POST(req: Request) {
  const SIGNING_SECRET = env.CLERK_SIGNING_SECRET;

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id")!;
  const svix_timestamp = headerPayload.get("svix-timestamp")!;
  const svix_signature = headerPayload.get("svix-signature")!;

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  const payload = (await req.json()) as WebhookEvent;
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  try {
    const eventType = evt.type;

    switch (eventType) {
      case "user.created":
        await db.user.create({
          data: {
            first_name: evt.data.first_name!,
            last_name: evt.data.last_name!,
            email: evt.data.email_addresses[0]!.email_address,
            external_provider_id: evt.data.id,
            role: "user",
          },
        });
        break;

      case "user.updated":
        const role =
          evt.data.public_metadata.role === "admin" ? "admin" : "user";
        await db.user.update({
          where: {
            external_provider_id: evt.data.id,
          },
          data: {
            first_name: evt.data.first_name ?? "",
            last_name: evt.data.last_name!,
            email: evt.data.email_addresses[0]!.email_address,
            role: role,
          },
        });

        break;

      case "user.deleted":
        if (evt.data.id) {
          await db.user.delete({
            where: {
              external_provider_id: evt.data.id,
            },
          });
        }
        break;

      default:
        break;
    }

    return new Response("Webhook received", { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response("Error processing webhook", { status: 500 });
  }
}
