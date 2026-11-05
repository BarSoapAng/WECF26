import styled from "styled-components"
import { FiInstagram, FiLinkedin, FiMail } from "react-icons/fi"
import { ContentWrapper, SectionWrapper, Sparkle } from "../components"
import { decorativeButton, decorativeWashiTape } from "../assets"
import { mediaQueries } from "../lib/responsive"
import { BodyRegular2, BodyBold, FooterCaption, FooterTitle } from "../lib/styles"

function Footer() {
  return (
    <Background as="footer">
      <Content>
        <Wordmark>
          <Tape src={decorativeWashiTape} alt="" aria-hidden="true" />
          <FooterTitle>WEC</FooterTitle>
          <Button src={decorativeButton} alt="" aria-hidden="true" />
          <Sparkle size={140} x="-8%" y="100%" speed={3.5} intensity={0.8} hideOnMobile={false} />
        </Wordmark>
        <FooterCaption>Waterloo Engineering Competition</FooterCaption>
        <Socials aria-label="Social and contact information">
          <SocialLink href="https://www.instagram.com/uwengcomp/" aria-label="Instagram">
            <BodyBold as="span">Instagram</BodyBold>
            <FiInstagram size={24} aria-hidden="true" />
          </SocialLink>
          <SocialLink href="https://www.linkedin.com/company/uwengsoc" aria-label="LinkedIn">
            <BodyBold as="span">LinkedIn</BodyBold>
            <FiLinkedin size={24} aria-hidden="true" />
          </SocialLink>
          <SocialLink href="mailto:wec.a@engsoc.uwaterloo.ca" aria-label="Email Us">
            <BodyBold as="span">Email Us</BodyBold>
            <FiMail size={24} aria-hidden="true" />
          </SocialLink>
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
`;

const Content = styled(ContentWrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  padding: 96px 24px 20px;
  color: #FFFFFF;
  text-align: center;
  overflow: visible;

  ${mediaQueries.tablet} {
    padding-top: 64px;
  }
`;

const Wordmark = styled.div`
  position: relative;
  width: max-content;
  margin-bottom: 18px;
`;

const Tape = styled.img`
  position: absolute;
  width: 31%;
  left: -14%;
  top: -5%;
  pointer-events: none;

  ${mediaQueries.tablet} {
    display: none;
  }
`;

const Button = styled.img`
  position: absolute;
  width: 21%;
  right: -21%;
  bottom: -8%;
  pointer-events: none;

  ${mediaQueries.tablet} {
    display: none;
  }
`;

const Socials = styled.div`
  display: flex;
  margin-block: 36px;
  flex-wrap: wrap;
  justify-content: center;
  gap: 48px;

  a:hover {
    text-decoration: underline;
  }

  ${mediaQueries.mediumTablet} {
    gap: 24px;
  }
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;

  svg {
    display: none;
  }

  ${mediaQueries.tablet} {
    span {
      display: none;
    }

    svg {
      display: block;
    }
  }
`;
