import axios from "axios";
import { type CanvasRenderingContext2D, loadImage } from "canvas";

export default async function drawSkin(
  ctx: CanvasRenderingContext2D,
  name: string,
  x: number,
  y: number,
  size: number = 64
) {
  const { data: avatar } = await axios.get(
    `https://minotar.net/helm/${name}/${size}.png`,
    {
      responseType: "arraybuffer",
    }
  );
  const image = await loadImage(Buffer.from(avatar));
  ctx.drawImage(image, x, y, size, size);
}
