import { TZDate } from "@date-fns/tz";
import type { ActivityType, FeedData } from "@type";
import Parser from "rss-parser";

export interface GetActivityProps {
  feed: FeedData;
}

const parser = new Parser();

export const getActivity = async ({
  feed: { url, category, icon },
}: GetActivityProps): Promise<ActivityType[]> => {
  const feedData = await parser.parseURL(url);

  if (!feedData?.items?.length) return [];

  const activities = feedData.items.map(
    ({ title, contentSnippet, link, isoDate }) => ({
      title,
      contentSnippet: contentSnippet ? contentSnippet.replace(/\n/g, "") : "",
      link,
      isoDate,
      year: isoDate?.split("-")[0],
      favicon: `https://www.google.com/s2/favicons?sz=32&domain=https://${
        new URL(url).hostname
      }`,
      hostname: new URL(url).hostname,
      category,
      icon,
    })
  );

  return activities.filter(
    ({ title, link, isoDate }) => title && link && isoDate
  ).map(activity => ({
    ...activity,
    isoDate: TZDate.tz("Asia/Tokyo", activity.isoDate as string),
  })) as ActivityType[];
};
