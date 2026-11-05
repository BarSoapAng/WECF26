import styled from "styled-components"
import { ContentWrapper } from "./base/Layout"
import Accordion from "./Accordion"
import { mediaQueries } from "../lib/responsive"
import { BodyRegular1, colors, Header2 } from "../lib/styles"

const faqItems = [
  {
    title: "Who can join WEC?",
    content: "Any undergraduate Waterloo engineering student that is on term in Fall 2026 may join!",
  },
  {
    title: "Why join WEC?",
    content: "Placeholder: Put your engineering skills to the test, meet other students, and tackle a fun challenge with your team.",
  },
  {
    title: "Can I compete individually?",
    content: "Placeholder: Team requirements depend on the competition. More details about individual registration and team matching are coming soon.",
  },
  {
    title: "What should I bring to WEC?",
    content: "Placeholder: Bring your laptop, charger, student ID, and a reusable water bottle. Competition-specific supplies will be announced closer to the event.",
  },
  {
    title: "Who judges WEC?",
    content: "Placeholder: A panel of engineering professionals and community members will review the submissions. Meet the judges closer to the event!",
  },
]

function FAQ() {
  return (
    <Questions>
      <Header2 id="faq-title">Frequently Asked Questions</Header2>
      <Accordion items={faqItems} />
      <BodyRegular1>Sign up now!</BodyRegular1>
    </Questions>
  )
}

export default FAQ

const Questions = styled(ContentWrapper)`
  width: 74%;
  max-width: 1080px;
  padding: 48px 60px;
  color: ${colors.text.brown};

  > h1, > h2 {
    text-align: center;
  }

  > :last-child {
    margin-top: 24px;
  }

  ${mediaQueries.tablet} {
    padding: 32px;
  }

  ${mediaQueries.mediumTablet} {
    width: calc(100% - 32px);
    padding: 24px 16px;
  }
`;
