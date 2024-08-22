import { createCanvas } from "canvas";
import * as fs from "fs/promises";

import drawBackground from "./partial/background.js";
import config from "./utils/config.js";
import playerInfo from "./api/playerInfo.js";
import drawCopyright from "./partial/copyright.js";
import serverInfo from "./api/serverInfo.js";

const { width, height } = config;

function buildCanvas() {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  ctx.imageSmoothingEnabled = false;
  ctx.textBaseline = "top";
  drawBackground(ctx);
  drawCopyright(ctx);
  return { canvas, ctx };
}
type WriteFileOptions = {
  type: "file";
  path: string;
};

type Base64Options = {
  type: "base64";
};

type Options = WriteFileOptions | Base64Options;

export async function drawPlayerInfo(
  playerName: string,
  basicInfo: string[],
  options: Options
) {
  const { canvas, ctx } = buildCanvas();
  await playerInfo(ctx, playerName, basicInfo);
  if (options.type === "file") {
    await fs.writeFile(options.path, canvas.toBuffer());
  } else {
    return canvas.toDataURL();
  }
}

export async function drawServerInfo(
  serverName: string,
  basicInfo: string[],
  ip: string,
  port: number,
  showUrl: boolean,
  options: Options
) {
  const { canvas, ctx } = buildCanvas();
  await serverInfo(ctx, serverName, basicInfo, showUrl, ip, port);
  if (options.type === "file") {
    await fs.writeFile(options.path, canvas.toBuffer());
  } else {
    return canvas.toDataURL();
  }
}
