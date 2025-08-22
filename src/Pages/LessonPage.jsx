
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { EditorPage } from "./EditorPage";
import { VideoPage } from "./VideoPage";

export function LessonPage({userData, setUserData}) {

    const BRIDGE_URL = 'https://bizlearn-backend.onrender.com';
    const { slug, id } = useParams();
    const [lesson, setLesson] = useState(null);
    
    useEffect(() => {
    fetch(`${BRIDGE_URL}/api/courses/${slug}/lessons/${id}`)
        .then(res => res.json())
        .then(data => setLesson(data));
    }, [slug]);

    if (!lesson) {
        return <p>Loading...</p>;
    }

    if (lesson.type == "VideoLesson") {
        return <VideoPage lesson={lesson} userData={userData} setUserData={setUserData} />
    } else if (lesson.type == "InteractiveLesson") {
        return <EditorPage lesson={lesson} userData={userData} setUserData={setUserData} />
    }
}
