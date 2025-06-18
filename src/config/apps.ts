// アプリケーション設定
export interface AppConfig {
  appName: string;
  appSlug: string;
  primaryColor: string;
  description?: string;
  tagline?: string;
  features?: {
    icon: string;
    title: string;
    description: string;
  }[];
  screenshots?: {
    src: string;
    alt: string;
  }[];
  appStoreUrl?: string;
  playStoreUrl?: string;
  // サービス一覧ページ用の追加フィールド
  showInServices?: boolean;
  serviceDescription?: string;
  serviceImageUrl?: string;
  serviceTags?: string[];
  releaseDate?: string; // ISO形式の日付文字列 YYYY-MM-DD
}

// アプリ設定
export const apps: Record<string, AppConfig> = {
  "habit-tap": {
    appName: "Habit Tap",
    appSlug: "habit-tap",
    primaryColor: "#4CAF50",
    tagline: "習慣化を極限までシンプルに。トリガー設定で継続率アップ。",
    description: "Habit Tapは「タップするだけ」という究極のシンプルさで習慣化をサポートします。行動科学に基づいたトリガー設定により、「朝起きたら水を飲む」「昼食後に散歩する」など、きっかけと習慣をセットで管理。",
    appStoreUrl: "https://apps.apple.com/app/habit-tap/id6747366699",
    // サービス一覧ページ用
    showInServices: true,
    serviceDescription: "タップするだけで習慣を記録。シンプルな操作で習慣化をサポートする iOS アプリ。",
    serviceImageUrl: "/app_lp/habit-tap/icon.png",
    serviceTags: ["React Native"],
    releaseDate: "2025-06-18",
    features: [
      {
        icon: "📱",
        title: "シンプルな操作",
        description: "タップするだけで習慣を記録。複雑な操作は一切不要です。"
      },
      {
        icon: "📊",
        title: "視覚的な進捗確認",
        description: "カレンダーやグラフで習慣の継続状況を一目で確認できます。"
      },
      {
        icon: "🔔",
        title: "リマインダー機能",
        description: "設定した時間に通知でお知らせ。習慣化をサポートします。"
      },
      {
        icon: "🎯",
        title: "目標設定",
        description: "週や月の目標回数を設定して、達成感を味わいましょう。"
      },
      {
        icon: "📤",
        title: "データエクスポート",
        description: "記録したデータはCSV形式でエクスポート可能です。"
      },
      {
        icon: "🔒",
        title: "プライバシー重視",
        description: "すべてのデータはローカルに保存。安心して利用できます。"
      }
    ],
    screenshots: [
      {
        src: "/app_lp/habit-tap/habit-tap-screenshot-1.png",
        alt: "タップで習慣を記録"
      },
      {
        src: "/app_lp/habit-tap/habit-tap-screenshot-2.png",
        alt: "どれくらい継続したかを確認"
      },
      {
        src: "/app_lp/habit-tap/habit-tap-screenshot-3.png",
        alt: "カレンダーで習慣を可視化"
      },
      {
        src: "/app_lp/habit-tap/habit-tap-screenshot-4.png",
        alt: "過去の統計を確認"
      }
    ]
  }
  // 他のアプリを追加する場合はここに記述
};

// アプリ設定を取得するヘルパー関数
export function getAppConfig(appSlug: string): AppConfig {
  const config = apps[appSlug];
  if (!config) {
    throw new Error(`App config not found for: ${appSlug}`);
  }
  return config;
}

// サービス一覧に表示するアプリを取得
export function getAppsForServices(): AppConfig[] {
  return Object.values(apps)
    .filter(app => app.showInServices)
    .sort((a, b) => {
      // リリース日で降順ソート（新しい順）
      const dateA = a.releaseDate ? new Date(a.releaseDate).getTime() : 0;
      const dateB = b.releaseDate ? new Date(b.releaseDate).getTime() : 0;
      return dateB - dateA;
    });
}
