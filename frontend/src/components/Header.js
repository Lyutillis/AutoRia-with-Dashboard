import React from "react";
import "./Header.css";


const Header = () => {
    const href = window.location.href.split("/");
    const current_page = href[href.length - 1];
    return (
        <div className="navbar">
            <a className={current_page === "" ? "active" : ""} href="/">All cars table</a>
            <a className={current_page === "about" ? "active" : ""} href="/about">About</a>
            <a className={current_page === "contact" ? "active" : ""} href="/contact">Contact</a>
        </div>
    )
}

export default Header;
