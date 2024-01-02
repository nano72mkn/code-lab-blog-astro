import { ActivityCard } from "@components/ActivityCard";
import type { ActivityType } from "@type";

interface ActivitiesProps {
  activities: ActivityType[];
}

export const Activities: React.FC<ActivitiesProps> = ({ activities }) => {
  return (
    <div className="flex flex-col gap-12">
      {activities.map((activity, index) => (
        <div key={index} className="relative">
          <div className="absolute -left-2 md:-left-4 mt-[0.5em] -ml-1 w-2 h-2 bg-gray-200 rounded-full" />
          <ActivityCard activity={activity} />
        </div>
      ))}
    </div>
  );
};
