import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { LogoutButton } from "../Components/LogoutButton";

export function ProfilePage ({user, userData, setUserData}) {
    const BRIDGE_URL = 'https://bizlearn-backend.onrender.com';
    useEffect(() => {
        if (user)
        fetch(`${BRIDGE_URL}/api/users/${user.email}`)
            .then(res => res.json())
            .then(data => setUserData(data));
    }, []);

    return (
        userData ? 
        <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "80vh"}}>
            <div>
                <h2>{userData.name}</h2>
                <p>{userData.email}</p>
                <p>{userData ? userData.points : ""}</p>
                <LogoutButton />
            </div>

        </div> :
        <p>loading...</p>
    );
}