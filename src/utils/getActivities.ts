import type { ActivityType, FeedData } from "@type";
import { getActivity } from "./getActivity";

export interface GetActivitiesProps {
  feeds: FeedData[];
}

export const getActivities = async ({
  feeds,
}: GetActivitiesProps): Promise<ActivityType[]> => {
  const activities = await Promise.all(
    feeds.map(async (feed) => await getActivity({ feed }))
  );
  const activitiesMerge = activities.flat();
  return activitiesMerge.sort((a, b) =>
    a.isoDate < b.isoDate ? 1 : -1
  );
};
