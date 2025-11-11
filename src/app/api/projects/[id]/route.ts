import { NextResponse } from "next/server";
import { getProjectById, updateProject, deleteProject } from "@/lib/db";
import { updateProjectSchema } from "@/lib/validation";

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
  const item = await getProjectById(id);
  if (!item) return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: Params) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
  try {
    const body = await req.json();
    const parsed = updateProjectSchema.parse(body);
    const updated = await updateProject(id, parsed);
    if (!updated) return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Permintaan tidak valid" }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: Params) {
  const id = Number(params.id);
  if (!Number.isFinite(id)) return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
  const ok = await deleteProject(id);
  if (!ok) return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
  return NextResponse.json({ ok: true });
}