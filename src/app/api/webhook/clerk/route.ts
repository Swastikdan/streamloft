/**
 * The above function is a TypeScript code snippet that handles incoming webhooks from Clerk, verifies
 * the payload, and processes different types of user events like creation, update, and deletion.
 * @param {Request} req - The `req` parameter in the `POST` function represents the incoming HTTP
 * request. It contains information about the request such as headers, body, and other relevant data.
 * In this case, it is used to extract the payload data from the incoming webhook request.
 * @returns The function `POST` is returning a response based on the processing of a webhook event. If
 * the webhook event is successfully verified and processed based on its type (user created, updated,
 * or deleted), the function returns a JSON response with the message "Webhook received" and a status
 * code of 200.
 */
import { Webhook } from "svix";
import { headers } from "next/headers";
import { type WebhookEvent } from "@clerk/nextjs/server";
import { env } from "@/env";
import { db } from "@/server/db";
import { createLog } from "@/utils/createLog";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const SIGNING_SECRET = env.CLERK_SIGNING_SECRET;

  // You can find this in the Clerk Dashboard -> Webhooks
  // under "Manage webhook"

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    await createLog({
      createdByUserType: "system",
      source: "clerk webhook",
      message: "Error: Missing Svix headers",
      lavel: "info",
    });
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body

  const payload = (await req.json()) as unknown;
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
    await createLog({
      createdByUserType: "system",
      source: "clerk webhook",
      message: `Error verifying webhook: ${err as string}`,
    });
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
            firstName: evt.data.first_name!,
            lastName: evt.data.last_name!,
            email: evt.data.email_addresses[0]!.email_address,
            external_id: evt.data.id,
            role: "user",
          },
        });
        break;
      case "user.updated":
        const role =
          evt.data.public_metadata.role === "admin" ? "admin" : "user";
        await db.user.update({
          where: { external_id: evt.data.id },
          data: {
            firstName: evt.data.first_name!,
            lastName: evt.data.last_name!,
            email: evt.data.email_addresses[0]!.email_address,
            role: role,
          },
        });

        break;
      case "user.deleted":
        if (evt.data.id) {
          await db.user.delete({
            where: { external_id: evt.data.id },
          });
        }
        break;
      default:
        break;
    }
    // return c.superjson({ message: "Webhook received" }, 200);
    return NextResponse.json({ message: "Webhook received" }, { status: 200 });
  } catch (error) {
    await createLog({
      createdByUserType: "system",
      source: "clerk webhook",
      message: `Error processing webhook: ${error as string}`,
    });
    // console.error("Error processing webhook:", error);
    return NextResponse.json(
      { message: "Webhook processing error" },
      { status: 500 },
    );
  }
}
