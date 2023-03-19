import React from "react";

import Empty from "../image/empty.svg";
import "../css/EmptyData.css"

function EmptyData() {
    return (
        <div className="col-6 mx-auto empty-component">
            <div className="col-10 mx-auto">
                <img src={Empty} alt="empty" />
            </div>
            <div className="empty-title text-center">
                No articles are here... yet.
            </div>
        </div>
    );
}

export default EmptyData;
