import { useState, type ImgHTMLAttributes } from "react"
import styled, { keyframes } from "styled-components"

function ClickJitterImage({ className, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const [jittering, setJittering] = useState(false)

  return (
    <Image
      {...props}
      className={`${className ?? ""}${jittering ? " is-jittering" : ""}`}
      role="button"
      tabIndex={0}
      aria-label="Shake decoration"
      onClick={(event) => {
        props.onClick?.(event)
        setJittering(false)
        requestAnimationFrame(() => setJittering(true))
      }}
      onKeyDown={(event) => {
        props.onKeyDown?.(event)
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          setJittering(false)
          requestAnimationFrame(() => setJittering(true))
        }
      }}
      onAnimationEnd={(event) => {
        props.onAnimationEnd?.(event)
        setJittering(false)
      }}
      draggable={false}
    />
  )
}

export default ClickJitterImage

const jitter = keyframes`
  0%, 100% { rotate: 0deg; }
  20%, 60% { rotate: -7deg; }
  40%, 80% { rotate: 7deg; }
`;

const Image = styled.img`
  cursor: pointer;
  transform-origin: center;

  &.is-jittering {
    animation: ${jitter} 360ms ease-in-out;
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    &.is-jittering { animation: none; }
  }
`;
