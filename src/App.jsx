import { BrowserRouter as Router, Routes, Route, Link, Navigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import './App.css'
import { Header } from './Components/Header'
import { CoursesPage } from './Pages/CoursesPage'
import { EditorPage } from './Pages/EditorPage'
import { CoursePage } from './Pages/CoursePage'
import { VideoPage } from './Pages/VideoPage'
import { LessonPage } from "./Pages/LessonPage";
import { LoginPage } from "./Pages/LoginPage";
import { LogoutPage } from "./Pages/LogoutPage";
import { ProfilePage } from "./Pages/ProfilePage";

import { VideoLesson, InteractiveLesson, Course, User } from './Objects'
import { fetchCourseBySlug } from "./Bridge";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const [demoCourse, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logging, setLogging] = useState(true);
  const { user, isAuthenticated } = useAuth0();
  const BRIDGE_URL = 'https://bizlearn-backend.onrender.com';
  const { params } = useParams();

  useEffect(() => {
    const cached = localStorage.getItem("demoCourse");
    if (cached) {
      setCourse(JSON.parse(cached));
      setLoading(false);
    } else {
      fetchCourseBySlug("zero-to-fullstack-bootcamp").then(course => {
        setCourse(course);
        localStorage.setItem("demoCourse", JSON.stringify(course));
        setLoading(false);
      });
    }
  }, []);

  const [userData, setUserData] = useState(null);
  
  
  useEffect(() => {
    if (!user) return;
    fetch(`${BRIDGE_URL}/api/users/${user.email}`)
        .then(res => res.json())
        .then(data => setUserData(data))
  }, [user]);

  useEffect(() => {
    console.log(userData)
    if (!userData) return;
    if (userData.error == "Not found") {
      setLogging(true)
      const user_data = {
        email: `${user.email}`,
        name: `${user.name}`,
        points: 0,
        courses_enrolled: [
          {
            slug: "zero-to-fullstack-bootcamp",
            lessons_completed: []
          }
        ]
      };

      fetch(`${BRIDGE_URL}/api/users`, {              
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user_data)
      })
      .then(fetch(`${BRIDGE_URL}/api/users/${user.email}`)
        .then(res => res.json())
        .then(data => setUserData(data)))
        .then(setLogging(false))
      
    } else {
      setLogging(false)
    }

  }, [userData])


  if (loading) {
    return   <p>Loading…</p>;
  }

  var percentage = (userData != null && userData.error == null) ? (userData.courses_enrolled[0].lessons_completed.length / demoCourse.lessons.length) * 100 : 0

  return (
    <>
      
      <Router>
      <Header />
        <Routes>
          {isAuthenticated ?
            <Route path="/" element={<CoursesPage courses={demoCourse} percentage={percentage} />} /> :
            <Route path="/" element={<LoginPage />} />
          }
          <Route path="/authenticated" element={<CoursesPage courses={demoCourse} percentage={percentage} />} />
          <Route path="/course/:slug" element={<CoursePage percentage={percentage} userData={userData} />} />
          <Route path="/course/:slug/lesson/:id" element={<LessonPage userData={userData} setUserData={setUserData} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/profile" element={<ProfilePage user={userData} userData={userData} setUserData={setUserData} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
