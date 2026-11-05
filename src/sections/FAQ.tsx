import styled from "styled-components"
import { ContentWrapper, SectionWrapper } from "../components"
import { mediaQueries } from "../lib/responsive"
import { BodyRegular1, BodyRegular2, colors, Header2 } from "../lib/styles"

function FAQ() {
  return (
    <SectionWrapper id="faq" aria-labelledby="faq-title">
      <Questions>
        <Header2 id="faq-title">Frequently Asked Questions</Header2>
        {[
          "Who can join WEC?",
          "Why join WEC?",
          "Can I compete individually?",
          "What should I bring to WEC?",
          "Who judges WEC?",
        ].map((question, index) => (
          <details key={question} name="faq" open={index === 0}>
            <BodyRegular2 as="summary">{question}</BodyRegular2>
            {index === 0 && (
              <BodyRegular2>
                Any undergraduate Waterloo engineering student that is on term in Fall 2026 may join!
              </BodyRegular2>
            )}
          </details>
        ))}
        <BodyRegular1>Sign up now!</BodyRegular1>
      </Questions>
    </SectionWrapper>
  )
}

export default FAQ

const Questions = styled(ContentWrapper)`
  width: 74%;
  max-width: 1080px;
  padding: 48px 60px;
  color: ${colors.text.brown};

  > h2, > p {
    text-align: center;
  }

  > p {
    margin-top: 24px;
  }

  details {
    border-bottom: 1px solid color-mix(in srgb, currentColor 30%, transparent);
  }

  summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding: 28px 0;
    list-style: none;
    cursor: pointer;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary::after {
    content: "+";
  }

  details[open] summary::after {
    content: "×";
  }

  details > p {
    padding-bottom: 28px;
  }

  ${mediaQueries.tablet} {
    padding: 32px;

    summary {
      padding: 20px 0;
    }

    details > p {
      padding-bottom: 20px;
    }
  }

  ${mediaQueries.mediumTablet} {
    width: calc(100% - 32px);
    padding: 24px 16px;
  }
`;
