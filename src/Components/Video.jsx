export function Video({url}) {

    return <iframe
        src={url}
        title="YouTube Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={false}
        style={{
            border: "none",
            width: "100%",
            height: "100%"
        }}
    />

}