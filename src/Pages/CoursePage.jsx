import { ProgressBar } from "../Components/ProgressBar"
import { LessonPanel } from "../Components/LessonPanel"
import { BackButton } from "../Components/BackButton"

import { useParams, Link} from "react-router-dom";
import { useEffect, useState } from "react";

const BRIDGE_URL = 'https://bizlearn-backend.onrender.com';

export function CoursePage({percentage, userData, setUserData}) {

    const { slug } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
    fetch(`${BRIDGE_URL}/api/courses/${slug}`)
      .then(res => res.json())
      .then(data => setCourse(data));
    }, [slug]);

    if (!course) return <p>Loading...</p>;


    const width = 75

    return (
        
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
            <div style={{width: width + "rem"}}>
                <div style={{display: "flex", justifyContent: "space-between", width: "74.5rem", margin: "0.5rem"}}>
                    <p className={"page_title"} >{course.title}</p>
                    <BackButton prev_url={"/"} />
                </div>
                <div style={{borderRadius: "1rem", overflow: "hidden", backgroundColor: "#172037", height: "40rem"}}>
                    <ProgressBar percentage={percentage} height={1} width={width} />
                    {course.lessons.map((lesson, index) => (
                        userData.courses_enrolled[0].lessons_completed.some(l => l.id == lesson.id) ?
                        <Link key={index} to={`/course/${slug}/lesson/${lesson.id}`}><LessonPanel title={lesson.title} description={lesson.description} completed={true} /></Link> :
                        <Link key={index} to={`/course/${slug}/lesson/${lesson.id}`}><LessonPanel title={lesson.title} description={lesson.description} completed={false} /></Link>
                    ))}
                </div>
            </div>

        </div>

    )
}