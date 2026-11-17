import { useLayoutEffect } from "react"
import styled from "styled-components"
import { BodyBold, BodyRegular2, colors } from "../lib/styles"
import { mediaQueries } from "../lib/responsive"

export default function PageLoader({ progress }: { progress: number }) {
  useLayoutEffect(() => {
    const loader = document.getElementById("loader-copy")!
    loader.querySelector("progress")!.value = progress
    loader.querySelector("[data-loader-percent]")!.textContent = `${progress}%`
  }, [progress])
  return null
}

export function LoaderContent() {
  return (
    <Content>
      <BodyBold>Getting the forest ready…</BodyBold>
      <Progress value={0} max={100} aria-label="Preparing the first screen" />
      <BodyRegular2 as="span" data-loader-percent aria-hidden="true">0%</BodyRegular2>
    </Content>
  )
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  color: ${colors.text.offwhite};
  width: 280px;
  max-width: 100%;

  ${mediaQueries.tablet} { width: 240px; }
`;

const Progress = styled.progress`
  appearance: none;
  width: 100%;
  height: 9px;
  border: 1px solid ${colors.text.offwhite};
  border-radius: 999px;
  overflow: hidden;
  background: ${colors.background.brown};
  color: ${colors.background.orange};

  &::-webkit-progress-bar { background: ${colors.background.brown}; }
  &::-webkit-progress-value { background: ${colors.background.orange}; }
  &::-moz-progress-bar { background: ${colors.background.orange}; }
`;
