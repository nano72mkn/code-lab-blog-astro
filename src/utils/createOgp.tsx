import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import fs from "fs/promises";
import path from "path";

type Props = {
  title: string;
};
export const createOgp = async ({ title }: Props): Promise<Buffer> => {
  const font = await fs.readFile(
    path.resolve("src/fonts/MPLUSRounded1c-Bold.ttf")
  );

  const icon = await fs.readFile(
    path.resolve("public/icon/icon.jpg"),
    "base64"
  );

  const svg = await satori(
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 1200,
        height: 630,
        backgroundImage: "linear-gradient(45deg, #FFB900, rgb(255, 151, 66))",
        color: "#333",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
          width: 1150,
          height: 580,
          padding: "30px 50px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: 16,
          boxShadow: "0 0 10px rgb(217, 122, 44)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            flexGrow: 1,
            fontSize: 50,
            overflow: "hidden",
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: 30,
              color: "#ebad03",
            }}
          >
            Code Lab.
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div
              style={{
                width: 70,
                height: 70,
                background: `url(data:image/jpeg;base64,${icon})`,
                backgroundSize: "70px 70px",
                borderRadius: "50%",
              }}
            ></div>
            <span
              style={{
                display: "block",
                flexGrow: 1,
                fontSize: 30,
                textOverflow: "ellipsis",
              }}
            >
              @nano72mkn
            </span>
          </div>
        </div>
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
