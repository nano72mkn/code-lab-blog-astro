import type { FC } from "react";
import { format, formatDistanceToNow, subYears } from "date-fns";

type Props = {
  isoDate: string | Date;
};

export const ElapsedTime: FC<Props> = ({ isoDate }) => {
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
