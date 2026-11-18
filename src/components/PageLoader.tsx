import { useEffect, useState, type Dispatch, type RefObject, type SetStateAction } from "react"
import styled, { keyframes } from "styled-components"
import { BodyBold, BodyRegular2, colors } from "../lib/styles"
import { mediaQueries } from "../lib/responsive"
import { preparePage } from "../lib/preparePage"
import loaderLeaf from "../assets/optimized/loader-leaf.webp"

type Props = {
  pageRef: RefObject<HTMLDivElement | null>
  sectionCount: number
  setSectionCount: Dispatch<SetStateAction<number>>
  ready: boolean
  setReady: Dispatch<SetStateAction<boolean>>
}

export default function PageLoader({ pageRef, sectionCount, setSectionCount, ready, setReady }: Props) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const page = pageRef.current
    if (!page) return
    if (ready) {
      void preparePage(page)
      return
    }
    let cancelled = false
    void preparePage(page, value => {
      if (!cancelled) setProgress(previous => Math.max(previous, Math.min(99, value)))
    }).then(() => {
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (cancelled) return
        if (page.getBoundingClientRect().bottom < innerHeight && sectionCount < 6) {
          setSectionCount(sectionCount + 1)
          return
        }
        const target = document.getElementById(location.hash.slice(1))
        if (target) target.scrollIntoView({ behavior: "instant" })
        else window.scrollTo({ top: 0, left: 0, behavior: "instant" })
        setProgress(100)
        setReady(true)
        setSectionCount(6)
      }))
    })
    return () => { cancelled = true }
  }, [pageRef, ready, sectionCount, setReady, setSectionCount])

  return (
    <Overlay $ready={ready} role="status" aria-live="polite" aria-label="Loading Waterloo Engineering Competition" aria-hidden={ready}>
      <Content>
        <Leaf src={loaderLeaf} alt="" />
        <BodyBold>Getting the forest ready…</BodyBold>
        <Progress value={progress} max={100} aria-label="Preparing the first screen" />
        <BodyRegular2 as="span" aria-hidden="true">{progress}%</BodyRegular2>
      </Content>
    </Overlay>
  )
}

const fall = keyframes`
  0% { opacity: 0; transform: translate(-16px, -24px) rotate(-20deg); }
  15%, 80% { opacity: 1; }
  50% { transform: translate(16px, 0) rotate(12deg); }
  100% { opacity: 0; transform: translate(0, 24px) rotate(44deg); }
`
const Overlay = styled.div<{ $ready: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 2147483647;
  display: grid;
  place-items: center;
  background: ${colors.text.navbarBrown};
  opacity: ${({ $ready }) => $ready ? 0 : 1};
  visibility: ${({ $ready }) => $ready ? "hidden" : "visible"};
  pointer-events: ${({ $ready }) => $ready ? "none" : "auto"};
  transition: opacity 360ms ease-out, visibility 0s 360ms;
  @media (prefers-reduced-motion: reduce) { transition: none; }
`
const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  color: ${colors.text.offwhite};
  width: 280px;
  max-width: calc(100% - 48px);
  text-align: center;
  ${mediaQueries.tablet} { width: 240px; }
`
const Leaf = styled.img`
  width: 96px;
  height: 104px;
  object-fit: contain;
  margin-bottom: 34px;
  animation: ${fall} 2.4s ease-in-out infinite;
  @media (prefers-reduced-motion: reduce) { animation: none; }
`
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
`
