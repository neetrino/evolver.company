import type { PageCopyId, PageCopyText } from "@/lib/page-copy/constants";
import type { PageCopyField } from "@/lib/page-copy/fields";

export type PageCopyIndexItem = {
  id: PageCopyId;
  publicPath: string;
  fieldCount: number;
  customized: boolean;
  title: PageCopyText;
  description: PageCopyText;
};

export type PageCopyMediaKind = "image" | "video";

export type PageCopyMediaItem = {
  id: string;
  label: string;
  src: string;
  kind: PageCopyMediaKind;
};

export type PageCopyEditorModel = {
  id: PageCopyId;
  publicPath: string;
  title: PageCopyText;
  description: PageCopyText;
  fields: PageCopyField[];
  media: PageCopyMediaItem[];
};
