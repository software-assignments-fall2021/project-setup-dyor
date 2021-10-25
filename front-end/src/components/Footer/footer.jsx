import * as React from 'react';
import { SocialIcon } from 'react-social-icons';
import {Typography} from '@mui/material'
import './footer.css'

function Copyright() {
    return (
        <Typography variant="body2" align="center">
        {'Copyright © '}
            <span className="company-name"> DYOR </span>
        {new Date().getFullYear()}
        {'.'}
        </Typography>
    );
}

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-logo">
                Logo
            </div>
            <div className="socials">
                <SocialIcon className="icons" style={{ height: 25, width: 25 }} url="https://github.com" />
                <SocialIcon className="icons" style={{ height: 25, width: 25 }} url="https://twitter.com" />
                <SocialIcon className="icons" style={{ height: 25, width: 25 }} url="https://facebook.com" />
            </div>
            <div className="copyright">
                <Copyright />
            </div>
        </footer>
    );
}