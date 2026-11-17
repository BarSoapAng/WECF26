import { useEffect, useLayoutEffect, useRef, useState } from "react"
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
import { preparePage } from "./lib/preparePage"
import PageLoader from "./components/PageLoader"

function App() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [sectionCount, setSectionCount] = useState(() => location.hash ? 6 : 1)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const page = pageRef.current!
    if (document.documentElement.dataset.pageReady) {
      // Start and decode every remaining asset immediately after the first paint.
      void preparePage(page)
      return
    }
    let cancelled = false
    void preparePage(page, value => {
      if (!cancelled) setProgress(previous => Math.max(previous, Math.min(99, value)))
    }).then(() => {
      if (cancelled) return
      document.documentElement.dataset.pageLayout = "true"
      // Let font metrics and responsive layout settle before uncovering the page.
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (cancelled) return
        // Tall windows can show more than the hero: prepare that content as well.
        if (page.getBoundingClientRect().bottom < innerHeight && sectionCount < 6) {
          setSectionCount(sectionCount + 1)
          return
        }
        const target = document.getElementById(location.hash.slice(1))
        if (target) target.scrollIntoView({ behavior: "instant" })
        else window.scrollTo({ top: 0, left: 0, behavior: "instant" })
        const root = document.getElementById("root")!
        root.inert = false
        root.removeAttribute("aria-busy")
        setProgress(100)
        document.documentElement.dataset.pageReady = "true"
        requestAnimationFrame(() => {
          if (!cancelled) setSectionCount(6)
        })
      }))
    })
    return () => { cancelled = true }
  }, [sectionCount])

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
    <PageLoader progress={progress} />
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
