import { type CanvasRenderingContext2D } from "canvas";
import config from "../utils/config";
import { measureText, drawFont } from "../utils/font";
import drawShadow from "../utils/shadow";

const { width, background } = config;
const { dirtHeight } = background;

export default function drawTitle(
  ctx: CanvasRenderingContext2D,
  title: string,
  titleFontSize: number = 80
) {
  const titlePaddingTop = dirtHeight / 2 - titleFontSize / 2;
  const titlePaddingLeft = (width - measureText(ctx, title, titleFontSize)) / 2;
  drawShadow(ctx, () => {
    drawFont(ctx, title, titlePaddingLeft, titlePaddingTop, titleFontSize);
  });
}
