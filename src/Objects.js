export class Course {

    // constructor(uid, thumbnail, title, description, lessons) {
    //     this.uid = uid;
    //     this.thumbnail = thumbnail;
    //     this.title = title;
    //     this.description = description;
    //     this.lessons = lessons;
    // }

    constructor(lessonData) {

        this.uid = lessonData.slug;
        this.thumbnail = lessonData.image;
        this.title = lessonData.title;
        this.description = lessonData.description;
        this.lessons = [];
        lessonData.lessons.forEach((lesson, index) => {
            var lessonObject = null;
            
            if (lesson.type == "VideoLesson") {
                lessonObject = new VideoLesson(lesson.id, lesson.title, lesson.description, lesson.url);
            } else if (lesson.type == "InteractiveLesson") {
                lessonObject = new InteractiveLesson(lesson.id, lesson.title, lesson.description, lesson.default_html, lesson.default_css, lesson.default_js)
            }

            this.lessons[index] = lessonObject;

        })

    }

}

export class Lesson {
    constructor(uid, title, description) {
        this.uid = uid;
        this.title = title;
        this.description = description;
    }
}

export class VideoLesson extends Lesson {
    constructor(uid, title, description, url) {
        super(uid, title, description);
        this.url = url;
    }
}

export class InteractiveLesson extends Lesson {
    constructor(uid, title, description, html, css, js) {
        super(uid, title, description);
        this.html = html;
        this.css = css;
        this.js = js;
    }
}

export class User {
    constructor(uid, courseList) {
        this.uid = uid;
        this.courseList = courseList;
    }
}