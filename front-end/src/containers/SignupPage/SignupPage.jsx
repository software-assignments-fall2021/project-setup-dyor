import React, { useState } from "react";
import {
  Box,
  IconButton,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Redirect, Link } from "react-router-dom";
import { Paper } from "@mui/material";
import style from "./SignupPage.module.css";
import axios from "axios";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/Back_1.png"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

const SignupPage = ({ loginHandler }) => {
  const classes = useStyles();
  const [response, setResponse] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userInput, setUserInput] = useState({ email: "", password: "" });

  const handleInputChange = (event) => {
    if (event) {
      const { id, value } = event.target;
      setUserInput((prevUserInput) => ({
        ...prevUserInput,
        [id]: value,
      }));
    }
  };

  const augmentedLoginHandler = async () => {
    try {
      const res = await axios.post(
        `http://localhost:3001/users/signup`,
        userInput,
      );
      setResponse(res.data.success);
    } catch (err) {
      setErrorMessage("Invalid email address");
    }
  };

  React.useEffect(() => {
    if (response) setErrorMessage("Sign up successful");
  }, [response]);

  if (response) {
    return <Redirect to="http://localhost:3001/loginPage" />;
  }

  return (
    <div className={classes.root}>
      <Box className={style.header}>
        <IconButton
          className={style.headerArrow}
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Link className="link" to="http://localhost:3001/">
            <ArrowBackIcon />
          </Link>
        </IconButton>
      </Box>
      <div
        className={style.errorText}
        style={{ color: response ? "green" : "red" }}
      >
        <Typography>{errorMessage}</Typography>
      </div>
      <Stack
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={2}
        marginTop="30%"
      >
        <Paper elevation={2} className={style.cardBox}>
          <div className={style.centerButton}>
            <Typography className={style.greetings}>Welcome!</Typography>
          </div>

          <div>
            <TextField
              className={style.textfield}
              margin="normal"
              fullWidth
              type="email"
              variant="outlined"
              id="email"
              label="Email Address"
              value={userInput.email}
              onChange={handleInputChange}
              InputLabelProps={{ className: style.textfield__label }}
            ></TextField>
          </div>
          <div>
            <TextField
              fullWidth
              className={style.textfield}
              type="password"
              variant="outlined"
              id="password"
              label="Password"
              value={userInput.password}
              onChange={handleInputChange}
              InputLabelProps={{ className: style.textfield__label }}
            ></TextField>
          </div>
          <div className={style.centerButton}>
            <Button
              variant="contained"
              color="primary"
              onClick={augmentedLoginHandler}
            >
              Signup
            </Button>
          </div>
        </Paper>
      </Stack>
    </div>
  );
};

export default SignupPage;
