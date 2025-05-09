export const regexConstant = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/,
  PHONE: /^(\+380|380|0)\d{9}$/,
  TEXT: /^[A-Za-zА-Яа-яЇїІіЄєҐґ'’\s\-]+$/,
  ADDRESS: /^[A-Za-zА-Яа-яЇїІіЄєҐґ0-9'’\s\-]+$/,
};
