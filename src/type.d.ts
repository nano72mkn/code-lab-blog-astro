export type Url = `https://${string}.${string}`;

export interface FeedData {
  url: Url;
  icon?: string;
  category: "article" | "release" | "slide" | "other" | "podcast";
}

export interface ActivityType {
  title: string;
  contentSnippet: string | undefined;
  link: string;
  isoDate: string;
  year: string;
  favicon: string;
  hostname: string;
  category: FeedData["category"];
  icon: FeedData["icon"];
}
