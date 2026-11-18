import { useState } from "react"
import styled from "styled-components"
import { decorativeButton, decorativeWashiTape, venueBigGoose, venueGooseHonk1, venueGooseHonk2, venueGooseHonk3, venueMap } from "../assets"
import { ClickJitterImage, ContentWrapper, SectionWrapper, Sparkle } from "../components"
import { mediaQueries } from "../lib/responsive"
import { BodyRegular2, colors, Header1 } from "../lib/styles"

function Venue() {
  const honks = [venueGooseHonk1, venueGooseHonk2, venueGooseHonk3]
  const [isHonking, setIsHonking] = useState(false)
  const [gooseClicked, setGooseClicked] = useState(false)

  const honk = () => {
    setGooseClicked(true)
    if (isHonking) return

    setIsHonking(true)
    const audio = new Audio(honks[Math.floor(Math.random() * honks.length)])
    audio.addEventListener("ended", () => setIsHonking(false), { once: true })
    audio.addEventListener("error", () => setIsHonking(false), { once: true })
    void audio.play().catch(() => setIsHonking(false))
  }

  return (
    <Background id="venue" aria-labelledby="venue-title">
      <Content>
        <Header1 id="venue-title">Venue Map</Header1>
        <BodyRegular2>
          WEC will run exclusively within PSE, with competition rooms located on floors 1, 2, 4, and 5.
        </BodyRegular2>
        <MapFrame>
          <Goose
            $glowing={!gooseClicked}
            src={venueBigGoose}
            alt="Honk the goose"
            role="button"
            tabIndex={0}
            aria-disabled={isHonking}
            onClick={honk}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                honk()
              }
            }}
            loading="lazy"
            decoding="async"
          />
          <Map
            src={venueMap}
            alt="PSE venue map: Junior Design in 2409; Senior Design in 1427 with judging in 1327 and 1331; Consulting in 5343; Programming in 4043; Re-engineering in 5353; Bio-engineering in 4053."
            width={3514}
            height={2176}
            loading="lazy"
            decoding="async"
          />
          <Button src={decorativeButton} alt="" />
        </MapFrame>
        <Decorations aria-hidden="true">
          <TopTape src={decorativeWashiTape} alt="" />
          <BottomTape src={decorativeWashiTape} alt="" />
          <Sparkle size={120} x="109%" y="75%" speed={2.5} />
        </Decorations>
      </Content>
    </Background>
  )
}

export default Venue

const Background = styled(SectionWrapper)`
  padding-top: 96px;

  ${mediaQueries.tablet} {
    padding-top: 64px;
  }
`;

const Content = styled(ContentWrapper)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: calc(100% - 100px);
  max-width: 1112px;
  color: ${colors.text.black};
  text-align: center;
  z-index: auto;
  overflow: visible;

  ${mediaQueries.mediumTablet} {
    width: calc(100% - 60px);
  }
`;

const MapFrame = styled.div`
  position: relative;
  margin-top: 8px;
`;

const Map = styled.img`
  display: block;
  width: 100%;
  height: auto;
  pointer-events: none;
`;

const Button = styled(ClickJitterImage)`
  position: absolute;
  width: 14%;
  height: auto;
  left: -9.5%;
  bottom: -22.5%;
  z-index: 21;
  pointer-events: auto;

  ${mediaQueries.tablet} {
    display: none;
  }
`;

const Goose = styled.img<{ $glowing: boolean }>`
  position: absolute;
  max-width: 1500px;
  width: 150%;
  left: -118%;
  bottom: -172%;
  z-index: 1;
  pointer-events: auto;
  cursor: pointer;
  animation: ${({ $glowing }) => $glowing ? "gooseGlow 3.2s ease-in-out infinite" : "none"};
  @keyframes gooseGlow {
    0%, 100% { filter: drop-shadow(0 0 14px rgba(255, 255, 255, 0.45)); }
    50% { filter: drop-shadow(0 0 44px rgba(255, 255, 255, 1)); }
  }

  ${mediaQueries.tablet} {
    display: none;
  }
`;

const Decorations = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;

  ${mediaQueries.tablet} {
    display: none;
  }

`;

const TopTape = styled.img`
  position: absolute;
  width: 20%;
  height: auto;
  transform: rotate(90deg);
  top: -32px;
  right: -9%;
`;

const BottomTape = styled.img`
  position: absolute;
  width: 20%;
  height: auto;
  transform: rotate(83deg);
  bottom: -14px;
  left: -9%;
`;
