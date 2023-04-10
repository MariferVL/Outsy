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
`
