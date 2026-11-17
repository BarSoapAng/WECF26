import styled from "styled-components"
import {
  sponsorsLeafLeft,
  sponsorsLeafRight,
  sponsorsRedBull,
  sponsorsSff,
  sponsorsWaterlooEngineering,
} from "../assets"
import { ClickJitterImage, ContentWrapper, SectionWrapper, Sparkle } from "../components"
import { mediaQueries } from "../lib/responsive"
import { BodyRegular1, colors, Header1 } from "../lib/styles"

/*
 * Our Sponsors section
 *
 * Desktop: title + two paragraphs, then the sponsor logos in a single column of
 * white cards, with a sparkle on the left.
 * Mobile: same thing in one column, plus two leaves peeking out around the cards
 * (that's how the mobile Figma has it).
 *
 * The yellow tree band behind the top of this section mostly comes from the
 * Competition Streams section above. In Figma there's a second copy of that band
 * a bit lower down (it's what makes the yellow reach the third row of cards on
 * the left), so this section adds that second copy. The light blue sky continues
 * down into Schedule.
 */

// The sponsors to show. Screen readers use each company name instead of its logo.
const sponsors = [
  { name: "Waterloo Engineering", logo: sponsorsWaterlooEngineering },
  { name: "SFF", logo: sponsorsSff },
  { name: "Red Bull", logo: sponsorsRedBull },
]

function Sponsors() {
  return (
    <Background id="sponsors" aria-labelledby="sponsors-title">
      <Content>
        <Intro>
          <Title as="h2" id="sponsors-title">Our Sponsors</Title>
          <Paragraphs>
            <BodyRegular1>
              WEC is powered by sponsors who believe in student engineering. Your partnership will
              help us with the resources, mentorship, and opportunities for participants while
              directly engaging with some of University of Waterloo's brightest students.
            </BodyRegular1>
            <BodyRegular1>Together, we can empower students and shape innovation.</BodyRegular1>
          </Paragraphs>
        </Intro>

        <Grid>
          {/* Mobile-only leaf that sits behind the first card */}
          <RightLeaf src={sponsorsLeafRight} alt="" />

          {sponsors.map((sponsor, index) => (
            <Card key={index}>
              <Logo src={sponsor.logo} alt={sponsor.name} fetchPriority="low" decoding="async" />
            </Card>
          ))}

          {/* Mobile-only leaf that sits in front of the third card */}
          <LeftLeaf src={sponsorsLeafLeft} alt="" />

          {/* Sparkle to the left of the bottom row (desktop only) */}
          <Sparkle size={106} x="-107px" y="546px" speed={3} />
        </Grid>
      </Content>
    </Background>
  )
}

export default Sponsors

/* ---------- The section and its background ---------- */

// "container-type" lets the band use cqw, which means % of the section's width.
const Background = styled(SectionWrapper)`
  container-type: inline-size;
  padding: 60px 0 25px;

  /* Light blue sky behind the section. It also goes 400px up, under the yellow
     tree band from Competition Streams, so no gaps show between the scallops.
     z-index -1 keeps it behind everything. */
  &::before {
    content: "";
    position: absolute;
    inset: -400px 0 0;
    z-index: -1;
    background: #c1e9e7;
    pointer-events: none;
  }

  ${mediaQueries.tablet} {
    padding: 42px 0 0;
  }
`;

// Same width as Figma (1112px). On phones it leaves 30px on each side.
const Content = styled(ContentWrapper)`
  display: flex;
  flex-direction: column;
  gap: 48px;
  width: calc(100% - 100px);
  max-width: 1112px;
  color: ${colors.text.brown};
  line-height: 1.32; /* matches the line spacing in Figma (the browser default is looser) */
  text-align: center;
  overflow: visible;

  ${mediaQueries.tablet} {
    width: calc(100% - 60px);
  }

  overflow: visible;
`;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// Without this the title takes up extra space above and below compared to Figma.
const Title = styled(Header1)`
  line-height: 1;
`;

// The two paragraphs have one empty line between them, like in Figma
// (one line of text is 29px tall on desktop and 21px on phones).
const Paragraphs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 29px;

  ${mediaQueries.tablet} {
    gap: 21px;
  }
`;

/* ---------- Logo cards ---------- */

// Full-width cards, 24px apart on desktop and 10px apart on phones.
const Grid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 24px;

  ${mediaQueries.tablet} {
    gap: 10px;
  }
`;

// White card with a thin gray border and rounded corners. The logo is centred.
const Card = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 155.59px;
  border: 1px solid #a3a3a3;
  border-radius: 16px;
  background: white;

  ${mediaQueries.tablet} {
    height: 121px;
  }
`;

// Keep both wide and tall logos within the card while preserving their aspect ratio.
const Logo = styled.img`
  display: block;
  width: 348px;
  max-width: 80%;
  height: 120px;
  object-fit: contain;

  ${mediaQueries.tablet} {
    width: 204px;
    height: 96px;
  }
`;

/* ---------- Mobile leaves ----------
   Positions are straight from the mobile Figma. In Figma both leaves hang off
   the edge of the phone screen, so the images are just the part you can see,
   and they sit right against the screen edge (30px outside the cards). */

const Leaf = styled(ClickJitterImage)`
  display: none;
  position: absolute;
  height: auto;
  pointer-events: auto;

  ${mediaQueries.tablet} {
    display: block;
  }
`;

// Peeks out from behind the right side of the first card.
const RightLeaf = styled(Leaf)`
  z-index: 0;
  right: -30px;
  top: 30px;
  width: 117px;
`;

// Sits over the left edge of the third card.
const LeftLeaf = styled(Leaf)`
  z-index: 2;
  left: -30px;
  top: 279px;
  width: 75px;
`;
