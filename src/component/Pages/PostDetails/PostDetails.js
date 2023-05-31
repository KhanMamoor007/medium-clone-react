import { useState, useContext, useEffect } from "react";
import { MediumContext } from "../../context/MediumContext";
import { useParams } from "react-router-dom";
import React from "react";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import HorizontalSplitIcon from "@material-ui/icons/HorizontalSplit";
import "../PostDetails/PostDetails.css";
import { IconButton } from "@material-ui/core";

const Post = () => {
  const { slug } = useParams();
  let navigate = useNavigate();
  const { allPosts, allUsers } = useContext(MediumContext);
  const [author, setAuthor] = useState([]);
  const [post, setPost] = useState([]);

  useEffect(() => {
    if (!(allPosts.length === 0)) {
      setPost(allPosts.filter((post) => post.id === slug));
    }
  }, [allPosts, slug]);

  useEffect(() => {
    if (!(post.length === 0 || allUsers.length === 0)) {
      setAuthor(allUsers.filter((user) => user.id === post[0].data.author));
    }
  }, [allUsers, post, allUsers.length]);

  // Function to handle the back button click
  const handleBackButtonClick = () => {
    navigate("/"); // Go back to the previous page
  };

  return (
    <div className="wrapper">
      <div className="content">
        {post && author && post.length > 0 && author.length > 0 ? (
          <>
            <Button onClick={handleBackButtonClick}>
              <KeyboardBackspaceIcon />
              Back
            </Button>
            <div className="referencesContainer">
              <div className="authorContainer">
                <div className="authorProfileImageContainer">
                  <img
                    className="image"
                    src={`${author[0].data.imageUrl}`}
                    alt="author"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="column">
                  <div>{author[0].data?.name}</div>
                  <div className="postDetails">
                    <span>
                      {" "}
                      {new Date(post[0].data?.postedOn).toLocaleString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "short",
                        }
                      )}{" "}
                      • {post[0].data?.postLength} min read •
                    </span>
                    <span className="listenButton">
                      <PlayCircleFilledIcon /> Listen
                    </span>
                  </div>
                </div>
              </div>
              <div className="socials">
                <IconButton>
                  <TwitterIcon />
                </IconButton>
                <IconButton>
                  <FacebookIcon />
                </IconButton>
                <IconButton>
                  <LinkedInIcon />
                </IconButton>
                <IconButton>
                  <FileCopyIcon />
                </IconButton>

                <div className="space" />
                <IconButton>
                  <BookmarkIcon />
                </IconButton>
                <IconButton>
                  <HorizontalSplitIcon />
                </IconButton>
              </div>
            </div>
            <div className="articleMainContainer">
              <div className="bannerContainer">
                <img
                  className="image"
                  src={`${post[0].data.bannerImage}`}
                  alt="banner"
                />
              </div>
              <h1 className="title">{post[0].data?.title}</h1>
              <h4 className="subtitle">
                <div>
                  {" "}
                  {author[0].data?.name},{" "}
                  {new Date(post[0].data?.postedOn).toLocaleString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
                <div>{post[0].data?.brief}</div>
              </h4>
              <div className="articleText">{post[0].data?.body} </div>
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Post;
