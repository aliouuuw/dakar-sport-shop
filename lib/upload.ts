import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";

export interface UploadResult {
  url: string;
  filename: string;
}

export async function uploadImage(file: File): Promise<UploadResult> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const filename = `${randomUUID()}.${ext}`;

  const uploadDir = join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const filepath = join(uploadDir, filename);
  await writeFile(filepath, buffer);

  return {
    url: `/uploads/${filename}`,
    filename,
  };
}

export function isAllowedImageType(mimeType: string): boolean {
  return ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"].includes(mimeType);
}

export const MAX_FILE_SIZE = 5 * 1024 * 1024;
