
var user = JSON.parse(localStorage.getItem("user"));
var uploader = new plupload.Uploader({
    runtimes : 'html5',
    container : 'upload-audio-container',
    browse_button : 'upload-audio-btn',
    max_file_size : '10mb',
    multipart_params : {id:user.id},
    url : 'http://localhost:3000/audition/upload',
    silverlight_xap_url : '/assets/plupload/plupload.silverlight.xap',
    multipart: true, 
    
   
    filters:[
        {extensions : 'mp3'}
    ]
});
uploader.init();

uploader.bind('FilesAdded',function(up,files)
{
    for (var i in files)
    var contain = $('#hello');

    
    {
        contain.append(`<div>
        `+files[i].name+`
        </div>`)
        console.log(files[i])
    }
    uploader.start();
})


