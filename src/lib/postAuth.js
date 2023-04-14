//   Firebase CDN imports
import * as auth from "https://www.gstatic.com/firebasejs/9.19.0/firebase-auth.js";
import { ref, uploadBytes, getDownloadURL, getStorage } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-storage.js";

import {
  updateDoc,
  collection,
  query,
  orderBy,
  where,
  addDoc,
  getDoc,
  getDocs,
  getFirestore,
  getCountFromServer,
  serverTimestamp,
  arrayUnion,
  doc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/9.19.0/firebase-firestore.js";

import app from "./firebase";


const db = getFirestore(app);
const authApp = auth.getAuth(app);
const storage = getStorage(app, 'gs://outsy-mxg.appspot.com');


/**
 * Function to get the current user's display name
 * @returns
 */
function getCurrentUserName() {
  return authApp.currentUser.displayName;
}

/**
 * Function to get the current user's ID
 * @returns
 */
function getCurrentUserId() {
  return authApp.currentUser.uid;
}

/**
 * Function to get the current user's profile image
 * @returns
 */
// async function getCurrentUserProfileImage() {
//   const id = getCurrentUserId();
//   const ref = storage.ref(`users/${id}/profileImage`);
//   const url = await ref.getDownloadURL();
//   return url;
// }





/**
 * Create a post
 * @param {*} content
 * @param {*} image
 * @param {*} privacy
 * @returns post id
 */
async function createPost(title, date, location, content, image, privacy) {
  const userId = getCurrentUserId();
  const author = getCurrentUserName();
  const now = new Date();
  const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  const postDate = now.toLocaleDateString('es-ES', options);
  const formatedDate = new Date(date);
  const dateToStr = formatedDate.toLocaleDateString('es-ES', options);

  // Upload the image to Firebase Storage
  const storageRef = ref(storage, `images/${image.name}`);
  const snapshot = await uploadBytes(storageRef, image);

  // Get the image URL
  const imageUrl = await getDownloadURL(snapshot.ref);

  // Create a new post document in Firestore with the image URL
  const postRef = await addDoc(collection(db, "posts"), {
    userId,
    author,
    title,
    dateToStr,
    postDate,
    location,
    content,
    privacy,
    imageUrl
  });

  return postRef.id;
}


/**
 * Edit a post
 * @param {*} postId
 * @param {*} content
 * @param {*} image
 * @param {*} privacy
 */
async function editPost(postId, post) {
  await collection("posts").doc(postId).updateDoc({
    title,
    content,
    privacy,
  });
}

/**
 * Delete a post
 * @param {*} postId
 */
async function deletePost(postId) {
  await deleteDoc(doc(db, "posts", postId));
  return getPosts();
}

/**
 * Add Comment on a post
 * @param {*} postId
 * @param {*} userId
 * @param {*} content
 * @returns
 */
async function addComment(postId, commentText) {
  const userId = getCurrentUserId();
  const author = getCurrentUserName();
  const now = new Date();
  const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  const createdAt = now.toLocaleDateString('es-ES', options);


  const postRef = doc(db, "posts", postId);
  const commentsRef = collection(postRef, "comments");
  const newCommentRef = await addDoc(commentsRef, {
    text: commentText,
    userId,
    author,
    createdAt,
  });
  const commentId = newCommentRef.id;

  //A falta de 1 método tenemos 2 ;)  
  // Update the "comments" field of the post document
  await updateDoc(postRef, {
    comments: arrayUnion(commentId),
  });

  await getPosts();
  return commentId;
}

/**
 * Like a post
 * @param {*} postId
 * @param {*} userId
 */
async function likePost(postId) {
  const userId = getCurrentUserId();
  const author = getCurrentUserName();

  const postRef = doc(db, "posts", postId);
  const likesRef = collection(postRef, "likes");
  const newLikeRef = await addDoc(likesRef, {
    userId,
    author,
  });
  const likeId = newLikeRef.id;

  // Update the "likes" field of the post document
  await updateDoc(postRef, {
    likes: arrayUnion(likeId),
  });

  await getPosts();

  return likeId;

}

// /**
//  * Unlike a post
//  * @param {*} postId
//  * @param {*} userId
//  */
// async function unlikePost(postId, userId) {
//   const postRef = doc(db, "posts", postId);
//   await updateDoc(postRef, {
//     likes: arrayRemove(newlikeRef),
//   });
// }

/**
 * Get the number of likes on a post
 * @param {*} postId
 * @returns
 */
async function getLikeCount(postId) {
  // Get the likes subcollection of the post document
  const postRef = doc(db, "posts", postId);
  const likesRef = collection(postRef, "likes");

  // Get the like count from the server
  const snapshot = await getCountFromServer(likesRef);

  return snapshot.data().count;
}

/**
 * 
 */
async function getPosts() {
  const postContainer = document.getElementById("postContainer");
  postContainer.innerHTML = "";

  const q = query(collection(db, "posts"), where("privacy", "==", "public"), orderBy("postDate", "desc"));
  const querySnapshot = await getDocs(q);

  await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      // querySnapshot.forEach((doc) => {
      const post = doc.data();
      const postId = doc.id;

      // Create post elements
      const postArticle = document.createElement("article");
      postArticle.classList.add("post");
      const postTitle = document.createElement("h3");
      postTitle.textContent = post.title;
      const postTime = document.createElement("time");
      postTime.textContent = `Vamos el: ${post.dateToStr ? post.dateToStr : 'Indefinida'}`;
      const postLocation = document.createElement("p");
      postLocation.textContent = post.location;
      const postContent = document.createElement("p");
      postContent.textContent = post.content;
      const postAuthor = document.createElement("p");
      postAuthor.textContent = `Propuesto por: ${post.author}`;
      const postDate = document.createElement("time");
      const date = post.postDate;
      postDate.textContent = `Publicado el: ${date ? date : 'Indefinida'}`;
      const postPrivacy = document.createElement("p");
      postPrivacy.textContent = `Privacidad: ${post.privacy}`;
      const postImage = document.createElement("img");
      postImage.setAttribute('id', 'postImage');
      postImage.src = post.imageUrl;
      const postLikes = document.createElement("p");
      const countLikes = await getLikeCount(postId);
      postLikes.textContent = `Interesad@s: ${countLikes ? countLikes : 0}`;
      postContainer.appendChild(postArticle);

      // Create edit button
      const editButton = document.createElement("button");
      editButton.textContent = "Editar";
      editButton.setAttribute("id", "editPost");
      editButton.addEventListener("click", () => {
        editPost(postId, post);
      });

      // Create delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar";
      deleteButton.setAttribute("id", "deleteButton");
      deleteButton.addEventListener("click", () => {
        deletePost(postId);
      });

      // Create like button
      const likeButton = document.createElement("button");
      likeButton.textContent = "Interesante";
      likeButton.setAttribute("id", "likeButton");
      likeButton.addEventListener("click", () => {
        likePost(postId);
      });


      //Create a article element to display comments.
      const commentContainer = document.createElement("article");
      commentContainer.setAttribute("id", "commentContainer");

      // Create comment section
      const commentSection = document.createElement("form");
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
      commentsList.setAttribute('id', 'commentsList');
      const footer = document.createElement("footer");
      footer.setAttribute("id", "footerComment");
      
      // Add HTML elements to post container
      postArticle.appendChild(postTitle);
      postArticle.appendChild(postLocation);
      postArticle.appendChild(postTime);
      postArticle.appendChild(postImage);
      postArticle.appendChild(postContent);
      postArticle.appendChild(postAuthor);
      postArticle.appendChild(postDate);
      postArticle.appendChild(postPrivacy);
      postArticle.appendChild(postLikes);
      postArticle.appendChild(editButton);
      postArticle.appendChild(deleteButton);
      postArticle.appendChild(likeButton);
      commentSection.appendChild(commentInput);
      commentSection.appendChild(commentButton);
      footer.appendChild(commentsList);
      postArticle.appendChild(footer);
      postArticle.appendChild(commentSection);
      postContainer.appendChild(postArticle);
      await getComments(postId);
    })
  );
}

/**
 * Get the post comments
 * @param {*} postId
 */
async function getComments(postId) {
  const commentsList = document.getElementById("commentsList");
  commentsList.innerHTML = "";

  const postRef = doc(db, "posts", postId);
  const commentsRef = collection(postRef, "comments");

  const querySnapshot = await getDocs(commentsRef);

  await Promise.all(
    querySnapshot.docs.map(async (doc) => {

      const comment = doc.data();
      // const commentId = doc.id;

      // Create commet elements

      const commentArticle = document.createElement("article");
      commentArticle.classList.add("post");
      const commentContent = document.createElement("p");
      commentContent.textContent = comment.text;
      const commentAuthor = document.createElement("p");
      commentAuthor.textContent = `Propuesto por: ${comment.author}`;
      const commentDate = document.createElement("time");
      const dateComment = comment.createdAt;
      commentDate.textContent = `Publicado el: ${dateComment ? dateComment : 'Indefinida'}`;
      const commentItem = document.createElement('li');
      commentArticle.appendChild(commentContent);
      commentArticle.appendChild(commentAuthor);
      commentArticle.appendChild(commentDate);
      commentItem.appendChild(commentArticle);
      commentsList.appendChild(commentItem);
    })
  );
}



export {
  createPost,
  getPosts,
};
