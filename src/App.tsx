import { useLayoutEffect, useRef } from "react"
import styled from "styled-components"
import PageWrapper from "./components/base/Layout/PageWrapper"
import { deviceBreakpoints, mediaQueries } from "./lib/responsive"
import Hero from "./sections/Hero"
import About from "./sections/About"

function App() {
  const pageRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const page = pageRef.current!
    const resize = () => {
      const width = page.clientWidth
      page.style.setProperty("--desktop-scale", String(width > deviceBreakpoints.tablet ? Math.min(1, width / 1512) : 1))
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(page)
    return () => observer.disconnect()
  }, [])

  return (
    <PageWrapper ref={pageRef}>
      <Canvas>
        <Hero />
        <About />
      </Canvas>
    </PageWrapper>
  )
}

export default App

const Canvas = styled.main`
  width: max(100%, 1512px);
  zoom: var(--desktop-scale, 1);
  ${mediaQueries.tablet} { width: 100%; zoom: 1; }
`;
