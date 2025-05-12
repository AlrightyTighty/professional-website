import { FC, RefObject, useEffect, useState } from "react";
import "./PostitBoardStyling.css";

interface PostitBoardProps {
  height: number;
  setPostitActive: React.Dispatch<React.SetStateAction<boolean>>;
  postits: string[];
  reloadImagesRef: RefObject<boolean>;
}

interface PostitProps {
  url: string;
  id: number;
}

const PostitNote: FC<PostitProps> = ({ url, id }) => {
  return (
    <div key={id.toString()} className="postit-note">
      <img src={url} key={id.toString()} />
    </div>
  );
};

const PostitBoard: FC<PostitBoardProps> = ({ height, setPostitActive, reloadImagesRef }) => {
  const [postits, setPostits] = useState<string[]>([]);

  console.log("re-render");

  if (reloadImagesRef.current)
    (async () => {
      reloadImagesRef.current = false;
      const res = await fetch("http://localhost:3000/stickynote", {
        method: "GET",
      });
      const json: { dataURI: string }[] = await res.json();
      const newPostits: string[] = [];
      json.forEach(({ dataURI }) => {
        newPostits.push(dataURI);
      });
      setPostits(newPostits);
    })();

  return (
    <div className="postit-section" style={{ height: height }}>
      <div className="postit-board">
        {postits.map((value, index) => {
          return <PostitNote key={index} url={value} id={index} />;
        })}
      </div>
      <div className="postit-button-border">
        <button
          type="button"
          onClick={() => {
            setPostitActive(true);
          }}
          className="add-note-button default-font default-font-color"
        >
          Add Note!
        </button>
      </div>
    </div>
  );
};

export default PostitBoard;
