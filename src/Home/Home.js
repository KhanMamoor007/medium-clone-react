import React, { Fragment, useContext } from "react";
import { MediumContext } from "../component/context/MediumContext";
import HomeHeader from "../component/home/NavBar/NavBar";
import PostCard from "../component/home/Post/PostCard";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Logo from "../../src/assets/banner.png";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "#fff",
  },
  container: {
    backgroundColor: "#ffc017",
    height: "455px",
    display: "flex",
    justifyContent: "center",
    padding: 0,
    margin: 0,
  },
  heading: {
    maxWidth: "550px",
    marginBottom: "35px",
    boxSizing: "inherit",
    textRendering: "optimizeLegibility",
    webkitFontSmoothing: "antialiased",
    color: "rgba(0,0,0,0.8)",
    fontWeight: "500",
    letterSpacing: "-0.05em",
    lineHeight: "95px",
    fontSize: "106px",
    marginTop: "75px",
    fontFamily: "gt-super, Georgia, Cambria, Times New Roman, Times, serif",
  },
  title: {
    width: "75%",
    marginBottom: "50px",
    display: "block",
    boxSizing: "inherit",
    fontSize: "23px",
    lineHeight: "27px",
    fontWeight: "400",
    color: "rgba(41, 41, 41, 1)",
    fontFamily: "sohne, Helvetica Neue, Helvetica, Arial, sans-serif",
  },
  linkMain: {
    boxSizing: "inherit",
    display: "flex",
    justifyContent: "center",
    fontWeight: "400",
    width: "168px",
    lineHeight: "24px",
    marginRight: "auto",
    borderWidth: "1px",
    padding: "7px 20px 9px",
    borderRadius: "33px",
    fontSize: "20px",
    border: "1px solid rgba(41, 41, 41, 1)",
    backgroundColor: "rgba(41, 41, 41, 1)",
    color: "#fff",
    cursor: "pointer",
    textDecoration: "none",
    textTransform: "capitalize",
    // [theme.breakpoints.down("xs")]: {
    //   display: "none",
    // },
  },
  image: {
    maxWidth: "100%",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  circle: {
    justifyContent: "center",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  // Styles for resolutions less than 300px
  "@media (max-width: 300px)": {
    container: {
      height: "auto",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    heading: {
      fontSize: "60px",
      lineHeight: "70px",
      marginTop: "50px",
      marginBottom: "20px",
    },
    title: {
      width: "90%",
      fontSize: "18px",
      lineHeight: "24px",
      marginBottom: "30px",
    },
    // linkMain: {
    //   display: "none",
    // },
    image: {
      display: "none",
    },
  },
}));

const LoadingWrapper = ({ isLoading, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.circle}>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress color="#000" size={50} />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

const Home = () => {
  const { allPosts, isLoading } = useContext(MediumContext);
  let navigate = useNavigate();
  const classes = useStyles();
  const { user, setAlert } = useContext(MediumContext);

  const handleStartWriting = () => {
    if (user) {
      navigate("/create-post");

      return;
    } else {
      setAlert({
        open: true,
        message: "You have to signIn first",
        type: "error",
      });
    }
  };

  return (
    <LoadingWrapper isLoading={isLoading}>
      <Fragment>
        <HomeHeader />
        <main>
          <section style={{ backgroundColor: "#ffc017" }}>
            <Container>
              <Grid className={classes.container}>
                <Grid
                  container
                  className={classes.mainContent}
                  alignItems="center"
                >
                  <Grid item xs={12} sm={6}>
                    <div>
                      <Typography className={classes.heading}>
                        Stay curious.
                      </Typography>

                      <Typography className={classes.title}>
                        Discover stories, thinking, and expertise from writers
                        on any topic.
                      </Typography>

                      <Button
                        onClick={handleStartWriting}
                        className={classes.linkMain}
                      >
                        Start Writing
                      </Button>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <img src={Logo} alt="Banner" className={classes.image} />
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </section>
          {/* //Post section */}
          <section>
            {isLoading ? (
              <div style={{ textAlign: "center" }}>
                <CircularProgress color="secondary" />
              </div>
            ) : (
              allPosts.map((post) => <PostCard post={post} key={post.id} />)
            )}
          </section>
        </main>
      </Fragment>
    </LoadingWrapper>
  );
};

export default Home;
