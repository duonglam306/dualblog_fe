import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import Cookies from "js-cookie";

import { getDetailArticle } from "../actions/articleActions";

import { HeaderHorizontal } from "../components/Header";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ErrorNotFound from "../components/ErrorNotFound";

import "../css/EditorScreen.css";

const EditorScreen = () => {
    document.querySelector("title").innerHTML = "Editor — DualBlog";
    let token = Cookies.get("token");

    const config = {
        style: {
            font: "0.8em Arial",
        },
        toolbarStickyOffset: 80,
    };

    let { slug } = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const articleDetails = useSelector((state) => state.articleDetails);
    const { article, loading } = articleDetails;

    const articleCreate = useSelector((state) => state.articleCreate);
    const articleUpdate = useSelector((state) => state.articleUpdate);

    const tagInput = [
        {
            type: "text",
            value: "",
        },
    ];

    const [error, setError] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [body, setBody] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [tagInputList, setTagInputList] = useState(tagInput);

    const [validTitle, setValidTitle] = useState(false);
    const [validDescription, setValidDescription] = useState(false);
    const [validThumbnailUrl, setValidThumbnailUrl] = useState(false);

    function addInput() {
        setTagInputList((prev) => {
            return [
                ...prev,
                {
                    type: "text",
                    value: "",
                },
            ];
        });
    }
    function removeInput() {
        setTagInputList((prev) => {
            let newArr = prev.slice(0, prev.length - 1);

            return newArr;
        });
    }
    const handleChange = (e) => {
        e.preventDefault();

        const index = e.target.id;
        setTagInputList((prev) => {
            let newArr = prev.slice();
            newArr[index].value = e.target.value;

            return newArr;
        });
    };

    function checkUrl(str) {
        if (str) {
            if (str.indexOf(".jpg") > -1) {
                return true;
            }
            if (str.indexOf(".gif") > -1) {
                return true;
            }
            if (str.indexOf(".png") > -1) {
                return true;
            }
            if (str.indexOf(".jpeg") > -1) {
                return true;
            }
            return false;
        } else {
            return false;
        }
    }
    useEffect(() => {
        if (userLogin.error || articleDetails.error || userInfo.username !== article.auth_name) {
            setError(true);
        }
        else {
            setError(false);
        }
    },[userLogin, articleDetails, article, userInfo])
    useEffect(() => {
        if (articleCreate.success) {
            navigate(`/article/${articleCreate.article.slug}`);
        }
        if (articleUpdate.success) {
            navigate(`/article/${articleUpdate.article.slug}`);
        }
    }, [articleUpdate, articleCreate, navigate]);

    useEffect(() => {
        if (slug) {
            dispatch(getDetailArticle(slug));
        }
    }, [slug, dispatch]);

    useEffect(() => {
        if (!userInfo || !token) {
            navigate("/login");
        }

        if (article && slug) {
            const { title, body, description, tagList, thumbnail_url } =
                article;
            setTitle(title);
            setDescription(description);
            setBody(body);
            setThumbnailUrl(thumbnail_url);
            setTagInputList(() => {
                let newArr =
                    tagList &&
                    tagList.map((item) => {
                        return {
                            type: "text",
                            value: item,
                        };
                    });
                return newArr;
            });

            setValidTitle(true);
            setValidDescription(true);
            setValidThumbnailUrl(true);
        }
    }, [navigate, userInfo, token, article, slug]);
    if (error) {
        return <ErrorNotFound />;
    }
    return (
        <div className="position-relative">
            {articleCreate.error && (
                <Message variant="danger">{articleCreate.error}</Message>
            )}
            {articleUpdate.error && (
                <Message variant="danger">{articleUpdate.error}</Message>
            )}
            <HeaderHorizontal
                isEditorPage={true}
                article={{
                    title: title,
                    description: description,
                    body: body,
                    thumbnailUrl: thumbnailUrl,
                    tagInputList: tagInputList,
                    slug: slug,
                }}
                token={token}
                feature={slug ? "update" : "create"}
            />

            <div className="editor-component py-4">
                <div className="container">
                    {loading ? (
                        <Loader />
                    ) : articleCreate.loading ? (
                        <Loader />
                    ) : articleUpdate.loading ? (
                        <Loader />
                    ) : (
                        <div className="col-8 mx-auto">
                            <form noValidate>
                                <div className="mb-3 col-12">
                                    <label htmlFor="titleInputCreate">
                                        Title{" "}
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${
                                            validTitle ? "" : "is-invalid"
                                        }`}
                                        id="titleInputCreate"
                                        value={title ? title : ""}
                                        onChange={(e) => {
                                            setTitle(e.target.value);
                                            if (e.target.value && e.target.value.length < 255) {
                                                setValidTitle(true);
                                            } else setValidTitle(false);
                                        }}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        This field is required. Max length of title is 255 characters.
                                    </div>
                                </div>
                                <div className="mb-3 col-12 d-flex justify-content-between">
                                    <div className="col-7 mb-auto">
                                        <label htmlFor="thumbnailInputCreate">
                                            Thumbnail{" "}
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${
                                                validThumbnailUrl
                                                    ? ""
                                                    : "is-invalid"
                                            }`}
                                            id="thumbnailInputCreate"
                                            value={
                                                thumbnailUrl ? thumbnailUrl : ""
                                            }
                                            onChange={(e) => {
                                                setThumbnailUrl(e.target.value);
                                                if (
                                                    e.target.value &&
                                                    checkUrl(e.target.value)
                                                ) {
                                                    setValidThumbnailUrl(true);
                                                } else
                                                    setValidThumbnailUrl(false);
                                            }}
                                            required
                                        />
                                        <div className="invalid-feedback">
                                            This field is required. File type:
                                            JPG, JPEG, PNG or GIF.
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <img
                                            src={
                                                thumbnailUrl
                                                    ? thumbnailUrl
                                                    : "http://placehold.jp/20/b1aaaa/ffffff/300x150.png?text=thumbnail_article"
                                            }
                                            alt="thumbnail"
                                            className="img-fluid border"
                                        />
                                    </div>
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="descriptionInputCreate">
                                        Description{" "}
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${
                                            validDescription ? "" : "is-invalid"
                                        }`}
                                        id="descriptionInputCreate"
                                        value={description ? description : ""}
                                        onChange={(e) => {
                                            setDescription(e.target.value);
                                            if (e.target.value && e.target.value.length < 400) {
                                                setValidDescription(true);
                                            } else setValidDescription(false);
                                        }}
                                        required
                                    />
                                    <div className="invalid-feedback">
                                        This field is required.  Max length of description is 255 characters.
                                    </div>
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="contentInputCreate">
                                        Content{" "}
                                        <span className="text-danger">*</span>
                                    </label>
                                    <JoditEditor
                                        tabIndex={1}
                                        onBlur={(newContent) => {
                                            setBody(newContent);
                                        }}
                                        value={body}
                                        config={config}
                                        id="contentInputCreate"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Tags</label>
                                    <div className="col-12 d-flex justify-content-start tagList">
                                        {slug ? (
                                            <>
                                                {tagInputList &&
                                                    tagInputList.map(
                                                        (item, index) => {
                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className="col-3 me-2"
                                                                >
                                                                    <input
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                        className={`form-control`}
                                                                        value={
                                                                            item.value
                                                                        }
                                                                        id={
                                                                            index
                                                                        }
                                                                        type={
                                                                            item.type
                                                                        }
                                                                        disabled
                                                                    />
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                            </>
                                        ) : (
                                            <>
                                                {tagInputList &&
                                                    tagInputList.map(
                                                        (item, index) => {
                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className="col-3 me-2"
                                                                >
                                                                    <input
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                        className={`form-control`}
                                                                        value={
                                                                            item.value
                                                                        }
                                                                        id={
                                                                            index
                                                                        }
                                                                        type={
                                                                            item.type
                                                                        }
                                                                    />
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                            </>
                                        )}
                                        <div
                                            className={`btn border-secondary text-secondary rounded-circle me-2 ${
                                                ((tagInputList &&
                                                    tagInputList.length ===
                                                        3) ||
                                                    slug) &&
                                                "d-none"
                                            }`}
                                            id="btn-plus-tag"
                                            onClick={addInput}
                                        >
                                            {" "}
                                            <i
                                                className="fa fa-plus"
                                                aria-hidden="true"
                                            ></i>
                                        </div>
                                        <div
                                            className={`btn border-secondary text-secondary rounded-circle ${
                                                ((tagInputList &&
                                                    tagInputList.length ===
                                                        1) ||
                                                    slug) &&
                                                "d-none"
                                            }`}
                                            id="btn-minus-tag"
                                            onClick={removeInput}
                                        >
                                            {" "}
                                            <i
                                                className="fa fa-minus"
                                                aria-hidden="true"
                                            ></i>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
            <div className="border-top">
                <Footer />
            </div>
        </div>
    );
};

export default EditorScreen;
