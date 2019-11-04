

var url="http://192.168.1.10:3000/users/find_user"
var user = JSON.parse(localStorage.getItem("user"));
document.onload=check_usr();


function show_model()
{

    // alert('im here')
    // $('#vocalizrModal').attr('aria-hidden','false');
    // $('#vocalizrModal').attr('style','display:block');
    // $('#vocalizrModal').toggleClass("in");
    // $('#vocalizrModal').close();
    $( "#startModal" ).dialog({
        modal: true,
        buttons: {
          Ok: function() {
            $( this ).dialog( "close" );
          }
        }
      });

     


}

$( document ).ready(function() {
 
    load_user();
    current_user();


    load_img();

});

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
function current_user()
{

    const url = 'http://192.168.1.10:3000/users/get_current';
    const data = { id: user.id };
    
    // try {
    //   const response =  fetch(url, {
    //     method: 'POST', // or 'PUT'
    //     body: JSON.stringify(data), // data can be `string` or {object}!
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   });
    //   console.log('Success:', response);
    // } catch (error) {
    //   console.log('Error:', error);
    // }
    fetch(url,
        {        method: 'POST', // or 'PUT'
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            } // data can be `string` or {object}!
    

        })
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
        var user = JSON.stringify(data);
        user.password="none"
        localStorage.setItem("user",user);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

function load_img()
{
    var img_src="http://192.168.1.10/passeportauth/uploads/images/"+user.profile_pic;
    $("#img_alt").attr("src",img_src);
}



function getMinutesBetweenDates(startDate, endDate) {
    var diff = endDate.getTime() - startDate.getTime();
    return (diff / 60000);
}

function load_user()

{
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET","http://192.168.1.10:3000/users/users",false);
    xhttp.setRequestHeader("Content-Type","application/json");
 

    xhttp.onreadystatechange= function()
    {
        if (xhttp.readyState==4 && xhttp.status===200)
        {
            var test = JSON.parse(xhttp.responseText);
            var users =[];
            for (let i=0;i<test.length;i++)
            {
                users[i] =test[i]
            }
            draw_users(users);

        }
    }
    xhttp.send();

    
}

function date_time_hour(today,datejoin)
{
var diffMs = (today - datejoin); 
console.log(diffMs)
// milliseconds between now & Christmas
var diffDays = Math.floor(diffMs / 86400000); // days
var diffHrs = Math.round(diffMs / (1000 * 60 * 60));
var diffMins = Math.round(diffMs / (1000 * 60));
if (diffMins<60)
{
    return diffMins+'minutes';
}
else if (diffMins>=60 && diffMins<1440)
{
    return diffHrs+'hours';
}
else if ( diffMins >=1440)
{
    return diffDays+'days';
}


}

function save_user_inspect(id)
{
    localStorage.setItem("id_inspect",id);
}
function draw_users(users)
{
     var div_content = $('#vocalizr-activity');
     console.log('size of auditoons',users.length)
     for (let i=users.length -1;i>=0;i--)
     {
 
            const dateTime = users[i].createdAt;

            const time_join = new Date(dateTime);
            const time_now = new Date();
            var time_diff = date_time_hour(time_now,time_join)

            // let dateTimeParts= dateTime.split(/[- : T]/); // regular expression split that creates array with: year, month, day, hour, minutes, seconds values
            // const dateObject = new Date(dateTimeParts[0]+'-'+dateTimeParts[1]+'-'+dateTimeParts[2]+'-'+dateTimeParts[3]); // our Date object
            // const time = new Date('2019-11-01 ');
            // const time = new Date('')

            //  console.log(date_time_hour(time,dateObject))
        // console.log(new Date())
        // console.log(dateObject)
//         console.log(dateObject)
//         console.log(time)

  console.log(time_diff)
            
   var $item_user= $(`
   <div class="activity-list-item">
            <div class="avatar">
                <a href="inspect.html" onclick="save_user_inspect(`+users[i].id+`)">
                                            <img src=http://192.168.1.10/passeportauth/uploads/images/`+users[i].profile_pic+`  width="42" height="42" class="img-circle">
                                    </a>
            </div>
            <div class="activity-item">
                <div class="activity-status">
                                            <span class="badge badge-blue">NEW USER</span> <span class="activity-created">`+time_diff+` ago</span>
                                    </div>
                <div class="activity-info">
                                            <a href="/u/iamdjankit">`+users[i].username+`</a> has just joined PoseMuse.
                        <br>
                                                    Check out our latest <a href="/u/iamdjankit">producer</a> by viewing his  profile.
                                                            </div>
            </div>
                    </div>
   
   `)
   div_content.append($item_user);    
     }
    
}