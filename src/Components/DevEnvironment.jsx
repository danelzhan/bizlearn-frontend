import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";



export function DevEnvironment({ inputHTML, inputCSS, inputJS, setHTML, setCSS, setJS, email }) {

  const BRIDGE_URL = 'http://localhost:5000' || "http://127.0.0.1:5000";

  const normalize = s =>
    String(s).replace(/\r\n/g, '\n').replace(/\\n/g, '\n'); 

  const defaultHTML = inputHTML
  const defaultCSS = inputCSS
  const defaultJS = inputJS

  const [activeTab, setActiveTab] = useState("html");
  const [html, setHtml] = useState(normalize(defaultHTML));
  const [css, setCss] = useState(normalize(defaultCSS));
  const [js, setJs] = useState(normalize(defaultJS));
  const iframeRef = useRef(null);
  

  const backgroundColor = "#172037";

  const generateSrcDoc = () => `
    <!DOCTYPE html>
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}<\/script>
      </body>
    </html>
  `;

  const saveCode = async (html, css, js) => {
    await fetch(
      `${BRIDGE_URL}/api/users/${email}/courses/zero-to-fullstack-bootcamp/code`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html, css, js })
      }
    );
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (iframeRef.current) {
        iframeRef.current.srcdoc = generateSrcDoc();
      }

      const codeData = { html, css, js };
      localStorage.setItem("savedCode", JSON.stringify(codeData));
      setHTML(html)
      setCSS(css)
      setJS(js)
    }, 750);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const handleEditorMount = (editor, monaco) => {
    monaco.editor.defineTheme("myCustomTheme", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
        "editor.background": backgroundColor,
        "editor.foreground": "#FFFFFF"
        }
    });
    monaco.editor.setTheme("myCustomTheme");
    };

    const renderEditor = () => {
    
    const commonProps = {

        theme: "myCustomTheme",
        onMount: handleEditorMount,
        options: { 
            fontSize: 14, 
            minimap: { enabled: false },
            // scrollbar: {
            //     vertical: "hidden",
            //     horizontal: "hidden",
            //     handleMouseWheel: true, // allow scroll via mouse
            //     alwaysConsumeMouseWheel: false
            // },
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
        }

    };

    switch (activeTab) {
        case "html":
        return (
            <Editor
            defaultLanguage="html"
            value={html}
            onChange={v => setHtml(v)}
            {...commonProps}
            />
        );
        case "css":
        return (
            <Editor
            defaultLanguage="css"
            value={css}
            onChange={v => setCss(v)}
            {...commonProps}
            />
        );
        case "js":
        return (
            <Editor
            defaultLanguage="javascript"
            value={js}
            onChange={v => setJs(v)}
            {...commonProps}
            />
        );
        default:
        return null;
        }
    };

  return (
    <div style={{ display: "flex", height: "40rem", width: "100%", alignItems: "center", justifyContent: "center"}}>
      {/* Left: Tabs + Editor */}
      <div style={{ width: "40rem", height: "100%", display: "flex", flexDirection: "column", 
        borderRadius: "1rem", overflow: "hidden", margin: "1rem"}}>
        <div style={{ display: "flex", backgroundColor: backgroundColor }}>
          {["html", "css", "js"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "10px 20px",
                color: "white",
                backgroundColor: activeTab === tab ? "#333" : backgroundColor,
                border: "none",
                borderBottom: activeTab === tab ? "2px solid #007acc" : "none",
                cursor: "pointer",
              }}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
        <div style={{ flex: 1, height: "100%", backgroundColor: backgroundColor }}>{renderEditor()}</div>
      </div>

      {/* Right: Live Preview */}
      <div style={{ width: "34rem", height: "100%", borderRadius: "1rem", overflow: "hidden", margin: "1rem", marginLeft: "0" }}>
        <iframe
          ref={iframeRef}
          sandbox="allow-scripts"
          title="Live Preview"
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      </div>
    </div>
  );
}
