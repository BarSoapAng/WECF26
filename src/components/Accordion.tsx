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
  const [openIndices, setOpenIndices] = useState<number[]>([0])

  return items.map(({ title, content }, index) => (
    <Item key={title}>
      <h3>
        <Trigger
          as="button"
          type="button"
          id={`${id}-trigger-${index}`}
          aria-expanded={openIndices.includes(index)}
          aria-controls={`${id}-panel-${index}`}
          onClick={() => setOpenIndices((previous) =>
            previous.includes(index)
              ? previous.filter((openIndex) => openIndex !== index)
              : [...previous, index]
          )}
        >
          <span>{title}</span>
          <Icon aria-hidden="true" $open={openIndices.includes(index)}>
            +
          </Icon>
        </Trigger>
      </h3>
      <AccordionPanel
        id={`${id}-panel-${index}`}
        role="region"
        aria-labelledby={`${id}-trigger-${index}`}
        aria-hidden={!openIndices.includes(index)}
        inert={!openIndices.includes(index)}
        open={openIndices.includes(index)}
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
  display: inline-block;
  flex-shrink: 0;
  font-size: 32px;
  transform: rotate(${({ $open }) => ($open ? "-45deg" : "0deg")});
  transition: transform 250ms ease-in-out;

  ${mediaQueries.tablet} {
    font-size: 18px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

const Panel = styled.div<{ $height: number }>`
  height: ${({ $height }) => $height}px;
  overflow: hidden;
  transition: height 250ms ease-in-out;

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
