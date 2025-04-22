import { FC, useRef, useEffect, useState } from "react";
import { motion, animate, useMotionTemplate, useMotionValue, useAnimate, easeIn, easeInOut } from "framer-motion";
import linkedin_icon from "./assets/images/linkedin icon.png";
import react_icon from "./assets/images/react icon.png";
import gcp_icon from "./assets/images/gcp icon.png";
import node_icon from "./assets/images/nodejs.png";
import git_icon from "./assets/images/git icon.png";
import postgre_icon from "./assets/images/postgre icon.png";
import typescript_icon from "./assets/images/typescript icon.png";
import mongo_icon from "./assets/images/mongodb.png";
import unity_icon from "./assets/images/unity icon.png";
import c_icon from "./assets/images/c icon.png";
import cs_icon from "./assets/images/cs icon.png";

import katyway_thumbnail from "./assets/images/katyway_thumbnail.png";
import mcs_thumbnail from "./assets/images/mcs thumbnail.png";

import headshot from "./assets/images/headshot.png";
import "./MenuStyling.css";
import "./MainSectionStyling.css";
import "./AboutMeSectionStyling.css";
import { Widget, WidgetDisplay, WidgetImage } from "./Widget";
import { ProjectDisplay } from "./ProjectDisplay";

interface MenuPanelButtonProps {
  text: string;
  id: number;
  scrollToSelector: string;
  hoveredIndex: number;
  setHoveredIndex: React.Dispatch<React.SetStateAction<number>>;
}

interface MenuPanelProps {
  texts: string[];
  scrollToSelectors: string[];
  hoveredIndex: number;
  setHoveredIndex: React.Dispatch<React.SetStateAction<number>>;
}

const MenuPanelButton: FC<MenuPanelButtonProps> = ({ text, id, scrollToSelector, hoveredIndex, setHoveredIndex }) => {
  const hoverSelf = () => {
    setHoveredIndex(id);
  };

  const unHoverSelf = () => {
    if (id == hoveredIndex) setHoveredIndex(-1);
  };

  return (
    <div className="menu-scrollto-button-holder">
      <motion.a className="menu-scrollto-button default-font default-font-color" id={id.toString()} href={scrollToSelector} onHoverStart={hoverSelf} onHoverEnd={unHoverSelf}>
        {text}
        <div className="underline" />
      </motion.a>
    </div>
  );
};

const MenuPanel: FC<MenuPanelProps> = ({ texts, scrollToSelectors, hoveredIndex, setHoveredIndex }) => {
  return (
    <motion.div className="menu-panel" initial={{ width: 0 }}>
      {texts.map((text, index) => {
        return <MenuPanelButton key={index} text={text} scrollToSelector={scrollToSelectors[index]} id={index} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} />;
      })}
    </motion.div>
  );
};

const menuSections = ["Home", "About Me", "Projects", "Tutoring", "Contact Me", "Post-It Board"];
const menuLinks = [".greeting-text", "", "", "", "", ""];

const App = () => {
  const prevSelected = useRef(-1);
  const prevHovered = useRef(-1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [scope, animateReact] = useAnimate();
  const whitePosition = useMotionValue(0.01);
  const pinkPosition = useMotionValue(0);

  const [enableScrollable, setEnableScrollable] = useState(false);

  const textGradientStyle = useMotionTemplate`linear-gradient(to right, #EFFA58 0%, #EF4687 ${pinkPosition}%,  rgb(255, 255, 255, 0) ${whitePosition}%)`;

  useEffect(() => {
    animateReact(".greeting-text", { opacity: 1 }, { duration: 0.5 });
    animate(whitePosition, 100, { duration: 0.5, ease: easeIn, delay: 1 });
    animate(pinkPosition, 99.99, { duration: 0.5, delay: 1.25, ease: easeIn });
    animateReact(".fade-in", { opacity: 1 }, { duration: 1, delay: 2 });
    animateReact(".menu-panel", { width: 350 }, { duration: 1, delay: 3.2, ease: easeInOut });
    setTimeout(() => {
      setEnableScrollable(true);
    }, 2000);
  }, []);

  useEffect(() => {
    console.log("re-animating :)");
    animateReact(
      `.menu-scrollto-button-holder:nth-child(${selectedIndex + 1}) div, .menu-scrollto-button-holder:nth-child(${hoveredIndex + 1}) div`,
      { width: "100%", backgroundColor: "#ef4687" },
      { duration: 0.5 }
    );
    animateReact(`.menu-scrollto-button-holder:nth-child(${selectedIndex + 1}) div`, { backgroundColor: "#EF4687" }, { duration: 0.5 });
    if (hoveredIndex != selectedIndex && hoveredIndex > -1) animateReact(`.menu-scrollto-button-holder:nth-child(${hoveredIndex + 1}) div`, { backgroundColor: "#FFFFFF" }, { duration: 0.5 });
    if (selectedIndex != prevSelected.current && prevSelected.current > -1) animateReact(`.menu-scrollto-button-holder:nth-child(${prevSelected.current + 1}) div`, { width: "0%" }, { duration: 0.5 });
    if (hoveredIndex != prevHovered.current && prevHovered.current != selectedIndex && prevHovered.current > -1)
      animateReact(`.menu-scrollto-button-holder:nth-child(${prevHovered.current + 1}) div`, { width: "0%" }, { duration: 0.5 });
    prevSelected.current = selectedIndex;
    prevHovered.current = hoveredIndex;
  }, [selectedIndex, hoveredIndex, animateReact]);

  return (
    <>
      <div className="panel-holder" ref={scope}>
        <MenuPanel texts={menuSections} scrollToSelectors={menuLinks} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} />
        <div className="main-content-panel" style={enableScrollable ? { overflowY: "scroll" } : { overflowY: "hidden" }}>
          <div className="homescreen-intro-text">
            <motion.div className="default-font default-font-color greeting-text" ref={scope} initial={{ opacity: 0 }}>
              Hi, I'm
            </motion.div>
            <div className="default-font name-text-holder">
              <motion.p style={{ backgroundImage: textGradientStyle }} className="name-text">
                Joshua Novak
              </motion.p>
            </div>
            <motion.p className="name-subtext default-font fade-in" initial={{ opacity: 0 }}>
              Fullstack Engineer in Houston <img src={linkedin_icon} width={30} height={30} />{" "}
            </motion.p>
            <motion.img className="headshot-photo fade-in" src={headshot} initial={{ opacity: 0 }} />
          </div>
          <div className="aboutme-content-section">
            <p></p>
            <p className="default-font default-font-color" style={{ width: "80%", fontSize: "32pt" }}>
              I am a <span style={{ background: "linear-gradient(to right, #0011ff, #8300fb)", backgroundClip: "text", color: "rgba(0, 0, 0, 0)" }}>fullstack engineer</span> that enjoys building
              functional and practical apps. I am experienced with various technologies, some of which are listed below.
            </p>
            <br />
            <WidgetDisplay width={840} height={100}>
              <Widget cellWidth={100} cellHeight={100}>
                <WidgetImage src={react_icon} />
              </Widget>
              <Widget cellWidth={100} cellHeight={100}>
                <WidgetImage src={typescript_icon} />
              </Widget>
              <Widget cellWidth={100} cellHeight={100}>
                <WidgetImage src={node_icon} />
              </Widget>
              <Widget cellWidth={100} cellHeight={100}>
                <WidgetImage src={postgre_icon} />
              </Widget>
              <Widget cellWidth={100} cellHeight={100}>
                <WidgetImage src={mongo_icon} />
              </Widget>
              <Widget cellWidth={100} cellHeight={100}>
                <WidgetImage src={gcp_icon} />
              </Widget>
              <Widget cellWidth={100} cellHeight={100}>
                <WidgetImage src={git_icon} />
              </Widget>
            </WidgetDisplay>
            <p className="default-font default-font-color" style={{ width: "80%", fontSize: "32pt", marginTop: "50px" }}>
              I am also an undergraduate research assistant under Dr. Rizk at the University of Houston. I am interested in education and generative AI's possible effects on its development in the
              near future.
            </p>
          </div>
          <p className="project-intro-text default-font default-font-color">
            <u>Projects: </u>
          </p>
          <div className="project-section">
            <ProjectDisplay thumnbail_src={katyway_thumbnail} name="KatyWay" technologies_used={[react_icon, typescript_icon, gcp_icon]} />
            <ProjectDisplay thumnbail_src={mcs_thumbnail} name="MCS" technologies_used={[unity_icon, c_icon, cs_icon]} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
