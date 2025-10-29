export function getAutoComplete(inp: string) {
  if (inp === "email") return "email";
  if (inp === "name") return "username";
  if (inp === "password") return "current-password";
  if (inp === "newpassword") return "new-password";
  return 'off'
}
