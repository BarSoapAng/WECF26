import styled from "styled-components"
import { faqFooterFloor } from "./assets"
import { PageWrapper } from "./components"
import CompetitionStreams from "./sections/CompetitionStreams"
import FAQ from "./sections/FAQ"
import Footer from "./sections/Footer"
import Venue from "./sections/Venue"

function App() {
  return (
    <PageWrapper>
      <CompetitionStreams />
      {/* <VenueFAQFooterBackground> */}
        {/* <Venue />
        <FAQ />
        <Footer /> */}
      {/* </VenueFAQFooterBackground> */}
    </PageWrapper>
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
  }
`;
