
var usr_login=url+"users/users";


window.onload = function() {

   


    // TODO:: Do your initialization job

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                //tizen.application.getCurrentApplication().exit();
                window.location.href="index.html";
            } catch (ignore) {}
        }
    });

  
  
    var form_log = document.forms.namedItem("user_login");
    
    

    form_log.addEventListener('submit', function(ev){
        //alert("test")
    	ev.preventDefault();
        var json_user = $('#user_login').serializeJSON();
        // console.log(typeof(json_user));
        console.log(JSON.stringify(json_user));
        
        
    	
        signin(json_user);

    	
    	
    	
    	
    	
    });
    
    
    function signin(json_user)
    {
//        //animation
        const alert_element = document.querySelector("#alertXO");    
        var style_css = getComputedStyle(alert_element);
        var status_hide = style_css.display ;

    	//alert("test");;
    	console.log("test");
        //http request
        var xhttp = new XMLHttpRequest() ;
        xhttp.open("POST",url+"users/login",true) ;
        xhttp.content="json";
     
        xhttp.onreadystatechange= function()
        {
        	
        	if ( this.readyState===4 && xhttp.status===200)
        		{

                //animation
                alert_element.innerHTML ="Success";
                alert_element.style.background="#428bca";
                $('#alertXO').css("border-color","#357ebd");
                $("#alertXO").fadeIn("slow")
                    
            
            localStorage.setItem("user",xhttp.response)   ;
          

            

            console.log(xhttp.response)
        		console.log("login is correct"),
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
        		
        	
        	
        }
        var usr_j=(JSON.stringify(json_user));
       // alert(usr_j);
        xhttp.setRequestHeader("Content-Type","application/json; charset=utf-8");

        xhttp.send(usr_j);
        
        


       
    }

   

};
