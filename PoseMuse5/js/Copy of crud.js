
var url = "http://localhost:3000/";
var users = "users/";
var action = ["users","create_user","login"] ;



function getUser()

{
	alert("test")

    var httpReq = new XMLHttpRequest() ;
    httpReq.open("GET","http://localhost:3000/users/find_user");
    httpReq.send();


}

function logout()
{ 

    var user = JSON.parse(localStorage.getItem("user"));
if (user===null)
{
    window.location.href="login.html";

}
else
{
localStorage.setItem("user",null);
window.location.href="login.html";

}
    
}


window.onload = function()
{
    
    
	 document.addEventListener('tizenhwkey', function(e) {
	        if (e.keyName === "back") {
	            try {
	                tizen.application.getCurrentApplication().exit();
	            } catch (ignore) {}
	        }
	    });
	
    var form = document.forms.namedItem("user");
    var form_log = document.forms.namedItem("user_login");
  
    if (form_log===null)
    {
        //console.log("form not included")
    }
     else
     {
        form_log.addEventListener('submit',function(ev)
    {
        ev.preventDefault();

        var form_log_cont = $("#user_login").serializeJSON();
        var form_str = form_log_cont;
        
       // console.log(typeof(form_str))
        signin(form_str);


    },false)
    
     }  
    
    
    if (form==null)
    {
       // console.log("form not included")
    }
     else
     {
        form.addEventListener('submit', function(ev) {
            var form_as_j = $("#user").serializeJSON();
            var jsonString = JSON.stringify(form_as_j);
            ev.preventDefault();
             signup(jsonString);
        },false);
    
     }  
    
    




    

    // var action = ["users","create_user","login"] ;

     function loadDoc2() {
        alert("ss");
       // console.log(url+users+action[2]);
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", url+users+action[2]);
    
        xhttp.onreadystatechange = function() {
          if (this.readyState === 4 && this.status === 200) {
           console.log(this.responseText);


        }
console.log(xhttp);
//console.log(this)
        
        };
        var json_user={
            "email":"amirofl@gmail.com",
            "password":"4130261"
        }
        xhttp.setRequestHeader("Content-Type","application/json")
        
        console.log(json_user);
        var j = JSON.stringify(json_user);
         xhttp.send(JSON.stringify(json_user));
      }

    function loadDoc() {
        alert("ss")
        console.log(url+users+action[0]);
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", url+users+action[0]);
        xhttp.setRequestHeader("Content-Type","application/json")
    
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText)

        }
        };
         xhttp.send();
      }
    
    

     
      
    
    
     
      function getAll()
{
    var xhttp2 = new XMLHttpRequest();
    xhttp2.open("GET",url+users+action[0]);
    xhttp2.setRequestHeader("Content-Type","application/json")
    xhttp2.onreadystatechange=function()
    {
        console.log(this.responseText)
    }
    xhttp2.send();

   
}

}

function signup(json_user)
{
  //  alert("test")
    
    var oOutput = document.querySelector("div");

var oReq = new XMLHttpRequest();
oReq.open("POST", url+users+action[1], true);

oReq.onload = function(oEvent) {
  if (oReq.status == 200) {
	  alert("test")
    oOutput.innerHTML += "Uploaded!";
    window.setTimeout(function(){

        // Move to a new location or you can do something else
        window.location.href = "dashboard_1.html";

    }, 2500);

    

  } else {
      alert("user with that email already exists");
    oOutput.innerHTML += "Error " + oReq.status + " occurred when trying to create your account.<br \/>";
  }
};
oReq.setRequestHeader("Content-Type","application/json");

oReq.send(json_user);
console.log(url+users+action[1]);

}




function signin(json_user)
{
    //animation
    const alert_element = document.querySelector("#alertXO");    
    var style_css = getComputedStyle(alert_element);
    var status_hide = style_css.display ;

    //http request
    var xhttp = new XMLHttpRequest() ;
    xhttp.open("POST",url+users+action[2],true) ;

    xhttp.onreadystatechange = function(event)
    {

        if (xhttp.status==200)
{
localStorage.setItem("user",JSON.stringify(json_user))   ;
            //animation
            alert_element.innerHTML ="Success";
            alert_element.style.background="#428bca";
            $('#alertXO').css("border-color","#357ebd");
            $("#alertXO").fadeIn("slow")
        console.log(xhttp.responseJSON)
        console.log(xhttp.responseText)

        console.log(xhttp.response)

            window.setTimeout(function(){


                // Move to a new location or you can do something else
                window.location.href = "dashboard.html";

            }, 2500);
            

           
        }

        else
        {
            
                $("#alertXO").fadeIn("slow");
                window.setTimeout(function()
                {
                    $("#alertXO").fadeOut("slow");

                },2000)

        }
        
        xhttp.setRequestHeader("Content-Type","application/json");

        xhttp.send(JSON.stringify(json_user));
    }
}

  



