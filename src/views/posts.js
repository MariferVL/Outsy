//GabrielaPatriciaTeama

export const post =
` <section id="addPostForm">
<h2>Create a post</h2>
<form method="POST" id="createPostForm" enctype="multipart/form-data">
<label for="postTitle">Titulo</label>
<input type="text" id="postTitle" name="postTitle">
  <label for="postText">Text</label>
  <textarea id="postContent" name="postText"></textarea>
  <label for="postImage">Image</label>
  <input type="file" id="postImage" name="postImage">
  <label for="postPrivacy">Privacy</label>
  <select id="postPrivacy" name="postPrivacy">
    <option value="public">Public</option>
    <option value="friends">Friends</option>
    <option value="private">Private</option>
  </select>
  <button id="addPostButton" type="submit">Create post</button>
</form>
</section>
<section id="posts">
<h2>Recent posts</h2>
<div id="postList"></div>
</section>`

//Post-it
// `<div class="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
// <div class="container py-5">
//     <div class="section-title text-center position-relative pb-3 mb-4 mx-auto" style="max-width: 600px;">
//         <h5 class="fw-bold text-primary text-uppercase">Muro de Post-It </h5>
//         <h1 class="mb-0">Aquí encuentras todos los mensajes de esta gran comunidad</h1>
//     </div>

//     <!-- New Post-it  Start -->
//     <div class="container bg-faded">
        
//             <a href="{% url 'post_new' %}" class="btn send animated slideInLeft"  class="top-menu"> 
               
//             </a>
     
//     </div>
//     <!-- New Post-it  Start -->

//     <!-- Post-it Wall Start -->
//     <div class="wall">
       
//             <div class="sticky-container-wall">
//                 <div class="sticky-outer">
//                     <div class="sticky">
//                         <svg width="0" height="0">
//                         <defs>
//                             <clipPath id="stickyClip" clipPathUnits="objectBoundingBox">
//                             <path
//                                 d="M 0 0 Q 0 0.69, 0.03 0.96 0.03 0.96, 1 0.96 Q 0.96 0.69, 0.96 0 0.96 0, 0 0"
//                                 stroke-linejoin="round"
//                                 stroke-linecap="square"/>
//                             </clipPath>
//                         </defs>
//                         </svg>
//                         <div class="sticky-content color" >
//                              <p class="postdate" style="font-size: 11px;"><time> publicado: {{post.published_date}}</time></p> 
//                             <p class="posttitle" style="font-size: 33px; padding: 33px"><a href={% url 'post_detail' pk=post.pk %}>{{ post.title}}</a></p>
//                         </div>
//                     </div>
//                 </div>
//             </div>            
        
//         <!-- Post-it Wall End -->
//     </div>
// </div>
// </div> 
// `