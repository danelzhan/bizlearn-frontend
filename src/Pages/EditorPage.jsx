import { DevEnvironment } from "../Components/DevEnvironment"
import { BackButton } from "../Components/BackButton"
import { SubmitButton } from "../Components/SubmitButton"

import { Link } from "react-router-dom";
import { useState } from "react";


export function EditorPage({lesson, userData, setUserData}) {

  const [html, setHTML] = useState(lesson.default_html);
  const [css, setCSS] = useState(lesson.default_css);
  const [js, setJS] = useState(lesson.default_js);

  function submitLesson() {
        const BRIDGE_URL = 'http://localhost:5000' || "http://127.0.0.1:5000";
        if (userData.courses_enrolled[0].lessons_completed.some(l => l.id == lesson.id)) {
            return;
        }   
        const newLesson = {
            id: `${lesson.id}`,
            saved_html: `${html}`,
            saved_css: `${css}`,
            saved_js: `${js}`
        };
        userData.courses_enrolled[0].lessons_completed.push(newLesson);
        setUserData(userData)
        console.log(userData)
        fetch(
            `${BRIDGE_URL}/api/users/${userData.email}`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({"courses_enrolled": userData.courses_enrolled})
            }
        );
  }

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        <div style={{display: "flex", justifyContent: "space-between", width: "74.5rem", margin: "0.5rem"}}>
            <p className={"page_title"} >{lesson.title}</p>
            <BackButton />
        </div>
        <DevEnvironment inputHTML={html} inputCSS={css} inputJS={js} setHTML={setHTML} setCSS={setCSS} setJS={setJS} email={userData.email} />
        <div style={{display: "flex", justifyContent: "space-between", width: "75rem"}}>
          <div />
          <button onClick={submitLesson}><SubmitButton label={"Submit"} /></button>
        </div>
    </div>

  )
}
