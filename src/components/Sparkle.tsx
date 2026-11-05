import type { CSSProperties } from "react"
import styled, { keyframes } from "styled-components"
import { decorativeSparkle } from "../assets"
import { mediaQueries } from "../lib/responsive"

type SparkleProps = {
  size?: CSSProperties["width"]
  x?: CSSProperties["left"]
  y?: CSSProperties["top"]
  /** Duration of one animation cycle in seconds. */
  speed?: number
  /** Animation strength: 0 is still, 1 is the default, and higher values are stronger. */
  intensity?: number
  zIndex?: CSSProperties["zIndex"]
  hideOnMobile?: boolean
}

function Sparkle({ size = 80, x = 0, y = 0, speed = 3, intensity = 1, zIndex = 2, hideOnMobile = true }: SparkleProps) {
  return (
    <Star
      $size={size}
      $intensity={intensity}
      $hideOnMobile={hideOnMobile}
      src={decorativeSparkle}
      alt=""
      aria-hidden="true"
      draggable={false}
      style={{ left: x, top: y, zIndex, animationDuration: `${Math.max(0.1, speed)}s` }}
    />
  )
}

export default Sparkle

const twinkle = keyframes`
  0%, 100% {
    opacity: max(0, calc(1 - 0.45 * var(--intensity)));
    transform: translate(-50%, -50%) scale(max(0.1, calc(1 - 0.25 * var(--intensity))));
    filter: drop-shadow(0 0 2px #ffe88c);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(calc(1 + 0.1 * var(--intensity)));
    filter: drop-shadow(0 0 calc(2px + 10px * var(--intensity)) #ffe88c);
  }
`;

const Star = styled.img<{ $size: CSSProperties["width"]; $intensity: number; $hideOnMobile: boolean }>`
  --sparkle-size: ${({ $size }) => typeof $size === "number" ? `${$size}px` : $size};
  --intensity: ${({ $intensity }) => Math.max(0, $intensity)};
  position: absolute;
  width: var(--sparkle-size);
  height: auto;
  pointer-events: none;
  user-select: none;
  animation: ${twinkle} 3s ease-in-out infinite;

  ${mediaQueries.tablet} {
    width: calc(var(--sparkle-size) * 0.5);
    display: ${({ $hideOnMobile }) => ($hideOnMobile ? "none" : "block")};
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: translate(-50%, -50%);
  }
`;
