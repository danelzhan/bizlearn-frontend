 import { Course } from "./Objects.js"

const BRIDGE_URL = 'http://localhost:5000' || "http://127.0.0.1:5000";

export async function fetchCourseBySlug(slug) {
    const response = await fetch(`${BRIDGE_URL}/api/courses/${encodeURIComponent(slug)}`);
    const data = await response.json();
    return new Course(data)
}

fetchCourseBySlug("zero-to-fullstack-bootcamp")  