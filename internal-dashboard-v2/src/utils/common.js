// import moment from "moment-timezone";
import moment from "moment";

export const formatDate = (date) => moment(new Date(date)).format("ddd MMM D, YYYY");

export const formatInput = (date) => moment(date).format("YYYY-MM-DD")

export const formatBlocksFormat = ( date ) =>  moment(date).format("DD-MM-YYYY");

export const formatCalendarFormat = (date) => moment(date, "DD-MM-YYYY");

export const formatCheckoutDates = ( date ) =>  moment(date).format("YYYY-MM-DD");


export const fromToBlockDates = ( from, to ) => {
  const startDate = moment(from);
  const endDate = moment(to);
  const isSameMonth = startDate.format("M") === endDate.format("M");
  return isSameMonth
}

export const formatCurrency = (curreny, amount) => {
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

export const generateHashmap = (data=[], key='id') => {
  let hashMap = {}

  for (let i=0; i < data?.length; i++) {
    let item = data[i]
    hashMap[item[key]] = item
  }

  return hashMap
}

export const currencyData = {
    "USD": {
      "symbol": "$",
      "position": "left"
    },
    "EUR": {
      "symbol": "€",
      "position": "right"
    },
    "JPY": {
      "symbol": "¥",
      "position": "left"
    },
    "GBP": {
      "symbol": "£",
      "position": "left"
    },
    "AUD": {
      "symbol": "$",
      "position": "left"
    },
    "CAD": {
      "symbol": "$",
      "position": "left"
    },
    "CHF": {
      "symbol": "Fr",
      "position": "left"
    },
    "CNY": {
      "symbol": "¥",
      "position": "right"
    },
    "NZD": {
      "symbol": "$",
      "position": "left"
    },
    "MXN": {
      "symbol": "$",
      "position": "left"
    },
    "SGD": {
      "symbol": "$",
      "position": "left"
    },
    "HKD": {
      "symbol": "$",
      "position": "left"
    },
    "NOK": {
      "symbol": "kr",
      "position": "right"
    },
    "KRW": {
      "symbol": "₩",
      "position": "right"
    },
    "TRY": {
      "symbol": "₺",
      "position": "right"
    },
    "RUB": {
      "symbol": "₽",
      "position": "right"
    },
    "INR": {
      "symbol": "₹",
      "position": "left"
    },
    "BRL": {
      "symbol": "R$",
      "position": "left"
    },
    "ZAR": {
      "symbol": "R",
      "position": "right"
    },
    "AED": {
      "symbol": "د.إ",
      "position": "right"
    },
    "COP": {
      "symbol": "$",
      "position": "left"
    },
    "PLN": {
      "symbol": "zł",
      "position": "right"
    },
    "PHP": {
      "symbol": "₱",
      "position": "right"
    },
    "THB": {
      "symbol": "฿",
      "position": "right"
    },
    "IDR": {
      "symbol": "Rp",
      "position": "left"
    },
    "HUF": {
      "symbol": "Ft",
      "position": "right"
    },
    "ILS": {
      "symbol": "₪",
      "position": "right"
    },
    "DKK": {
      "symbol": "kr",
      "position": "right"
    },
    "CZK": {
      "symbol": "Kč",
      "position": "right"
    },
    "CLP": {
      "symbol": "$",
      "position": "left"
    },
    "ARS": {
      "symbol": "$",
      "position": "left"
    },
    "MYR": {
      "symbol": "RM",
      "position": "right"
    },
    "RON": {
      "symbol": "lei",
      "position": "right"
    },
    "SEK": {
    "symbol": "kr",
    "position": "right"
    },
    "BGN": {
    "symbol": "лв",
    "position": "right"
    },
    "KES": {
    "symbol": "KSh",
    "position": "right"
    },
    "HRK": {
    "symbol": "kn",
    "position": "right"
    },
    "IQD": {
    "symbol": "ع.د",
    "position": "right"
    },
    "VND": {
    "symbol": "₫",
    "position": "right"
    },
    "PKR": {
    "symbol": "₨",
    "position": "right"
    },
    "EGP": {
    "symbol": "£",
    "position": "left"
    },
    "DZD": {
    "symbol": "دج",
    "position": "right"
    },
    "SAR": {
    "symbol": "﷼",
    "position": "left"
    }
}