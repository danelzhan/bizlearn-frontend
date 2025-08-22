import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturnSharp';
import { useNavigate } from "react-router-dom";

export function BackButton({prev_url}) {

    const accentColor = "#7AD040"
    const navigate = useNavigate();

    const back = () => {
        if (prev_url) {
            navigate(prev_url)
        }
        if (window.history.length > 1) navigate(-1);
        else navigate(fallback, { replace: true });
    };

    return (
        <button onClick={back}>
            <div style={{ display: "flex", color: accentColor, width: "4.5rem", justifyContent: "space-between" }}>
                <p style={{fontSize: "20px"}}>Back</p>
                <KeyboardReturnIcon />
            </div>
        </button>
    )
}
