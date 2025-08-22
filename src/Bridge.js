 import { Course } from "./Objects.js"

const BRIDGE_URL = 'https://bizlearn-backend.onrender.com';

export async function fetchCourseBySlug(slug) {
    const response = await fetch(`${BRIDGE_URL}/api/courses/${encodeURIComponent(slug)}`);
    const data = await response.json();
    return new Course(data)
}

fetchCourseBySlug("zero-to-fullstack-bootcamp")  