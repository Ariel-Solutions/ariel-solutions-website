import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";

export function renderRichText(content: Document) {
  return documentToReactComponents(content);
}