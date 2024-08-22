import { type CanvasRenderingContext2D } from "canvas";

import config from "../utils/config.js";
import drawShadow from "../utils/shadow.js";
import { drawFont, measureText } from "../utils/font.js";

const { width, height, background } = config;
const { dirtHeight } = background;

const margin = 25;

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  const second = date.getSeconds().toString().padStart(2, "0");
  return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
}

export default function drawCopyright(ctx: CanvasRenderingContext2D) {
  const copyrightText = "reimu-mc-generator@D-Sketon";
  const copyrightFontSize = 30;
  const copyrightFontWidth = measureText(ctx, copyrightText, copyrightFontSize);

  const timestampText = formatDate(new Date());
  const timeFontSize = 30;
  const timeFontWidth = measureText(ctx, timestampText, timeFontSize);

  const copyrightPaddingTop =
    (dirtHeight - copyrightFontSize - timeFontSize - margin) / 2;
  const copyrightPaddingLeft = (width - copyrightFontWidth) / 2;

  drawShadow(ctx, () => {
    drawFont(
      ctx,
      copyrightText,
      copyrightPaddingLeft,
      copyrightPaddingTop + height - dirtHeight,
      copyrightFontSize
    );
  });

  const timePaddingTop = copyrightPaddingTop + copyrightFontSize + margin;
  const timePaddingLeft = (width - timeFontWidth) / 2;

  drawShadow(ctx, () => {
    drawFont(
      ctx,
      timestampText,
      timePaddingLeft,
      timePaddingTop + height - dirtHeight,
      timeFontSize
    );
  });
}
