var id = localStorage.getItem("id_inspect_contest");
var userx = JSON.parse(localStorage.getItem("user"));
var id_contest = JSON.parse(localStorage.getItem("id_inspect_contest"));
var ur =url;
var current_contest = JSON.parse(localStorage.getItem("current_contest"));

$(document).ready(function()
{
    check_usr();

    load_join_contests();
    verify_join();

fetch_contest(id);
})


function check_usr()
{
    
    if (userx===null)
    {

        window.location.href="login.html";
        
    }
};
function fetch_contest(id)
{
    var url =ur+"Contest/find_Contest";
    console.log(url);
    var obj = {
        id:id
    }
    fetch(url,{
        method :"POST",
        body:JSON.stringify(obj),
        headers:
{    'Content-Type':'application/json'


}
    }).then(function(response){
        if (response.status!=200)
        {
            console.log("error in data or connection")
            return;
        }

        response.json().then(function(data){
            console.log(data)
             contest_clone(data)
             localStorage.setItem("current_contest",JSON.stringify(data));
        })

    }).catch(err=>{
        console.log(err)
    })
}

function average_bid(join_contest)
{
var bids=[] ;
var average=0 ;
    for (let i=0;i<join_contest.length;i++)
    {
            average += join_contest[i].bid ;

    }
    console.log("average is"+average)
    average_ =  Math.round((average / join_contest.length));
    $('#average_').text(average_+" $");
}
function highest_bid(join_contest)
{
var array_=[]
    for (let i=0;i<join_contest.length;i++)
    {
        array_[i]=join_contest[i].bid;
        }
        var max =  Math.max.apply(null,array_);
    $('#highest_').text(max+" $");
}
function contest_clone(contest)
{

    var string = contest.name.toUpperCase()
    $('h1').text(string);

    $('.gig-genre span').text(contest.style)

$('.gig-budget span').text(contest.price+'$')
$('#looking_for').text(contest.gender.toUpperCase()+" "+contest.type_use.toUpperCase());
// var gender = user[0].profile.gender

$('#gig-desc').text(contest.description)

//  var userx = (JSON.parse(user_profile));
// let dateTimeParts= user[0].createdAt.split(/[- : T]/); // regular expression split that creates array with: year, month, day, hour, minutes, seconds values
// const dateObject = new Date(dateTimeParts[0]+'-'+dateTimeParts[1]+'-'+dateTimeParts[2]  ); // our Date object
// const monthNames = ["January", "February", "March", "April", "May", "June",
//   "July", "August", "September", "October", "November", "December"
// ];

// var string_date = monthNames[dateObject.getMonth()]+' '+dateObject.getDate()+', '+dateObject.getFullYear();
var img_url = host+contest.muser.profile_pic
var img_url_current = host+userx.profile_pic
// alert('test');

$('#image_user').attr("src",img_url);
$('#image_user').attr("alt",contest.muser.username);
$('#avatar_user').attr("src",img_url_current);
// $('#demo_contest .ui360 track-play inline a').attr('href',"bro"+host_songs+contest.muser.audio);
$('.ui360.track-play.inline a').attr('href',host_songs+contest.audio)

$('.gig-created-by a:eq(1)').text(contest.muser.username)

// $('#member_since').text(string_date)

//  console.log(userx);
//  console.log(user);
// console.log(userx.gender)
//     $('#user_first_name').val(user.first_name[0].toUpperCase() +  
//     user.first_name.slice(1));
//     $('#user_last_name').val(user.last_name[0].toUpperCase() +  
//     user.last_name.slice(1))
//     $('#user_display_name').val(user.username[0].toUpperCase() +  
//     user.username.slice(1))
//     $('#user_profile').val(userx.description[0].toUpperCase() +  
//     userx.description.slice(1));

// $(document).ready(function() {
//     $("#user_country option[value="+userx.country+"]").attr('selected', 'selected');

//     // you need to specify id of combo to set right combo, if more than one combo
// });
//     if (userx.gender==='m')
//     {
//         //alert($('#user_gender').children('option').val());
//         $('#user_gender option').each(function() {
//             if($(this).val() == 'm') {
//                 $(this).attr("selected", true);
//             }
            
//         });



//     }
//     else if (userx.gender==='f')
//     { $('#user_gender option').each(function() {
//         if($(this).val() == 'f') {
//             $(this).attr("selected", true);
//         }
        
//     });


//     }
//     else  
//     { $('#user_gender option').each(function() {
//         if($(this).val() == 'e') {
//             $(this).attr("selected", true);
//         }
        
//     });


//     }




}

function add_bid()
{

    var id_u = userx.id ;
    var id_c = id_contest;
    // var bid_ = parseInt(document.getElementById('bid2-amount').value);
    var bid_=parseInt(document.getElementById('bid2-amount').value);
    var obj=
    {
        contestId:id_c,
        id_host:id_u,
        bid:bid_

        }
        console.log(obj);
        fetch(url+'join_contest/create',{
            method :"POST",
            body:JSON.stringify(obj),
            headers:
    {    'Content-Type':'application/json'
    
    
    }
        }).then(function(response){
           
    
            response.json().then(function(data){
                console.log(data)
                 contest_clone(data)
            })
    
        }).catch(err=>{
            console.log(err)
        })


    
}

function verify_join()
{
    var current_contest = JSON.parse(localStorage.getItem("current_contest"))
    var id_u = userx.id ;
    var obj=
    {
        id_host:id_u
        

        }
        console.log(obj);
        fetch(url+'join_contest/find_join_contest',{
            method :"POST",
            body:JSON.stringify(obj),
            headers:
    {    'Content-Type':'application/json'
    
    
    }
        }).then(function(response){
            // console.log(response);
            response.json().then(function(data){
                console.log(data)
                if (data=='null')
                {
                    alert('you are not creator')
                    design_guest();
                    // console.log('you can join')
                }
                else if (current_contest.muserId==userx.id)
                {

                    console.log(current_contest.muserId);
                    console.log(userx.id);
                    console.log('you cant join because you are the creator')
                    design_creator()

                }
                
                else{
                    console.log(current_contest.muserId);
                    console.log(userx.id);
                    console.log('you already joined')
                    design_host();
                }
            })
    
        }).catch(err=>{
            console.log(err)
        })


    
}


function design_creator()
{   
    console.log('ur creator')
    $('.col-sm-4').remove();

    // $('#hire').attr('style',"display:inline");

    $( ".hire" ).each(function( index ) {
        $(this).attr('style',"display:inline");
        
      });



}


function design_host()
{   
    console.log('already joined')
    $('.col-sm-4').slideUp();
    $( ".hire" ).each(function( ) {
        $(this).attr('style',"display:none");
        
      });

      console.log('okokokok')
      $("#user_join_id"+userx.id).attr('style',"display:inline");
     

}
function design_guest(){
    console.log(current_contest.status);
    console.log('ur guest')
    if (current_contest.status=='closed')
    {
        $('.panel-heading').text("CLOSED")
        $('.panel-row.quick-bid').remove();
        $('.gig-view-panel').removeClass("panel-green").addClass("panel-red")
        $( ".hire" ).each(function( ) {
            $(this).attr('style',"display:none");
            
          });
    
    }

}


function load_join_contests()

{
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST",url+"join_contest/find_join_contest_bycontest",false);
    xhttp.setRequestHeader("Content-Type","application/json");
    var obj =
    {
        id:id_contest
    }

    xhttp.onreadystatechange= function()
    {
        if (xhttp.readyState==4 && xhttp.status===200)
        {
            var test = JSON.parse(xhttp.responseText);
            var join_contest =[];
            for (let i=0;i<test.length;i++)
            {
                join_contest[i] =test[i]

            }
            $('.bids-made span').after("("+join_contest.length+")");
            $("#bids_made_2").text(join_contest.length)
            draw_join_contest(join_contest);
            average_bid(join_contest);
            highest_bid(join_contest);

        }
    }
    xhttp.send(JSON.stringify(obj));

    
}

function draw_join_contest(join_contest)
{
     console.log('size of join_contest',join_contest.length)
     for (let i=0;i<join_contest.length;i++)
     {
   image = host+join_contest[i].muser.profile_pic;
   name = join_contest[i].muser.username ;
   bid = join_contest[i].bid ;
   id_=join_contest[i].muser.id;
   id_join =join_contest[i].id

 var $item = $(`<div id="join_submission`+id_join+`"  class="discover-item">
 <div class="item-body">
 <div class="item-top">
 <div class="media">
 <div class="avatar">
 <a class="img-circle" href="/u/muiscbyronin" style="background-image: url(`+image+`)"></a>
 </div>
 </div>
 <div class="info-columns">
 <div class="info">
 <div class="name">
 <a href="/u/muiscbyronin" class="username">`+name+`</a>
 <img src="https://d3flyfyvr0818w.cloudfront.net/images/vocalizr_pro_badge.svg?v3.42" class="svg-badge-pro">
 </div>

 
 </div>
 <div class="bid-amount">
 <div class="currency-symbol">$</div>
 <div class="value">
 `+bid+`
 <div class="currency">USD</div>
 </div>
 
 </div>
 </div>
 <div id="demo_contest" class="track-list-item">
        <div class="ui360 track-play inline" style="background-image: none;"><div class="sm2-360ui"><canvas class="sm2-canvas" width="50" height="50"></canvas> <span class="sm2-360btn sm2-360btn-default"></span> <div class="sm2-timing alignTweak"></div> <div class="sm2-cover"></div></div><a href="https://res.cloudinary.com/dprrnjk66/video/upload/v1572975268/Demos/15730346451966IntroLaCasaDePapel-Mylifeisgoingon(cover).mp3" type="audio/mp3" class="sm2_link"><span>PLAY</span></a></div>
        <span class="track-title">15729877644836IntroLaCasaDePapel-Mylifeisgoingon(cover).mp3</span>
        <span class="track-length">(2:24)</span>
        <span class="badge badge-featured">FEATURED</span> 
        </div>
 </div>

 
 <div class="hire" style="display:none">

 <button onclick="hire(`+id_+`,`+bid+`)" type="submit" name="save" value="account"  style="text-align:center" class="btn btn-sm btn-default"  >HIRE NOW</button>

 </div>
 <div id="user_join_id`+id_+`" class="cancel_join" style="display:none">

 <button onclick="delete_join(`+id_join+`)" type="submit" name="save" value="account"  style="text-align:center" class="btn btn-sm btn-default"  >DELETE</button>

 </div>
 


 </div>

 <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" id="mi-modal">
 <div class="modal-dialog modal-sm">
   <div class="modal-content">
     <div class="modal-header">
       <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
       <h4 class="modal-title" id="myModalLabel">Confirm hiring</h4>
     </div>
     <div class="modal-footer">
       <button type="button" class="btn btn-default" id="modal-btn-si">Yes</button>
       <button type="button" class="btn btn-primary" id="modal-btn-no">No</button>
     </div>
   </div>
 </div>
</div>

<div class="alert" role="alert" id="result"></div>



 </div>` );

    
        $($item).insertAfter('.well');

     }
    
}


function delete_join(id_join)
{

    $('#join_submission'+id_join).slideUp();
    var id={
        id:id_join
    }
    fetch(url+"join_contest/delete",{
method:'DELETE',
body:JSON.stringify(id) ,
headers:{
    'Content-Type': 'application/json',
}  ,

 }).then(response=>console.log(response)
    )
    $('.col-sm-4').slideDown();

}


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
        
    }

function hire(id_,price)
{
    var id_creator=userx.id;
    var modalConfirm = function(callback){
  
          $("#mi-modal").modal('show');
      
      
        $("#modal-btn-si").on("click", function(){
          callback(true);
          $("#mi-modal").modal('hide');
          alert('hired'+id_)
          add_contract(id_contest,id_creator,id_,price)
          
        });
        
        $("#modal-btn-no").on("click", function(){
          callback(false);
          $("#mi-modal").modal('hide');
          alert('did not hire'+id_)
        });
      };
      
      modalConfirm(function(confirm){
        if(confirm){
          //Acciones si el usuario confirma
          $("#result").html("CONFIRMADO");
        }else{
          //Acciones si el usuario no confirma
          $("#result").html("NO CONFIRMADO");
        }
      });


}

function add_contract(id_contest,id_creator,id_,price)
{
    console.log('id contest now'+id_contest+'id creator'+id_creator+'id host'+id_);
    update_status(id_contest);
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST",url+"contract/create_contract",false);
    xhttp.setRequestHeader("Content-Type","application/json");
    var obj =
    {
        id_host:id_creator,
        id_join:id_,
        id_contest:id_contest,
        price:price
    }

    xhttp.onreadystatechange= function()
    {
        if (xhttp.readyState==4 && xhttp.status===200)
        {
            var contract = JSON.parse(xhttp.responseText);
            console.log(contract);
           

        }
        else
        {
            console.log('contract not created')
        }
    }
    xhttp.send(JSON.stringify(obj));


}

function update_status(id)
{
    var url_ = url+"Contest/update"
   
    var obj = {
        id:id
    }
    fetch(url_, {
            method: 'POST',
            body: JSON.stringify(obj),
            
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
          }).then(response => {
           
        
           // alert(response)
          })

}

