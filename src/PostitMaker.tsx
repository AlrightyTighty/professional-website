import "./PostitBoardStyling.css";
import React, { useRef } from "react";
import { FC } from "react";
import DrawableCanvas from "./DrawableCanvas";
import checkmark from "./assets/images/checkmark.png";
import brush_tool from "./assets/images/b.png";
import eraser_tool from "./assets/images/eraser button.png";

interface PostitMakerProps {
  setPostitMakerActive: React.Dispatch<React.SetStateAction<boolean>>;
  reloadImagesRef: React.RefObject<boolean>;
}

const PostitMaker: FC<PostitMakerProps> = ({ setPostitMakerActive, reloadImagesRef }) => {
  const canvasRef: React.RefObject<HTMLCanvasElement | null> = useRef<HTMLCanvasElement>(null);

  const uploadImage = async () => {
    if (!canvasRef.current) return;
    const data: string = canvasRef.current.toDataURL("image/bmp");
    const response = await fetch("http://localhost:3000/stickynote", {
      method: "POST",
      body: JSON.stringify({ image: data }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    reloadImagesRef.current = true;
    setPostitMakerActive(false);
  };

  const setDraw = () => {
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    if (!context) return;
    context.globalCompositeOperation = "source-over";
  };

  const setErase = () => {
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    if (!context) return;
    context.globalCompositeOperation = "destination-out";
  };

  return (
    <div className="postit-maker">
      <p className="postit-maker-title default-font default-font-color">Draw your Post-it!</p>
      <DrawableCanvas width={500} height={500} backgroundColor="#FFEBA1" canvasRef={canvasRef} />
      <div className="toolbar">
        <button className="postit-save-button">
          <img src={checkmark} onClick={uploadImage} />
        </button>
        <button className="postit-draw-button">
          <img src={brush_tool} onClick={setDraw} />
        </button>
        <button className="postit-erase-button">
          <img src={eraser_tool} onClick={setErase} />
        </button>
      </div>
    </div>
  );
};

export default PostitMaker;
