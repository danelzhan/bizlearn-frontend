export function ProgressBar({percentage, width, height}) {

    return (
        <div style={{width: width + "rem", height: height + "rem"}}>
            <div style={{width: (width * percentage * 0.01) + "rem", height: "100%", backgroundColor: "#7AD040"}}></div>
            <div></div>
        </div>
    )

}