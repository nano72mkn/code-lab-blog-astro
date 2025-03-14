import type { Activity } from '@utils/getActivity';

export interface Service {
  title: string;
  description: string;
  imageUrl: string;
  serviceUrl: string;
  tags: string[];
  releaseDate: string; // ISO形式の日付文字列 YYYY-MM-DD
}

export const services: Service[] = [
  {
    title: "Share Basket",
    description: "共有できるお買い物リストを作成できるサービス。家族や友人との共有リストを作成して、買い物を効率化しましょう。",
    imageUrl: "/service_image/sharebasket.png",
    serviceUrl: "https://share-basket.app/",
    tags: ["SwiftUI", "Firebase", "Core Data"],
    releaseDate: "2025-03-10"
  },
  {
    title: "CalPDF",
    description: "PDFのカレンダーを簡単に作成できるサービス。iPadなどのノートアプリで使いやすいデザインになっています。",
    imageUrl: "/service_image/calpdf.png",
    serviceUrl: "https://calpdf.code-lab.xyz/",
    tags: ["React", "Next.js", "TypeScript", "Emotion"],
    releaseDate: "2022-12-24"
  }
];

// サービスをアクティビティ形式に変換する関数
export const getServicesAsActivities = (): Activity[] => {
  return services.map(service => ({
    title: `サービスリリース: ${service.title}`,
    url: service.serviceUrl,
    pubDate: new Date(service.releaseDate),
    site: 'service',
    content: service.description,
  }));
};