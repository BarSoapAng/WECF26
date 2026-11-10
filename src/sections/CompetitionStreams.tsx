import { useEffect, useRef } from "react"
import styled, { keyframes } from "styled-components"
import {
  competitionStreams1To2,
  competitionStreams2To3,
  competitionStreams3To4,
  competitionStreams4To5,
  competitionStreamsFloor,
  competitionStreamsOrangeLeaf1,
  competitionStreamsOrangeLeaf2,
  competitionStreamsTopviewTree,
  competitionStreamsYellowLeaf1,
  competitionStreamsYellowLeaf2,
} from "../assets"
import { ContentWrapper, SectionWrapper } from "../components"
import { mediaQueries } from "../lib/responsive"
import { BodyBold, BodyRegular1, BodyRegular2, colors, Header1 } from "../lib/styles"

/*
 * Layout notes (desktop design is 1512px wide, content column is 1112px):
 * - Above `medium`, the five streams sit in a 3-column, 2-row grid that recreates
 *   the zigzag. Footprint trails live inside the stream they sit next to, so they
 *   move with the text instead of overlapping it when lines wrap.
 * - At `medium` and below, the streams stack in order and the trails/leaves hide.
 * - `cqw` units are % of the section (or content) width, so the decorations scale
 *   with the screen like they do in Figma.
 * - When the streams scroll into view, the footprints appear one at a time,
 *   1 -> 2 -> 3 -> 4 -> 5, like the goose is walking (from the Figma spec notes).
 */

type Stream = {
  title: string
  description: string[]
}

const streams: Stream[] = [
  {
    title: "Junior/Senior Design",
    description: [
      "Teams are given a complex engineering problem and are required to design and build a working prototype. The teams will then present their solution and test their prototypes in front of a panel of judges. Junior Design is focused on mechanical design and implementation; Senior Design is focused on involving both mechanical and electrical components.",
      "While Junior Design is targeted towards students 2B and below, any student can choose to participate in Senior Design.",
    ],
  },
  {
    title: "Consulting",
    description: [
      "Teams must design a detailed solution to an interdisciplinary engineering problem and construct a report. The teams will then pitch their solution to the client (judges). The focus is to simulate real engineering consulting scenarios and address various stakeholder pain points.",
    ],
  },
  {
    title: "Programming",
    description: [
      "Teams must produce a software project to solve a posed problem. The teams will then present their solution to judges. The focus is on leveraging algorithms to build a thought out complete solution with the best application to real-world engineering settings.",
    ],
  },
  {
    title: "Re-Engineering",
    description: [
      "Teams must apply the re-engineering process to an existing technology or design in order to add new functionality or enhance its original functionality. The teams will construct a report and present their solution to judges. Re-engineering focuses on applying creativity, practicality, and ingenuity to real-world repurposing contexts.",
    ],
  },
  {
    title: "Bio-Engineering",
    description: [
      "Teams must solve a bio-engineering problem by applying bio-engineering techniques. Topics are typically related to healthcare, biological ecology, cellular engineering, etc. The teams will construct a report and present their solution to judges.",
    ],
  },
]

/*
 * Each trail image holds several footprints. A trail is drawn once per footprint,
 * each copy clipped to one print (top, right, bottom, left as % of the image), so
 * the prints can appear one by one without needing a separate file for each.
 * Prints are listed in walking order.
 */
type Inset = [number, number, number, number]

const trail1To2: Inset[] = [
  [2.7, 64.8, 72.1, 10.3],
  [34.1, 71.9, 40.9, 3.6],
  [30.5, 38.9, 44.5, 36.4],
  [62.5, 43.1, 12.7, 32.5],
  [42.1, 9.5, 33.9, 67.5],
  [77.6, 0, 0, 78.9],
]
const trail2To3: Inset[] = [
  [65.6, 63.2, 12.9, 6.3],
  [59.4, 25.0, 19.7, 44.9],
  [36.8, 44.5, 42.0, 25.0],
  [33.0, 7.5, 45.9, 62.4],
  [6.4, 7.3, 71.9, 62.0],
]
const trail3To4: Inset[] = [
  [6.7, 41.2, 79.6, 41.9],
  [23.9, 23.9, 61.3, 58.9],
  [31.8, 40.2, 54.7, 43.0],
  [50.6, 26.2, 35.3, 57.0],
  [57.8, 45.9, 29.0, 37.6],
  [73.7, 55.2, 11.0, 27.2],
  [75.2, 33.0, 9.9, 49.7],
]
const trail4To5: Inset[] = [
  [29.2, 9.5, 52.9, 74.2],
  [53.2, 12.8, 28.8, 70.0],
  [34.8, 30.8, 47.4, 52.4],
  [57.2, 41.6, 24.9, 41.3],
  [33.7, 58.4, 48.3, 24.2],
  [57.4, 66.5, 24.8, 16.7],
  [31.4, 82.0, 50.5, 1.2],
]

const STEP_SECONDS = 0.2 // time between footprints
const PAUSE_SECONDS = 0.3 // extra pause when the goose reaches a stream

type TrailProps = {
  src: string
  prints: Inset[]
  /** Position of this trail in the walk (0 = trail 1 -> 2). */
  order: number
  className?: string
}

const allTrails = [trail1To2, trail2To3, trail3To4, trail4To5]

function FootprintTrail({ src, prints, order, className }: TrailProps) {
  const stepsBefore = allTrails.slice(0, order).reduce((total, trail) => total + trail.length, 0)

  return (
    <TrailFrame className={className} aria-hidden="true">
      <TrailSizer src={src} alt="" />
      {prints.map(([top, right, bottom, left], index) => (
        <Footprint
          key={index}
          src={src}
          alt=""
          style={{
            clipPath: `inset(${top}% ${right}% ${bottom}% ${left}%)`,
            transformOrigin: `${left + (100 - left - right) / 2}% ${top + (100 - top - bottom) / 2}%`,
            animationDelay: `${(stepsBefore + index) * STEP_SECONDS + order * PAUSE_SECONDS}s`,
          }}
        />
      ))}
    </TrailFrame>
  )
}

function StreamText({ stream, number }: { stream: Stream; number: number }) {
  return (
    <StreamBody>
      <StreamHeading>
        <Badge aria-hidden="true">
          <BodyBold as="span">{number}</BodyBold>
        </Badge>
        <BodyBold as="h3">{stream.title}</BodyBold>
      </StreamHeading>
      <Description>
        {stream.description.map((paragraph) => (
          <BodyRegular2 key={paragraph}>{paragraph}</BodyRegular2>
        ))}
      </Description>
    </StreamBody>
  )
}

function CompetitionStreams() {
  const [design, consulting, programming, reEngineering, bioEngineering] = streams
  const listRef = useRef<HTMLOListElement>(null)

  // Start the walk the first time the streams are a quarter of the way on screen.
  useEffect(() => {
    const list = listRef.current
    if (!list) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          list.dataset.walking = "true"
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(list)
    return () => observer.disconnect()
  }, [])

  return (
    <Background id="competition-streams" aria-labelledby="competition-streams-title">
      <Backdrop aria-hidden="true">
        <Floor />
        <TopBand src={competitionStreamsTopviewTree} alt="" />
        <BottomBand src={competitionStreamsTopviewTree} alt="" />
      </Backdrop>

      <Content>
        <Intro>
          <Title as="h2" id="competition-streams-title">Competition Streams</Title>
          <BodyRegular1>
            Explore our competition streams and choose how you want to build and innovate. Each
            category offers a unique challenge designed to test real-world engineering skills.
          </BodyRegular1>
        </Intro>

        <StreamList ref={listRef}>
          <StreamOne>
            <WideText>
              <StreamText stream={design} number={1} />
            </WideText>
            <Trail1To2 src={competitionStreams1To2} prints={trail1To2} order={0} />
          </StreamOne>

          <StreamTwo>
            <Trail2To3 src={competitionStreams2To3} prints={trail2To3} order={1} />
            <StreamText stream={consulting} number={2} />
            <Trail4To5 src={competitionStreams4To5} prints={trail4To5} order={3} />
          </StreamTwo>

          <StreamThree>
            <StreamText stream={programming} number={3} />
            <Trail3To4 src={competitionStreams3To4} prints={trail3To4} order={2} />
          </StreamThree>

          <StreamFour>
            <StreamText stream={reEngineering} number={4} />
          </StreamFour>

          <StreamFive>
            <StreamText stream={bioEngineering} number={5} />
          </StreamFive>
        </StreamList>

        <Leaves aria-hidden="true">
          <TopRightLeaf src={competitionStreamsOrangeLeaf2} alt="" />
          <LeftLeaf src={competitionStreamsOrangeLeaf1} alt="" />
          <RightLeaf src={competitionStreamsYellowLeaf2} alt="" />
          <BottomLeftLeaf src={competitionStreamsYellowLeaf1} alt="" />
        </Leaves>
      </Content>
    </Background>
  )
}

export default CompetitionStreams

/* ---------- Section + background ---------- */

const Background = styled(SectionWrapper)`
  container-type: inline-size;
  padding: 60px 0;
  background: ${colors.background.brown};

  ${mediaQueries.medium} {
    padding: 48px 0;
  }

  ${mediaQueries.tablet} {
    padding: 18px 0;
  }
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

/* Brick floor, starting 140px below the section top on the 1512px design. */
const Floor = styled.div`
  position: absolute;
  inset: 9.26cqw 0 0;
  background: url(${competitionStreamsFloor}) center top / 113.15cqw auto repeat-y;

  ${mediaQueries.mediumTablet} {
    background-size: 370cqw auto;
  }
`;

/*
 * The yellow treetop bands. Same image, one hugging the top edge, one the bottom.
 * The image is cropped to the part of the band that can ever be on screen.
 */
const Band = styled.img`
  position: absolute;
  left: -4.82cqw;
  width: 111.09cqw;
  max-width: none;
  height: auto;
  user-select: none;

  ${mediaQueries.mediumTablet} {
    left: -40.09cqw;
    width: 227.53cqw;
  }
`;

const TopBand = styled(Band)`
  top: -29.54cqw;

  ${mediaQueries.mediumTablet} {
    top: -86.12cqw;
  }
`;

const BottomBand = styled(Band)`
  bottom: -39.24cqw;

  ${mediaQueries.mediumTablet} {
    bottom: -104.81cqw;
  }
`;

/* ---------- Content ---------- */

const Content = styled(ContentWrapper)`
  container-type: inline-size;
  width: min(1112px, 73.55%);
  color: ${colors.text.brown};
  line-height: 1.34; /* Figma's "auto" line height for Host Grotesk */
  overflow: visible;

  ${mediaQueries.large} {
    width: min(1112px, calc(100% - 128px));
  }

  ${mediaQueries.medium} {
    width: min(760px, calc(100% - 96px));
  }

  ${mediaQueries.tablet} {
    width: min(600px, calc(100% - 60px));
    line-height: 1.31;
  }
`;

const Intro = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 48px;

  ${mediaQueries.tablet} {
    margin-bottom: 36px;
  }
`;

const Title = styled(Header1)`
  line-height: 1;
`;

/* ---------- Streams ---------- */

const StreamList = styled.ol`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 0.9%;
  margin: 0;
  padding: 0;
  list-style: none;

  ${mediaQueries.medium} {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 36px;

    & > li {
      grid-column: 1;
      grid-row: auto;
      margin: 0;
    }
  }
`;

const StreamItem = styled.li`
  position: relative;
  margin: 0;
`;

/* Margins are % of the column width (364px on the full-size design). */
const StreamOne = styled(StreamItem)`
  grid-column: 1;
  grid-row: 1;
`;

const StreamTwo = styled(StreamItem)`
  grid-column: 2;
  grid-row: 1 / 3;
  margin-top: 47.8%;
`;

const StreamThree = styled(StreamItem)`
  grid-column: 3;
  grid-row: 1;
  margin-top: 24.7%;
`;

const StreamFour = styled(StreamItem)`
  grid-column: 3;
  grid-row: 2;
  margin-top: -35.2%;
`;

const StreamFive = styled(StreamItem)`
  grid-column: 1;
  grid-row: 2;
  margin-top: -20.9%;
`;

/* Stream 1's text runs wider than its column on the full-size design. */
const WideText = styled.div`
  position: relative;
  z-index: 1;
  width: 132.7%;

  ${mediaQueries.large} {
    width: 100%;
  }
`;

const StreamBody = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StreamHeading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  ${mediaQueries.medium} {
    flex-direction: row;
    align-items: center;
  }

  h3 {
    margin: 0;
  }
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 47px;
  height: 47px;
  border-radius: 50%;
  background: ${colors.background.orange};

  ${mediaQueries.tablet} {
    width: 32px;
    height: 32px;
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  ${mediaQueries.tablet} {
    gap: 21px;

    /* Mobile design uses 16px descriptions (Body 2 is 14px on mobile). */
    & > p {
      font-size: 16px;
    }
  }
`;

/* ---------- Footprint trails ----------
 * Widths and margins are % of the column width so the trails keep their place
 * next to the text as the columns shrink. Below `large` the text wraps more,
 * so the trails overlap the text less. */

const TrailFrame = styled.div`
  position: relative;
  pointer-events: none;
  user-select: none;

  ${mediaQueries.medium} {
    display: none;
  }
`;

/* Invisible copy of the image that gives the trail its size. */
const TrailSizer = styled.img`
  display: block;
  width: 100%;
  height: auto;
  visibility: hidden;
`;

const stepIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.6);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const Footprint = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;

  [data-walking="true"] & {
    animation: ${stepIn} 0.35s ease-out both;
  }

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;

    [data-walking="true"] & {
      animation: none;
    }
  }
`;

const Trail1To2 = styled(FootprintTrail)`
  width: 87.8%;
  margin: -3.8% 0 0 4.4%;

  ${mediaQueries.large} {
    margin-top: 2%;
  }
`;

const Trail2To3 = styled(FootprintTrail)`
  width: 69.8%;
  margin: 0 0 -32.4% 26%;

  ${mediaQueries.large} {
    margin-bottom: -22%;
  }
`;

const Trail4To5 = styled(FootprintTrail)`
  width: 118.9%;
  margin: -12.4% 0 0 -10.3%;
`;

const Trail3To4 = styled(FootprintTrail)`
  width: 121.8%;
  margin: -13.7% 0 0 2.9%;

  ${mediaQueries.large} {
    margin-top: 0;
  }
`;

/* ---------- Leaves (positions are % of the 1112px content width) ---------- */

const Leaves = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;

  ${mediaQueries.medium} {
    display: none;
  }
`;

const Leaf = styled.img`
  position: absolute;
  height: auto;
  max-width: none;
  user-select: none;
  transform: scaleY(-1);
`;

const TopRightLeaf = styled(Leaf)`
  left: 92.45cqw;
  top: 3.85cqw;
  width: 23.6cqw;
`;

const LeftLeaf = styled(Leaf)`
  left: -19.18cqw;
  top: 53.53cqw;
  width: 23.59cqw;
`;

const RightLeaf = styled(Leaf)`
  left: 95.99cqw;
  bottom: 21.89cqw;
  width: 22.49cqw;
`;

const BottomLeftLeaf = styled(Leaf)`
  left: -14.6cqw;
  bottom: -10.58cqw;
  width: 20.16cqw;
`;
