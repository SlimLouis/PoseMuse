$(document).ready(function()
{
    load_img();
    form_submit();
})
var user = JSON.parse(localStorage.getItem("user"));

function form_submit()
{

    $("#create-gig-form").submit(function(e)
    {
        e.preventDefault();
        var contest=($(this).serializeJSON());

        localStorage.setItem("contest",JSON.stringify(contest.project));

        upload_form(contest)
    })


}

function load()
{
    var current_contest = localStorage.getItem("contest");
    // console.log(current_contest);
}

function upload_form(contest)
{
    contest.project.muserId = user.id ;   
    var genre = contest.project.genres;

    genre.forEach(element => {
        if (element==1)
        {
            contest.project.style="Tech house"
        }
        else if (element==2)
        {
            contest.project.style="Techno"

        }
        else if (element==3)
        {
            contest.project.style="TechStep"

        }
        else if (element==4)
        {
            contest.project.style="Trance"

        }
        else if (element==5)
        {
            contest.project.style="Trap"

        }
        else if (element==6)
        {
            contest.project.style="Trap house"

        }
        else if (element==7)
        {
            contest.project.style="Tropical house"

        }
    });
// console.log(contest)

     var formdata = new FormData();

    //  contest.project.price=300;
     var price = parseInt(contest.project.price)
     contest.project.price= price;
    var url_ = url+"contest/create_contest";
    // contest.project.audio = contest.audio
    contest.project.audio = contest.audio_file
     formdata.append("contest",JSON.stringify(contest.project));

    //  formdata.append("Demo",contest.audio_file,"blob.mp3");
     var xhttp = new XMLHttpRequest();
     xhttp.open('POST',url_,false);
    //  xhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    //  xhttp.setRequestHeader('Content-Type','application/json');

     xhttp.onreadystatechange=function()
     {
         if (xhttp.status==200)
         {
             console.log('WORKED')
             console.log(xhttp.response);
             location.href="edit.html"
         }
         else
         {
             console.log('error')
             console.log(xhttp.response)
         }
     }
     xhttp.send(formdata);



}

function load_img()
{
    var img_url = host+user.profile_pic ;

    $('#avatar_').attr("src",img_url)
}