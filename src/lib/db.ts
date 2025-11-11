import { sql } from "@vercel/postgres";

export type ProjectInput = {
  title: string;
  description?: string;
  url?: string;
  tags?: string[];
};

export type ProjectRecord = {
  id: number;
  title: string;
  description: string | null;
  url: string | null;
  tags: string[] | null;
  created_at: string;
};

export type CertificateInput = {
  name: string;
  issuer?: string;
  issued_at?: string; // ISO date string (YYYY-MM-DD)
  url?: string;
  skills?: string[];
};

export type CertificateRecord = {
  id: number;
  name: string;
  issuer: string | null;
  issued_at: string | null;
  url: string | null;
  skills: string[] | null;
  created_at: string;
};
// Helper: format array agar kompatibel dengan @vercel/postgres (typing .array tidak tersedia)
const pgArray = (values?: string[] | null) => (values && values.length ? (sql as any).array(values) : null);

async function ensureTables() {
  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id BIGSERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      url TEXT,
      tags TEXT[],
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS certificates (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      issuer TEXT,
      issued_at DATE,
      url TEXT,
      skills TEXT[],
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `;
}

export async function listProjects(): Promise<ProjectRecord[]> {
  await ensureTables();
  const { rows } = await sql<ProjectRecord>`SELECT * FROM projects ORDER BY created_at DESC;`;
  return rows;
}

export async function getProjectById(id: number): Promise<ProjectRecord | null> {
  await ensureTables();
  const { rows } = await sql<ProjectRecord>`SELECT * FROM projects WHERE id = ${id} LIMIT 1;`;
  return rows[0] || null;
}

export async function createProject(input: ProjectInput): Promise<ProjectRecord> {
  await ensureTables();
  const { title, description, url, tags } = input;
  const { rows } = await sql<ProjectRecord>`
    INSERT INTO projects (title, description, url, tags)
    VALUES (
      ${title},
      ${description ?? null},
      ${url ?? null},
      ${pgArray(tags ?? null)}
    )
    RETURNING *;
  `;
  return rows[0];
}

export async function updateProject(
  id: number,
  input: Partial<ProjectInput>
): Promise<ProjectRecord | null> {
  await ensureTables();
  const current = await getProjectById(id);
  if (!current) return null;

  const {
    title = current.title,
    description = current.description ?? undefined,
    url = current.url ?? undefined,
    tags,
  } = input;

  const nextTags = tags ?? current.tags ?? null;

  const { rows } = await sql<ProjectRecord>`
    UPDATE projects
    SET title = ${title},
        description = ${description ?? null},
        url = ${url ?? null},
        tags = ${pgArray(nextTags)}
    WHERE id = ${id}
    RETURNING *;
  `;
  return rows[0];
}

export async function deleteProject(id: number): Promise<boolean> {
  await ensureTables();
  const { rowCount } = await sql`DELETE FROM projects WHERE id = ${id};`;
  return (rowCount ?? 0) > 0;
}

export async function listCertificates(): Promise<CertificateRecord[]> {
  await ensureTables();
  const { rows } = await sql<CertificateRecord>`
    SELECT * FROM certificates ORDER BY issued_at DESC NULLS LAST, created_at DESC;
  `;
  return rows;
}

export async function getCertificateById(id: number): Promise<CertificateRecord | null> {
  await ensureTables();
  const { rows } = await sql<CertificateRecord>`SELECT * FROM certificates WHERE id = ${id} LIMIT 1;`;
  return rows[0] || null;
}

export async function createCertificate(
  input: CertificateInput
): Promise<CertificateRecord> {
  await ensureTables();
  const { name, issuer, issued_at, url, skills } = input;
  const { rows } = await sql<CertificateRecord>`
    INSERT INTO certificates (name, issuer, issued_at, url, skills)
    VALUES (
      ${name},
      ${issuer ?? null},
      ${issued_at ?? null},
      ${url ?? null},
      ${pgArray(skills ?? null)}
    )
    RETURNING *;
  `;
  return rows[0];
}

export async function updateCertificate(
  id: number,
  input: Partial<CertificateInput>
): Promise<CertificateRecord | null> {
  await ensureTables();
  const current = await getCertificateById(id);
  if (!current) return null;

  const {
    name = current.name,
    issuer = current.issuer ?? undefined,
    issued_at = current.issued_at ?? undefined,
    url = current.url ?? undefined,
    skills,
  } = input;

  const nextSkills = skills ?? current.skills ?? null;

  const { rows } = await sql<CertificateRecord>`
    UPDATE certificates
    SET name = ${name},
        issuer = ${issuer ?? null},
        issued_at = ${issued_at ?? null},
        url = ${url ?? null},
        skills = ${pgArray(nextSkills)}
    WHERE id = ${id}
    RETURNING *;
  `;
  return rows[0];
}

export async function deleteCertificate(id: number): Promise<boolean> {
  await ensureTables();
  const { rowCount } = await sql`DELETE FROM certificates WHERE id = ${id};`;
  return (rowCount ?? 0) > 0;
}