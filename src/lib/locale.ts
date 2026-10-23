import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { dict, isLocale } from "./i18n";

// Ngôn ngữ trang hiện tại; chỉ Server Component / generateMetadata (không dùng được trong Server Action, Client Component).
export async function getT() {
  const l = await lang();
  if (!isLocale(l)) notFound();
  return { l, t: dict[l] };
}
