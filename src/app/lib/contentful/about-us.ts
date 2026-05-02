import { contentfulClient } from "./client";

let cache: any = null;
let lastFetch = 0;
const CACHE_TIME = 60 * 60 * 1000;

export async function getAboutUs() {
  const now = Date.now();
  if (cache && now - lastFetch < CACHE_TIME) return cache;

  const res = await contentfulClient.getEntries({
    content_type: "aboutUsSection",
    include: 2,
  });

  cache = res.items;
  lastFetch = now;
  return cache;
}

export function mapAboutUs(items: any[]) {
  return (items ?? []).map((item) => ({
    id: item?.sys?.id ?? "",
    title: item?.fields?.title ?? "",
    header: item?.fields?.header ?? "",
    content: item?.fields?.content ?? "",
    image: item?.fields?.image?.fields?.file?.url
      ? `https:${item.fields.image.fields.file.url}`
      : "",
  }));
}
