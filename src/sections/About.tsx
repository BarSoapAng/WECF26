import styled from "styled-components"
import { aboutImg1, aboutImg2, aboutImg3 } from "../assets"
import { aboutOrangeLeaf, aboutYellowLeaf, decorativeButton, decorativeWashiTape } from "../assets/optimized"
import Sparkle from "../components/Sparkle"
import { mediaQueries } from "../lib/responsive"
import { BodyRegular1, colors, Header1 } from "../lib/styles"

export default function About() {
  return (
    <Background id="about" aria-labelledby="about-title">
      <Content>
        <Copy>
          <Header1>What is WEC?</Header1>
          <BodyRegular1>The Waterloo Engineering Competition (WEC) is a design competition run in collaboration with the Engineering Society and Sandford Fleming Foundation (SSF).</BodyRegular1>
          <BodyRegular1>The competition covers topics like design, prototyping, circuits, programming, consulting, and much more!</BodyRegular1>
          <BodyRegular1>The top teams from each competition will have the opportunity to represent Waterloo at the Ontario Engineering Competition (OEC), and compete for a chance to advance to the nationals at the Canadian Engineering Competition (CEC).</BodyRegular1>
          <BodyRegular1>Each category’s top two place winners will also get prizes sponsored by SFF, the Faculty of Engineering, and EngSoc.</BodyRegular1>
        </Copy>
        <Collage aria-label="Photos from the Waterloo Engineering Competition">
          <Photo src={aboutImg1} alt="Waterloo Engineering Competition" $x={0} $y={28} $rotation={-7.5} />
          <Photo src={aboutImg2} alt="Waterloo Engineering Competition" $x={103} $y={205} $rotation={0} />
          <Photo src={aboutImg3} alt="Waterloo Engineering Competition" $x={38} $y={382} $rotation={7.5} />
          <OrangeLeaf src={aboutOrangeLeaf} alt="" />
          <YellowLeaf src={aboutYellowLeaf} alt="" />
          <Tape src={decorativeWashiTape} alt="" />
          <Button src={decorativeButton} alt="" />
          <Sparkle size={157.9} x={0} y={58} intensity={0.8} speed={2.5} />
        </Collage>
      </Content>
      <StarTurn $x="94.8%" $y={406} $rotation={25}><Sparkle size={210} intensity={1.3} speed={3.8} /></StarTurn>
      <StarTurn $x="53.5%" $y={812} $rotation={70}><Sparkle size={190.5} intensity={0.6} speed={2.9} /></StarTurn>
    </Background>
  )
}

const Background = styled.section`
  position: relative;
  width: 100%;
  min-height: 939.491px;
  overflow: hidden;
  background: linear-gradient(#7b3830, #7b3830) 0 -4px / 100% calc(100% + 4px) no-repeat;
  color: ${colors.text.offwhite};
  ${mediaQueries.tablet} {
    min-height: auto;
    margin-top: -12px;
    padding-bottom: 0;
    margin-bottom: -48px;
  }
`;

const Content = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.062fr);
  gap: 48px;
  width: calc(100% - 100px);
  max-width: 1112px;
  margin: 0 auto;
  padding-top: 60px;
  ${mediaQueries.tablet} {
    width: calc(100% - 60px);
    padding-top: 42px;
    display: flex;
    flex-direction: column;
    gap: calc(8px + 28px * var(--mobile-art-scale, 1));
  }
`;

const Copy = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 29px;
  p { line-height: 29px; }
  ${mediaQueries.tablet} {
    gap: 21px;
    p { line-height: 21px; }
  }
`;

const AboutHeading = styled.div`
  // margin-bottom: -21px;
  & > :first-child { display: none; }
  ${mediaQueries.tablet} {
    // margin-bottom: -13px;
    & > :first-child { display: block; }
    & > :last-child { display: none; }
  }
`;

const Collage = styled.div`
  position: relative;
  z-index: 1;
  width: 548px;
  height: 758.491px;
  ${mediaQueries.tablet} {
    width: 342px;
    height: 487.95px;
    zoom: var(--mobile-art-scale, 1);
    align-self: center;
  }
`;

const Photo = styled.img<{ $x: number; $y: number; $rotation: number }>`
  position: absolute;
  left: ${({ $x }) => $x}px;
  top: ${({ $y }) => $y}px;
  box-sizing: content-box;
  width: 366px;
  height: 169px;
  padding: 23px 24px 56px;
  background: white;
  object-fit: cover;
  transform: rotate(${({ $rotation }) => $rotation}deg);
  ${mediaQueries.tablet} {
    left: calc(${({ $x }) => $x}px * 0.64);
    top: calc(${({ $y }) => $y}px * 0.64);
    width: 235px;
    height: 108px;
    padding: 15px 15px 36px;
  }
`;

const OrangeLeaf = styled.img`
  position: absolute;
  z-index: 1;
  width: 217.31px;
  /* The 48px column gap leaves 8px between this leaf and the copy. */
  left: -40px;
  top: 321px;
  ${mediaQueries.tablet} { width: 120px; left: -6px; top: 124px; }
`;

const YellowLeaf = styled.img`
  position: absolute;
  z-index: 1;
  width: 275.58px;
  left: 366px;
  top: -41px;
  /* Keep 8px clear of the copy across the 36px mobile row gap. */
  ${mediaQueries.tablet} { width: 140px; left: 232px; top: -28px; }
`;

const Tape = styled.img`
  position: absolute;
  z-index: 1;
  width: 206px;
  left: -84px;
  top: -34px;
  ${mediaQueries.tablet} { width: 101px; left: -47px; top: -35px; }
`;

const Button = styled.img`
  position: absolute;
  z-index: 1;
  width: 162.08px;
  left: 414px;
  top: 432.66px;
  ${mediaQueries.tablet} { width: 82px; left: 278px; top: 260px; }
`;

const StarTurn = styled.div<{ $x: string; $y: number; $rotation: number }>`
  position: absolute;
  z-index: 1;
  left: ${({ $x }) => $x};
  top: ${({ $y }) => $y}px;
  transform: rotate(${({ $rotation }) => $rotation}deg);
  img { max-width: none; }
`;
