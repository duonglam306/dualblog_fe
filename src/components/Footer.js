import React from "react";

import "../css/Footer.css";

const Footer = () => {
    return (
        <>
            <span className="font-text footer-component d-flex justify-content-center align-items-center pt-2">
                <i className="fa fa-copyright m-1" aria-hidden="true"></i> Lam
                Thanh Duong - Designveloper.
            </span>
            <span className="font-text footer-component d-flex justify-content-center align-items-center">
                Powered by Medium.
            </span>
        </>
    );
};

export default Footer;
