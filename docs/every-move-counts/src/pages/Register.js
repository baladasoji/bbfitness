import React from 'react';

//let urlElements = window.location.href.split('/register');
//var homeurl =urlElements[0]+'/home';a
var homeurl = 'https://www.everymovecounts.dk/home' ;
    
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&|#]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(window.location.href) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

function Register()
{
        let code = getURLParameter("code");
        console.log("Code is ", code);
        if ( code == null || code === '')
            console.log ("Error in obtaining code");
        else{
            console.log ("Got code and registering it", code);
            apiRegisterUser(code);
        }
return (
        <div>
            Please wait registration in progress...
        </div>
    );
}

function apiRegisterUser(code)
{
  var apiXMLReq = new XMLHttpRequest();
  var bb_api_url= "https://api.everymovecounts.dk/"
  apiXMLReq.open("POST", bb_api_url + '/athlete' , true );
  var obj = {};
  obj.AuthorizationCode = code ;
  apiXMLReq.setRequestHeader("Content-type","application/json");
  apiXMLReq.send(JSON.stringify(obj));
  apiXMLReq.onload = function () {
      if (apiXMLReq.readyState == 4 && apiXMLReq.status == "200") {
        var allresults = JSON.parse(apiXMLReq.responseText);
          alert(allresults.body.id + " - "+ allresults.body.firstname + " "+allresults.body.lastname + " Registered Successfully");
      window.location.replace(homeurl);
      } else {
          alert('Error in Registering user');
      window.location.replace(homeurl);
      }   
  }
}

export default Register;
