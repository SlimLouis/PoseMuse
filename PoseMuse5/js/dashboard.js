

var url="http://localhost:3000/users/find_user"
var user = JSON.parse(localStorage.getItem("user"));

window.onload = function() {

   


    // TODO:: Do your initialization job

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
    });

  var btn_log = document.getElementById("logout");
  btn_log.addEventListener('onclick',function()
  {
      alert("test");
  });
    
    
   
    
    
  



};

function logout()
    { 
    
        alert("test")
        //alert("test")
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
        
    };
function check_usr()
{
    
    if (user===null)
    {

        window.location.href="login.html";
        
    }
};

