
var url_=url+"users/find_user";
var user = JSON.parse(localStorage.getItem("user"));
var user_profile = localStorage.getItem("user_profile");
$(document).ready(function()
{  
    
      current_user();
    load_contests();


            load_img();
        
        load_song();
    save();
  
})
window.onload=function()
{

    check_usr();

    }

function current_user()
{

    const url_ = url+'users/get_current';
    const data = { id: user.id };
    console.log(user.id)
    
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
    fetch(url_,
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
        load_img();
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}


function update(test)
{
    var url_ = url+"profile/update"
   

    fetch(url_, {
            method: 'POST',
            body: JSON.stringify(test),
            
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
          }).then(response => {
           
        
           // alert(response)
          })
}

function load_img()
{

    var img_src=host+user.profile_pic;
    $("#img_alt").attr("src",img_src);
    $("#user-account-avatar").attr("src",img_src);

}

// upload_img()
// {
//     var url_upload ="http://192.168.1.10:3000/users/upload"
//     var xhttp = new XMLHttpRequest();
//     xhttp.open("POST",url_upload) ;
//     var input_click = $("upload-avatar-btn") ;
//     input_click.addEventListener('onclick',function()
//     {
//         $("#upload_input").click()
//     })


// }
function update_user()
{
    var form_log = document.forms.namedItem("user-edit-form");
    
    

    form_log.addEventListener('submit', function(ev){

    	ev.preventDefault();
        var json_user = $('#user-edit-form').serializeJSON();
         var test = json_user['user'];
        console.log(test)
        if (test.is_producer!=null && test.is_vocalist!=null)
        {
            test.type="double"
        }
        else if (test.is_producer!=null && test.is_vocalist==null)
        {
            test.type="producer"

        }
        else if (test.is_producer==null && test.is_vocalist!=null)
        {
            test.type="vocalist"

        }
         test.id_user=user.id
        //  console.log(test)

                 update(test);
                 usr_write();
                 usr_clone(user_profile,user);

    });

}
window.addEventListener("load",function(event) {
    update_user();
    var user_form = document.forms.namedItem("user-upload-audio-form");
    // console.log(user_form.value)

    user_form.addEventListener('submit',function(e)
    {
        e.preventDefault();

        var json_user = $('#user-upload-audio-form').serializeJSON()    
        console.log(json_user)
    
    })

   check_usr();
   usr_write();
   usr_clone(user_profile,user);


},false);
// window.addEventListener("load",function(event) {

//     document.addEventListener('tizenhwkey', function(e) {
//         if (e.keyName === "back") {
//             try {
//                 tizen.application.getCurrentApplication().exit();
//             } catch (ignore) {}
//         }
//     });

  

    
    
        

    	
    	
    	
    	
    	
//     });

  
   
    
    
//  },false);

// window.onload = function() {
   

//     // TODO:: Do your initialization job

//     // add eventListener for tizenhwkey
//     document.addEventListener('tizenhwkey', function(e) {
//         if (e.keyName === "back") {
//             try {
//                 tizen.application.getCurrentApplication().exit();
//             } catch (ignore) {}
//         }
//     });

//   var btn_log = document.getElementById("logout");
//   btn_log.addEventListener('onclick',function()
//   {
//       alert("test");
//   });
    
    

  
   
    
    
  



// };

function logout()
    { 
    
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
    else
    {
        console.log('connected')
    }
};

function usr_write()
{

    var xhttp = new XMLHttpRequest() ;
    xhttp.open("POST",url+"profile/find_profile",true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.onreadystatechange = function()
    {
        if ( xhttp.readyState===4 && xhttp.status===200 )
        {
            // console.log("success");
            // console.log(this.response)
            var user = JSON.parse(this.response);
            // console.log(user)
            localStorage.setItem("user_profile",JSON.stringify(user));

        }
        else
        {
            console.log("problem");

        }
    }
    var obj = {
        "id_user" : user.id
    }

    xhttp.send(JSON.stringify(obj));
}
function usr_clone(user_profile,user)
{


 var userx = (JSON.parse(user_profile));
//  console.log(userx);
//  console.log(user);
// console.log(userx.gender)
    $('#user_first_name').val(user.first_name[0].toUpperCase() +  
    user.first_name.slice(1));
    $('#user_last_name').val(user.last_name[0].toUpperCase() +  
    user.last_name.slice(1))
    $('#user_display_name').val(user.username[0].toUpperCase() +  
    user.username.slice(1))
    $('#user_profile').val(userx.description[0].toUpperCase() +  
    userx.description.slice(1));

$(document).ready(function() {
    $("#user_country option[value="+userx.country+"]").attr('selected', 'selected');

    // you need to specify id of combo to set right combo, if more than one combo
});
    if (userx.gender==='m')
    {
        //alert($('#user_gender').children('option').val());
        $('#user_gender option').each(function() {
            if($(this).val() == 'm') {
                $(this).attr("selected", true);
            }
            
        });



    }
    else if (userx.gender==='f')
    { $('#user_gender option').each(function() {
        if($(this).val() == 'f') {
            $(this).attr("selected", true);
        }
        
    });


    }
    else  
    { $('#user_gender option').each(function() {
        if($(this).val() == 'e') {
            $(this).attr("selected", true);
        }
        
    });


    }




}


function load_song()

{
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST",url+"audition/find_audition",false);
    xhttp.setRequestHeader("Content-Type","application/json");
    var obj =
    {
        id_user:user.id
    }

    xhttp.onreadystatechange= function()
    {
        if (xhttp.readyState==4 && xhttp.status===200)
        {
            var test = JSON.parse(xhttp.responseText);
            var auditions =[];
            for (let i=0;i<test.length;i++)
            {
                auditions[i] =test[i]
            }
            draw_auditions(auditions);

        }
    }
    xhttp.send(JSON.stringify(obj));

    
}

function draw_auditions(auditions)
{
     var div_content = $('#account-tracks');
     console.log('size of auditoons',auditions.length)
     for (let i=0;i<auditions.length;i++)
     {
    var full_url = host_songs+auditions[i].demo_file;
   
   var $item_audio = $(`<div id=play_id`+auditions[i].id+` class="track-list-item">
   <div class="ui360 track-play inline"><a href=`+full_url+` type="audio/mp3"><span>PLAY</span></a></div>
   <span class="track-title">`+auditions[i].demo_file+`</span>
   <span class="track-length">(2:24)</span>
   <span class="badge badge-featured">FEATURED</span> <button name="remove_track" value="24265" onclick=del(`+auditions[i].id+`) class="btn btn-sm btn-default remove roll-alt">REMOVE</button>
   </div>`)
   div_content.append($item_audio);    
     }
    
}


function load_contests()

{
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST",url+"contest/find_contest_user",false);
    xhttp.setRequestHeader("Content-Type","application/json");
    var obj =
    {
        id_user:user.id
    }

    xhttp.onreadystatechange= function()
    {
        if (xhttp.readyState==4 && xhttp.status===200)
        {
            var test = JSON.parse(xhttp.responseText);
            var contests =[];
            for (let i=0;i<test.length;i++)
            {
                contests[i] =test[i]
            }
            // alert(contests.length);

            draw_contests(contests);
        }
       
    }
    xhttp.send(JSON.stringify(obj));

    
}
function date_time_hour(today,datejoin)
{
var diffMs = (today - datejoin); 
// console.log(diffMs)
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
function save_contest_inspect(id)
{
    localStorage.setItem("id_inspect_contest",id);
}
function draw_contests(contests)
{
     var div_content = $('#account-contests');
     console.log('size of contest',contests.length)
     for (let i=0;i<contests.length;i++)
     {
        const dateTime = contests[i].createdAt;

        const time_join = new Date(dateTime);
        const time_now = new Date();
        var time_diff = date_time_hour(time_now,time_join)

   var $item_contest = $(`<div id=contest_`+contests[i].id+` class="track-list-item">
   <div class="activity-item">
   <div class="activity-status">
                               <span class="badge badge-yellow">NEW CONTEST</span> <span class="activity-created">`+time_diff+` ago</span>
                       </div>
   <div class="activity-info">
                               <a onclick="`+save_contest_inspect(contests[i].id)+` "href="join_contest.html">`+contests[i].name+`</a> has just been created .
           <br>
                                       Check out our latest <a href="">producer</a> by viewing his  profile.
                                               </div>
    <button name="edit_contest" value="24265" onclick="$(this).slideUp()" class="btn btn-sm btn-default remove roll-alt">EDIT</button>

   <button name="remove_contest" value="24265" onclick=del_(`+contests[i].id+`) class="btn btn-sm btn-default remove roll-alt">REMOVE</button>
   </div>`)
   div_content.append($item_contest);    
     }
    
}
function del_(test)
{
    $(`#contest_`+test).slideUp()
    var id={
        id:test
    }
    fetch(url+"Contest/delete",{
method:'DELETE',
body:JSON.stringify(id) ,
headers:{
    'Content-Type': 'application/json',
}  ,

 }).then(response=>console.log(response)
    )

}

function del(test)
{
    $(`#play_id`+test).slideUp()
    var id={
        id:test
    }
    fetch(url+"audition/delete",{
method:'DELETE',
body:JSON.stringify(id) ,
headers:{
    'Content-Type': 'application/json',
}  ,

 }).then(response=>console.log(response)
    )

}
function save()
{
   
   $("#btn_save").click(function(ev)
{
  ev.preventDefault();
}) ;


}
