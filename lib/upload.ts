import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";

export interface UploadResult {
  url: string;
  filename: string;
}

function getR2Client() {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error("Cloudflare R2 credentials are not configured (R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY)");
  }

  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });
}

export async function uploadImage(file: File): Promise<UploadResult> {
  const bucket = process.env.R2_BUCKET_NAME;
  const publicUrl = process.env.R2_PUBLIC_URL;

  if (!bucket || !publicUrl) {
    throw new Error("Cloudflare R2 bucket not configured (R2_BUCKET_NAME, R2_PUBLIC_URL)");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const filename = `products/${randomUUID()}.${ext}`;

  const client = getR2Client();

  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: filename,
      Body: buffer,
      ContentType: file.type,
      ContentLength: buffer.byteLength,
    })
  );

  const url = `${publicUrl.replace(/\/$/, "")}/${filename}`;

  return { url, filename };
}

export async function deleteFromR2(filename: string): Promise<void> {
  const bucket = process.env.R2_BUCKET_NAME;
  if (!bucket) return;

  const client = getR2Client();

  await client.send(
    new DeleteObjectCommand({
      Bucket: bucket,
      Key: filename,
    })
  );
}

export function isAllowedImageType(mimeType: string): boolean {
  return ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"].includes(mimeType);
}

export const MAX_FILE_SIZE = 5 * 1024 * 1024;
