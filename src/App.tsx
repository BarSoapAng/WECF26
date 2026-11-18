import { useLayoutEffect, useRef, useState } from "react"
import styled from "styled-components"
import { faqFooterFloor } from "./assets"
import { PageWrapper } from "./components"
import CompetitionStreams from "./sections/CompetitionStreams"
import Sponsors from "./sections/Sponsors"
import Schedule from "./sections/Schedule"
import Hero from "./sections/Hero"
import About from "./sections/About"
import FAQ from "./sections/FAQ"
import Footer from "./sections/Footer"
import Venue from "./sections/Venue"
import { mediaQueries } from "./lib/responsive"
import { deviceBreakpoints } from "./lib/responsive"
import PageLoader from "./components/PageLoader"

function App() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [sectionCount, setSectionCount] = useState(() => location.hash ? 6 : 1)
  const [ready, setReady] = useState(false)

  useLayoutEffect(() => {
    const page = pageRef.current!
    const resize = () => {
      const width = page.clientWidth
      page.style.setProperty("--desktop-scale", String(width > deviceBreakpoints.tablet ? Math.min(1, width / 1512) : 1))
      page.style.setProperty("--mobile-art-scale", String(Math.min(1, (width - 32) / 419)))
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(page)
    return () => observer.disconnect()
  }, [])

  return (
    <>
    <PageLoader pageRef={pageRef} sectionCount={sectionCount} setSectionCount={setSectionCount} ready={ready} setReady={setReady} />
    <PageContent $ready={ready} inert={!ready} aria-busy={!ready} onErrorCapture={event => {
      if (event.target instanceof HTMLImageElement) event.target.style.visibility = "hidden"
    }}>
    <PageWrapper ref={pageRef}>
      <Canvas>
      {[
      <Hero key="hero" />,
      <About key="about" />,
      <CompetitionStreams key="competition" />,
      <Sponsors key="sponsors" />,
      <Schedule key="schedule" />,
      <VenueFAQFooterBackground key="venue-faq-footer">
        <Venue />
        <FAQ />
        <Footer />
      </VenueFAQFooterBackground>,
      ].slice(0, sectionCount)}
      </Canvas>
    </PageWrapper>
    </PageContent>
    </>
  )
}

export default App

const VenueFAQFooterBackground = styled.div`
  position: relative;
  isolation: isolate;
  width: 100%;

  &::before {
    content: "";
    position: absolute;
    inset: min(32vw, 440px) 0 0;
    z-index: -1;
    background: url(${faqFooterFloor}) center / 270% 100% no-repeat;

    ${mediaQueries.tablet} {
      top: 470px;
    }
  }
`;

const Canvas = styled.main`
  width: max(100%, 1512px);
  zoom: var(--desktop-scale, 1);
  ${mediaQueries.tablet} { width: 100%; zoom: 1; }
`;

const PageContent = styled.div<{ $ready: boolean }>`
  visibility: ${({ $ready }) => $ready ? "visible" : "hidden"};
  ${({ $ready }) => !$ready && "&, & *, & *::before, & *::after { animation-play-state: paused !important; }"}
`;
