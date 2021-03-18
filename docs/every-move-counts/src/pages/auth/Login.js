import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './Login.css';
import {Button, FormControl, Container, InputLabel, Input, FormHelperText} from "@material-ui/core";
//import * as services from '../services'

function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: '/home' } };

    const handleClick = async(e) => {
        e.preventDefault();
//        console.log(email, password);
        localStorage.setItem('token', email );
        history.replace(from);
 //       let res = await services.login(email, password);
 //       console.log(res);
    }    

    return (
        <div className="Login">
            <header className="Login-header">
            <FormControl>
              <InputLabel color="primary" htmlFor="my-input">Enter Code</InputLabel>
              <Input color="primary" id="my-input" aria-describedby="my-helper-text" onChange={(e) => setEmail(e.target.value)}/>
                        <Button color="primary" variant="contained" type="submit" onClick={handleClick}>
                            Login
            </Button>
            </FormControl>
            </header>
        </div>
    );


}

export default LoginPage;
