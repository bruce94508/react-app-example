export const getCookieMap = () => {
  const cookieMap = document.cookie.split(';').reduce((map, keyValueStr) => {
    const [key, value] = keyValueStr.split('=');
    if (key) {
      map.set(key, decodeURIComponent(value));
    }
    return map;
  }, new Map<string, string>());
  return cookieMap;
};
