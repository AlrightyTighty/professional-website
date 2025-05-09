import { PropsWithChildren, FC, useRef, useEffect, Ref, useState } from "react";

interface DrawableCanvasProps {
  width: number;
  height: number;
  backgroundColor?: string;
}

const DrawableCanvas: FC<PropsWithChildren<DrawableCanvasProps>> = ({ width, height, backgroundColor }) => {
  const canvasRef: Ref<HTMLCanvasElement> = useRef(null);
  const contextRef: Ref<CanvasRenderingContext2D> = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);

  if (!backgroundColor) backgroundColor = "transparent";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 100;
    canvas.height = 100;

    const context = canvas.getContext("2d");
    if (!context) return;
    context.scale(100 / width, 100 / height);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!contextRef.current) return;
    const { offsetX, offsetY } = event.nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    setIsDrawing(true);
    event.nativeEvent.preventDefault();
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isDrawing || !contextRef.current) return;
    const { offsetX, offsetY } = event.nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    event.nativeEvent.preventDefault();
  };

  const stopDraw = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!isDrawing || !contextRef.current) return;
    setIsDrawing(false);
    contextRef.current.closePath();
  };

  return (
    <canvas
      style={{ width: width, height: height, backgroundColor: backgroundColor, imageRendering: "pixelated" }}
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDraw}
    />
  );
};

export default DrawableCanvas;
