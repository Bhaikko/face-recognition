import React from 'react';

import './Navigation.css'

const Navigation = (props) => {
    if(props.bSignedIn)
    {
        return (
            <nav>
                <p onClick={() => props.onRouteChange("signout")} className="f3 link dim black underline pa3 pointer">Sign Out</p>
            </nav>
        );
    }
    else
    {
        return (
            <nav>
                <p onClick={() => props.onRouteChange("register")} className="f3 link dim black underline pa3 pointer">Register</p>
                <p onClick={() => props.onRouteChange("signin")} className="f3 link dim black underline pa3 pointer">Sign In</p>
            </nav>
        )
    }
    
}

export default Navigation;