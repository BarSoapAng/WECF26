import styled from "styled-components"
import { ContentWrapper, SectionWrapper } from "../components"
import { mediaQueries } from "../lib/responsive"
import { BodyRegular2, BodyBold, colors, FooterCaption, FooterTitle } from "../lib/styles"

function Footer() {
  return (
    <Background as="footer">
      <Content>
        <FooterTitle>WEC</FooterTitle>
        <FooterCaption>Waterloo Engineering Competition</FooterCaption>
        <Socials aria-label="Social and contact information">
          <BodyBold as="a" href="#">Instagram</BodyBold>
          <BodyBold as="a" href="#">LinkedIn</BodyBold>
          <BodyBold as="a" href="#">Email Us</BodyBold>
        </Socials>
        <BodyRegular2>
          © 2026 Waterloo Engineering Competition. Made with love by EngSoc 🍁
        </BodyRegular2>
      </Content>
    </Background>
  )
}

export default Footer

const Background = styled(SectionWrapper)`
  width: 100%;
  background-color: ${colors.background.orange};
`;

const Content = styled(ContentWrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 96px 24px 16px;
  color: ${colors.text.offwhite};
  text-align: center;

  ${mediaQueries.tablet} {
    padding-top: 64px;
  }
`;

const Socials = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 48px;

  ${mediaQueries.mediumTablet} {
    gap: 24px;
  }
`;
