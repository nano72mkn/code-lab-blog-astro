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
  isoDate: Date;
  year: string;
  favicon: string;
  hostname: string;
  category: FeedData["category"];
  icon: FeedData["icon"];
}

type RobotsMeta = {
  name: 'robots',
  content: 'noindex' | 'index'
}

type ArticleMeta = {
  property: 'article:published_time' | 'article:modified_time' | 'article:expiration_time' | 'article:author' | 'article:section' | 'article:tag',
  content: string;
}

export type MetaDataType = (RobotsMeta | ArticleMeta)[];
