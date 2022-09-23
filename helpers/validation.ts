export const emailValidator = (val: string): string | undefined => {
  if (val === '' || val === undefined) return undefined
  return String(val)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) !== null
    ? undefined
    : "email is invalid";
};

export const passwordValidator = (val: string): string | undefined => {
  return String(val).length >= 8 ? undefined : "password too short";
};
