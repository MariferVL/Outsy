export const post =
` <section id="addPostForm">
<h2>Create a post</h2>
<form method="POST" id="createPostForm" enctype="multipart/form-data">
<label for="postTitle">Título</label>
<input type="text" id="postTitle" name="postTitle">
<label for="meeting-time">Fecha</label>
<input type="datetime-local" id="postTime" name="meeting-time" value="2023-04-16T19:30"
min="2023-04-16T19:30" max="2111-01-01T00:00">
<label for="postLocation">Lugar</label>
<input type="text" id="postLocation" name="postTitle">
  <label for="postText">Descripción</label>
  <textarea id="postContent" name="postText"></textarea>
  <label for="postImage">Imágen</label>
  <input type="file" id="postImage" name="postImage">
  <label for="postPrivacy">Privacidad</label>
  <select id="postPrivacy" name="postPrivacy">
    <option value="public">Publico</option>
    <option value="friends">Amigos</option>
    <option value="private">Privado</option>
  </select>
  <button id="addPostButton" type="submit">Create post</button>
</form>
</section>
`
