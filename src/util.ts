import { RecordObject } from "diel";
import { STRICT } from "./types";

export function getValidateAttribute<T extends number | string>(d: RecordObject, attribute: string): T {
  const val = d[attribute] as T;
  if (STRICT && (val === undefined)) {
    LogError(`value (${attribute}) is not defined, please check your data source!`);
  }
  return val;
}

export function LogError(e: string) {
  debugger;
  console.log(`%c${e}`, "red");
  throw new Error(e);
}