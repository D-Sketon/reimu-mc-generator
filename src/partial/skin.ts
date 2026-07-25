import { type CanvasRenderingContext2D, loadImage } from "@napi-rs/canvas/node-canvas.js";

export default async function drawSkin(
  ctx: CanvasRenderingContext2D,
  name: string,
  x: number,
  y: number,
  size: number = 64
) {
  const res = await fetch(`https://minotar.net/helm/${name}/${size}.png`);
  const image = await loadImage(Buffer.from(await res.arrayBuffer()));
  ctx.drawImage(image, x, y, size, size);
}
