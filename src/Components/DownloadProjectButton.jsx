import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useState } from "react";

const BRIDGE_URL = 'https://bizlearn-backend.onrender.com';

export function DownloadCodeButton({email, id}) {

    const [code, setCode] = useState(null)

    function buildHtmlDoc(bodyHtml, cssPath = "style.css", jsPath = "script.js") {

        return `<!doctype html>
        <html lang="en">
        <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>My App</title>
        <base href="./">
        <link rel="stylesheet" href="${cssPath}">
        </head>
        <body>
        ${bodyHtml}
        <script src="${jsPath}"></script>
        </body>
        </html>`;
    }

    
    function exportCode (data) {
        const zip = new JSZip();
        console.log(data.saved_html)
        zip.file("index.html", buildHtmlDoc(data.saved_html));
        zip.file("style.css", data.saved_css);
        zip.file("script.js", data.saved_js);
        
        zip.generateAsync({ type: "blob" }).then(content => {
            saveAs(content, "BootcampProject.zip");
        });
    }

    function downloadCode() {

        fetch(`${BRIDGE_URL}/api/users/${email}`)
            .then(res => res.json())
            .then(data => exportCode(data.courses_enrolled[0].lessons_completed.find(l => l.id == id)))
    }

    return (
        <button onClick={downloadCode}>Export Project</button>
    )

}