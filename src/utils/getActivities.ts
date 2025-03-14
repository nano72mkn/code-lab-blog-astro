import type { ActivityType, FeedData } from "@type";
import { getActivity } from "./getActivity";
import { getServicesAsActivities } from "@config/services";

export interface GetActivitiesProps {
  feeds: FeedData[];
  includeServices?: boolean;
}

export const getActivities = async ({
  feeds,
  includeServices = true,
}: GetActivitiesProps): Promise<ActivityType[]> => {
  // RSSフィードからアクティビティを取得
  const feedActivities = await Promise.all(
    feeds.map(async (feed) => await getActivity({ feed }))
  );
  
  // アクティビティをマージ
  let activitiesMerge = feedActivities.flat();
  
  // サービスリリース情報をアクティビティとして追加
  if (includeServices) {
    const serviceActivities = getServicesAsActivities();
    
    // サービスアクティビティをActivityType形式に変換
    const formattedServiceActivities: ActivityType[] = serviceActivities.map(service => ({
      title: service.title,
      contentSnippet: service.content,
      link: service.url,
      isoDate: service.pubDate,
      year: service.pubDate.getFullYear().toString(),
      favicon: "/favicon.svg", // サイト自身のfavicon
      hostname: new URL(service.url).hostname,
      category: "release", // サービスリリースはrelease categoryとして扱う
      icon: "🚀", // サービスリリース用のアイコン
    }));
    
    // 既存のアクティビティとサービスアクティビティをマージ
    activitiesMerge = [...activitiesMerge, ...formattedServiceActivities];
  }
  
  // 日付順にソート
  return activitiesMerge.sort((a, b) =>
    a.isoDate < b.isoDate ? 1 : -1
  );
};
