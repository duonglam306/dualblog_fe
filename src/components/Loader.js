import React from "react";
const Loader = () => {
    return (
        <div className="text-dark d-flex justify-content-center my-5">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Loader;
