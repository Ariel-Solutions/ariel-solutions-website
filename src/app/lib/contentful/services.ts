import { contentfulClient } from "./client";

let cache: any = null;
let lastFetch = 0;

const CACHE_TIME = 60 * 60 * 1000;

/* ================= GET ALL SERVICES ================= */

export async function getServices() {
  const now = Date.now();

  if (cache && now - lastFetch < CACHE_TIME) {
    return cache;
  }

  const res = await contentfulClient.getEntries({
    content_type: "services",
  });

  cache = res.items;
  lastFetch = now;

  return cache;
}

/* ================= MAP SERVICES ================= */

export function mapServices(items: any[]) {
  return (items ?? []).map((item) => ({
    id: item?.sys?.id ?? "",
    slug: item?.fields?.slug?.toLowerCase().trim() ?? "",
    title: item?.fields?.title ?? "",
    description: item?.fields?.description ?? "",
    content: item?.fields?.content ?? "",
    thumbnail: item?.fields?.thumbnail?.fields?.file?.url
      ? `https:${item.fields.thumbnail.fields.file.url}`
      : "",
    images:
      item?.fields?.images?.map((img: any) =>
        img?.fields?.file?.url ? `https:${img.fields.file.url}` : ""
      ) ?? [],
  }));
}
