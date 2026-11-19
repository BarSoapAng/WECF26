import styled from "styled-components"
import { ContentWrapper } from "./base/Layout"
import Accordion from "./Accordion"
import Sparkle from "./Sparkle"
import ClickJitterImage from "./ClickJitterImage"
import { decorativeButton, decorativeWashiTape, faqLeafOrange, faqYellowLeaf, faqNoise } from "../assets"
import { mediaQueries } from "../lib/responsive"
import { Header2, colors, Header1 } from "../lib/styles"

const faqItems = [
  {
    title: "Who can join WEC?",
    content: "Any undergrad Waterloo engineering student who’s on term in Fall 2026 is welcome to join us! No experience needed, just bring your curiosity.",
  },
  {
    title: "Why join WEC?",
    content: "It’s a great chance to team up with friends and work on a real engineering problem you won’t see in class. You’ll get to build something you’re proud of, hear feedback from people who work in the field, and meet other engineers from different programs and years at the event. And it’s a really fun way to spend a day!",
  },
  {
    title: "Can I compete individually?",
    content: "WEC is a team competition, so you’ll sign up with your team before the event. Grab some friends or classmates, and you’re all set! You can find team sizes and sign-up steps on the registration page, and we’re happy to help if you have questions.",
  },
  {
    title: "What should I bring to WEC?",
    content: "Just bring your laptop, charger, WatCard, and a water bottle, and you’re good to go. If your competition needs anything else, we’ll let you know ahead of time so you’re never left guessing.",
  },
  {
    title: "Who judges WEC?",
    content: "Our judges are Waterloo professors and faculty members who know engineering inside and out. They’ll look through your team’s submission and give you friendly, useful feedback. We can’t wait for you to show them what you’ve built!",
  },
]

function FAQ() {
  return (
    <Questions>
      <Decorations>
        <YellowLeaf src={faqYellowLeaf} alt="" />
        <OrangeLeaf src={faqLeafOrange} alt="" />
        <WashiTape src={decorativeWashiTape} alt="" />
        <Sparkle size={90} x="-9%" y="11.5%" speed={3} intensity={1.3} />
      </Decorations>
      <MobileDecorations>
        <MobileTape src={decorativeWashiTape} alt="" />
        <MobileButton src={decorativeButton} alt="" />
      </MobileDecorations>
      <Sparkle size={100} x="88%" y="calc(100% + 28px)" speed={2.6} hideOnMobile={false} />
      <Header1 id="faq-title">Frequently Asked Questions</Header1>
      <div>
        <Accordion items={faqItems} />
      </div>
      <SignupLink href="https://bit.ly/F26RegisterWEC" target="_blank" rel="noreferrer">
        <Header2 as="span">See you there!</Header2>
      </SignupLink>
    </Questions>
  )
}

export default FAQ

const Questions = styled(ContentWrapper)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: calc(100% - 100px);
  max-width: 1112px;
  padding: 60px;
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

  ${mediaQueries.tablet} {
    gap: 24px;
    box-shadow: -16px 16px 0 0 rgb(0 0 0 / 22%);
  }

  ${mediaQueries.mediumTablet} {
    width: calc(100% - 60px);
    padding: 24px 16px;
  }
`;

const SignupLink = styled.a`
  align-self: center;
  display: inline-flex;
  align-items: center;
  color: ${colors.text.brown};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    text-underline-offset: 5px;
  }

  &:focus-visible {
    outline: 3px solid currentColor;
    outline-offset: 4px;
  }
`;

const Decorations = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  user-select: none;

  ${mediaQueries.tablet} {
    display: none;
  }
`;

const MobileDecorations = styled(Decorations)`
  display: none;

  ${mediaQueries.tablet} {
    display: block;
  }
`;

const MobileTape = styled.img`
  position: absolute;
  width: 32%;
  max-width: 110px;
  right: -7%;
  top: -24px;
  transform: rotate(90deg);
`;

const MobileButton = styled(ClickJitterImage)`
  position: absolute;
  width: 24%;
  max-width: 80px;
  left: -6%;
  bottom: 0;
  transform: translateY(65%);
  pointer-events: auto;
`;

const YellowLeaf = styled(ClickJitterImage)`
  position: absolute;
  width: 34%;
  right: -22.5%;
  top: max(-14vw, -21%);
  pointer-events: auto;
`;

const OrangeLeaf = styled(ClickJitterImage)`
  position: absolute;
  width: 55%;
  left: -29%;
  bottom: 2%;
  transform: translateY(45%);
  pointer-events: auto;
`;

const WashiTape = styled.img`
  position: absolute;
  width: 19%;
  height: auto;
  right: -6%;
  bottom: -2.3%;
  transform: rotate(7deg);
`;
