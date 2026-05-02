export interface GeoData {
  country: string;
  city: string;
  region: string;
  isp: string;
  timezone: string;
  latitude: number;
  longitude: number;
}

export async function getGeoData(ip: string): Promise<GeoData | null> {
  try {
    const res = await fetch(
      `http://ip-api.com/json/${ip}?fields=country,city,regionName,isp,timezone,lat,lon`,
      { next: { revalidate: 0 } }
    );
    const data = await res.json();
    if (data.status === "fail") return null;

    return {
      country: data.country,
      city: data.city,
      region: data.regionName,
      isp: data.isp,
      timezone: data.timezone,
      latitude: data.lat,
      longitude: data.lon,
    };
  } catch {
    return null;
  }
}