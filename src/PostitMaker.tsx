import "./PostitBoardStyling.css";
import React from "react";
import { FC } from "react";
import DrawableCanvas from "./DrawableCanvas";

interface PostitMakerProps {
  setPostitMakerActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostitMaker: FC<PostitMakerProps> = ({ setPostitMakerActive }) => {
  return (
    <div className="postit-maker">
      <p className="postit-maker-title default-font default-font-color">Draw your Post-it!</p>
      <DrawableCanvas width={500} height={500} backgroundColor="#FFEBA1" />
    </div>
  );
};

export default PostitMaker;
