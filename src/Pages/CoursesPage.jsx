import { CoursePanel } from '../Components/CoursePanel'
import { Link, useLocation } from "react-router-dom"

export function CoursesPage({courses, percentage}) {

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "40rem"}}>
      <Link to={`/course/${courses.uid}`} ><CoursePanel course={courses} percentage={percentage} /></Link>
      
    </div>
  )
}
