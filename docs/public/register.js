//var players;
/*********** Utility Functions in the Beginning *******************/

/* Utility method to get value of a URLParameter
* works both with JS style and standard styles */
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&|#]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}

function initializeApp() {
  
}

function apiRegisterUser()
{
  var code = getURLParameter('code');
  var apiXMLReq = new XMLHttpRequest();
  apiXMLReq.open("POST", bb_api_url + '/athlete' , true );
  var obj = new Object();
  obj.AuthorizationCode = code ;
  apiXMLReq.setRequestHeader("Content-type","application/json");
  apiXMLReq.send(JSON.stringify(obj));
  apiXMLReq.onload = function () {
      if (apiXMLReq.readyState == 4 && apiXMLReq.status == "200") {
        allresults = JSON.parse(apiXMLReq.responseText);
          alert(allresults.body + " Successfully Registered");
	  window.location.replace("http://fitness.bellyboys.dk");
      } else {
          alert('Error in Registering user');
	  window.location.replace("http://fitness.bellyboys.dk");
      }
  }
}
