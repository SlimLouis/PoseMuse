var id = localStorage.getItem("contract_id");
var userx = JSON.parse(localStorage.getItem("user"));
var id_contest = JSON.parse(localStorage.getItem("id_inspect_contest"));
var ur =url;
var current_contest = JSON.parse(localStorage.getItem("current_contest"));
var current_contract = JSON.parse(localStorage.getItem("current_contract"));


$(document).ready(function()
{
    $('#pdf_').click(function()
    {
        alert("ok")
        var contract_join = current_contract[0].join;
        var contract_host = current_contract[0].host;
        var price=current_contract[0].price
        pdf(contract_join.first_name+" "+contract_join.last_name,contract_host.first_name+" "+contract_host.last_name,price+"$");
    })
    check_usr();
    fetch_contract(id);
    load_feed();
    load_join_contests();
    verify_join();

})


function check_usr()
{
    
    if (userx===null)
    {

        window.location.href="login.html";
        
    }
};
function fetch_contract(id)
{
    var url =ur+"contract/contract_id";
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
             localStorage.setItem("current_contract",JSON.stringify(data));
             contract_clone(data)

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
function contract_clone(contest)
{   console.log(current_contract[0].contest);
    var contract_contest = current_contract[0].contest;
    var contract_join = current_contract[0].join;
    var contract_host = current_contract[0].host;



    var string = contract_contest.name.toUpperCase()
    $('h1').text(string);
$('#image_contest').attr('src',host+contract_host.profile_pic)
$('#name_host').text(contract_host.username)
$('#price_contract').text(current_contract[0].price)
    $('.gig-genre span').text(contract_contest.style)
    $('#price_contract_').text(current_contract[0].price+"$")
$('#user_join').text(contract_join.username)
$('#user_join_').text(contract_join.username)

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
    $('.col-sm-4').remove();

    // $('#hire').attr('style',"display:inline");

    $( ".hire" ).each(function( index ) {
        $(this).attr('style',"display:inline");
        
      });



}


function design_host()
{   
    $('.col-sm-4').slideUp();
    $( ".hire" ).each(function( ) {
        $(this).attr('style',"display:none");
        
      });

      console.log('okokokok')
      $("#user_join_id"+userx.id).attr('style',"display:inline");
     

}
function design_guest(){
    console.log(current_contest.status);
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



function load_feed()

{
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST",url+"feed/feed_id",false);
    xhttp.setRequestHeader("Content-Type","application/json");
    var obj =
    {
        
        id_contract:id
    }

    xhttp.onreadystatechange= function()
    {
        if (xhttp.readyState==4 && xhttp.status===200)
        {
            var test = JSON.parse(xhttp.responseText);
            console.log(test)
            var feeds =[];
            for (let i=0;i<test.length;i++)
            {
                feeds[i] =test[i]
            }
            draw_feeds(feeds);

        }
    }
    xhttp.send(JSON.stringify(obj));

    
}

function draw_feeds(feeds)
{
     var div_content = $('#user-upload-audio-form');
     console.log('size of auditoons',feeds.length)
     for (let i=0;i<feeds.length;i++)
     {
    var full_url = host_songs+feeds[i].feed_file;
    var url_download = download_songs+feeds[i].feed_file;   
//    var $item_audio = $(`<div id=play_id`+feeds[i].id+` class="track-list-item">
//    <div class="ui360 track-play inline"><a href=`+full_url+` type="audio/mp3"><span>PLAY</span></a></div>
//    <span class="track-title">`+"feed_"+i+`</span>
//    <span class="track-length">(2:24)</span>
  
//    <span class="badge badge-featured">FEATURED</span> <button name="remove_track" value="24265" onclick=del(`+feeds[i].id+`) class="btn btn-sm btn-default remove roll-alt">REMOVE</button>
//    <a href=`+full_url+` class="btn btn-default btn-sm">DOWNLOAD</a>
//    </div>`)
   var $item_feed= $(` <div  id=play_id`+feeds[i].id+`  class="track-list-item">
   <div class="playlist track-waveform asset-audio" style="--player-width:206px; --player-height:12.941px;">
    <div class="track-label">
   <span>HARMONY 02 VOX V1+V2.wav</span>
   </div>
   <a href=`+full_url+` class="track" type="audio/mp3">PLAY</a>
   <img data-cfsrc="/images/default-waveform.png" src="https://vocalizr.com/images/default-waveform.png">
   <img data-cfsrc="/images/default-waveform-roll.png" class="roll hide" src="https://vocalizr.com/images/default-waveform-roll.png">
   </div>
   <span class="track-title">`+"feed_"+i+`</span>
   <span class="track-length">(3:28)</span>
   <span class="badge badge-featured">PREVIEW</span>
   <span class="asset-action-buttons">
   <button name="remove_track" value="24265" onclick=del(`+feeds[i].id+`) class="btn btn-sm btn-default remove roll-alt">REMOVE</button>
   <a href="`+url_download+`"  class="btn btn-default btn-sm">DOWNLOAD</a>

</span>
   </div>`)
   $($item_feed).insertAfter(div_content);
   div_content.append($item_audio);
     }
    
}

function del(test)
{
    $(`#play_id`+test).slideUp()
    var id={
        id:test
    }
    fetch(url+"feed/delete",{
method:'DELETE',
body:JSON.stringify(id) ,
headers:{
    'Content-Type': 'application/json',
}  ,

 }).then(response=>console.log(response)
    )

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


function pdf(name_host,name_join,price)
{
    console.log("test")
    var doc = new jsPDF()
var image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAB1CAYAAABgQbdJAAAY/klEQVR4Xu2dbYxc11nH/2d2N6jyrO2AQGpDUxfaD0g0cfjEi5o4QPsBJO+skSpK1WaW75VtvqPY/Q52hPjavW6ReJGanY0R4kW06wYESIiu0wgBEu3GbhAg0di740TJeudBz713du/MnHPn3HPvvP9HipLY99xz7u885/zP2/McA/5IgARIgARIIICACUjDJCRAAiRAAiQACgiNgARIgARIIIgABSQIGxORAAmQAAlQQGgDJEACJEACQQQoIEHYmIgESIAESIACQhsgARIgARIIIkABCcLGRCRAAiRAAhQQ2gAJkAAJkEAQAQpIEDYmIgESIAESoIDQBkiABEiABIIIUECCsDERCZAACZAABYQ2QAIkQAIkEESAAhKEjYlIgARIgAQoILQBEiABEiCBIAIUkCBsTEQCJEACJEABoQ2QAAmQAAkEEaCABGFjIhIgARIgAQoIbYAESIAESCCIAAUkCBsTkQAJkAAJUEBoAyRAAiRAAkEEKCBB2JiIBEiABEiAAkIbIAESIAESCCJAAQnCxkQkQAIkQAIUENoACZAACZBAEAEKSBA2JiIBEiABEqCA0AZIgARIgASCCFBAgrAxEQmQAAmQAAWENkACJEACJBBEgAIShI2JSIAESIAEKCC0ARIgARIggSACFJAgbExEAiRAAiRAAaENkAAJkAAJBBGggARhYyISIAESIAEKCG2ABEiABEggiAAFJAgbE5EACZAACVBAaAMkQAIkQAJBBBZKQJpb7SYMXgoidZxIHsDUduP/7ch2tF5P/pu/uSDQ3GrfhMGzPR8jcidaX702zg9sbj1qwMjl3nLgbrRevzLOcjAvEsgjsGACcnANxrxcsUnsGYNrm2v1WxW/l6+bAIHmdnsHghcGspalj0frH9obR5GaW++chVnRvM705GdwJ1qrXxhHGZgHCfgQoID4UMp/pgOgBmAXgg3OSMoDneQbnAIC7ESN+ovjKFtzyzHQoYCMAz/zKECAAlIAlsejBxA8TxHxIDWlj+QICCDyYrS+ujPKoje33jsHc/R9ax4UkFGi57sDCFBAAqClSQRAPz/9szZELo66owkvNlPmEcgREJ1p/iBq1D82SoLN1sEWYBoUkFFS5rurIkABUZIiBZYmameBznnUTAMSb7Z2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"
var sign ="data:image/jpeg;base64,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"
doc.setFontSize(40)
doc.text(35, 25, 'PoseMuse Contract')
doc.setFontSize(20)
doc.addImage(image, "png", 50, 100, 100, 60);
doc.addImage(sign, "jpeg", 50, 200, 100, 60);
doc.setLineWidth(1);
doc.line(230, 35, 0, 35);

doc.setLineWidth(1);
doc.line(50, 250, 150, 250);


doc.text(20,50,"Employer:")
doc.text(20,70,name_host)
doc.text(20,90,"Employee:")
doc.text(20,110,name_join)
doc.text(20,130,"price:")
doc.text(20,150,price)
doc.setFontSize(13)

doc.text(20,180,"Signature Made By Amir Ben Nasr"+
" on Behalf of PoseMuse.Co: ")



doc.save('ok.pdf');
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

 <button onclick="hire(`+id_+`)" type="submit" name="save" value="account"  style="text-align:center" class="btn btn-sm btn-default"  >HIRE NOW</button>

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

function hire(id_)
{
    var id_creator=userx.id;
    var modalConfirm = function(callback){
  
          $("#mi-modal").modal('show');
      
      
        $("#modal-btn-si").on("click", function(){
          callback(true);
          $("#mi-modal").modal('hide');
          alert('hired'+id_)
          add_contract(id_contest,id_creator,id_)
          
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

function add_contract(id_contest,id_creator,id_)
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
        id_contest:id_contest
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

