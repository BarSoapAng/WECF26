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
import { venueGooseHonk1, venueGooseHonk2, venueGooseHonk3 } from "../assets";
import instagram from "../assets/header/instagram.svg";
import FallingLeaf from "../components/FallingLeaf";
import Sparkle from "../components/Sparkle";
import { mediaQueries } from "../lib/responsive";
import { BodyBold, BodyRegular2, colors, Header1, Header2 } from "../lib/styles";

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
  const [isHonking, setIsHonking] = useState(false);
  const [gooseClicked, setGooseClicked] = useState(false);
  const honk = () => {
    setGooseClicked(true);
    if (isHonking) return;

    setIsHonking(true);
    const honks = [venueGooseHonk1, venueGooseHonk2, venueGooseHonk3];
    const audio = new Audio(honks[Math.floor(Math.random() * honks.length)]);
    audio.addEventListener("ended", () => setIsHonking(false), { once: true });
    audio.addEventListener("error", () => setIsHonking(false), { once: true });
    void audio.play().catch(() => setIsHonking(false));
  };
  return (
    <HeroSection id="home" aria-label="Waterloo Engineering Competition">
      <Scene>
        <Artwork src={heroSky} $x={-253} $y={58} $width={1778} />
        <Artwork src={heroBackgroundTrees} $x={70} $y={115.62} $width={1457} />
        <Artwork src={heroLeafAndStump} $x={-2598} $y={-98} $width={6909} />
        <Artwork src={heroFloor} $x={-281} $y={672.9} $width={2074.55} />
        <FallingLeaf src={heroYellowLeaf} x={552.6} y={765.51} width={113.43} delay="-2s" spin={-82} rotationDuration={3} fallDistance={450} />
        <FallingLeaf src={heroOrangeLeaf} x={714} y={320} width={144} delay="-6s" spin={96} rotationDuration={2} />
        <FallingLeaf
          src={heroOrangeLeaf}
          x={1316}
          y={853}
          width={162}
          rotation={35}
          delay="-4s"
          spin={-88}
          rotationDuration={1.6}
        />
        <FallingLeaf src={heroYellowLeaf} x={1284} y={525} width={110} delay="-8s" spin={100} rotationDuration={2.5} />
        <Fire src={heroFire} $x={473} $y={282} $width={771} $glowing={!gooseClicked} />
        <FallingLeaf src={heroYellowLeaf} x={950} y={772} width={115} delay="-1s" spin={84} rotationDuration={1.9} />
        <FallingLeaf src={heroYellowLeaf} x={26} y={746} width={160} delay="-5s" spin={-92} rotationDuration={2.4} />
        <FallingLeaf src={heroOrangeLeaf} x={1316} y={257} width={112} delay="-7s" spin={80} rotationDuration={1.3} />
        <HeroGoose
          $glowing={!gooseClicked}
          src={heroGoose}
          $x={998}
          $y={296}
          $width={485}
          alt="Honk the goose"
          role="button"
          tabIndex={0}
          aria-disabled={isHonking}
          onClick={honk}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              honk();
            }
          }}
        />
        <Sparkle x={716.96} y={553.45} size={65.23} intensity={0.7} speed={2.4} />
        <Sparkle x={1043} y={296} size={100.72} intensity={1.2} speed={3.6} />
        <Sparkle x={1484} y={647} size={157.9} intensity={0.9} speed={2.8} />
        <Sparkle x={608} y={347} size={157.9} intensity={1.4} speed={4.1} />
        <Sparkle x={374.77} y={921.77} size={89.22} intensity={0.6} speed={3.2} />
        <MobileSparkles>
          <Sparkle
            x= "47%"
            y="2%"
            size={110}
            intensity={1.1}
            speed={2.6}
            hideOnMobile={false}
          />
          <Sparkle
            x="38%"
            y="43%"
            size={140}
            zIndex={3}
            intensity={0.8}
            speed={3.8}
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
        <ApplyButton href="https://bit.ly/F26RegisterWEC" target="_blank" rel="noreferrer">
          <BodyBold as="span">Apply Now</BodyBold>
        </ApplyButton>
      </HeroCopy>
    </HeroSection>
  );
}

const HeroSection = styled.section`
  position: relative;
  z-index: 1;
  isolation: isolate;
  width: 100%;
  height: 982px;
  overflow: visible;
  background: #7b3830;
  ${mediaQueries.tablet} {
    height: calc(max(100dvh, 874px) + 50px);
    overflow-y: visible;
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
  & > img:nth-child(12) {
    z-index: 3;
  }
  & > img:nth-child(1) {
    height: 79%;
    left: min(-253px, calc(756px - 50vw));
    min-width: 150vw;
  }
  & > img:nth-child(4) {
    left: min(-281px, calc(756px - 50vw - 281px));
    width: max(2074.55px, calc(100vw + 562.55px));
    /* Keep the original ground height as it extends across wider screens. */
    height: calc(2074.55px * 552 / 3112);
  }
  & > img:nth-child(13) {
    height: 700px;
  }
  ${mediaQueries.tablet} {
    width: min(100vw, 402px);
    height: max(100dvh, 874px);
    left: 50%;
    top: 320px;
    transform: translateX(-50%);
    img {
      max-width: none;
    }
    & > img:nth-child(1) {
      left: -55%;
      top: -9.15%;
      width: 200%;
      height: 60%;
    }
    & > img:nth-child(2) {
      left: 35%;
      top: -5.72%;
      height: 50%;
      width: 200%;
    }
    & > img:nth-child(3) {
      left: -820.64%;
      top: -37%;
      height: 100%;
    }
    & > img:nth-child(4) {
      left: -50vw;
      top: 35%;
      width: max(200vw, 200%);
      height: 40%;
      mask-image: none;
      object-fit: fill;
    }
    & > img:nth-child(7),
    & > img:nth-child(8),
    & > img:nth-child(10),
    & > img:nth-child(11),
    & > img:nth-child(12) {
      display: none;
    }
    & > img:nth-child(5) {
      left: 44%;
      top: 48%;
      width: 30%;
      z-index: 100;
    }
    & > img:nth-child(6) {
      left: 60%;
      top: 1%;
      width: 40%;
    }
    & > img:nth-child(9) {
      left: -45%;
      top: 10%;
      width: 140%;
    }
    & > img:nth-child(13) {
      left: 50%;
      top: 4%;
      width: 103%;
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

const Fire = styled(Artwork)<{ $glowing: boolean }>`
  animation: ${({ $glowing }) => $glowing ? "fireGlow 3.2s ease-in-out infinite" : "none"};

  @keyframes fireGlow {
    0%, 100% { filter: drop-shadow(0 0 18px rgba(166, 85, 255, 0.65)); }
    50% { filter: drop-shadow(0 0 48px rgba(166, 85, 255, 1)); }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    filter: ${({ $glowing }) => $glowing ? "drop-shadow(0 0 16px rgba(166, 85, 255, 0.6))" : "none"};
  }
`;

const HeroGoose = styled(Artwork)<{ $glowing: boolean }>`
  z-index: 1;
  cursor: pointer;
  pointer-events: auto;
  animation: ${({ $glowing }) => $glowing ? "heroGooseGlow 3.2s ease-in-out infinite" : "none"};

  @keyframes heroGooseGlow {
    0%, 100% { filter: drop-shadow(0 0 14px rgba(255, 255, 255, 0.45)); }
    50% { filter: drop-shadow(0 0 44px rgba(255, 255, 255, 1)); }
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 4px;
  }
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
  pointer-events: none;
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

const ApplyButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  margin-top: 24px;
  padding: 14px 32px;
  border-radius: 9999px;
  background: ${colors.background.orange};
  color: ${colors.text.brown};
  text-decoration: none;
  pointer-events: auto;

  &:hover,
  &:active {
    background: ${colors.background.brown};
    color: ${colors.text.offwhite};
  }

  &:focus-visible {
    outline: 3px solid currentColor;
    outline-offset: 4px;
  }

  ${mediaQueries.tablet} {
    margin: 16px auto 0;
    padding: 12px 28px;
  }
`;

const MobileSparkles = styled.div`
  display: none;
  ${mediaQueries.tablet} {
    display: contents;
  }
`;
