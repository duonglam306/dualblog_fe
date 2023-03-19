import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

import { deleteArticle } from "../actions/articleActions";

import "../css/Modal.css";

function Modal() {

    let token = Cookies.get("token");

    const dispatch = useDispatch();

    const articleDetails = useSelector((state) => state.articleDetails);
    const { article } = articleDetails;

    const deleteHandler = (slug) => {
        dispatch(deleteArticle(slug, token, "details"));
    };

    return (
        <>
            {article && (
                <div className="modal fade" id="deleteModalDetails">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0">
                            <div className="modal-header border-0">
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body d-flex align-items-center">
                                <div className="mx-auto">
                                    <div className="text-center title font-text">
                                        Delete article
                                    </div>
                                    <div className="text-center description font-text mb-3">
                                        Are you sure you want to delete this
                                        article?
                                    </div>
                                    <div className="d-flex mx-auto col-6 justify-content-around">
                                        <button
                                            type="button"
                                            className="btn font-btn btn-outline-secondary rounded-pill"
                                            data-bs-dismiss="modal"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="btn font-btn btn-danger rounded-pill"
                                            data-bs-dismiss="modal"
                                            onClick={() =>
                                                deleteHandler(article.slug)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
export default Modal;
