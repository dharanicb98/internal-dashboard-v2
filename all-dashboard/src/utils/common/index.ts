import moment from "moment";
import { isEqual } from "lodash";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { jwtDecode } from "jwt-decode";
import { currencyData } from 'constants/common'
import { validateToken } from "services/login";
import { userLogout, updateUserDetails } from "store/slices/user";
import { getCookie, setCookie } from 'cookies-next';


const AUTH_SALT=process.env.NEXT_PUBLIC_AUTH_SALT

export const verifyJwtToken =  ( token:any ) => {
   const decodeJwtToken = jwt.verify( token,  AUTH_SALT)
   return decodeJwtToken
}

export function generateRandomString(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const generateUUID = (
  m = Math,
  d = Date,
  h = 16,
  s = (s: any) => m.floor(s).toString(h)
) => s(d.now() / 1000) + " ".repeat(h).replace(/./g, () => s(m.random() * h));

export const generateSampleArray = (length: number) => [
  ...new Array(length).keys(),
];

export const isBrowser =
  typeof window !== "undefined" &&
  window.document &&
  window.document.documentElement;

export const updateObjectArray = <T extends Record<string, any>>(
  arr: T[],
  condition: (obj: T) => boolean,
  updatedProperty: keyof T,
  updatedValue: T[keyof T]
): T[] => {
  return arr.map((obj) => {
    if (condition(obj)) {
      return { ...obj, [updatedProperty]: updatedValue };
    }

    return obj;
  });
};

export const getRangeBetweenDates = (start: string, end: string) => {
  const startDate = moment(start, "YYYY-MM-DD");
  const endDate = moment(end, "YYYY-MM-DD");
  const isSameMonth = startDate.format("M") === endDate.format("M");

  return `${startDate.format("MMM D")}-${endDate.format(
    isSameMonth ? "D" : "MMM D"
  )}`;
};

export const getRangeBetweenDates2 = (start: string, end: string) => {
  const startDate = moment(start, "YYYY-MM-DD");
  const endDate = moment(end, "YYYY-MM-DD");
  const isSameMonth = startDate.format("M") === endDate.format("M");

  return `${startDate.format(isSameMonth ? "D" : "MMM D")}-${endDate.format(
    "D MMM, YYYY"
  )}`;
};


export const getAllCookies = () => {
  return document?.cookie?.split(';').reduce((acc, cookie) => {
    const [name, value] = cookie.trim().split('=');
    acc[name] = value;
    return acc;
  }, {});
}

export const decodeJwtToken = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    return decoded

  } catch (error) {
    return null;
  }
};

export const formatCurrency = (curreny: string, amount: number) => {
  let currenyName = curreny?.toUpperCase()
  let currenyObj = currencyData[currenyName]

  if (currenyObj?.position === 'left') {
    return `${currenyObj?.symbol}${amount}`
  }
  else if (currenyObj?.position === 'right') {
    return `${amount}${currenyObj?.symbol}`
  }
  else {
    return `${curreny}${amount}`
  }
}

export const getUpdatedValues = (
  obj1: Record<string, any>,
  obj2: Record<string, any>
) => {
  const pickUpdated = Object.fromEntries(
    Object.entries(obj1)
      .map(([key, value]) => {
        if (!isEqual(value, obj2[key])) {
          return [key, value];
        }
        return false;
      })
      .filter(Boolean) as any[]
  );
  return pickUpdated;
};

export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export async function validateServerAccessToken(store: any, ctx: any) {
  console.log('called validate server side access token')
  // const parseCookie = (str: any) =>
  //   str
  //     .split(';')
  //     .map(v => v.split('='))
  //     .reduce((acc, v) => {
  //       acc[decodeURIComponent(String(v[0]).trim())] = decodeURIComponent(String(v[1]).trim());
  //       return acc;
  //     }, {});


  let validateRes: any = '';
  // let userData: any = {};
  try {

    // const data = await validateToken(ctx?.req?.cookies?.accessToken);
    // const accessToken = parseCookie(data?.headers?.['set-cookie']?.[0] || "")?.accessToken || ctx?.req?.cookies?.accessToken;
    // validateRes = data.status;
    // console.log('called validate server side access token', validateRes)
    // userData = data?.data?.data;
    // global.accessToken = accessToken;
    // setCookie('accessToken', accessToken, ctx);
    
    //token 
    if ( !ctx?.req?.cookies?.accessToken ) {
      validateRes = 401
    }
  } 
  catch (error) {
    validateRes = 401;
  }

  if (validateRes == 401) {
    console.log('call')
    store.dispatch(userLogout(true));
  } 
  else {
    // store.dispatch(updateUserDetails({ ...userData, userId: userData.user_id, isHost: [5, 6].includes(userData.user_role) }));
  }
  return '';
}