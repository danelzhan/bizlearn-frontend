
export function Logo(course) {
    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "9.6rem", fontSize: "20px", margin: "2rem"}}>
            <img src={import.meta.env.BASE_URL + "biztech_logo.png"} alt="" style={{width: '2.5rem', height: '2.5rem'}}/> 
            <p>ubc biztech</p>
        </div>
    );
}