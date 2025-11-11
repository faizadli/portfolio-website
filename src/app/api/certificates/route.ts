import { NextResponse } from "next/server";
import { listCertificates, createCertificate } from "@/lib/db";
import { createCertificateSchema } from "@/lib/validation";

export async function GET() {
  const items = await listCertificates();
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = createCertificateSchema.parse(body);
    const created = await createCertificate(parsed);
    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    const message = err?.message || "Permintaan tidak valid";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}