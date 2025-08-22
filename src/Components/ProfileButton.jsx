import { useNavigate, Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';


export function ProfileButton() {

    const navigate = useNavigate();
    return (
        <button onClick={() => navigate("/profile")} >
            <div style={{ display: "flex", color: "#FFFFFF", width: "6rem", justifyContent: "space-between" }}>
                <PersonIcon style={{fontSize: "2.1rem"}} />
            </div>
        </button>

    )

}