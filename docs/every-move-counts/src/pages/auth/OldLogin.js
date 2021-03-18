import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './Login.css';
import {Button} from "@material-ui/core";

function LoginPage() {
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: '/home' } };

    const handleClick = async e => {
        e.preventDefault();
        localStorage.setItem('token', 'logged-in');
        history.replace(from);
    };

    return (
        <div className="Login">
            <header className="Login-header">
                Click on Login to proceed .. <br/><br/>
                <Button color="inherit" variant="outlined" onClick={handleClick}>
                    Login
                </Button>
            </header>
        </div>
    );
}

export default LoginPage;
