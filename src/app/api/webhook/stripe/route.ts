import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // WILL BE IMPLEMENTED LATER
  return NextResponse.json({ message: request }, { status: 200 });
}
