import React from "react";
import { api } from "@/trpc/server";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const pingResult = await api.health.ping();

  return (
    <div>
      <div className="flex flex-wrap gap-5">
        <Button>Button</Button>
        <Button variant="destructive">Button</Button>
        <Button variant="ghost">Button</Button>
        <Button variant="link">Button</Button>
        <Button variant="outline">Button</Button>
        <Button variant="secondary">Button</Button>
      </div>

      <pre>{JSON.stringify(pingResult, null, 2)}</pre>
    </div>
  );
}
