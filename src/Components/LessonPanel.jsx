import LockIcon from '@mui/icons-material/Lock';

export function LessonPanel({title, description, completed, locked}) {

    if (locked) {
        return <div style={{padding: "2rem", paddingBottom: "0.5rem", color: "#FF0000"}}>
            <p style={{fontSize: "24px"}}>{title}</p>
            <p style={{fontSize: "15px"}}>{description}</p>
            <LockIcon />
        </div>
    }

    return (
        !completed ?
        <div style={{padding: "2rem", paddingBottom: "0.5rem", color: "#FFFFFF"}}>
            <p style={{fontSize: "24px"}}>{title}</p>
            <p style={{fontSize: "15px"}}>{description}</p>
        </div> :
        <div style={{padding: "2rem", paddingBottom: "0.5rem", color: "#AAAAAA"}}>
            <p style={{fontSize: "24px"}}>{title}</p>   
            <p style={{fontSize: "15px"}}>{description}</p>
        </div>
    )

}