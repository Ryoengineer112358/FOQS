import { GetServerSideProps } from "next";

export function convertDateTypeOnObject(obj: any) {
  for (const key in obj) {
    const value = obj[key]
    if (value && typeof value == "string" && key.indexOf("_at") >= 0) {
      obj[key] = new Date(value)
    }
  }
  return obj
}
