import React from "react";
import { Link } from "react-router-dom";

import "../css/Banner.css";

const Banner = () => {
    function spamTitle() {
        const divElement = [];
        for (let i = 0; i < 20; i++) {
            if (i % 2 === 0) {
                divElement.push(
                    <div className="mx-2 title-text-down fw-bold">
                        {" "}
                        <div>D</div> <div>U</div> <div>A</div> <div>L</div>{" "}
                        <div>B</div> <div>L</div> <div>O</div> <div>G</div>{" "}
                    </div>
                );
            } else {
                divElement.push(
                    <div className="mx-1 title-text-up fw-bold">
                        {" "}
                        <div>D</div> <div>U</div> <div>A</div> <div>L</div>{" "}
                        <div>B</div> <div>L</div> <div>O</div> <div>G</div>{" "}
                    </div>
                );
            }
        }
        return (
            <>
                {divElement.map((item, index) => {
                    return <div key={index}>{item}</div>;
                })}
            </>
        );
    }
    return (
        <div className="banner-component bg-warning border-bottom border-dark">
            <div className="container h-100 d-flex justify-content-between">
                <div className="col-6 col-left">
                    <div className="title font-title">Stay curious.</div>
                    <div className="description font-text col-10">
                        Discover stories, thinking, and expertise from writers
                        on any topic.
                    </div>
                    <Link to="/register">
                        <div className="btn btn-dark px-5 font-btn mt-3 rounded-pill">
                            Start reading
                        </div>
                    </Link>
                </div>
                <div className="col-5 col-right d-flex">{spamTitle()}</div>
            </div>
        </div>
    );
};

export default Banner;
