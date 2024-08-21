import { type CanvasRenderingContext2D } from "canvas";
import { drawEscapeFont, drawFont, measureText } from "../utils/font";
import drawSkin from "../partial/skin";
import config from "../utils/config";
import drawTitle from "../partial/title";

const { width, height, background } = config;
const { dirtHeight } = background;
const leftRightRatio = 3;
const avatarSize = 200;
const fontSize = 40;
const margin = 20;

async function drawLeftLayout(
  ctx: CanvasRenderingContext2D,
  playerName: string
) {
  const totalHeight = fontSize + margin + avatarSize;

  const paddingTop = (height - dirtHeight * 2 - totalHeight) / 2;
  const paddingLeftAvatar = (width / leftRightRatio - avatarSize) / 2;
  const paddingLeftRightName =
    (width / leftRightRatio - measureText(ctx, playerName, fontSize)) / 2;

  await drawSkin(
    ctx,
    playerName,
    paddingLeftAvatar,
    dirtHeight + paddingTop,
    avatarSize
  );
  drawFont(
    ctx,
    playerName,
    paddingLeftRightName,
    height - dirtHeight - paddingTop,
    fontSize
  );
}

function drawBasicInfo(
  ctx: CanvasRenderingContext2D,
  basicInfo: string[]
) {
  const infoFontSize = 35;
  const infoMargin = 60;
  const infoTotalHeight =
    infoFontSize * basicInfo.length + infoMargin * (basicInfo.length - 1);
  const infoPaddingTopBottom = (height - dirtHeight * 2 - infoTotalHeight) / 2;
  for (let i = 0; i < basicInfo.length; i++) {
    const info = basicInfo[i];
    drawEscapeFont(
      ctx,
      info,
      width / leftRightRatio + infoMargin,
      dirtHeight + infoPaddingTopBottom + i * (infoFontSize + infoMargin),
      fontSize
    );
  }
}

export default async function playerInfo(
  ctx: CanvasRenderingContext2D,
  playerName: string,
  basicInfo: string[]
) {
  drawTitle(ctx, "Minecraft Player Info");
  await drawLeftLayout(ctx, playerName);
  drawBasicInfo(ctx, basicInfo);
}
