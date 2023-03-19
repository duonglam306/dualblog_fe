import React, { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

import "../css/Message.css";

const Message = ({ variant = "info", children }) => {
    const [show, setShow] = useState(true);

    const toggleShow = () => setShow(!show);

    setTimeout(() => {
        setShow(false);
    }, 3000);

    return (
        <ToastContainer position="top-end" className="p-3">
            <Toast show={show} onClose={toggleShow} className="bg-white border-4 border-danger" >
                <Toast.Header>
                    <strong className="me-auto text-danger">
                        <span className="me-2">
                            <i
                                className="fa fa-exclamation-circle"
                                aria-hidden="true"
                            ></i>
                        </span>
                        Error
                    </strong>
                </Toast.Header>
                <Toast.Body>{children}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default Message;
