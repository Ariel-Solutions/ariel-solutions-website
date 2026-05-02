import { contentfulClient } from "./client";

let cache: any = null;
let lastFetch = 0;
const CACHE_TIME = 60 * 60 * 1000;

export async function getOurTeam() {
  const now = Date.now();
  if (cache && now - lastFetch < CACHE_TIME) return cache;

  const res = await contentfulClient.getEntries({
    content_type: "teamMember",
    include: 2,
  });

  cache = res.items;
  lastFetch = now;
  return cache;
}

export async function getTeamMemberBySlug(slug: string) {
  const decoded = decodeURIComponent(slug).replace(/-/g, " ");
  const items = await getOurTeam();
  const match = items.find(
    (item: any) =>
      (item?.fields?.name ?? "").toLowerCase() === decoded.toLowerCase()
  );
  return match ? mapOurTeam([match])[0] : null;
}

export function mapOurTeam(items: any[]) {
  return (items ?? []).map((item) => ({
    id: item?.sys?.id ?? "",
    name: item?.fields?.name ?? "",
    position: item?.fields?.position ?? "",
    bio: item?.fields?.bio ?? "",
    avatar: item?.fields?.avatar?.fields?.file?.url
      ? `https:${item.fields.avatar.fields.file.url}`
      : "",
    email: item?.fields?.email ?? "",
    phone: item?.fields?.phone ?? "",
    slug: (item?.fields?.name ?? item?.sys?.id ?? "").replace(/ /g, "-"),
  }));
}