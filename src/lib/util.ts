import { format } from "date-fns";

export function formatDateWithOffset(date: Date): string {
  return format(date, "yyyy-MM-dd'T'HH:mm:ssXXX");
}

export function displayDateTime(date: Date): string {
  return format(date, "yyyy-MM-dd HH:mm:ss");
}
