import type { IconName } from "@/lib/catalog";

type P = { className?: string };
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

const paths: Record<IconName | "phone" | "mail" | "pin" | "search" | "menu" | "chevron" | "truck" | "chat" | "shield" | "tag" | "clock" | "close", React.ReactNode> = {
  chip: <><rect x="6" y="6" width="12" height="12" rx="1" /><rect x="9.5" y="9.5" width="5" height="5" /><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" /></>,
  conveyor: <><rect x="2.5" y="10" width="19" height="5" rx="2.5" /><circle cx="5" cy="12.5" r="1" /><circle cx="19" cy="12.5" r="1" /><path d="M7 7h4v3H7zM13 6h4v4h-4zM6 15l-1 5M18 15l1 5" /></>,
  gear: <><circle cx="12" cy="12" r="3" /><path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1M18.7 18.7l-2.1-2.1M7.4 7.4 5.3 5.3" /><circle cx="12" cy="12" r="6.5" /></>,
  cabinet: <><rect x="5" y="2.5" width="14" height="19" rx="1" /><path d="M12 2.5v19M9.5 10v3M14.5 10v3M8 6h1M15 6h1" /></>,
  box: <><path d="m3 7.5 9-4.5 9 4.5v9L12 21l-9-4.5z" /><path d="m3 7.5 9 4.5 9-4.5M12 12v9" /></>,
  wave: <><rect x="3" y="4.5" width="18" height="15" rx="1.5" /><path d="M5.5 12c1.5-5 3-5 4.5 0s3 5 4.5 0 3-5 4 0" /></>,
  robot: <><path d="M3.5 21h9M6 21v-3h4v3" /><circle cx="8" cy="15.5" r="1.5" /><path d="m9 14.5 5.5-6" /><circle cx="15.5" cy="7.5" r="1.5" /><path d="M17 7.5h2.5M19.5 7.5 21 5.5M19.5 7.5 21 9.5" /></>,
  gauge: <><path d="M4.5 17a8 8 0 1 1 15 0" /><path d="m12 13 3.5-4" /><circle cx="12" cy="13" r="1.3" /><path d="M8 20h8" /></>,
  motor: <><rect x="4" y="7" width="12" height="10" rx="1.5" /><path d="M16 12h5M7 7V5.5h6V7M7 17v2M13 17v2M7 10v4M10 10v4M13 10v4" /></>,
  car: <><path d="M3.5 16v-3.5L6 8h12l2.5 4.5V16z" /><path d="M3.5 12.5h17" /><circle cx="7.5" cy="16.5" r="1.8" /><circle cx="16.5" cy="16.5" r="1.8" /></>,
  bolt: <path d="M13 2.5 5 13.5h6l-1 8 8-11h-6z" />,
  bulb: <path d="M9 17.5h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.4.3.5.8.5 1.3v2.3h6v-2.3c0-.5.2-1 .5-1.3A6 6 0 0 0 12 3Z" />,
  snow: <><path d="M12 2.5v19M3.8 7.25l16.4 9.5M3.8 16.75l16.4-9.5" /><path d="m9.5 4 2.5 2 2.5-2M9.5 20l2.5-2 2.5 2" /></>,
  drop: <><path d="M12 3s-6 6.5-6 11a6 6 0 0 0 12 0c0-4.5-6-11-6-11Z" /><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" /></>,
  phone: <path d="M5 3h3.5l1.5 5-2 1.5a11 11 0 0 0 6.5 6.5L16 14l5 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="m3.5 6 8.5 7 8.5-7" /></>,
  pin: <><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></>,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.4-4.4" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  chevron: <path d="m9 6 6 6-6 6" />,
  truck: <><path d="M2.5 6h11v10h-11zM13.5 9.5h4l3 3.5V16h-7z" /><circle cx="6.5" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></>,
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  shield: <><path d="M12 3 4.5 6v5.5c0 4.5 3.2 8 7.5 9.5 4.3-1.5 7.5-5 7.5-9.5V6z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></>,
  tag: <><path d="M3 12V3h9l9 9-9 9z" /><circle cx="7.5" cy="7.5" r="1.3" /></>,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
};

export type AnyIcon = keyof typeof paths;

export function Icon({ name, className = "size-5" }: P & { name: AnyIcon }) {
  return <svg {...base} className={className}>{paths[name]}</svg>;
}
