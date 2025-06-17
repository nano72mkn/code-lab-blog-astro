# プロジェクト固有の設定

## アプリの利用規約・プライバシーポリシーページ作成手順

このブログサイトに新しいアプリのページを追加する際は、以下の手順に従ってください：

### 1. ディレクトリ構造の作成

```bash
# ページ用ディレクトリ
mkdir -p src/pages/[app-slug]/

# コンテンツ用ディレクトリ
mkdir -p src/content/[app-slug]/
```

### 2. コンテンツコレクションの追加

`src/content/config.ts`に新しいコレクションを追加：

```typescript
const [appName] = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    updatedDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
  }),
});

export const collections = { 
  blog, 
  "habit-tap": habitTap,
  "[app-slug]": [appName] // 新しいアプリ用
};
```

### 3. Markdownファイルの作成

以下のファイルを`src/content/[app-slug]/`に作成：

- `terms.md` - 利用規約
- `privacy.md` - プライバシーポリシー

フロントマター例：
```yaml
---
title: "利用規約"
description: "[アプリ名]の利用規約"
updatedDate: "YYYY-MM-DD"
---
```

### 4. ページファイルの作成

以下のファイルを`src/pages/[app-slug]/`に作成：

#### index.astro（ランディングページ）

**方法1: AppLandingPageテンプレートを使用（推奨）**
```astro
---
import AppLayout from "@components/Layout/AppLayout.astro";
import AppLandingPage from "@components/AppLandingPage.astro";

export const prerender = true;

const features = [
  {
    icon: "🎯",
    title: "機能1",
    description: "機能の説明"
  },
  // 他の機能...
];
---

<AppLayout title="[アプリ名] - [説明]" appName="[アプリ名]" appSlug="[app-slug]">
  <AppLandingPage
    appName="[アプリ名]"
    appSlug="[app-slug]"
    tagline="[キャッチコピー]"
    description="[アプリの詳細説明]"
    features={features}
    primaryColor="#3182ce"
    appStoreUrl="[App Store URL]"
    playStoreUrl="[Google Play URL]"
  />
</AppLayout>
```

**方法2: カスタムランディングページ**
```astro
---
import AppLayout from "@components/Layout/AppLayout.astro";

export const prerender = true;
---

<AppLayout title="[アプリ名] - [説明]" appName="[アプリ名]" appSlug="[app-slug]">
  <!-- カスタムのランディングページ内容 -->
</AppLayout>
```

#### terms.astro（利用規約ページ）
```astro
---
import AppLayout from "@components/Layout/AppLayout.astro";
import { getEntry } from "astro:content";

const entry = await getEntry("[app-slug]", "terms");
if (!entry) {
  return Astro.redirect("/404");
}
const { Content } = await entry.render();

export const prerender = true;
---

<AppLayout title={`${entry.data.title} - [アプリ名]`} appName="[アプリ名]" appSlug="[app-slug]">
  <main class="legal-container">
    <Content />
  </main>
</AppLayout>

<style>
  /* 既存のスタイルを使用 */
</style>
```

#### privacy.astro（プライバシーポリシーページ）
```astro
---
import AppLayout from "@components/Layout/AppLayout.astro";
import { getEntry } from "astro:content";

const entry = await getEntry("[app-slug]", "privacy");
if (!entry) {
  return Astro.redirect("/404");
}
const { Content } = await entry.render();

export const prerender = true;
---

<AppLayout title={`${entry.data.title} - [アプリ名]`} appName="[アプリ名]" appSlug="[app-slug]">
  <main class="legal-container">
    <Content />
  </main>
</AppLayout>

<style>
  /* 既存のスタイルを使用 */
</style>
```

### 5. 共通コンポーネント

以下のコンポーネントは既に作成済みなので、そのまま使用できます：

- `src/components/Layout/AppLayout.astro` - アプリ専用レイアウト
- `src/components/AppHeader.astro` - アプリ専用ヘッダー

### 置換が必要な項目

- `[app-slug]` - URLで使用するスラッグ（例: habit-tap）
- `[appName]` - コレクション変数名（例: habitTap）
- `[アプリ名]` - 表示用のアプリ名（例: Habit Tap）
- `[説明]` - アプリの説明

### アクセスURL

作成後は以下のURLでアクセス可能：
- `/[app-slug]/` - ランディングページ
- `/[app-slug]/terms` - 利用規約
- `/[app-slug]/privacy` - プライバシーポリシー
- `/[app-slug]/support` - サポートページ

## Google Formの使用方法

### 1. GoogleFormコンポーネント

Google Formを埋め込む場合は、作成済みの`GoogleForm`コンポーネントを使用します。

#### Markdownファイル内での使用

```markdown
<GoogleForm formUrl="https://docs.google.com/forms/d/e/[FORM_ID]/viewform" height="800" />
```

#### Astroファイル内での使用

1. コンポーネントをインポート：
```astro
import GoogleForm from "@components/GoogleForm.astro";
```

2. Markdownコンテンツに渡す：
```astro
<Content components={{GoogleForm}} />
```

### 2. パラメータ

- `formUrl`: Google FormのURL（必須）
- `height`: iframeの高さ（デフォルト: "800"）
- `title`: アクセシビリティ用のタイトル（デフォルト: "Google Form"）

### 3. 注意事項

- URLは自動的に埋め込み用（`?embedded=true`）に変換されます
- レスポンシブ対応済み
- 遅延読み込み（loading="lazy"）を使用

## AppLandingPageテンプレートの使用方法

### パラメータ

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| appName | string | ✓ | アプリ名 |
| appSlug | string | ✓ | URLスラッグ |
| tagline | string | ✓ | キャッチコピー |
| description | string | | アプリの詳細説明 |
| features | array | | 機能リスト（title, description, icon） |
| screenshots | array | | スクリーンショット（src, alt） |
| appStoreUrl | string | | App StoreのURL |
| playStoreUrl | string | | Google PlayのURL |
| primaryColor | string | | メインカラー（デフォルト: #3182ce） |

### 使用例

```astro
<AppLandingPage
  appName="MyApp"
  appSlug="myapp"
  tagline="革新的なアプリ体験を"
  description="詳細な説明文..."
  features={[
    { icon: "🚀", title: "高速", description: "..." },
    { icon: "🔒", title: "安全", description: "..." }
  ]}
  screenshots={[
    { src: "/images/hero.png", alt: "メイン画面" },
    { src: "/images/screen1.png", alt: "機能1" }
  ]}
  primaryColor="#8b5cf6"
/>
```

### レイアウト構成

1. **Heroセクション**: アプリ名、キャッチコピー、ストアボタン
2. **機能セクション**: グリッド形式で機能を表示
3. **スクリーンショット**: 複数の画面を表示
4. **リンクセクション**: サポート、利用規約、プライバシーポリシー