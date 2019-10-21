



var img_path ="C:/study/PoseMuse-Design/PoseMuse-Design/js/profile.jpg";

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


