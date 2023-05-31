import React, { useState, useContext } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

import Container from "@material-ui/core/Container";

// import "./EditPost.css";
import { makeStyles } from "@material-ui/core/styles";
import icon from "../../../assets/medium.icon.png";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { db } from "../../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import { MediumContext } from "../../context/MediumContext";

const useStyles = makeStyles((theme) => ({
  editPost: {
    display: "block",
    zIndex: 500,
    width: "100%",
    fontSize: 16,
    background: "#fff",
    color: "rgba(0, 0, 0, 0.54)",
    fontFamily:
      'medium-content-sans-serif-font, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    letterSpacing: 0,
    fontWeight: 400,
    fontStyle: "normal",
    WebkitBoxSizing: "border-box",
    boxSizing: "border-box",
    top: 0,
    boxShadow: "none",
  },
  editPostContainer: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: "1032px !important",
    position: "relative",
    height: "65px !important",
    paddingLeft: "20px !important",
    paddingRight: "20px !important",
    marginLeft: "auto !important",
    marginRight: "auto !important",
  },
  userName: {
    fontSize: "22px",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: "bold",
    lineHeight: "1.6",
    letterSpacing: "0.0075em",
    color: "#000",
  },

  userContainer: {
    width: "325px",
    display: "flex",
    justifyContent: "space-between",
  },
  userImage: {
    objectFit: "cover",
    height: "80%",
    width: "50%" /* Adjust width to fill the container */,
  },
  textContainer: {
    maxWidth: "1032px",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  fieldTitle: {
    maxWidth: "82px",
    flex: "1",
    textAlign: "start",
  },
  inputField: {
    width: "100%",
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
  },
  modalInputContainer: {
    flex: "5",
    minHeight: "auto",
    border: "2px solid #000",
  },
  smallField: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    // gap: "1rem",
    marginTop: "2rem",
  },
  buttonDiv: {
    display: "flex",
    justifyContent: "center",
    marginTop: "15px",
  },
  modalAccentedButton: {
    backgroundColor: "black",
    color: "white",
    padding: "2px 4px",
    borderRadius: "50%",
  },
}));

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  // const [state, setState] = React.useState({
  //   checkedA: true,
  //   checkedB: true,
  // });

  // const handleChange = (event) => {
  //   setState({ ...state, [event.target.name]: event.target.checked });
  // };
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function EditPost({ props }) {
  const classes = useStyles();
  let navigate = useNavigate();
  const { user, setAlert } = useContext(MediumContext);
  const [title, setTitle] = useState("");
  const [brief, setBrief] = useState("");
  const [category, setCategory] = useState("");
  const [postLength, setPostLength] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [body, setBody] = useState("");
  const [publishPost, setPublishPost] = useState(false); // State for publish option

  const uploadPost = async (event) => {
    event.preventDefault();

    const post = {
      bannerImage: bannerImage,
      body: body,
      category: category,
      brief: brief,
      postedOn: serverTimestamp(),
      postLength: Number(postLength),
      title: title,
      author: user?.email,
      published: false,
    };

    let docRef;

    if (publishPost) {
      const querySnapshot = await getDocs(
        query(collection(db, "articles"), where("title", "==", title))
      );
      const matchingDocs = querySnapshot.docs;

      if (matchingDocs.length > 0) {
        docRef = matchingDocs[0].ref;
        setAlert({
          open: true,
          message: `Your post has already been published. ${user.displayName}`,
          type: "success",
        });
      } else {
        docRef = await addDoc(collection(db, "articles"), post);
        setAlert({
          open: true,
          message: `Your post has been published. ${user.displayName}`,
          type: "success",
        });
      }

      await updateDoc(docRef, {
        published: true,
      });

      navigate("/");
    } else {
      docRef = await addDoc(collection(db, "articles"), post);

      setAlert({
        open: true,
        message: `Your post has been added to Firebase.${user.displayName}`,
        type: "success",
      });

      // You can also clear the form fields here if needed
    }
  };

  return (
    <React.Fragment>
      <ElevationScroll {...props}>
        <AppBar className={classes.editPost}>
          <Toolbar className={classes.editPostContainer}>
            <div className={classes.userContainer}>
              <img src={icon} alt="author" height={34} width={43} />
              <Typography className={classes.userName} variant="h6">
                Draft In {user?.displayName}
              </Typography>
            </div>
            {user && ( // Add conditional rendering to ensure user is not null
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="smallField">
                  <span className="modalInputContainer">
                    <label style={{ color: "#000" }} htmlFor="publishToggle">
                      Publish
                    </label>
                    <input
                      id="publishToggle"
                      className="toggleInput"
                      type="checkbox"
                      checked={publishPost}
                      onChange={() => setPublishPost(!publishPost)}
                    />
                  </span>
                </div>
                <div style={{ marginLeft: "14px" }}>
                  <MoreHorizIcon />
                </div>
                <div style={{ marginLeft: "14px" }}>
                  <img
                    src={user?.photoURL}
                    className={classes.userImage}
                    alt="author"
                    width={50}
                    height={80}
                  />
                </div>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>

      <Toolbar />
      <Container className={classes.textContainer}>
        <div className={classes.smallField}>
          <span className={classes.fieldTitle}>Title</span>
          <span className={classes.modalInputContainer}>
            <input
              className={classes.inputField}
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </span>
        </div>
        <div className={classes.smallField}>
          <span className={classes.fieldTitle}>Brief</span>
          <span className={classes.modalInputContainer}>
            <input
              className={classes.inputField}
              type="text"
              value={brief}
              onChange={(event) => setBrief(event.target.value)}
            />
          </span>
        </div>
        <div className={classes.smallField}>
          <span className={classes.fieldTitle}>Banner Image URL</span>
          <span className={classes.modalInputContainer}>
            <input
              className={classes.inputField}
              type="text"
              value={bannerImage}
              onChange={(event) => setBannerImage(event.target.value)}
            />
          </span>
        </div>
        <div className={classes.smallField}>
          <span className={classes.fieldTitle}>Category</span>
          <span className={classes.modalInputContainer}>
            <input
              className={classes.inputField}
              type="text"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            />
          </span>
        </div>
        <div className={classes.smallField}>
          <span className={classes.fieldTitle}>Estimated Read Length</span>
          <span className={classes.modalInputContainer}>
            <input
              className={classes.inputField}
              type="text"
              value={postLength}
              onChange={(event) => setPostLength(event.target.value)}
            />
          </span>
        </div>
        <div className={classes.smallField}>
          <span className={classes.fieldTitle}>Article </span>
          <span className={classes.modalInputContainer}>
            <textarea
              className={classes.inputField}
              value={body}
              rows={12}
              onChange={(event) => setBody(event.target.value)}
            />
          </span>
        </div>
        <div className={classes.buttonDiv}>
          <Button
            onClick={uploadPost}
            variant="contained"
            className={classes.modalAccentedButton}
          >
            Submit
          </Button>
        </div>
      </Container>
    </React.Fragment>
  );
}

////////////////////////////////////////
