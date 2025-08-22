import { CoursePanel } from '../Components/CoursePanel'
import { Link, useLocation } from "react-router-dom"
import { LoginButton } from "../Components/LoginButton"

export function LoginPage() {

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "40rem"}}>
      
      <LoginButton />
      
    </div>
  )
}
