import { FC } from "react";
import { Widget, WidgetDisplay, WidgetImage } from "./Widget";
import "./ProjectStyling.css";

interface ProjectDisplayProps {
  thumnbail_src: string;
  technologies_used: string[];
  name: string;
}

export const ProjectDisplay: FC<ProjectDisplayProps> = ({ thumnbail_src, technologies_used, name }) => {
  return (
    <div className="project-display">
      <div className="project-thumbnail">
        <img className="project-thumbnail-image" src={thumnbail_src} />
        <div className="project-thumbnail-shadow" />
      </div>
      <div className="project-info">
        <p className="project-title default-font default-font-color">{name}</p>
        <div className="technologies-display">
          {technologies_used.map((src, index) => {
            return <WidgetImage src={src} id={index} />;
          })}
        </div>
      </div>
    </div>
  );
};
