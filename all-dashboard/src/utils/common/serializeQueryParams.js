export default function serializeQueryParams(obj) {
  let str =
    "?" +
    Object.keys(obj)
      .reduce(function (a, k) {
        a.push(k + "=" + encodeURIComponent(obj[k]));
        return a;
      }, [])
      .join("&");
  return str;
}
