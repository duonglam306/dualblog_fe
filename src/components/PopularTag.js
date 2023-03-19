import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { listTag } from "../actions/tagActions";

import Loader from "../components/Loader";

import MedalFirst from "../image/medal_first.png";
import MedalSecond from "../image/medal_second.png";
import MedalThird from "../image/medal_third.png";
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
                                  if (index === 0) {
                                      return (
                                          <Link
                                              to={`/tag/${tagHandle(tag.name)}`}
                                              className="text-decoration-none"
                                              key={index}
                                          >
                                              <div className="item-tag item-first p-2 m-1 d-flex align-items-center justify-content-center">
                                                  <img
                                                      className="medal img-fluid me-1"
                                                      src={MedalFirst}
                                                      alt="tag-medal"
                                                  />{" "}
                                                  {tag.name}
                                              </div>
                                          </Link>
                                      );
                                  }
                                  if (index === 1) {
                                      return (
                                          <Link
                                              to={`/tag/${tagHandle(tag.name)}`}
                                              className="text-decoration-none"
                                              key={index}
                                          >
                                              <div className="item-tag item-second p-2 m-1 d-flex align-items-center justify-content-center">
                                                  <img
                                                      className="medal img-fluid me-1"
                                                      src={MedalSecond}
                                                      alt="tag-medal"
                                                  />{" "}
                                                  {tag.name}
                                              </div>
                                          </Link>
                                      );
                                  }
                                  if (index === 2) {
                                      return (
                                          <Link
                                              to={`/tag/${tagHandle(tag.name)}`}
                                              className="text-decoration-none"
                                              key={index}
                                          >
                                              <div className="item-tag item-third p-2 m-1 d-flex align-items-center justify-content-center">
                                                  <img
                                                      className="medal img-fluid me-1"
                                                      src={MedalThird}
                                                      alt="tag-medal"
                                                  />{" "}
                                                  {tag.name}
                                              </div>
                                          </Link>
                                      );
                                  }
                                  return (
                                      <Link
                                          to={`/tag/${tagHandle(tag.name)}`}
                                          className="text-decoration-none"
                                          key={index}
                                      >
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
