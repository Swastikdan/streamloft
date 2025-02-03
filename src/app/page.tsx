import React from "react";
import { api } from "@/trpc/server";

export default async function Page() {
  const pingResult = await api.health.ping();

  return (
    <div>
      <h1>Health</h1>
      <pre>{JSON.stringify(pingResult, null, 2)}</pre>
    </div>
  );
}
