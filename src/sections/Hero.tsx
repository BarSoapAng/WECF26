import { useState } from "react";
import styled from "styled-components";
import { HiMenu } from "react-icons/hi";
import {
  heroBackgroundTrees,
  heroFire,
  heroFloor,
  heroGoose,
  heroLeafAndStump,
  heroOrangeLeaf,
  heroSky,
  heroYellowLeaf,
} from "../assets/optimized";
import instagram from "../assets/header/instagram.svg";
import Sparkle from "../components/Sparkle";
import { mediaQueries } from "../lib/responsive";
import { BodyRegular2, colors, Header1, Header2 } from "../lib/styles";

const navigation = ["About", "Competition", "Sponsors", "Schedule"];

function NavigationLinks() {
  return (
    <>
      {navigation.map((label) => (
        <NavLink key={label} href={`#${label.toLowerCase()}`}>
          <BodyRegular2 as="span">{label}</BodyRegular2>
        </NavLink>
      ))}
      <NavLink
        href="https://www.instagram.com/uwengcomp/"
        aria-label="WEC on Instagram"
        target="_blank"
        rel="noreferrer"
      >
        <img src={instagram} width={24} height={24} alt="" />
      </NavLink>
      <NavLink href="#faq">
        <BodyRegular2 as="span">FAQ</BodyRegular2>
      </NavLink>
    </>
  );
}

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <HeroSection id="home" aria-label="Waterloo Engineering Competition">
      <Scene aria-hidden="true">
        <Artwork src={heroSky} $x={-133} $y={58} $width={1778} />
        <Artwork src={heroBackgroundTrees} $x={74} $y={115.62} $width={1457} />
        <Artwork src={heroLeafAndStump} $x={-2598} $y={-98} $width={6709} />
        <Artwork src={heroFloor} $x={-281} $y={672.9} $width={2074.55} />
        <Artwork src={heroYellowLeaf} $x={552.6} $y={765.51} $width={113.43} />
        <Artwork src={heroOrangeLeaf} $x={714} $y={320} $width={144} />
        <Artwork
          src={heroOrangeLeaf}
          $x={1316}
          $y={853}
          $width={162}
          $rotation={-35}
        />
        <Artwork src={heroYellowLeaf} $x={1284} $y={525} $width={110} />
        <Artwork src={heroFire} $x={473} $y={282} $width={771} />
        <Artwork src={heroYellowLeaf} $x={950} $y={772} $width={115} />
        <Artwork src={heroYellowLeaf} $x={26} $y={746} $width={160} />
        <Artwork src={heroOrangeLeaf} $x={1316} $y={257} $width={112} />
        <Artwork src={heroGoose} $x={998} $y={296} $width={485} />
        <Sparkle x={716.96} y={553.45} size={65.23} intensity={0} />
        <Sparkle x={1043} y={296} size={100.72} intensity={0} />
        <Sparkle x={1484} y={647} size={157.9} intensity={0} />
        <Sparkle x={608} y={347} size={157.9} intensity={0} />
        <Sparkle x={374.77} y={921.77} size={89.22} intensity={0} />
        <MobileSparkles>
          <Sparkle
            x="36%"
            y="12%"
            size={64}
            intensity={0}
            hideOnMobile={false}
          />
          <Sparkle
            x="87%"
            y="66%"
            size={64}
            intensity={0}
            hideOnMobile={false}
          />
        </MobileSparkles>
      </Scene>
      <Header>
        <DesktopNav aria-label="Main navigation">
          <NavigationLinks />
        </DesktopNav>
        <MenuButton
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <HiMenu size={38} aria-hidden="true" />
        </MenuButton>
        {menuOpen && (
          <MobileNav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            onClick={() => setMenuOpen(false)}
          >
            <NavigationLinks />
          </MobileNav>
        )}
      </Header>
      <HeroCopy>
        <Heading>
          <Header1>
            <Header1 as="span">W</Header1>aterloo
            <br />
            <Header1 as="span">E</Header1>ngineering
            <br />
            <Header1 as="span">C</Header1>ompetition
          </Header1>
        </Heading>
        <Date>
          <Header2 as="p">FALL 2026</Header2>
          <Header2 as="span" aria-hidden="true">
            ·
          </Header2>
          <Header2 as="p">November 21st 2026</Header2>
        </Date>
      </HeroCopy>
    </HeroSection>
  );
}

const HeroSection = styled.section`
  position: relative;
  isolation: isolate;
  width: 100%;
  height: 982px;
  overflow: hidden;
  background: #7b3830;
  ${mediaQueries.tablet} {
    height: calc(320px + min(62vw, 322.4px));
  }
`;

const Scene = styled.div`
  position: absolute;
  width: 1512px;
  height: 982px;
  left: calc(50% - 756px);
  top: 0;
  z-index: -1;
  pointer-events: none;
  & > img:nth-child(1) {
    clip-path: inset(0 0 300px 0);
  }
  & > img:nth-child(4) {
    mask-image: linear-gradient(#000 50%, transparent 100%);
  }
  & > img:nth-child(13) {
    height: 700px;
  }
  ${mediaQueries.tablet} {
    width: min(100%, 520px);
    height: min(80vw, 416px);
    left: 50%;
    top: 320px;
    transform: translateX(-50%);
    img {
      max-width: none;
    }
    & > img:nth-child(1) {
      left: -100%;
      top: -264px;
      width: 300%;
      height: calc(100% + 264px);
      object-fit: cover;
      clip-path: inset(0 0 min(32vw, 166.4px) 0);
    }
    & > img:nth-child(2) {
      left: -35%;
      top: -150px;
      width: 170%;
    }
    & > img:nth-child(3) {
      left: calc(50% - 3303px);
      top: -330px;
      width: 6336px;
      mask-image: linear-gradient(#000 290px, transparent 370px);
    }
    & > img:nth-child(4) {
      left: -50%;
      top: 55%;
      width: 200%;
      height: min(18vw, 93.6px);
    }
    & > img:nth-child(7),
    & > img:nth-child(8),
    & > img:nth-child(10),
    & > img:nth-child(11),
    & > img:nth-child(12) {
      display: none;
    }
    & > img:nth-child(5) {
      left: 14%;
      top: 58%;
      width: 12%;
    }
    & > img:nth-child(6) {
      left: 77%;
      top: -1%;
      width: 14%;
    }
    & > img:nth-child(9) {
      left: -3%;
      top: -8%;
      width: 78%;
    }
    & > img:nth-child(13) {
      left: 51%;
      top: 8%;
      width: 45%;
      height: auto;
    }
  }
`;

const Artwork = styled.img.attrs({ decoding: "async" })<{
  $x: number;
  $y: number;
  $width: number;
  $rotation?: number;
}>`
  position: absolute;
  display: block;
  max-width: none;
  left: ${({ $x }) => $x}px;
  top: ${({ $y }) => $y}px;
  width: ${({ $width }) => $width}px;
  height: auto;
  transform: rotate(${({ $rotation = 0 }) => $rotation}deg);
`;

const Header = styled.header`
  position: relative;
  margin: 0 auto;
  padding-top: 60px;
  width: calc(100% - 200px);
  max-width: 1312px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: ${colors.text.navbarBrown};
  ${mediaQueries.tablet} {
    width: calc(100% - 40px);
    padding-top: 18px;
  }
`;

const NavLink = styled.a`
  color: inherit;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  &:hover {
    text-decoration: underline;
    text-underline-offset: 5px;
  }
  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 6px;
  }
`;

const DesktopNav = styled.nav`
  display: flex;
  gap: 36px;
  align-items: center;
  margin-right: 24px;
  & > a {
    line-height: 27px;
  }
  ${mediaQueries.tablet} {
    display: none;
  }
`;

const MenuButton = styled.button`
  display: none;
  border: 0;
  background: transparent;
  padding: 0;
  width: 38px;
  height: 38px;
  cursor: pointer;
  color: inherit;
  ${mediaQueries.tablet} {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileNav = styled.nav`
  position: absolute;
  z-index: 5;
  top: 66px;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
  padding: 24px;
  background: #ffcc60;
  border-radius: 8px;
  box-shadow: 0 8px 24px #4d130d40;
`;

const HeroCopy = styled.div`
  position: relative;
  margin: 216px auto 0;
  width: calc(100% - 200px);
  max-width: 1312px;
  color: ${colors.text.lilac};
  ${mediaQueries.tablet} {
    width: calc(100% - 40px);
    max-width: 360px;
    margin-top: 0;
    color: ${colors.text.brown};
  }
`;

const Heading = styled.div`
  text-shadow: 0 0 33px #ffffff40;
  h1 {
    font-size: 74.104px;
    line-height: 100px;
    font-weight: 400;
  }
  h1 > span {
    font-size: 95.277px;
    line-height: 0;
  }
  ${mediaQueries.tablet} {
    text-shadow: none;
    text-align: center;
    h1 {
      font-size: clamp(32px, 10vw, 40px);
      line-height: clamp(40px, 12.25vw, 49px);
    }
    h1 > span {
      font-size: clamp(41.14px, 12.8575vw, 51.43px);
    }
  }
`;

const Date = styled.div`
  margin-top: 36px;
  display: flex;
  align-items: center;
  gap: 16px;
  white-space: nowrap;
  text-shadow:
    0 0 8.7px #000,
    0 0 33px #ffffff40;
  & > * {
    line-height: 48px;
    letter-spacing: -0.72px;
  }
  ${mediaQueries.tablet} {
    margin-top: 16px;
    text-shadow: none;
    justify-content: center;
    flex-wrap: nowrap;
    gap: clamp(4px, 1.5vw, 8px);
    & > * {
      flex-shrink: 0;
      font-size: clamp(14px, 4vw, 18px);
      line-height: 24px;
      letter-spacing: -0.36px;
    }
  }
`;

const MobileSparkles = styled.div`
  display: none;
  ${mediaQueries.tablet} {
    display: contents;
  }
`;
