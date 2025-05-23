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
import python_icon from "./assets/images/python icon.png";

import katyway_thumbnail from "./assets/images/katyway_thumbnail.png";
import mcs_thumbnail from "./assets/images/mcs thumbnail.png";
import alrightytechy_thumbnail from "./assets/images/alrightytechy thumbnail.png";
import ffg_thumbnail from "./assets/images/fitness for goobs thumbnail.png";

import headshot from "./assets/images/headshot.png";
import "./MenuStyling.css";
import "./MainSectionStyling.css";
import "./AboutMeSectionStyling.css";
import "./ContactSectionStyling.css";
import { Widget, WidgetDisplay, WidgetImage } from "./Widget";
import { ProjectDisplay } from "./ProjectDisplay";
import PostitBoard from "./PostitBoard";
import PostitMaker from "./PostitMaker";

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

const menuSections = ["Home", "About Me", "Projects", "Post-It Board", "Contact Me"];
const menuLinks = ["#Home", "#About-Me", "#Projects", "#Post-It-Board", "#Contact-Me"];
const scrollDistances: number[] = [0, 1191.546875, 2133.515625, 3155.078125, 3880.390625];

const App = () => {
  const prevSelected = useRef(-1);
  const prevHovered = useRef(-1);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [scope, animateReact] = useAnimate();
  const whitePosition = useMotionValue(0.01);
  const pinkPosition = useMotionValue(0);

  const [postitActive, setPostitActive] = useState(false);

  const [enableScrollable, setEnableScrollable] = useState(false);

  const reloadImagesRef = useRef(true);

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
  }, [whitePosition, pinkPosition, animateReact]);

  useEffect(() => {
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

  const getCurrentSection = (currentScroll: number) => {
    let res = -1;
    while (res < 4 && currentScroll >= scrollDistances[res + 1]) res++;

    return res;
  };

  const updateCurrentSection = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (getCurrentSection(event.currentTarget.scrollTop) != selectedIndex) {
      setSelectedIndex(getCurrentSection(event.currentTarget.scrollTop));
    }
  };

  return (
    <>
      <div className="panel-holder" ref={scope}>
        <MenuPanel texts={menuSections} scrollToSelectors={menuLinks} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} />
        <div className="main-content-panel" onScroll={updateCurrentSection} style={enableScrollable ? { overflowY: "scroll" } : { overflowY: "hidden" }}>
          <div id="Home" className="homescreen-intro-text">
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
            <p id="About-Me" className="default-font default-font-color" style={{ width: "80%", fontSize: "32pt" }}>
              I am a <span style={{ background: "linear-gradient(to right, #EFFA58, #EF4687)", backgroundClip: "text", color: "rgba(0, 0, 0, 0)" }}>fullstack engineer</span> that enjoys building
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
              I'm a CS student in Houston. I have a profound interest in making things; whether it be games for my friends and me or toys for my cats, I've always believed that coding is my way of
              changing the world.
            </p>
            <p className="default-font default-font-color" style={{ width: "80%", fontSize: "32pt", marginTop: "50px" }}>
              I am also an undergraduate research assistant under Dr. Rizk at the University of Houston. I am interested in education and generative AI's possible effects on its development in the
              near future.
            </p>
          </div>
          <p id="Projects" className="project-intro-text default-font default-font-color">
            <u>Projects: </u>
          </p>
          <div className="project-section">
            <ProjectDisplay thumnbail_src={katyway_thumbnail} name="KatyWay" technologies_used={[react_icon, typescript_icon, gcp_icon]} />
            <ProjectDisplay thumnbail_src={mcs_thumbnail} name="MCS" technologies_used={[unity_icon, c_icon, cs_icon]} />
            <ProjectDisplay thumnbail_src={alrightytechy_thumbnail} name="AlrightyTechy" technologies_used={[python_icon, gcp_icon, postgre_icon]} />
            <ProjectDisplay thumnbail_src={ffg_thumbnail} name="Fitness For Goobs" technologies_used={[react_icon, node_icon, mongo_icon, gcp_icon]} />
          </div>
          <p id="Post-It-Board" className="postit-board-intro-text default-font default-font-color">
            <u>Post-it Board!</u>
          </p>
          <p className="default-font default-font-color post-it-board-body-text">
            Not much of a portfolio site if I don't show off that I at least know a thing or two about making apps, right? Here's a little app where you can leave notes for me. Please be appropriate.
            Consider that this is my professional website and employers will look here. Don't make me make this an account-based thing.
          </p>
          <PostitBoard height={400} postits={[]} setPostitActive={setPostitActive} reloadImagesRef={reloadImagesRef} />
          <p id="Contact-Me" className="contact-intro-text default-font default-font-color">
            <u>Contact Me</u>
          </p>
          <p className="default-font default-font-color post-it-board-body-text">
            My preferred method of communication for anything professional/academic is my{" "}
            <a style={{ color: "rgb(18, 201, 207)" }} href="https://www.linkedin.com/in/joshua-novak-037700252/">
              LinkedIn
            </a>
            . If you wanna talk casually, message me there too! I'll set you up with my discord and we can chat there.
          </p>
          <p className="default-font default-font-color post-it-board-body-text">Thanks for visiting! I hope to hear from you 😀!</p>
          <div style={{ marginTop: 800 }} />
        </div>
        {postitActive && <PostitMaker setPostitMakerActive={setPostitActive} reloadImagesRef={reloadImagesRef} />}
      </div>
    </>
  );
};

export default App;
