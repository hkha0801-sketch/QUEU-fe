import React from "react";


export const links: {
  id: number;
  url: string;
  text: string;
  icon: JSX.Element;
}[] = [
  {
    id: 1,
    url: "/",
    text: "home",
    icon: <img src="/HomeButton.png" alt="Home" style={{ width: "30px", height: "30px", verticalAlign: "center", display: "inline-block", opacity: 0.5 }} />,
  },
  {
    id: 2,
    url: "/team",
    text: "aray 's space",
    icon: <img src="/ChatButton.png" alt="Chat" style={{ width: "30px", height: "30px", verticalAlign: "center", display: "inline-block", opacity: 0.5 }} />,
  },
  {
    id: 3,
    url: "/projects",
    text: "road map",
    icon: <img src="/RoadMapButton.png" alt="RoadMap" style={{ width: "30px", height: "30px", verticalAlign: "center", display: "inline-block",opacity: 0.5 }} />,
  },
  {
    id: 4,
    url: "/calendar",
    text: "solo code 1vs1",
    icon: <img src="/SoloButton.png" alt="SoloCode" style={{ width: "30px", height: "30px", verticalAlign: "center", display: "inline-block", opacity: 0.5 }} />,
  },
  {
    id: 5,
    url: "/documents",
    text: "code editor",
    icon: <img src="/EditorButton.png" alt="CodeEditor" style={{ width: "30px", height: "30px", verticalAlign: "center", display: "inline-block", opacity: 0.5 }} />,
  },
  {
    id: 6,
    url: "/documents",
    text: "mock interview",
    icon: <img src="/InterViewButton.png" alt="InterView" style={{ width: "30px", height: "30px", verticalAlign: "center", display: "inline-block", opacity: 0.5 }} />,
  },
];

