import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { listTag } from "../actions/tagActions";

import Loader from "../components/Loader";

import "../css/PopularTag.css";

function PopularTag({ tag }) {
  const dispatch = useDispatch();

  const tagList = useSelector((state) => state.tagList);
  const { tags, loading } = tagList;

  useEffect(() => {
    dispatch(listTag());
  }, [dispatch]);

  function tagHandle(str) {
    return str.split(" ").join("-");
  }

  return (
    <div className="popular-tag-component">
      {loading ? (
        <Loader />
      ) : (
        <>
          {tag && (
            <div className="font-subject fw-bold mt-2 ms-1">
              Recommended topics
            </div>
          )}

          <div className="list-tag d-flex py-3 border-bottom">
            {tags && tags.length > 0
              ? tags.map((tag, index) => {
                  return (
                    <Link
                      to={`/tag/${tagHandle(tag.name)}`}
                      className="text-decoration-none"
                      key={index}>
                      <div className="item-tag p-2 m-1 d-flex align-items-center justify-content-center">
                        {tag.name}
                      </div>
                    </Link>
                  );
                })
              : "No tags are here... yet."}
          </div>
        </>
      )}
    </div>
  );
}

export default PopularTag;
