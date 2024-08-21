import type { CanvasRenderingContext2D } from "canvas";
import config from "../utils/config";

export default function drawBackground(ctx: CanvasRenderingContext2D) {
  const { width, height, background } = config;
  const { blockColors, blockSize, dirtHeight } = background;

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, width, height);

  for (let y = 0; y < dirtHeight; y += blockSize) {
    for (let x = 0; x < width; x += blockSize) {
      let random =
        Math.random() * blockColors.reduce((acc, cur) => acc + cur.weight, 0);
      let color = blockColors[0].color;
      for (let i = 0; i < blockColors.length; i++) {
        random -= blockColors[i].weight;
        if (random <= 0) {
          color = blockColors[i].color;
          break;
        }
      }
      ctx.fillStyle = color;
      ctx.fillRect(x, y, blockSize, blockSize);
    }
  }

  ctx.shadowColor = "rgba(0, 0, 0, 1)";
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, dirtHeight, width, 10);
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  
  for (let y = height - dirtHeight; y < height; y += blockSize) {
    for (let x = 0; x < width; x += blockSize) {
      let random =
        Math.random() * blockColors.reduce((acc, cur) => acc + cur.weight, 0);
      let color = blockColors[0].color;
      for (let i = 0; i < blockColors.length; i++) {
        random -= blockColors[i].weight;
        if (random <= 0) {
          color = blockColors[i].color;
          break;
        }
      }
      ctx.fillStyle = color;
      ctx.fillRect(x, y, blockSize, blockSize);
    }
  }

  ctx.shadowColor = "rgba(0, 0, 0, 1)";
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, height - dirtHeight - 10, width, 10);
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}
