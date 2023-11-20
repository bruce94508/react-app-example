export const variableScopeRegExp = /{[\w]+}/g;

export const urlRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

export const firstWordNumberRegExp = /^[\d].*/g;

export const removeXmlHtmlTagRegExp = /<[^>]*>|\t/g; // 把\t給過濾掉

export const replaceRouterParamsRegExp = /\:.*/g;

export const extractRouteNameRegExp = /\[|\]|\(|\)|\{|\}/g;
