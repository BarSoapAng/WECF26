import styled from "styled-components";

type FallingLeafProps = {
  src: string;
  x: number;
  y: number;
  width: number;
  delay: string;
  rotation?: number;
  fallDistance?: number;
  spin: number;
  rotationDuration: number;
};

export default function FallingLeaf({
  src, x, y, width, delay, rotation = 0, fallDistance = 180, spin, rotationDuration,
}: FallingLeafProps) {
  return <Leaf src={src} alt="" aria-hidden="true" decoding="async" $x={x} $y={y} $width={width} $rotation={rotation} $delay={delay} $fallDistance={fallDistance} $spin={spin} $rotationDuration={rotationDuration} />;
}

const Leaf = styled.img<{
  $x: number; $y: number; $width: number; $rotation: number; $delay: string;
  $fallDistance: number; $spin: number; $rotationDuration: number;
}>`
  position: absolute;
  display: block;
  max-width: none;
  left: ${({ $x }) => $x}px;
  top: ${({ $y }) => $y}px;
  width: ${({ $width }) => $width}px;
  height: auto;
  transform: rotate(${({ $rotation }) => $rotation}deg);
  animation: leafFall 16s linear ${({ $delay }) => $delay} infinite;

  @keyframes leafFall {
    0%, 10% { opacity: 0; transform: translateY(-${({ $fallDistance }) => $fallDistance}px) rotate(${({ $rotation }) => $rotation}deg); }
    18% { opacity: 1; }
    80% { opacity: 1; transform: translateY(0) rotate(${({ $rotation, $spin }) => $rotation + $spin}deg); }
    100% { opacity: 0; transform: translateY(0) rotate(${({ $rotation, $spin }) => $rotation + $spin}deg); }
  }

  @media (prefers-reduced-motion: reduce) { animation: none; }
`;
