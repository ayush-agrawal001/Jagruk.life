import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";
import { Theme } from "@excalidraw/excalidraw/types/element/types";
import { useState } from "react";
import { Link, redirectDocument } from "react-router-dom";

function StyleBlog() {
  const [theme, setTheme] = useState<Theme>("dark");
  

  return (
    <div>
      {/* <h1 style={{ textAlign: "center" }}>Excalidraw Example</h1> */}
      <div className="" style={{ height: "100vh" }}>
        <Excalidraw 
        // onChange={(excalidrawElements, appState, files) => {
        //   console.log(files);
        // }}
        // onPointerUpdate={(exportedElements, appState, canvas) => {
        //   console.log(exportedElements);
        // }}
        // onScrollChange={(scrollX: number, scrollY: number) => {
        //   console.log(scrollX, scrollY);
        // }} 
        // viewModeEnabled={true}  ---------> For the posts to only see it
        // initialData={{
        //   elements: [
        //     {
        //       type: "rectangle",
        //       version: 141,
        //       versionNonce: 361174001,
        //       isDeleted: false,
        //       id: "oDVXy8D6rom3H1-LLH2-f",
        //       fillStyle: "hachure",
        //       strokeWidth: 1,
        //       strokeStyle: "solid",
        //       roughness: 1,
        //       opacity: 100,
        //       angle: 0,
        //       x: 100.50390625,
        //       y: 93.67578125,
        //       strokeColor: "#000000",
        //       backgroundColor: "transparent",
        //       width: 186.47265625,
        //       height: 141.9765625,
        //       seed: 1968410350,
        //       groupIds: [],
        //       roundness: null,
        //       boundElements: null,
        //       updated: 1,
        //       link: null,
        //       locked: false,
        //       frameId: null
        //     },
        //   ],
        //   appState: { zenModeEnabled: true, viewBackgroundColor: "#a5d8ff" },
        //   scrollToContent: true
        // }}
        theme={theme}
        >
        <MainMenu>
        <MainMenu.Item onSelect={() => {theme==="dark" ? setTheme("light") : setTheme("dark")}}>
          {theme==="dark" ? "Light" : "Dark"}
        </MainMenu.Item>
        <MainMenu.Item onSelect={() => window.open("https://github.com/ayush-agrawal001", "_blank")}>
          github
        </MainMenu.Item>
      </MainMenu>
      </Excalidraw>
      </div>
    </div>
  );
}

export default StyleBlog;