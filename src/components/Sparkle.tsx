import type { CSSProperties } from "react"
import styled, { keyframes } from "styled-components"
import { decorativeSparkle } from "../assets"

type SparkleProps = {
  size?: CSSProperties["width"]
  x?: CSSProperties["left"]
  y?: CSSProperties["top"]
  /** Duration of one animation cycle in seconds. */
  speed?: number
}

function Sparkle({ size = 80, x = 0, y = 0, speed = 3 }: SparkleProps) {
  return (
    <Star
      src={decorativeSparkle}
      alt=""
      aria-hidden="true"
      draggable={false}
      style={{ width: size, left: x, top: y, animationDuration: `${Math.max(0.1, speed)}s` }}
    />
  )
}

export default Sparkle

const twinkle = keyframes`
  0%, 100% {
    opacity: 0.55;
    transform: translate(-50%, -50%) scale(0.75);
    filter: drop-shadow(0 0 2px #ffe88c);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.1);
    filter: drop-shadow(0 0 12px #ffe88c);
  }
`;

const Star = styled.img`
  position: absolute;
  height: auto;
  pointer-events: none;
  user-select: none;
  z-index: 2;
  animation: ${twinkle} 3s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: translate(-50%, -50%);
  }
`;
