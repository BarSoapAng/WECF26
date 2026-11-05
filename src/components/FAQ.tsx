import styled from "styled-components"
import { ContentWrapper } from "./base/Layout"
import Accordion from "./Accordion"
import Sparkle from "./Sparkle"
import { decorativeWashiTape, faqLeafOrange, faqYellowLeaf, faqNoise } from "../assets"
import { mediaQueries } from "../lib/responsive"
import { Header2, colors, Header1 } from "../lib/styles"

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
      <Decorations aria-hidden="true">
        <YellowLeaf src={faqYellowLeaf} alt="" />
        <OrangeLeaf src={faqLeafOrange} alt="" />
        <WashiTape src={decorativeWashiTape} alt="" />
        <Sparkle size={80} x="-8%" y="18%" speed={3.2} />
      </Decorations>
      <Sparkle size={80} x="90%" y="calc(100% + 24px)" speed={2.6} hideOnMobile={false} />
      <Header1 id="faq-title">Frequently Asked Questions</Header1>
      <div>
        <Accordion items={faqItems} />
      </div>
      <Header2>Sign up now!</Header2>
    </Questions>
  )
}

export default FAQ

const Questions = styled(ContentWrapper)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 74%;
  max-width: 1080px;
  padding: 64px;
  border-radius: 8px;
  background-color: #FFF2D5;
  box-shadow: -48px 42px 0 0 rgb(0 0 0 / 22%);
  color: ${colors.text.brown};
  overflow: visible;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    background: url(${faqNoise}) center / 2650px 2181px;
    mix-blend-mode: soft-light;
    opacity: 0.7;
    pointer-events: none;
  }

  > h1, > h2 {
    text-align: center;
  }

  ${mediaQueries.mediumTablet} {
    width: calc(100% - 64px);
    padding: 24px 16px;
  }
`;

const Decorations = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  user-select: none;

  ${mediaQueries.mediumTablet} {
    display: none;
  }
`;

const YellowLeaf = styled.img`
  position: absolute;
  width: 34%;
  height: auto;
  right: -24%;
  top: -32px;
`;

const OrangeLeaf = styled.img`
  position: absolute;
  width: 42%;
  height: auto;
  left: -22%;
  bottom: 0;
  transform: translateY(45%);
`;

const WashiTape = styled.img`
  position: absolute;
  width: 19%;
  height: auto;
  right: -7%;
  bottom: -2%;
  transform: rotate(8deg);
`;
