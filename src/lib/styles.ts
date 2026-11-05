import styled from "styled-components";
import { mediaQueries } from "./responsive";

export const colors = {
  text: {
    lilac: "#EADAFF",
    offwhite: "#F3E9FF",
    navbarBrown: "#4D130D",
    brown: "#520A02",
    black: "#0E2841"
  },
  background: {
    orange: "#FFA305",
    gray: "#F4F4F4",
    lightPurple: "#E6D3FF",
  }
};

export const Title = styled.h1`
  margin: 0px;
  font-family: "Morfe";
  font-size: 74px;
  letter-spacing: 0%;

  ${mediaQueries.tablet} {
    font-size: 40px;
  }
`;

export const Header1 = styled.h1`
  margin: 0px;
  font-family: "Morfe";
  font-size: 48px;

  ${mediaQueries.tablet} {
    font-size: 24px;
  }
`;

export const Header2 = styled.h2`
  margin: 0px;
  font-family: "Host Grotesk";
  font-size: 36px;
  font-weight: 400;
  letter-spacing: -2%;

  ${mediaQueries.tablet} {
    font-size: 18px;
  }
`;

export const BodyRegular1 = styled.p`
  padding: 0px;
  margin: 0px;
  font-family: "Host Grotesk";
  font-size: 22px;
  font-weight: 400;

  ${mediaQueries.tablet} {
    font-size: 16px;
  }
`;

export const BodyBold = styled.p`
  padding: 0px;
  margin: 0px;
  font-family: "Host Grotesk";
  font-size: 22px;
  font-weight: 600;

  ${mediaQueries.tablet} {
    font-size: 18px;
  }
`;

export const BodyRegular2 = styled.p`
  padding: 0px;
  margin: 0px;
  font-family: "Host Grotesk";
  font-size: 20px;
  font-weight: 400;

  ${mediaQueries.tablet} {
    font-size: 14px;
  }
`;

export const FooterTitle = styled.h1`
  margin: 0px;
  font-family: "Morfe";
  font-size: 300px;
  letter-spacing: -5%;
  line-height: 280px;

  ${mediaQueries.tablet} {
    font-size: 128px;
    line-height: 70.2%;
  }
`;

export const FooterCaption  = styled.h1`
  margin: 0px;
  font-family: "Morfe";
  font-size: 36px;
  letter-spacing: -2%;

  ${mediaQueries.tablet} {
    font-family: "Host Grotesk";
    font-size: 18px;
    font-weight: 400;
  }
`;