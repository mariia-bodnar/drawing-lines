import {
  useEffect,
  useRef,
  MouseEvent,
  useMemo,
  useCallback,
  useState,
} from "react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --main-color: #a00000;
  }
  body{
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;
  }
  canvas {
    border: 1px solid var(--main-color);
    max-height: 600px;
    height: 75%;
    width: calc(100% - 50px);
    margin: 0 25px;
  }
  button{
    border: 1px solid var(--main-color);
    margin: 0 25px;
    line-height: 2;
    color: var(--main-color);
    font-size: 16px;
  }
`;

function App() {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const testRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (canvasRef.current) setCtx(canvasRef.current.getContext("2d"));
    // if(canvasRef.current)setCtx(canvasRef.current.getBoundingClientRect())
  }, [canvasRef]);

  const clickHandler = useCallback(
    (e: MouseEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      if (!ctx) return;
      const bounding = canvasRef.current?.getBoundingClientRect();
      const x = (e.pageX - bounding!.x)/3;
      const y = (e.pageY - bounding!.y)/3;
      // alert(`Clicked at ${x} ${y}`);
      ctx.fillRect(x, y, 10, 10);
    },
    [ctx]
  );

  // useEffect(() => {
  //   if (!ctx) return;

  //   ctx.fillRect(10, 10, 40, 40);
  //   ctx.strokeRect(50, 50, 100, 100);
  // }, [ctx]);

  return (
    <S.Wrapper ref={testRef}>
      <GlobalStyle />
      <canvas
        ref={canvasRef}
        onClick={clickHandler}
        onContextMenu={() => {}}
      ></canvas>
      <button>{"collapse lines"}</button>
    </S.Wrapper>
  );
}

const S = {
  Wrapper: styled.div`
    max-width: 90%;
    height: 100vh;
    max-height: 100vh;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  `,
};

export default App;
