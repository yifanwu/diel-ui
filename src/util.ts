export function LogError(e: string) {
  debugger;
  console.log(`%c${e}`, "red");
  throw new Error(e);
}