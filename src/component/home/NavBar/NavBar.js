import React, { useState, useEffect, useContext } from "react";
import { MediumContext } from "../../context/MediumContext";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Logo from "../../../assets/logo.medium.png";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "65px",
  },
  header: {
    backgroundColor: "#ffc017",
    borderBottom: "solid 1px #000",
    boxShadow: "none",
  },

  headerActive: {
    backgroundColor: "#fff",
  },
  toolbar: {
    display: "flex",
    justifyContent: "center",
    boxsizing: "inherit",
  },
  bar: {
    width: "1192px",
    display: "flex",
    height: "65px",
    alignItems: "center",
    justifyContent: "center",
  },
  headerRightOption: {
    margin: "0px 25px",
    cursor: "pointer",
    fontSize: "17px",
    textDecoration: "none",
    color: "#000",
    fontWeight: "400",
    textTransform: "capitalize",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  title: {
    flexGrow: 1,
  },

  accentedButton: {
    outline: "none",
    border: "none",
    padding: "10px 15px",
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: "33px",
    fontSize: "15px",
    margin: "0 18px",
    textDecoration: "none",
    textTransform: "capitalize",
  },
  accentedButtonActive: {
    outline: "none",
    border: "none",
    padding: "10px 15px",
    backgroundColor: "green",
    color: "#fff",
    borderRadius: "33px",
    fontSize: "15px",
    margin: "0 18px",
    textDecoration: "none",
  },
}));

export default function NavBar() {
  const classes = useStyles();

  const { user, SignUserOut, isLoading } = useContext(MediumContext);
  const [scrolled, setScrolled] = useState(false);

  // const { user } = useState();
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <nav className={classes.root}>
      <AppBar
        className={`${classes.header} ${scrolled ? classes.headerActive : ""}`}
      >
        <Toolbar className={classes.toolbar}>
          <div className={classes.bar}>
            <Typography className={classes.title}>
              <img
                href={"/"}
                style={{ cursor: "pointer" }}
                src={Logo}
                alt="logo"
                height={46}
                width={200}
              />
            </Typography>

            {/* USER */}
            {isLoading ? (
              <CircularProgress color="secondary" /> // Show loading indicator while signing in
            ) : user ? (
              <>
                <Button href="/EditPost" className={classes.headerRightOption}>
                  Write
                </Button>
                <Button
                  className={`${classes.accentedButton} ${
                    scrolled ? classes.accentedButtonActive : ""
                  }`}
                  onClick={SignUserOut}
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button href="/Login" className={classes.headerRightOption}>
                  Sign In
                </Button>
                <Button
                  href="/Login"
                  className={`${classes.accentedButton} ${
                    scrolled ? classes.accentedButtonActive : ""
                  }`}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </nav>
  );
}
//////////////////////////////////////////////////////
