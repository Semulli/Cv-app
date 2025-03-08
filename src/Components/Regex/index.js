export function phoneNum(value) {
  const phoneRegex = /^\+994(50|51|55|70|77)\d{7}$/;

  return phoneRegex.test(value);
}

export function email(value) {
  const emailRegex =
    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;

  return emailRegex.test(value);
}

export function checkUrl(value) {
 const imgUrlRegex =/^https?:\/\//;
  return imgUrlRegex.test(value.trim());
}
