import React from "react";
import {makeStyles} from '@material-ui/core/styles'
import Header from "../../components/HeaderforLandingPage/Header";
import { PortfolioCard } from "../../components/FeaturesforLandingPage/PortfolioCard";
import { CssBaseline } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root:{
      minHeight: '100vh',
      backgroundImage: `url(${process.env.PUBLIC_URL + "/Back_2.png"})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
  
    },
  }));

const LandingPage = () => {
    const classes = useStyles();

    return (
    <div className = {classes.root}>
      <CssBaseline/>
      <Header />
      <PortfolioCard/>
    </div>);
}

export default LandingPage;
    