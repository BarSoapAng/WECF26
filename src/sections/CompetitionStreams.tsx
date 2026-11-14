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
 * COMPETITION STREAMS SECTION
 *
 * Layout notes (desktop design is 1512px wide, content column is 1112px):
 * - Above `medium` (1024px), the five streams sit in a 3-column, 2-row grid that
 *   recreates the zigzag. Footprint trails live inside the stream they sit next to,
 *   so they move with the text instead of overlapping it when lines wrap.
 * - At `medium` and below, the streams stack in order (1 to 5) and the
 *   trails/leaves hide, matching the mobile design.
 * - `cqw` units are % of the section (or content) width, so the decorations scale
 *   with the screen like they do in Figma. 100cqw = the full width of the nearest
 *   parent with `container-type: inline-size`.
 * - When the streams scroll into view, the footprints appear one at a time,
 *   1 -> 2 -> 3 -> 4 -> 5, like the goose is walking (from the Figma spec notes).
 * - The leaves loop through a "falling" animation seen from above: they fade in,
 *   shrink and spin as they drop away, then fade out (also from the spec notes).
 *
 * File layout: data (text + footprint positions) -> React components -> styles.
 */

/* ---------- Text content ---------- */

// One competition stream. `description` is a list so a stream can have several paragraphs (stream 1 has two).
type Stream = {
  title: string
  description: string[]
}

// Copy taken from the Figma design, in stream order 1 to 5.
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

/* ---------- Footprint positions ---------- */

/*
 * Each trail image holds several footprints. A trail is drawn once per footprint,
 * each copy clipped to one print (top, right, bottom, left as % of the image), so
 * the prints can appear one by one without needing a separate file for each.
 * Prints are listed in walking order.
 *
 * These numbers were measured from the trail images themselves. If a trail image
 * is ever re-exported, they need to be measured again.
 */
type Inset = [number, number, number, number] // [top, right, bottom, left] in %

// Trail from stream 1 down-right towards stream 2.
const trail1To2: Inset[] = [
  [2.7, 64.8, 72.1, 10.3],
  [34.1, 71.9, 40.9, 3.6],
  [30.5, 38.9, 44.5, 36.4],
  [62.5, 43.1, 12.7, 32.5],
  [42.1, 9.5, 33.9, 67.5],
  [77.6, 0, 0, 78.9],
]
// Trail from stream 2 up-right towards stream 3.
const trail2To3: Inset[] = [
  [65.6, 63.2, 12.9, 6.3],
  [59.4, 25.0, 19.7, 44.9],
  [36.8, 44.5, 42.0, 25.0],
  [33.0, 7.5, 45.9, 62.4],
  [6.4, 7.3, 71.9, 62.0],
]
// Trail from stream 3 down towards stream 4.
const trail3To4: Inset[] = [
  [6.7, 41.2, 79.6, 41.9],
  [23.9, 23.9, 61.3, 58.9],
  [31.8, 40.2, 54.7, 43.0],
  [50.6, 26.2, 35.3, 57.0],
  [57.8, 45.9, 29.0, 37.6],
  [73.7, 55.2, 11.0, 27.2],
  [75.2, 33.0, 9.9, 49.7],
]
// Trail from stream 4 left towards stream 5.
const trail4To5: Inset[] = [
  [29.2, 9.5, 52.9, 74.2],
  [53.2, 12.8, 28.8, 70.0],
  [34.8, 30.8, 47.4, 52.4],
  [57.2, 41.6, 24.9, 41.3],
  [33.7, 58.4, 48.3, 24.2],
  [57.4, 66.5, 24.8, 16.7],
  [31.4, 82.0, 50.5, 1.2],
]

// Walking speed. Change these to make the goose walk faster or slower.
const STEP_SECONDS = 0.2 // time between footprints
const PAUSE_SECONDS = 0.3 // extra pause when the goose reaches a stream

type TrailProps = {
  src: string
  prints: Inset[]
  /** Position of this trail in the walk (0 = trail 1 -> 2). */
  order: number
  className?: string // lets styled(FootprintTrail) pass in its size/position styles
}

// All trails in walking order, used to work out when each trail should start.
const allTrails = [trail1To2, trail2To3, trail3To4, trail4To5]

/* ---------- Components ---------- */

// One footprint trail. Draws the same image once per footprint, each copy clipped
// to a single print and given its own animation delay.
function FootprintTrail({ src, prints, order, className }: TrailProps) {
  // How many footprints come before this trail, so its first print waits for them.
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
            // Show only this one print.
            clipPath: `inset(${top}% ${right}% ${bottom}% ${left}%)`,
            // Grow from the centre of the print, not the centre of the whole image.
            transformOrigin: `${left + (100 - left - right) / 2}% ${top + (100 - top - bottom) / 2}%`,
            // Wait for every earlier print, plus a short pause per finished trail.
            animationDelay: `${(stepsBefore + index) * STEP_SECONDS + order * PAUSE_SECONDS}s`,
          }}
        />
      ))}
    </TrailFrame>
  )
}

// One stream's text: the numbered circle, the title and the description paragraphs.
function StreamText({ stream, number }: { stream: Stream; number: number }) {
  return (
    <StreamBody>
      <StreamHeading>
        {/* aria-hidden because the <ol> already tells screen readers the number */}
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
  // It adds data-walking="true" to the list, which the Footprint styles react to.
  // It only runs once: the observer stops watching after the first time.
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
      {/* Decorative background layers: brick floor + yellow treetop bands */}
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

        {/*
          The streams are in order 1 to 5 here (so screen readers and mobile read
          them in order); the grid styles move them into the zigzag on desktop.
          Each trail sits inside the stream it is drawn next to.
        */}
        <StreamList ref={listRef}>
          {/* Top left. The 1 -> 2 trail sits below its text. */}
          <StreamOne>
            <WideText>
              <StreamText stream={design} number={1} />
            </WideText>
            <Trail1To2 src={competitionStreams1To2} prints={trail1To2} order={0} />
          </StreamOne>

          {/* Middle column. 2 -> 3 trail above the text, 4 -> 5 trail below it. */}
          <StreamTwo>
            <Trail2To3 src={competitionStreams2To3} prints={trail2To3} order={1} />
            <StreamText stream={consulting} number={2} />
            <Trail4To5 src={competitionStreams4To5} prints={trail4To5} order={3} />
          </StreamTwo>

          {/* Top right. The 3 -> 4 trail sits below its text. */}
          <StreamThree>
            <StreamText stream={programming} number={3} />
            <Trail3To4 src={competitionStreams3To4} prints={trail3To4} order={2} />
          </StreamThree>

          {/* Bottom right. */}
          <StreamFour>
            <StreamText stream={reEngineering} number={4} />
          </StreamFour>

          {/* Bottom left. */}
          <StreamFive>
            <StreamText stream={bioEngineering} number={5} />
          </StreamFive>
        </StreamList>

        {/* Decorative ginkgo leaves (desktop only) */}
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

// The whole section. `container-type` lets children size things with `cqw`
// (% of this section's width). The brown shows above the top treetop band,
// matching the "What is WEC?" section above.
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

// Holds the background layers behind the content. It covers the whole section,
// and the bands are allowed to stick out above and below it.
const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

/* Brick floor, starting 140px below the section top on the 1512px design. */
// repeat-y tiles it downwards if the section gets taller (e.g. narrow screens).
// On phones the bricks are drawn about 3x bigger, as in the mobile design.
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
 * The top band runs up into the "What is WEC?" section and the bottom band runs
 * down into Sponsors, as in the design.
 */
const Band = styled.img`
  position: absolute;
  left: -4.82cqw;
  width: 111.09cqw;
  max-width: none;
  height: auto;
  user-select: none;

  /* Phones: the mobile design uses a bigger, thicker band. */
  ${mediaQueries.mediumTablet} {
    left: -40.09cqw;
    width: 227.53cqw;
  }
`;

// Anchored to the section's top edge.
const TopBand = styled(Band)`
  top: -29.54cqw;

  ${mediaQueries.mediumTablet} {
    top: -86.12cqw;
  }
`;

// Anchored to the section's bottom edge, so it stays at the bottom however tall
// the section gets.
const BottomBand = styled(Band)`
  bottom: -39.24cqw;

  ${mediaQueries.mediumTablet} {
    bottom: -104.81cqw;
  }
`;

/* ---------- Content ---------- */

// Centred content column: 1112px wide on the full-size design, getting narrower
// on smaller screens. `container-type` here lets the leaves use `cqw` (% of this
// column's width). `overflow: visible` lets the leaves hang off the edges.
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

  /* Phones: 30px side margins, as in the mobile design. */
  ${mediaQueries.tablet} {
    width: min(600px, calc(100% - 60px));
    line-height: 1.31;
  }
`;

// Section title + intro paragraph.
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

// The title's text box is exactly as tall as the font size in Figma.
const Title = styled(Header1)`
  line-height: 1;
`;

/* ---------- Streams ---------- */

// Desktop: 3 equal columns (10px gap on the 1112px design). Each stream is
// placed into a column/row by the StreamOne...StreamFive styles below.
// At `medium` and below: one column, streams stacked in order, 36px apart.
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

    /* Undo the zigzag placement so the streams just stack. */
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

/*
 * Zigzag placement on desktop:
 *   column 1: stream 1 (row 1), stream 5 (row 2)
 *   column 2: stream 2 (spans both rows)
 *   column 3: stream 3 (row 1), stream 4 (row 2)
 * Margins nudge each stream up or down to match the design. Negative margins
 * pull a stream up so it overlaps the row above, like in Figma.
 */
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
// Below `large` the columns get narrower, so it stays inside its column to avoid
// running into stream 2.
const WideText = styled.div`
  position: relative;
  z-index: 1;
  width: 132.7%;

  ${mediaQueries.large} {
    width: 100%;
  }
`;

// Heading (circle + title) and description, stacked 8px apart.
const StreamBody = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// Desktop: number circle above the title. Stacked layout: circle beside the title.
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

// Orange number circle: 47px on desktop, 32px on phones.
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

// Description paragraphs. The gap between paragraphs is one blank line.
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

// Wrapper for one trail. Hidden on stacked/mobile layouts.
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

// One footprint "stepping" in: fades in while growing from 60% to full size.
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

// A single footprint (a clipped copy of the trail image, laid over the sizer).
// Hidden until the list gets data-walking="true", then it plays `stepIn` after
// its own delay (set in FootprintTrail).
const Footprint = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;

  [data-walking="true"] & {
    animation: ${stepIn} 0.35s ease-out both;
  }

  /* People who turn on "reduce motion" see every footprint straight away. */
  @media (prefers-reduced-motion: reduce) {
    opacity: 1;

    [data-walking="true"] & {
      animation: none;
    }
  }
`;

// Size and position of each trail, as % of its stream's column width.
// Negative margins let a trail tuck under/beside the text like in the design.
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

// Layer holding the four leaves, covering the content column. Desktop only.
const Leaves = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;

  ${mediaQueries.medium} {
    display: none;
  }
`;

/*
 * Falling leaf, seen from above: a leaf closer to you looks bigger, so it starts
 * slightly large, then shrinks and spins as it drops towards the floor and fades
 * out. Uses the separate `scale`/`rotate` properties so the `transform` flip on
 * the image stays untouched. `--spin` sets how far and which way each leaf turns.
 */
const fall = keyframes`
  0% {
    opacity: 0;
    scale: 1.15;
    rotate: 0deg;
  }
  15% {
    opacity: 1;
    scale: 1.08;
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    scale: 0.6;
    rotate: var(--spin);
  }
`;

// Shared leaf styles. The leaf images were exported upside down compared to the
// design, so `scaleY(-1)` flips them back.
const Leaf = styled.img`
  position: absolute;
  height: auto;
  max-width: none;
  user-select: none;
  transform: scaleY(-1);
  animation: ${fall} var(--duration) ease-in-out var(--delay) infinite both;

  /* People who turn on "reduce motion" see the leaves sitting still. */
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

/* Different speeds, directions and start points so the leaves never sync up. */
// --duration: how long one fall takes. --delay: negative, so each leaf is already
// part-way through its fall when the page loads. --spin: how far it turns.
// Leaves near the top are positioned from the top of the column, and leaves near
// the bottom from the bottom, so they stay beside the right streams.

// Orange leaf beside the intro paragraph, top right.
const TopRightLeaf = styled(Leaf)`
  left: 92.45cqw;
  top: 3.85cqw;
  width: 23.6cqw;
  --duration: 9s;
  --delay: -2s;
  --spin: 140deg;
`;

// Orange leaf on the left edge, beside the 1 -> 2 trail.
const LeftLeaf = styled(Leaf)`
  left: -19.18cqw;
  top: 53.53cqw;
  width: 23.59cqw;
  --duration: 11s;
  --delay: -7s;
  --spin: -120deg;
`;

// Yellow leaf on the right edge, beside stream 4.
const RightLeaf = styled(Leaf)`
  left: 95.99cqw;
  bottom: 21.89cqw;
  width: 22.49cqw;
  --duration: 10s;
  --delay: -4.5s;
  --spin: -150deg;
`;

// Yellow leaf at the bottom left, below stream 5.
const BottomLeftLeaf = styled(Leaf)`
  left: -14.6cqw;
  bottom: -10.58cqw;
  width: 20.16cqw;
  --duration: 8.5s;
  --delay: -1s;
  --spin: 110deg;
`;
