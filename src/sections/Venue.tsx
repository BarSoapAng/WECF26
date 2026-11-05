import styled from "styled-components"
import { decorativeButton, decorativeWashiTape, venueBigGoose, venueMap } from "../assets"
import { ContentWrapper, SectionWrapper, Sparkle } from "../components"
import { mediaQueries } from "../lib/responsive"
import { BodyRegular2, colors, Header2 } from "../lib/styles"

function Venue() {
  return (
    <Background id="venue" aria-labelledby="venue-title">
      <Goose src={venueBigGoose} alt="" aria-hidden="true" />
      <Content>
        <Header2 id="venue-title">Venue Map</Header2>
        <BodyRegular2>
          WEC will run exclusively within PSE, with competition rooms located on floor 4.
        </BodyRegular2>
        <MapFrame>
          <Map
            src={venueMap}
            alt="PSE floor 4 venue map: Bio-engineering in room 4043, Re-engineering in 4053, judges in 4417, Consulting in 4433, and Programming in 4437."
            width={1040}
            height={515}
          />
          <Button src={decorativeButton} alt="" aria-hidden="true" />
        </MapFrame>
        <Decorations aria-hidden="true">
          <img className="top-tape" src={decorativeWashiTape} alt="" />
          <img className="bottom-tape" src={decorativeWashiTape} alt="" />
          <Sparkle size={80} x="112%" y="75%" speed={3} />
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
  width: 15%;
  height: auto;
  left: -10%;
  bottom: -24%;
  z-index: 1;
  pointer-events: none;
`;

const Goose = styled.img`
  position: absolute;
  width: 72%;
  height: auto;
  left: -38%;
  top: -40%;
  z-index: 1;
  pointer-events: none;

  ${mediaQueries.mediumTablet} {
    top: -20%;
  }
`;

const Decorations = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;

  .top-tape, .bottom-tape {
    position: absolute;
    width: 20%;
    height: auto;
    transform: rotate(90deg);
  }

  .top-tape {
    top: -32px;
    right: -9%;
  }

  .bottom-tape {
    bottom: -14px;
    left: -9%;
  }
`;
