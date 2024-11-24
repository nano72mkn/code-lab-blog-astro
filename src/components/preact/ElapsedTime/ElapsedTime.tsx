// Preact向け
/** @jsxImportSource preact */

import { format, formatDistanceToNow, subYears } from "date-fns";

type Props = {
  isoDate: string | Date;
  className?: string;
};

export function ElapsedTime({ isoDate, className }: Props) {
  const newDate = new Date(`${isoDate}+09:00`);

  return <time
    className={className}
    title={format(newDate, "yyyy/MM/dd")}
    dateTime={format(newDate, "yyyy-MM-dd")}
  >
    {subYears(new Date(), 1) > newDate
      ? format(newDate, "yyyy/MM/dd")
      : formatDistanceToNow(newDate, {
          includeSeconds: true,
          addSuffix: true,
        })}
  </time>;
}
