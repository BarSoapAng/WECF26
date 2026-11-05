import { useId, useLayoutEffect, useRef, useState } from "react"
import type { ComponentPropsWithoutRef, ReactNode } from "react"
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
          <Icon aria-hidden="true" $open={openIndex === index}>
            <span>+</span>
            <span>×</span>
          </Icon>
        </Trigger>
      </h3>
      <AccordionPanel
        id={`${id}-panel-${index}`}
        role="region"
        aria-labelledby={`${id}-trigger-${index}`}
        aria-hidden={openIndex !== index}
        inert={openIndex !== index}
        open={openIndex === index}
      >
        <BodyRegular2 as="div">{content}</BodyRegular2>
      </AccordionPanel>
    </Item>
  ))
}

export default Accordion

function AccordionPanel({ open, children, ...props }: ComponentPropsWithoutRef<"div"> & { open: boolean }) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useLayoutEffect(() => {
    const content = contentRef.current
    if (!content) return

    const observer = new ResizeObserver(() => setHeight(content.getBoundingClientRect().height))
    observer.observe(content)
    return () => observer.disconnect()
  }, [])

  return (
    <Panel {...props} $height={open ? height : 0}>
      <div ref={contentRef}>{children}</div>
    </Panel>
  )
}

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

const Icon = styled.span<{ $open: boolean }>`
  display: inline-grid;
  flex-shrink: 0;
  transform: rotate(${({ $open }) => ($open ? "90deg" : "0deg")});
  transition: transform 350ms ease-in-out;

  > span {
    grid-area: 1 / 1;
    transition: opacity 350ms ease-in-out;
  }

  > span:first-child {
    opacity: ${({ $open }) => ($open ? 0 : 1)};
  }

  > span:last-child {
    opacity: ${({ $open }) => ($open ? 1 : 0)};
  }

  @media (prefers-reduced-motion: reduce) {
    &, > span {
      transition: none;
    }
  }
`;

const Panel = styled.div<{ $height: number }>`
  height: ${({ $height }) => $height}px;
  overflow: hidden;
  transition: height 350ms ease-in-out;

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
