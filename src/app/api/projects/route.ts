import { NextResponse } from "next/server";
import { listProjects, createProject } from "@/lib/db";
import { createProjectSchema } from "@/lib/validation";

export async function GET() {
  const items = await listProjects();
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = createProjectSchema.parse(body);
    const created = await createProject(parsed);
    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    const message = err?.message || "Permintaan tidak valid";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}