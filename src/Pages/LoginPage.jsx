import { CoursePanel } from '../Components/CoursePanel'
import { Navigate } from "react-router-dom"
import { LoginButton } from "../Components/LoginButton"

export function LoginPage({isAuthenticated}) {

  if (isAuthenticated) {
    <Navigate to="/" replace />
  }

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "40rem"}}>
      {!isAuthenticated ? <div /> : <Navigate to="/login" replace />}
      
      <LoginButton />
      
    </div>
  )
}
