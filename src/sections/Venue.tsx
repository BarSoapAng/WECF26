import styled from "styled-components"
import { decorativeButton, decorativeWashiTape, venueBigGoose, venueMap } from "../assets"
import { ContentWrapper, SectionWrapper, Sparkle } from "../components"
import { mediaQueries } from "../lib/responsive"
import { BodyRegular2, colors, Header1 } from "../lib/styles"

function Venue() {
  return (
    <Background id="venue" aria-labelledby="venue-title">
      <Content>
        <Header1 id="venue-title">Venue Map</Header1>
        <BodyRegular2>
          WEC will run exclusively within PSE, with competition rooms located on floor 4.
        </BodyRegular2>
        <MapFrame>
          <Goose src={venueBigGoose} alt="" aria-hidden="true" loading="lazy" decoding="async" />
          <Map
            src={venueMap}
            alt="PSE floor 4 venue map: Bio-engineering in room 4043, Re-engineering in 4053, judges in 4417, Consulting in 4433, and Programming in 4437."
            width={1040}
            height={515}
            loading="lazy"
            decoding="async"
          />
          <Button src={decorativeButton} alt="" aria-hidden="true" />
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
  width: 68%;
  max-width: 1040px;
  color: ${colors.text.black};
  text-align: center;
  z-index: auto;
  overflow: visible;

  ${mediaQueries.mediumTablet} {
    width: calc(100% - 64px);
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
`;

const Button = styled.img`
  position: absolute;
  width: 14%;
  height: auto;
  left: -9.5%;
  bottom: -22.5%;
  z-index: 21;
  pointer-events: none;

  ${mediaQueries.tablet} {
    display: none;
  }
`;

const Goose = styled.img`
  position: absolute;
  max-width: 1500px;
  width: 150%;
  left: -118%;
  bottom: -172%;
  z-index: -1;
  pointer-events: none;

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
