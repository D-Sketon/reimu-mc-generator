import mc from "minecraftstatuspinger";
import { type CanvasRenderingContext2D, Image, loadImage } from "canvas";
import { fileURLToPath } from "url";
import path from "path";
import config from "../utils/config";
import drawTitle from "../partial/title";
import { drawEscapeFont, drawFont, measureText } from "../utils/font";


const __dirname = path.dirname(fileURLToPath(import.meta.url));

const leftRightRatio = 3;
const margin = 40;
const { width, height, background } = config;
const { dirtHeight } = background;

async function drawLeftLayout(
  ctx: CanvasRenderingContext2D,
  host: string,
  port: number,
  serverName: string,
  favicon: string | undefined,
  version: string,
  showUrl: boolean
) {
  const faviconSize = 200;

  const nameFontSize = 40;
  const urlFontSize = 25;

  const totalHeight = showUrl
    ? faviconSize + nameFontSize + urlFontSize + margin * 3
    : faviconSize + nameFontSize + margin * 2;

  const paddingTop = (height - dirtHeight * 2 - totalHeight) / 2;
  const faviconPaddingLeft = (width / leftRightRatio - faviconSize) / 2;

  let img: Image;
  if (favicon) {
    const imgBuffer = Buffer.from(
      favicon.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    img = await loadImage(imgBuffer);
  } else {
    img = await loadImage(path.join(__dirname, "../source/pack.png"));
  }
  ctx.drawImage(
    img,
    faviconPaddingLeft,
    dirtHeight + paddingTop,
    faviconSize,
    faviconSize
  );

  const namePaddingLeft =
    (width / leftRightRatio - measureText(ctx, serverName, nameFontSize)) / 2;
  drawFont(
    ctx,
    serverName,
    namePaddingLeft,
    dirtHeight + paddingTop + faviconSize + margin,
    nameFontSize
  );

  const versionPaddingLeft =
    (width / leftRightRatio - measureText(ctx, version, urlFontSize)) / 2;
  drawFont(
    ctx,
    version,
    versionPaddingLeft,
    dirtHeight + paddingTop + faviconSize + margin + nameFontSize + margin,
    urlFontSize,
    "gray"
  );

  if (showUrl) {
    const url = port !== 25565 ? `${host}:${port}` : host;
    const urlPaddingLeft =
      (width / leftRightRatio - measureText(ctx, url, urlFontSize)) / 2;
    drawFont(
      ctx,
      url,
      urlPaddingLeft,
      dirtHeight +
        paddingTop +
        faviconSize +
        margin +
        nameFontSize +
        margin +
        urlFontSize +
        margin,
      urlFontSize,
      "gray"
    );
  }
}

function drawRightLayout(
  ctx: CanvasRenderingContext2D,
  ping: number,
  maxOnline: number,
  online: number,
  error = false
) {
  const pingFontSize = 35;
  const pingText = error ? "offline" : `${ping}ms`;

  if (error) {
    const pingPaddingRight =
      ((width / leftRightRatio) * 1.5 -
        measureText(ctx, pingText, pingFontSize)) /
      2;
    drawFont(
      ctx,
      pingText,
      (width / leftRightRatio) * 2 + pingPaddingRight,
      dirtHeight + 100,
      pingFontSize,
      "#FF5555"
    );
    return;
  }

  const maxOnlineFontSize = 35;
  const maxOnlineText = `${online}/${maxOnline}`;

  const pingPaddingRight =
    ((width / leftRightRatio) * 1.2 -
      measureText(ctx, pingText, pingFontSize)) /
    2;
  const maxOnlinePaddingRight =
    ((width / leftRightRatio) * 1.2 -
      measureText(ctx, maxOnlineText, maxOnlineFontSize)) /
    2;

  drawFont(
    ctx,
    pingText,
    (width / leftRightRatio) * 2 + pingPaddingRight,
    dirtHeight + 100,
    pingFontSize,
    ping! < 100 ? "#55FF55" : ping! < 200 ? "#FFAA00" : "#FF5555"
  );

  drawFont(
    ctx,
    maxOnlineText,
    (width / leftRightRatio) * 2 + maxOnlinePaddingRight,
    dirtHeight + 100 + pingFontSize + margin - 10,
    maxOnlineFontSize
  );
}

function drawDescription(
  ctx: CanvasRenderingContext2D,
  descriptionText: string,
  hasBasicInfo: boolean
) {
  descriptionText = descriptionText.replace(/\n/g, "\n\n");

  const descriptionTextList = descriptionText.split("\n");
  let descriptionFontSize = 50;
  const descriptionPaddingTop = 50;
  let realWidth = descriptionTextList.reduce((max, text) => {
    return Math.max(max, measureText(ctx, text, descriptionFontSize));
  }, 0);
  while (realWidth > (width / leftRightRatio) * 1.4) {
    descriptionFontSize = Math.max(0, descriptionFontSize - 1);
    realWidth = descriptionTextList.reduce((max, text) => {
      return Math.max(max, measureText(ctx, text, descriptionFontSize));
    }, 0);
  }
  const realHeight = descriptionFontSize * descriptionTextList.length * 1.2;
  const descriptionPaddingLeft = (width - realWidth) / 2;

  drawEscapeFont(
    ctx,
    descriptionText,
    descriptionPaddingLeft,
    hasBasicInfo
      ? dirtHeight + descriptionPaddingTop
      : (height - realHeight) / 2,
    descriptionFontSize
  );

  return {
    paddingTop: descriptionPaddingTop,
    width: realWidth,
    height: realHeight,
  };
}

function drawBasicInfo(
  ctx: CanvasRenderingContext2D,
  basicInfo: string[],
  descriptionHeight: number,
  descriptionPaddingTop: number
) {
  let infoFontSize = 35;
  let infoMargin = 40;
  let infoMarginBottom = 30;
  let realWidth = basicInfo.reduce((max, info) => {
    return Math.max(max, measureText(ctx, info, infoFontSize));
  }, 0);
  while (realWidth > (width / leftRightRatio) * 1.3) {
    infoFontSize = Math.max(0, infoFontSize - 1);
    realWidth = basicInfo.reduce((max, info) => {
      return Math.max(max, measureText(ctx, info, infoFontSize));
    }, 0);
  }
  let realHeight =
    infoFontSize * basicInfo.length + infoMargin * (basicInfo.length - 1);
  while (
    realHeight >
    height -
      dirtHeight * 2 -
      descriptionHeight -
      descriptionPaddingTop -
      infoMarginBottom
  ) {
    infoMargin = Math.max(0, infoMargin - 1);
    infoMarginBottom = Math.max(0, infoMarginBottom - 1);
    realHeight =
      infoFontSize * 1.2 * basicInfo.length +
      infoMargin * (basicInfo.length - 1);
  }
  const infoTotalHeight =
    infoFontSize * basicInfo.length + infoMargin * (basicInfo.length - 1);
  const infoPaddingTop =
    (height -
      dirtHeight * 2 -
      descriptionHeight -
      descriptionPaddingTop -
      infoTotalHeight) /
      2 -
    infoMarginBottom;
  for (let i = 0; i < basicInfo.length; i++) {
    const info = basicInfo[i];
    drawEscapeFont(
      ctx,
      info,
      width / leftRightRatio + infoMargin,
      dirtHeight +
        descriptionHeight +
        descriptionPaddingTop +
        infoPaddingTop +
        i * (infoFontSize + infoMargin),
      infoFontSize
    );
  }
}

export default async function serverInfo(
  ctx: CanvasRenderingContext2D,
  serverName: string,
  basicInfo: string[],
  showUrl: boolean,
  host = "localhost",
  port = 25565
) {
  drawTitle(ctx, "Minecraft Server Info");
  try {
    const { status, latency } = await mc.lookup({
      host,
      port,
    });
    if (!status) {
      throw new Error();
    }
    const { favicon, description, players, version } = status!;

    await drawLeftLayout(
      ctx,
      host,
      port,
      serverName,
      favicon,
      version.name,
      showUrl
    );
    drawRightLayout(ctx, latency!, players.max, players.online);
    const descriptionText =
      typeof description === "string" ? description : description.extra[0].text;
    const { height: descriptionHeight, paddingTop: descriptionPaddingTop } =
      drawDescription(ctx, descriptionText, basicInfo.length > 0);

    drawBasicInfo(ctx, basicInfo, descriptionHeight, descriptionPaddingTop);
  } catch (e: any) {
    await drawLeftLayout(
      ctx,
      host,
      port,
      serverName,
      undefined,
      "Failed to get server info",
      true
    );
    drawRightLayout(ctx, Infinity, 0, 0, true);
  }
}
