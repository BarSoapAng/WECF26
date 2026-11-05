import styled from "styled-components"
import { FAQ, SectionWrapper } from "../components"
import { mediaQueries } from "../lib/responsive"

function FAQSection() {
  return (
    <Background id="faq" aria-labelledby="faq-title">
      <FAQ />
    </Background>
  )
}

export default FAQSection

const Background = styled(SectionWrapper)`
  padding: 96px 0 0;

  ${mediaQueries.tablet} {
    padding-top: 64px;
  }
`;
