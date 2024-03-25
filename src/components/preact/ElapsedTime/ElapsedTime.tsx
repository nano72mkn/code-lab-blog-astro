// Preact向け
/** @jsxImportSource preact */

import { format, formatDistanceToNow, subYears } from "date-fns";

type Props = {
  isoDate: string | Date;
};

export function ElapsedTime({ isoDate }: Props) {
  const newDate = new Date(isoDate);

  return <time
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
