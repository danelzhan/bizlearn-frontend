import { BackButton } from "../Components/BackButton"
import { SubmitButton } from "../Components/SubmitButton"
import { Video } from "../Components/Video"

import { useParams, Link  } from "react-router-dom";
import { useEffect, useState } from "react";



export function VideoPage({lesson, userData, setUserData}) {

    const width = 75

    function submitLesson() {
        const BRIDGE_URL = 'http://localhost:5000' || "http://127.0.0.1:5000";
        if (userData.courses_enrolled[0].lessons_completed.some(l => l.id == lesson.id)) {
            return;
        }   
        const newLesson = {
            id: `${lesson.id}`,
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
            <div style={{borderRadius: "1rem", width: width + "rem", height: "40rem", display: "flex", justifyContent: "center",
                 alignItems: "center", backgroundColor: "#172037", padding: "1.5rem"}}>
                <div style={{borderRadius: "1rem", overflow: "hidden", width: "100%", height: "100%"}}>
                    <Video url={lesson.url} />
                </div>
            </div>
            
            <div style={{display: "flex", justifyContent: "space-between", width: "78rem"}}>
                <div />
                <button onClick={submitLesson}><SubmitButton label={"Next"} /></ button>
            </div>
        </div>

    )
}
