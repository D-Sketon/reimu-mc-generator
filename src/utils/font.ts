import { type CanvasRenderingContext2D, registerFont } from "canvas";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

registerFont(path.join(__dirname, "../../source/Minecraft_AE.ttf"), { family: "Minecraft AE" });

export function drawFont(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number = 20,
  color: string = "#ffffff"
) {
  ctx.font = `${fontSize}px "Minecraft AE"`;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

export function measureText(
  ctx: CanvasRenderingContext2D,
  text: string,
  fontSize: number = 20
) {
  ctx.font = `${fontSize}px Minecraft AE`;
  return ctx.measureText(text.replace(/§./g, "")).width;
}

export function measureFontHeight(
  ctx: CanvasRenderingContext2D,
  fontSize: number = 20
) {
  return fontSize * 1.2;
}

export function drawEscapeFont(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  fontSize: number = 20
) {
  ctx.font = `${fontSize}px "Minecraft AE"`;
  ctx.fillStyle = "#ffffff";
  let px = x;
  let py = y;
  let isEscape = false;
  const textList = text.split("\n");
  for (let i = 0; i < textList.length; i++) {
    for (let j = 0; j < textList[i].length; j++) {
      if (textList[i][j] === "§") {
        isEscape = true;
        continue;
      }
      if (isEscape) {
        isEscape = false;
        switch (textList[i][j]) {
          case "0":
            ctx.fillStyle = "#000000";
            break;
          case "1":
            ctx.fillStyle = "#0000AA";
            break;
          case "2":
            ctx.fillStyle = "#00AA00";
            break;
          case "3":
            ctx.fillStyle = "#00AAAA";
            break;
          case "4":
            ctx.fillStyle = "#AA0000";
            break;
          case "5":
            ctx.fillStyle = "#AA00AA";
            break;
          case "6":
            ctx.fillStyle = "#FFAA00";
            break;
          case "7":
            ctx.fillStyle = "#AAAAAA";
            break;
          case "8":
            ctx.fillStyle = "#555555";
            break;
          case "9":
            ctx.fillStyle = "#5555FF";
            break;
          case "a":
            ctx.fillStyle = "#55FF55";
            break;
          case "b":
            ctx.fillStyle = "#55FFFF";
            break;
          case "c":
            ctx.fillStyle = "#FF5555";
            break;
          case "d":
            ctx.fillStyle = "#FF55FF";
            break;
          case "e":
            ctx.fillStyle = "#FFFF55";
            break;
          case "f":
            ctx.fillStyle = "#FFFFFF";
            break;
          default:
            ctx.fillStyle = "#ffffff";
            break;
        }
        continue;
      }
      ctx.fillText(textList[i][j], px, py);
      px += measureText(ctx, textList[i][j], fontSize);
    }

    px = x;
    py += measureFontHeight(ctx, fontSize);
  }
}
