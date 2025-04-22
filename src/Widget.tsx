import { animate, AnimationPlaybackControls, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { FC, PropsWithChildren, useId, useRef } from "react";
import "./Widget.css";

interface WidgetDisplayProps {
  width: number;
  height: number;
  widthUnits?: string;
  heightUnits?: string;
}

interface WidgetProps {
  cellWidth: number;
  cellHeight: number;
  widthUnits?: string;
  heightUnits?: string;
}

interface WidgetImageProps {
  src: string;
  id?: number;
}

export const WidgetDisplay: FC<PropsWithChildren<WidgetDisplayProps>> = ({ width, height, children, widthUnits, heightUnits }) => {
  if (!widthUnits) widthUnits = "px";
  if (!heightUnits) heightUnits = "px";
  return (
    <div className="widget-holder" style={{ width: width + widthUnits, height: height + heightUnits }}>
      {children}
    </div>
  );
};

export const Widget: FC<PropsWithChildren<WidgetProps>> = ({ cellHeight, cellWidth, children, widthUnits, heightUnits }) => {
  if (!widthUnits) widthUnits = "px";
  if (!heightUnits) heightUnits = "px";
  return <div style={{ width: `${cellWidth}${widthUnits}`, height: `${cellHeight}${heightUnits}` }}>{children}</div>;
};

export const WidgetImage: FC<WidgetImageProps> = ({ src }) => {
  const filterValue = useMotionValue(1);
  const controls = useRef(null as AnimationPlaybackControls | null);

  const revealColor = () => {
    console.log("reveal!");
    if (controls.current) controls.current.stop();
    controls.current = animate(filterValue, 0, { duration: filterValue.get() / 2 });
  };

  const hideColor = () => {
    if (controls.current) controls.current.stop();
    controls.current = animate(filterValue, 1, { duration: 0.5 - filterValue.get() / 2 });
  };

  const filter = useMotionTemplate`grayscale(${filterValue})  brightness(calc(1 + 0.5 * ${filterValue}))`;

  return <motion.img id={useId()} src={src} className="technology-image" style={{ filter: filter }} onMouseEnter={revealColor} onMouseLeave={hideColor} />;
};
