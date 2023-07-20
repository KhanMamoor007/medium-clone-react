import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "680px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: "72px",
    marginBottom: "72px",
    padding: "0",
  },
  column: {
    marginRight: "16px",
    fontSize: "20px",
    fontWeight: "400",
    color: "rgba(0,0,0,0.8)",
    cursor: "pointer",
  },
  paper: {
    backgroundColor: "#fff",
    textDecoration: "none",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={1} className={classes.column}>
            Help
          </Grid>
          <Grid item xs={1} className={classes.column}>
            Status
          </Grid>
          <Grid item xs={1} className={classes.column}>
            Writers
          </Grid>
          <Grid item xs={1} className={classes.column}>
            Blog
          </Grid>
          <Grid item xs={1} className={classes.column}>
            Carrers
          </Grid>
          <Grid item xs={1} className={classes.column}>
            Privacy
          </Grid>
          <Grid item xs={1} className={classes.column}>
            About
          </Grid>

          <Grid item xs={1} className={classes.column}>
            Teams
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
}
