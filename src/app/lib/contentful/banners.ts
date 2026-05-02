import { contentfulClient } from "./client";

let cache: any = null;
let lastFetch = 0;

const CACHE_TIME = 60 * 60 * 1000;

export async function getBanners() {
  const now = Date.now();

  if (cache && now - lastFetch < CACHE_TIME) {
    return cache;
  }

  const res = await contentfulClient.getEntries({
    content_type: "banners",
  });

  cache = res.items;
  lastFetch = now;

  return cache;
}

export function mapBanners(items: any[]) {
  return items.map((item) => ({
    title: item.fields.title,
    header: item.fields.header,
    description: item.fields.description,
    image: item?.fields?.image?.fields?.file?.url
      ? `https:${item.fields.image.fields.file.url}`
      : "",
  }));
}