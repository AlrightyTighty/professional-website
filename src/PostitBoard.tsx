import { FC } from "react";
import "./PostitBoardStyling.css";

interface PostitBoardProps {
  height: number;
  setPostitActive: React.Dispatch<React.SetStateAction<boolean>>;
  postits: string[];
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

const PostitBoard: FC<PostitBoardProps> = ({ height, setPostitActive, postits }) => {
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
