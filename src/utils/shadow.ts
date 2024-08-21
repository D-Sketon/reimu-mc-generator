import { type CanvasRenderingContext2D } from "canvas";

export default function drawShadow(
  ctx: CanvasRenderingContext2D,
  fn: Function,
  options: {
    shadowColor?: string;
    shadowBlur?: number;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
  } = {}
) {
  ctx.shadowColor = options.shadowColor || "rgba(0, 0, 0, 0.5)";
  ctx.shadowBlur = options.shadowBlur || 10;
  ctx.shadowOffsetX = options.shadowOffsetX || 5;
  ctx.shadowOffsetY = options.shadowOffsetY || 5;
  fn();
  ctx.shadowColor = "rgba(0, 0, 0, 0)";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}
