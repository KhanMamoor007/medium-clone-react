import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase-config";
import "./PostCard.css";
import Chip from "@material-ui/core/Chip";

const PostCard = ({ post }) => {
  const [authorData, setAuthorData] = useState(null);

  useEffect(() => {
    const getAuthorData = async () => {
      const authorDoc = await getDoc(doc(db, "users", post.data.author));
      setAuthorData(authorDoc.data());
    };

    getAuthorData();
  }, [post]);
  console.log(authorData?.imageUrl);
  return (
    <div className="post">
      <Link className="post-Card" to={`/post-details/${post.id}`}>
        <div className="posts-Details">
          <div className="author-Post-Container">
            <div className="author-Image-Container">
              {authorData && (
                <img
                  src={`${authorData.imageUrl}`}
                  alt="author"
                  className="author-Image"
                />
              )}
            </div>
            {/* <div className="author-Name">{authorData?.name}</div> */}
            <Chip
              className="author-Name"
              label={authorData?.name}
              component="a"
              clickable
            />
          </div>
          <h2 className="title-Post">{post.data.title}</h2>
          <div className="briefing">{post.data.brief}</div>
          <div className="details-Container">
            <span className="article-Details">
              {new Date(post.data.postedOn).toLocaleString("en-US", {
                day: "numeric",
                month: "short",
              })}
              • {post.data.postLength} min read •
              <Chip
                label={post.data.category}
                component="a"
                href="#chip"
                clickable
              />
              {/* <span className="category">{post.data.category}</span> */}
            </span>
            <span className="bookmark-Container"></span>
          </div>
        </div>
        <div className="thumbnail-Container">
          <img
            src={`${post.data.bannerImage}`}
            alt="thumbnail"
            className="thumbnail-Image"
          />
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
