import { DevEnvironment } from "../Components/DevEnvironment"
import { BackButton } from "../Components/BackButton"
import { SubmitButton } from "../Components/SubmitButton"

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


export function EditorPage({lesson, userData, setUserData}) {

  const [html, setHTML] = useState(lesson.default_html);
  const [css, setCSS] = useState(lesson.default_css);
  const [js, setJS] = useState(lesson.default_js);

  function submitLesson() {
        const BRIDGE_URL = 'https://bizlearn-backend.onrender.com';
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

  function loadLesson() {
    const BRIDGE_URL = 'https://bizlearn-backend.onrender.com';
    if (userData.courses_enrolled[0].lessons_completed.some(l => l.id == lesson.id)) {
      const userLesson = userData.courses_enrolled[0].lessons_completed.find(l => String(l.id) === String(lesson.id));
      setHTML(userLesson.saved_html);
      setCSS(userLesson.saved_css);
      setJS(userLesson.saved_js);
      console.log(userLesson.saved_html);
    }
  }

  useEffect(() => {
    loadLesson()
  }, [userData])

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        <div style={{display: "flex", justifyContent: "space-between", width: "74.5rem", margin: "0.5rem"}}>
            <p className={"page_title"} >{lesson.title}</p>
            <BackButton prev_url={"/course/zero-to-fullstack-bootcamp"} />
        </div>
        <DevEnvironment inputHTML={html} inputCSS={css} inputJS={js} setHTML={setHTML} setCSS={setCSS} setJS={setJS} email={userData.email} />
        <div style={{display: "flex", justifyContent: "space-between", width: "75rem"}}>
          <div />
          <button onClick={submitLesson}><SubmitButton label={"Submit"} /></button>
        </div>
    </div>

  )
}
