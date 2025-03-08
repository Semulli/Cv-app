export function phoneNum(value) {
  const phoneRegex = /^\+994(50|51|55|70|77)\d{7}$/;

  return phoneRegex.test(value);
}

export function email(value) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  return emailRegex.test(value);
}

export function checkUrl(value) {
  const imgUrlRegex =
    /^(https?:\/\/.*\.(?:jpg|jpeg|png|gif|bmp|webp|svg|tiff|ico)(\?.*)?)$/i;

  return imgUrlRegex.test(value);
}
