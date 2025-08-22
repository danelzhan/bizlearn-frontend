export function LessonPanel({title, description}) {

    return (
        <div style={{padding: "2rem", paddingBottom: "0.5rem", color: "#FFFFFF"}}>
            <p style={{fontSize: "24px"}}>{title}</p>
            <p style={{fontSize: "15px"}}>{description}</p>
        </div>
    )

}