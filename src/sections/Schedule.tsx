import styled, { keyframes } from "styled-components"
import { decorativeWashiTape, scheduleSun, scheduleSunray } from "../assets"
import { ContentWrapper, SectionWrapper } from "../components"
import { mediaQueries } from "../lib/responsive"
import { BodyBold, BodyRegular1, colors, Header1 } from "../lib/styles"

/*
 * Day of Schedule section
 *
 * Desktop: the big table with the sun, the light rays, and two pieces of washi tape.
 * Mobile: same table but smaller text, no tape (that's how the mobile Figma has it).
 *
 * A couple of things that might look weird at first:
 * - The sky background is bigger than the section on purpose. It goes down behind
 *   the top of Venue, because in the design the sky fills that whole area.
 * - The sun, rays and tape use "cqw" for their sizes. 1cqw = 1% of the table's
 *   width, so they shrink and grow with the table and stay in the same spot.
 * - From the spec doc: the sun slowly glows bigger and smaller, and the rays
 *   glow and sway side to side.
 */

// Lunch shares its event and location cells across two time rows.
type ScheduleItem = {
  time: string
  events?: string[]
  location?: string
  rowSpan?: number
}

// Schedule for Saturday, November 21st 2026. To change it, edit this list.
// The table updates itself.
const schedule: ScheduleItem[] = [
  { time: "8:00 AM", events: ["Registration"], location: "E7 Event Space" },
  { time: "8:45 AM", events: ["Opening Ceremonies"], location: "E7 Event Space" },
  {
    time: "9:00 AM",
    events: ["Transition to Rooms", "Competition Introduction & Questions Period"],
    location: "Various",
  },
  { time: "9:15 AM", events: ["Competition Time Start"], location: "Various" },
  { time: "12:00 PM", events: ["Lunch"], location: "E7 Event Space", rowSpan: 2 },
  { time: "1:00 PM" },
  { time: "4:00 PM", events: ["Competition Time End"], location: "Various" },
  { time: "4:30 PM", events: ["Dinner Start & Judge Start"], location: "E7 Event Space" },
  { time: "5:30 PM", events: ["Dinner End"], location: "E7 Event Space" },
  { time: "7:30 PM", events: ["Judging End"], location: "Various" },
  { time: "8:00 PM", events: ["Award / Closing Ceremonies"], location: "E7 Event Space" },
]

function Schedule() {
  return (
    <Background id="schedule" aria-labelledby="schedule-title">
      <Content>
        <Intro>
          <Title as="h2" id="schedule-title">Day of Schedule</Title>
          <BodyRegular1>Saturday, November 21st 2026</BodyRegular1>
        </Intro>

        <TableArea>
          {/* The sun goes behind the table, so it comes first */}
          <SunHalo aria-hidden="true" />
          <Sun src={scheduleSun} alt="" aria-hidden="true" fetchPriority="low" decoding="async" />

          <Table>
            <thead>
              <tr>
                <TimeCell as="th" scope="col">
                  <BodyBold>Time</BodyBold>
                </TimeCell>
                <EventCell as="th" scope="col">
                  <BodyBold>Event</BodyBold>
                </EventCell>
                <EventCell as="th" scope="col">
                  <BodyBold>Location</BodyBold>
                </EventCell>
              </tr>
            </thead>
            <tbody>
              {schedule.map(({ time, events, location, rowSpan }) => (
                <tr key={time}>
                  {/* The time is a "th" so screen readers say the time before each event */}
                  <TimeCell as="th" scope="row">
                    <BodyRegular1>{time}</BodyRegular1>
                  </TimeCell>
                  {events && (
                    <EventCell rowSpan={rowSpan}>
                      {events.map((event) => (
                        <BodyRegular1 key={event}>{event}</BodyRegular1>
                      ))}
                    </EventCell>
                  )}
                  {location && (
                    <EventCell rowSpan={rowSpan}>
                      <BodyRegular1>{location}</BodyRegular1>
                    </EventCell>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>

          {/* The rays and tape go on top of the table */}
          <Decorations aria-hidden="true">
            <Rays src={scheduleSunray} alt="" fetchPriority="low" decoding="async" />
            <SunGlow />
            <TopTape src={decorativeWashiTape} alt="" />
            <BottomTape src={decorativeWashiTape} alt="" />
          </Decorations>
        </TableArea>
      </Content>
    </Background>
  )
}

export default Schedule

/* ---------- The section and its background ---------- */

const Background = styled(SectionWrapper)`
  padding: 60px 0 25px;

  /* The sky. It sticks out 600px below the section so there's no gap with the
     top of Venue. (Sponsors covers the sky above this section.) z-index -1 keeps
     it behind everything. */
  &::before {
    content: "";
    position: absolute;
    inset: 0 0 -600px;
    z-index: -1;
    background: linear-gradient(#c3e9e6, #92edf7);
    pointer-events: none;
  }

  ${mediaQueries.tablet} {
    padding: 42px 0 0;
  }
`;

// Same width as the table in Figma (1112px). On phones it leaves 30px on each side.
// z-index 19 (one below the usual 20) so the sun's glow goes behind the Sponsors
// cards above instead of on top of them, like in Figma.
const Content = styled(ContentWrapper)`
  z-index: 19;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: calc(100% - 100px);
  max-width: 1112px;
  color: ${colors.text.black};
  line-height: 1.32; /* matches the line spacing in Figma (the browser default is looser) */
  overflow: visible;

  ${mediaQueries.tablet} {
    width: calc(100% - 60px);
    line-height: 1.31;
  }
`;

// Title and subtitle. On phones the sun reaches up this high, so this needs to sit
// on top of it or the sun covers the words.
const Intro = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
`;

// Without this the title takes up extra space above and below compared to Figma.
const Title = styled(Header1)`
  line-height: 1;
`;

/* ---------- The table ---------- */

// Holds the table plus the sun, rays and tape. "container-type" is what makes
// cqw mean "% of the table's width" for everything inside.
const TableArea = styled.div`
  position: relative;
  container-type: inline-size;
`;

// Each cell only draws its right and bottom line, and the table draws the top and
// left edges. That way no two lines double up and every line is 1px thick.
const Table = styled.table`
  position: relative;
  z-index: 1;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-top: 1px solid ${colors.text.black};
  border-left: 1px solid ${colors.text.black};
  background: ${colors.background.lightPurple};
  text-align: left;
`;

const Cell = styled.td`
  border-right: 1px solid ${colors.text.black};
  border-bottom: 1px solid ${colors.text.black};
  vertical-align: middle;
`;

// Left column with the times. The rows switch between two shades of purple.
const TimeCell = styled(Cell)`
  width: 191px;
  padding: 24px 48px;
  text-align: center;
  background: ${colors.background.lightPurple};

  thead &,
  tbody tr:nth-child(even) & {
    background: ${colors.text.offwhite};
  }

  ${mediaQueries.tablet} {
    width: 100px;
    padding: 8px;

    /* The times are bold on mobile in Figma but not on desktop */
    p {
      font-weight: 600;
    }
  }

  /* On really small phones the time column was taking up half the table, so the
     events got squished. Let it shrink to fit the time instead. */
  ${mediaQueries.mobile} {
    width: auto;
    padding: 8px;
    white-space: nowrap;
  }
`;

// Right column with the events. The rows switch between gray and white, and the
// header is purple.
const EventCell = styled(Cell)`
  padding: 24px;
  background: ${colors.background.gray};

  tbody tr:nth-child(even) & {
    background: white;
  }

  thead & {
    background: ${colors.background.lightPurple};
  }

  /* Space between events that share a time slot */
  p + p {
    margin-top: 10px;
  }

  ${mediaQueries.tablet} {
    padding: 8px;
    overflow-wrap: anywhere;
  }
`;

/* ---------- Sun, rays and tape ----------
   The numbers are the Figma positions turned into % of the table width
   (e.g. something 100px from the left on a 1112px table is 9cqw). */

// The sun gently pulses in size.
const shine = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
`;

const haloPulse = keyframes`
  0%, 100% {
    transform: scale(0.92);
    opacity: 0.45;
  }
  50% {
    transform: scale(1.08);
    opacity: 0.8;
  }
`;

const SunHalo = styled.div`
  position: absolute;
  left: 69.15cqw;
  top: -34.69cqw;
  width: 60.97cqw;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 220, 100, 0.55), rgba(255, 220, 100, 0) 70%);
  animation: ${haloPulse} 4s ease-in-out infinite;
  pointer-events: none;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  ${mediaQueries.tablet} {
    left: 57cqw;
    top: -38.26cqw;
    width: 82cqw;
    height: auto;
    aspect-ratio: auto;
  }
`;

const Sun = styled.img`
  position: absolute;
  left: 69.15cqw;
  top: -34.69cqw;
  width: 60.97cqw;
  max-width: none;
  height: auto;
  pointer-events: none;
  animation: ${shine} 4s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  ${mediaQueries.tablet} {
    left: 57cqw;
    top: -38.26cqw;
    width: 82cqw;
  }
`;

const Decorations = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
`;

// "Sun rays are glowing and swaying side to side": the rays tilt left and right
// and get brighter and dimmer. They tilt around the exact spot where they come
// out of the sun (the table's top-right corner, which is 64% across and 18% down
// the ray image), so the start of the rays stays on the sun while the ends swing.
// At 0% / 50% / 100% they're exactly where Figma has them.
const sway = keyframes`
  0%, 50%, 100% {
    transform: rotate(0deg);
    opacity: 1;
  }
  25% {
    transform: rotate(5deg);
    opacity: 0.75;
  }
  75% {
    transform: rotate(-5deg);
    opacity: 0.75;
  }
`;

// The see-through light beams coming from the sun across the table.
const Rays = styled.img`
  position: absolute;
  left: 10.52cqw;
  top: -23.59cqw;
  width: 139.62cqw;
  max-width: none;
  height: auto;
  transform-origin: 64.09% 18.31%;
  animation: ${sway} 7s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  ${mediaQueries.tablet} {
    left: 6.94cqw;
    top: -20.82cqw;
    width: 140.56cqw;
  }
`;

// Soft yellow glow sitting on top of the spot where the rays meet the sun, so
// the rays look like they're coming out of the sun instead of starting at a hard
// edge. It pulses in time with the sun (same 4s timing) to make the shine easier
// to see. Centred on the middle of the sun.
const glow = keyframes`
  0%, 100% {
    transform: translate(-50%, -50%) scale(0.9);
    opacity: 0.6;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.15);
    opacity: 1;
  }
`;

const SunGlow = styled.div`
  position: absolute;
  left: 99.65cqw;
  top: -4.2cqw;
  width: 42cqw;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 236, 140, 0.5) 0%,
    rgba(255, 226, 120, 0.3) 35%,
    rgba(255, 215, 100, 0) 70%
  );
  transform: translate(-50%, -50%);
  animation: ${glow} 4s ease-in-out infinite;

  ${mediaQueries.tablet} {
    left: 100.14cqw;
    top: -5.7cqw;
    width: 70cqw;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Tape = styled.img`
  position: absolute;
  width: 18.53cqw;
  height: auto;

  ${mediaQueries.tablet} {
    display: none;
  }
`;

const TopTape = styled(Tape)`
  left: -9.26cqw;
  top: -10.59cqw;
`;

const BottomTape = styled(Tape)`
  left: 89.39cqw;
  bottom: -6px;
`;
