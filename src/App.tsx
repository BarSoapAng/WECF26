import styled from "styled-components"
import { faqFooterFloor } from "./assets"
import { PageWrapper } from "./components"
import FAQ from "./sections/FAQ"
import Footer from "./sections/Footer"

function App() {
  return (
    <PageWrapper>
      <FAQFooterBackground>
        <FAQ />
        <Footer />
      </FAQFooterBackground>
    </PageWrapper>
  )
}

export default App

const FAQFooterBackground = styled.div`
  width: 100%;
  background: #0d4147 url(${faqFooterFloor}) center / cover no-repeat;
`;
