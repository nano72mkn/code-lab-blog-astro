// Preact向け
/** @jsxImportSource preact */

import { TZDate } from "@date-fns/tz";
import { format, formatDistanceToNow, subYears } from "date-fns";

type Props = {
  isoDate: Date;
  className?: string;
};

export function ElapsedTime({ isoDate, className }: Props) {
  // date-fnsを使ってタイムゾーンを日本時間にする
  const newDate = new TZDate(isoDate, "Asia/Tokyo");

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
