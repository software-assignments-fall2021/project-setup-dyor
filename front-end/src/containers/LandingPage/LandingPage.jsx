import React from "react";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Header from "../../components/HeaderforLandingPage/Header";
import { CircularProgress } from "@mui/material";
import { PortfolioCard } from "../../components/FeaturesforLandingPage/PortfolioCard";
import { CssBaseline } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/Back_2.png"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

const LandingPage = () => {
  const classes = useStyles();
  const [isLoading, setLoading] = React.useState(true);
  const [isLoggedIn, setLoggedIn] = React.useState(undefined);

  React.useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  React.useEffect(() => {
    setLoading(false);
  }, [isLoggedIn]);

  return (
    <>
      {isLoading ? (
        <div className="circularProgress">
          <CircularProgress
            className="progressBar"
            size={100}
            thickness={2.0}
          />
        </div>
      ) : (
        <>
          {isLoggedIn ? (
            <Redirect to="/dashboard" />
          ) : (
            <div className={classes.root}>
              <CssBaseline />
              <Header />
              <PortfolioCard />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default LandingPage;
