// 字符串转换为首字母大写
export const capitalize = (str: string) => str.slice(0, 1).toUpperCase() + str.slice(1);

// 解码一个字符串为多个字符串
export const decodeMultiString = (ids: string, separator: string = ',') => decodeURIComponent(ids).split(separator);

// 编码多个字符串为一个字符串
export const encodeMultiString = (ids: string[], separator: string = ',') => encodeURIComponent(ids.join(separator));

// 获取文字的宽度
export const getTextWidth = (txt: string, fontSize?: string) => {
  const span = document.createElement('span');
  span.innerHTML = txt;
  span.style.position = 'absolute';
  span.style.top = '-100px';
  span.style.left = '-100px';
  if (fontSize) {
    span.style.fontSize = fontSize;
  }
  document.body.appendChild(span);
  const width = span.offsetWidth;
  document.body.removeChild(span);
  return width;
};

// 是否引号开头和结尾
export const hasQuoteWrap = (str: string) => str.match(/^'.*'$|^".*"$/);
