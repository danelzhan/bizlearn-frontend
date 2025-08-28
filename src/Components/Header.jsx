import { Logo } from "./Logo"
import { ProfileButton } from "./ProfileButton"


export function Header({loggedIn}) {

    return (
        <div style={{display: "flex", justifyContent: "space-between"}}>

            <Logo />{true ? <ProfileButton /> : <div />}

        </div>
    )

}