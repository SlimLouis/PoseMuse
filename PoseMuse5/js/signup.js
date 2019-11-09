
var usr_signup=url+"users/create_user";
console.log(usr_signup)


window.onload = function() {

   function test()
   {
	   window.location.href("dashboard.html");
   }

   

    // TODO:: Do your initialization job

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
    });

  
  
    var form_log = document.forms.namedItem("user");
    

    form_log.addEventListener('submit', function(ev){
    	ev.preventDefault();
    	var json_user = $('#user').serializeJSON();
    	console.log(JSON.stringify(json_user));
    	
        signup(json_user);

    	
    	
    	
    	
    	
    });
    
    
   
    function signup(json_user)
{
  //  alert("test")
    
    var oOutput = document.querySelector("div");

var oReq = new XMLHttpRequest();
oReq.open("POST", usr_signup, true);

oReq.onload = function() {
  if (oReq.status === 200) {
    oOutput.innerHTML += "User Created!";
    window.setTimeout(function(){
        alert("your account has been created!");


        // Move to a new location or you can do something else
        window.location.href = "dashboard.html";

    }, 2500);

    

  } else {
      alert("user with that email already exists");
    oOutput.innerHTML += "Error " + oReq.status + " occurred when trying to create your account.<br \/>";
  }
};
oReq.setRequestHeader("Content-Type","application/json");
var usr_j=(JSON.stringify(json_user));

oReq.send(usr_j);

}


};
