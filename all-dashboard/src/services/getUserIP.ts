import axios from "axios";
import { IncomingMessage } from "http";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { IP_API_KEY } from "src/constants/api";
import { isValidIp } from "utils/regex";

export async function getGeoLocation(ip: string) {
  if (!isValidIp(ip)) {
    console.log("Not a valid ip", ip);
    return null;
  }
  try {
    const res = await axios.get<GeoLocationResponse>(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${IP_API_KEY}&ip=${ip}`
    );
    return res.data;
  } catch (error: any) {
    console.log(error);
    return null;
  }
}

export function getServerIP(
  req: IncomingMessage & {
    cookies: NextApiRequestCookies;
  }
) {
  const ip =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress;

  return ip as string;
}

export interface GeoLocationResponse {
  ip: string;
  continent_code: string;
  continent_name: string;
  country_code2: string;
  country_code3: string;
  country_name: string;
  country_name_official: string;
  country_capital: string;
  state_prov: string;
  state_code: string;
  district: string;
  city: string;
  zipcode: string;
  latitude: string;
  longitude: string;
  is_eu: boolean;
  calling_code: string;
  country_tld: string;
  languages: string;
  country_flag: string;
  geoname_id: string;
  isp: string;
  connection_type: string;
  organization: string;
  asn: string;
  currency: Currency;
  time_zone: TimeZone;
}

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface TimeZone {
  name: string;
  offset: number;
  offset_with_dst: number;
  current_time: string;
  current_time_unix: number;
  is_dst: boolean;
  dst_savings: number;
}
