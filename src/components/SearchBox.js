import React, { useState }from "react";
import { useNavigate } from "react-router-dom";

import "../css/SearchBox.css"

function SearchBox() {
    const [keyword, setKeyword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        if (e.keyCode === 13 && keyword !== "") {
            navigate(`/search/articles/${keyword}`);
        }
    }

    return (
        <div className="input-group search-box-component">
            <span className="input-group-text bg-white rounded-pill rounded-end border-end-0 d-flex justify-content-center align-items-center">
                <i className="fa fa-search" aria-hidden="true"></i>
            </span>
            <input type="text" placeholder="Search" value={keyword} className="form-control rounded-pill rounded-start border-start-0 pb-2" onChange={e => setKeyword(e.target.value)} onKeyDown={e => handleSubmit(e)}/>
        </div>
    );
}

export default SearchBox;
