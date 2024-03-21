import React from "react";
import "./Header.css";


const Header = () => {
    return (
        <div className="navbar">
            <a className="active" href="#home">All cars table</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
        </div>
    )
}

export default Header;
