import { useId, useState } from "react"
import type { ReactNode } from "react"
import styled from "styled-components"
import { mediaQueries } from "../lib/responsive"
import { BodyRegular2 } from "../lib/styles"

type Props = {
  items: { title: string; content: ReactNode }[]
}

function Accordion({ items }: Props) {
  const id = useId()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return items.map(({ title, content }, index) => (
    <Item key={title}>
      <h3>
        <Trigger
          as="button"
          type="button"
          id={`${id}-trigger-${index}`}
          aria-expanded={openIndex === index}
          aria-controls={`${id}-panel-${index}`}
          onClick={() => setOpenIndex(openIndex === index ? null : index)}
        >
          <span>{title}</span>
          <span aria-hidden="true">{openIndex === index ? "×" : "+"}</span>
        </Trigger>
      </h3>
      <Panel
        id={`${id}-panel-${index}`}
        role="region"
        aria-labelledby={`${id}-trigger-${index}`}
        aria-hidden={openIndex !== index}
        inert={openIndex !== index}
        $open={openIndex === index}
      >
        <div>
          <BodyRegular2 as="div">{content}</BodyRegular2>
        </div>
      </Panel>
    </Item>
  ))
}

export default Accordion

const Item = styled.div`
  border-bottom: 1px solid color-mix(in srgb, currentColor 30%, transparent);

  > h3 {
    margin: 0;
  }
`;

const Trigger = styled(BodyRegular2)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 28px 0;
  border: 0;
  background: none;
  color: inherit;
  text-align: left;
  cursor: pointer;

  ${mediaQueries.tablet} {
    padding: 20px 0;
  }
`;

const Panel = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? "1fr" : "0fr")};
  transition: grid-template-rows 250ms ease;

  > div {
    min-height: 0;
    overflow: hidden;
  }

  > div > div {
    padding-bottom: 28px;

    ${mediaQueries.tablet} {
      padding-bottom: 20px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
