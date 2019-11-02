window.addEventListener('load',function()
{
   
        
	
    //    signin(json_user);

    
    
    
    
    load_song();
    

    // test();
})

function load_song()

{
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST","http://localhost:3000/audition/find_audition",false);
    xhttp.setRequestHeader("Content-Type","application/json");
    var obj =
    {
        id_user:4
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
    var div_content = $('#test1');
    for (let i=0;i<auditions.length;i++)
    {
        var $item_1 =$ ("<div class='ui360'>"+
        "<a href="+"http://127.0.0.1/passeportAuth/uploads/"+auditions[i].demo_file+">"+i+"</a>"+
        "</div>")

       div_content.append($item_1)
    }
   
   
   

    
}

function del_auditions()
{
    var div_content = $('#test1');
    div_content.empty();


}









const url = 'http://localhost:3000/audition/upload';
const form = document.querySelector('form');
window.onload=function()
{
form.addEventListener('submit', e => {
    
    e.preventDefault()
    alert("test")
    console.log("ok")
 

  const files = document.querySelector('[type=file]').files;
  const formData = new FormData();


  for (let i = 0; i < files.length; i++) {
    let file = files[i];
var json = {
    id:17
};
console.log(formData);
var ok = JSON.stringify(json);
    formData.append('Demo', file);
    formData.append('id',ok);
 //   new Response(formData).text().then(console.log)

}

//   fetch(url, {
//     method: 'POST',
//     body: formData,
    
    
//   }).then(response => {
//     this.del_auditions();
//     this.load_song();

//     console.log(response)
//   })
  
var xhttp = new this.XMLHttpRequest() ;
xhttp.open('POST',url,false);
xhttp.onreadystatechange=function()
{
    if (xhttp.status==200)
    {
        console.log(this.response);
        del_auditions();
        load_song();
        
    }
};

xhttp.send(formData);
location.reload();


});


};