import { deletePost, editPost } from "../lib/postAuth";



/**
 * Function to show post in container
 */
export const showPost = () => {


  // Clear any existing posts from the page
  const postContainer = document.getElementById("postContainer");
  postContainer.innerHTML = "";

  // Create HTML elements

  const postArticle = document.createElement("article");
  postArticle.classList.add("post");
  const postTitle = document.createElement("h2");
  postTitle.textContent = post.title;
  const postContent = document.createElement("p");
  postContent.textContent = post.content;
  const postAuthor = document.createElement("p");
  postAuthor.textContent = `Propuesto por: ${post.author}`;
  const postDate = document.createElement("p");
  const date = new Date(post.timestamp.toDate());
  postDate.textContent = `Publicado el: ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  const postPrivacy = document.createElement("p");
  postPrivacy.textContent = `Privacidad: ${post.privacy}`;
  const postImage = document.createElement("img");
  postImage.src = post.imageURL;
  const postLikes = document.createElement("p");
  postLikes.textContent = `Interesad@s: ${post.likes}`;

  // Create edit button
  const editButton = document.createElement("button");
  editButton.textContent = "Editar";
  editButton.addEventListener("click", () => {
    editPost(postId, post);
  });

  // Create delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Eliminar";
  deleteButton.addEventListener("click", () => {
    deletePost(postId);
  });

  // Create like button
  const likeButton = document.createElement("button");
  likeButton.textContent = "Interesante";
  likeButton.addEventListener("click", () => {
    likePost(postId, post.likes);
  });

  // Create a span element to display the number of likes
  const likeCount = document.createElement("span");
  likeCount.setAttribute("id", `likeCount${postId}`);
  likeCount.innerText = post.likes ? post.likes.length : 0;
  footer.appendChild(likeCount);

  // Create comment section
  const commentSection = document.createElement("article");
  commentSection.classList.add("comment-section");
  const commentInput = document.createElement("input");
  commentInput.type = "text";
  commentInput.placeholder = "Agrega un Comentario...";
  const commentButton = document.createElement("button");
  commentButton.textContent = "Comentario";
  commentButton.addEventListener("click", () => {
    addComment(postId, commentInput.value);
    commentInput.value = "";
  });
  const commentsList = document.createElement("ul");

  // Add HTML elements to post container
  postArticle.appendChild(postTitle);
  postArticle.appendChild(postContent);
  postArticle.appendChild(postAuthor);
  postArticle.appendChild(postDate);
  postArticle.appendChild(postPrivacy);
  postArticle.appendChild(postImage);
  postArticle.appendChild(postLikes);
  postArticle.appendChild(editButton);
  postArticle.appendChild(deleteButton);
  postArticle.appendChild(likeButton);
  commentSection.appendChild(commentInput);
  commentSection.appendChild(commentButton);
  commentSection.appendChild(commentsList);
  postArticle.appendChild(commentSection);
  postContainer.appendChild(postArticle);
}; 