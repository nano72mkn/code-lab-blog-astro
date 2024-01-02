import { format, formatDistanceToNow, subYears } from "date-fns";
import type { ActivityType } from "@type";

interface ActivityCardProps {
  activity: ActivityType;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <a
      className="flex flex-col gap-2"
      href={activity.link}
      target="_blank"
      rel="noreferrer"
    >
      <p className="pl-4 text-sm text-gray-900">
        {subYears(new Date(), 1) > new Date(activity.isoDate)
          ? format(new Date(activity.isoDate), "yyyy/MM/dd")
          : formatDistanceToNow(new Date(activity.isoDate), {
              includeSeconds: true,
              addSuffix: true,
            })}
      </p>
      <div className="flex flex-col justify-center py-4 px-5 overflow-hidden rounded-lg shadow-lg hover:shadow-md hover:bg-gray-100 gap-2 border border-grey-100">
        <p className="font-bold break-all flex-1">{activity.title}</p>
        <div className="flex items-center">
          <span className="flex items-center mr-2 w-4 h-4">
            <img
              src={activity.favicon}
              width={12}
              height={12}
              className="w-4 h-4"
              alt="favicon"
              decoding="async"
            />
          </span>
          <p className="text-sm text-gray-600">{activity.hostname}</p>
        </div>
      </div>
    </a>
  );
};
