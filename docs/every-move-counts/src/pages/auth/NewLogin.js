import React, { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { useHistory, useLocation } from 'react-router-dom';
import './Login.css';
import {Button, FormControl, Container, InputLabel, Input, FormHelperText} from "@material-ui/core";
//import * as services from '../services'

function NewLoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: '/home' } };
    console.log(location);
    var token=location.hash ;
    if (token != '')
    {
      token=token.substring(9)
      var jwt = require('jsonwebtoken');
      var options={};
      var jwksClient = require('jwks-rsa');
      var client = jwksClient({
        jwksUri: 'https://everymovecounts.b2clogin.com/everymovecounts.onmicrosoft.com/discovery/v2.0/keys?p=b2c_1_emcsignin'
      });
      function getKey(header, callback){
        client.getSigningKey(header.kid, function(err, key) {
          var signingKey = key.publicKey || key.rsaPublicKey;
          callback(null, signingKey);
        });
      }
      jwt.verify(token, getKey, options, function(err, decoded) {
        console.log(decoded.foo) // bar
      });
    }

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

export default NewLoginPage;
