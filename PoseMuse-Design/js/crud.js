
var url = "http://localhost:3000/";
var users = "users/";
var action = ["users","create_user","login"] ;



window.onload = function()
{
    var form = document.forms.namedItem("user");
    var form_log = document.forms.namedItem("user_login");
  
    if (form_log==null)
    {
        console.log("form not included")
    }
     else
     {
        form_log.addEventListener('submit',function(ev)
    {
        ev.preventDefault();

        var form_log_cont = $("#user_login").serializeJSON();
        var form_str = JSON.stringify(form_log_cont);
        console.log(form_str)
        signin(form_str);


    },false)
    
     }  
    
    
    if (form==null)
    {
        console.log("form not included")
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
    
    





    function addPost()
    
    {
        
var list_items = $('#vocalizr-activity');
var new_item = `<div class="activity-list-item">
<div class="avatar">
<a href="/u/ILikeTricity">
<img src="`+img_path+`" width="42" height="42" class="img-circle">
</a>
<a href="/u/AlexHolmesMusic">
<img src="https://d3flyfyvr0818w.cloudfront.net/uploads/avatar/small/37cc80cabd2adb0965305b600a7d390614ee29dc.jpg?v3.40" width="42" height="42" class="img-circle">
</a>
</div>
<div class="activity-item">
<div class="activity-status">
<span class="badge badge-green">CONTEST NOT AWARDED</span> <span class="activity-created">an hour ago</span>
</div>
<div class="activity-info">
<a href="/u/ILikeTricity">ILikeTricity</a>
awarded their contest <a href="/gig/5d8a7c11bc81a">Female Vocals & Lyrics needed! [EDM, House, BigRoom]</a>
to
<a href="/u/AlexHolmesMusic">AlexHolmesMusic</a>.
</div>
</div>
</div>`;

list_items.append(new_item) ;
    }
    
    function loadDoc() {
        console.log(url+users+action[0]);
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", url+users+action[0]);
        xhttp.setRequestHeader("Content-Type","application/json; charset=utf-8")
    
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText)

        }
        };
         xhttp.send();
      }
    
    
      function test()
      {
    
    
        alert("test")
      }
      
    
    
      $('#btn1').click(function()
      {
        loadDoc()
      })
}

function signup(json_user)
{
    
    
    var oOutput = document.querySelector("div");

var oReq = new XMLHttpRequest();
oReq.open("POST", url+users+action[1], true);

oReq.onload = function(oEvent) {
  if (oReq.status == 200) {
    oOutput.innerHTML += "Uploaded!";
    window.setTimeout(function(){

        // Move to a new location or you can do something else
        window.location.href = "dashboard.html";

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

    var div = document.querySelector("div") ;
    var txt = document.createTextNode("Wrong credentials");
    var xhttp = new XMLHttpRequest() ;
    xhttp.open("POST",url+users+action[2]) ;

    xhttp.onload = function(event)
    {

        if (xhttp.status==200)
        {   
            div.innerHTML+="Success" ;
            window.setTimeout(()=>
            {
                window.location.href=("dashboard.html");

            },2500)
        }

        else
        {

            div.innerHTML+="wrong credentials" ;
        }
    }
    xhttp.setRequestHeader("Content-Type","application/json");
    xhttp.send(json_user);
    


}