import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import fs from "fs/promises";
import path from "path";
import type { AppConfig } from "@config/apps";

type Props = {
  app: AppConfig;
};

export const createAppOgp = async ({ app }: Props): Promise<Buffer> => {
  const font = await fs.readFile(
    path.resolve("src/fonts/MPLUSRounded1c-Bold.ttf")
  );

  // アプリアイコンを読み込む（存在する場合）
  let iconBase64: string | null = null;
  if (app.serviceImageUrl) {
    try {
      const iconPath = path.resolve(`public${app.serviceImageUrl}`);
      iconBase64 = await fs.readFile(iconPath, "base64");
    } catch (e) {
      // アイコンが読み込めない場合は代替表示を使用
      console.warn("アプリアイコンの読み込みに失敗しました:", e);
    }
  }

  const svg = await satori(
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 1200,
        height: 630,
        backgroundColor: app.primaryColor,
        position: "relative",
      }}
    >
      {/* 背景パターン */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `linear-gradient(45deg, ${app.primaryColor} 25%, transparent 25%), linear-gradient(-45deg, ${app.primaryColor} 25%, transparent 25%), linear-gradient(45deg, transparent 75%, ${app.primaryColor} 75%), linear-gradient(-45deg, transparent 75%, ${app.primaryColor} 75%)`,
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0, 0 20px, 20px -20px, -20px 0px",
          opacity: 0.1,
        }}
      />
      
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: 1100,
          height: 550,
          backgroundColor: "white",
          borderRadius: 24,
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
          padding: "60px",
          gap: 40,
        }}
      >
        {/* アプリアイコン */}
        {iconBase64 ? (
          <img
            src={`data:image/png;base64,${iconBase64}`}
            width={150}
            height={150}
            style={{
              borderRadius: "30px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              width: 150,
              height: 150,
              backgroundColor: app.primaryColor,
              borderRadius: "30px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 72,
              color: "white",
              fontWeight: 900,
            }}
          >
            {app.appName.charAt(0)}
          </div>
        )}
        
        {/* アプリ名 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: "#1a202c",
              margin: 0,
              textAlign: "center",
            }}
          >
            {app.appName}
          </h1>
          
          {/* タグライン */}
          {app.tagline && (
            <p
              style={{
                fontSize: 32,
                color: "#4a5568",
                margin: 0,
                textAlign: "center",
                maxWidth: 800,
              }}
            >
              {app.tagline}
            </p>
          )}
        </div>
        
        {/* ストアバッジ */}
        {(app.appStoreUrl || app.playStoreUrl) && (
          <div
            style={{
              display: "flex",
              gap: 20,
              marginTop: 20,
            }}
          >
            {app.appStoreUrl && (
              <div
                style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  padding: "12px 28px",
                  borderRadius: 8,
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                App Store
              </div>
            )}
            {app.playStoreUrl && (
              <div
                style={{
                  backgroundColor: "#000",
                  color: "#fff",
                  padding: "12px 28px",
                  borderRadius: 8,
                  fontSize: 18,
                  fontWeight: 700,
                }}
              >
                Google Play
              </div>
            )}
          </div>
        )}
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "MPLUSRounded1c-Bold",
          data: font,
          weight: 900,
          style: "normal",
        },
      ],
    }
  );

  const resvg = new Resvg(svg);

  return resvg.render().asPng();
};