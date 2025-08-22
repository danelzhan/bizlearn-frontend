import { Logo } from "./Logo"
import { ProfileButton } from "./ProfileButton"


export function Header() {

    return (
        <div style={{display: "flex", justifyContent: "space-between"}}>

            <Logo /><ProfileButton />

        </div>
    )

}