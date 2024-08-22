export function GenereteForgetTokenPassword(length: number) {
  let token = "";
  for (let i = 0; i < length; i++) {
    const randomDigit = Math.floor(Math.random() * 10);
    token += randomDigit.toString();
  }
  return token;
}
