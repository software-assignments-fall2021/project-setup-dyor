import * as React from "react";
import { Box, Typography, Paper, IconButton, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./HelpCenterPage.css";

export default function HelpCenterPage() {
  return (
    <>
      <Box className="helpCenter">
        <Box className="header">
          <IconButton
            className="headerArrow"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Link className="link" to="/settings">
            <ArrowBackIcon />
            </Link>
          </IconButton>
          <h2 className="helpCenterTitle">Help Center</h2>
        </Box>
        <Paper className="helpCenterTile" elevation={0}>
          <Typography className="welcome">
            Our 24/7 customer service staff are always available and willing to
            help you. Reach us via any of the channels below.
          </Typography>
        </Paper>
        <Paper className="helpCenterTile tools" elevation={0}>
          <Box className="help notifications">
            <Box className="iconAndLabel">
              <FacebookIcon className="notification-icon facebook" />
              <span className="label">
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  Facebook
                </a>
              </span>
            </Box>
            <IconButton
              className="helpCenterArrow"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <ArrowForwardIosIcon />
              </a>
            </IconButton>
          </Box>
          <Divider variant="inset" />
          <Box className="help notifications">
            <Box className="iconAndLabel">
              <MailOutlineIcon className="notification-icon" />
              <span className="label">
                <a
                  href="mailto:projectdyor@gmail.com?subject=Help Needed"
                  target="_blank"
                  rel="noreferrer"
                >
                  Email
                </a>
              </span>
            </Box>
            <IconButton
              className="helpCenterArrow"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <a
                href="mailto:projectdyor@gmail.com?subject=Help Needed"
                target="_blank"
                rel="noreferrer"
              >
                <ArrowForwardIosIcon />
              </a>
            </IconButton>
          </Box>
          <Divider variant="inset" />
          <Box className="help notifications">
            <Box className="iconAndLabel">
              <PhoneIcon className="notification-icon" />
              <span className="label">
                <a href="tel:123-456-7890">Call Us</a>
              </span>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
