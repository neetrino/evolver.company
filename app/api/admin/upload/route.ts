import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { uploadFileToR2, type UploadContext } from "@/lib/storage";

function parseUploadContext(value: FormDataEntryValue | null): UploadContext {
  if (value === "homeHero") {
    return "homeHero";
  }

  return "project";
}

export async function POST(request: Request): Promise<NextResponse> {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const context = parseUploadContext(formData.get("context"));
    const projectId = formData.get("projectId");
    const folder =
      typeof projectId === "string" && projectId.trim().length > 0 ? projectId.trim() : "temp";

    const entries = formData.getAll("files");
    const files = entries.filter((entry): entry is File => entry instanceof File);

    if (files.length === 0) {
      const singleFile = formData.get("file");
      if (singleFile instanceof File) {
        files.push(singleFile);
      }
    }

    if (files.length === 0) {
      return NextResponse.json({ success: false, error: "No files provided" }, { status: 400 });
    }

    const uploaded = await Promise.all(
      files.map((file) => uploadFileToR2(file, folder, context)),
    );

    return NextResponse.json({
      success: true,
      files: uploaded,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
