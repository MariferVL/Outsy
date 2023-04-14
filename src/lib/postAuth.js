//   Firebase CDN imports
import * as auth from "https://www.gstatic.com/firebasejs/9.19.0/firebase-auth.js";
import {
  updateDoc,
  collection,
  query,
  where,
  addDoc,
  getDoc,
  getDocs,
  getFirestore,
  serverTimestamp,
  arrayUnion,
} from "https://www.gstatic.com/firebasejs/9.19.0/firebase-firestore.js";

import app from "./firebase";

const db = getFirestore(app);
const authApp = auth.getAuth(app);

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
async function createPost(title, content, privacy) {
  const userId = getCurrentUserId();
  const author = getCurrentUserName();
  console.log("userName: " + author);
  console.log("userId: " + userId);
  const postRef = await addDoc(collection(db, "posts"), {
    userId,
    author,
    title,
    content,
    privacy,
    likes: [],
    comments: [],
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
  //FIXME:
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
  await collection("posts").doc(postId).deleteDoc();
}

/**
 * Add Comment on a post
 * @param {*} postId
 * @param {*} userId
 * @param {*} content
 * @returns
 */
/* async function addComment(postId, commentText) {
  const userId = getCurrentUserId();
  const author = getCurrentUserName();
  // const commentsRef = collection(db, "posts", postId, "comments");
  // const newCommentRef = await {
  //   text: commentText,
  //   userId,
  //   author,
  //   createdAt: serverTimestamp(),
  // };
  // const commentId = newCommentRef.id;

  const postRef = collection(db, "posts", postId);
  const postSnapshot = await getDoc(postRef);
  const post = postSnapshot.data();

  const newComment = {
    text: commentText,
    userId,
    author,
    createdAt: serverTimestamp(),
  };
  // Add the new comment to the comments array
  post.comments.push(newComment);

  // Update the post document with the new comments array
  await updateDoc(postRef, {
    comments: post.comments,
  });

  console.log("comments length: " , post.comments.length );
  // Reload the comments for the post
  if(post.comments.length > 0) getComments(postId);

  // // Update the "comments" field of the post document
  // await updateDoc(postRef, {
  //   comments: arrayUnion(commentId),
  // });

  return commentId;
} */

async function addComment(postId, commentText) {
  const userId = getCurrentUserId();
  const author = getCurrentUserName();

  //FIXME: add collection
  const commentsRef = collection(db, "posts", postId, "comments");
  const newCommentRef = await addDoc(commentsRef, {
    text: commentText,
    userId,
    author,
    createdAt: serverTimestamp(),
  });
  const commentId = newCommentRef.id;

  // Update the "comments" field of the post document
  const postRef = collection(db, "posts", postId);
  await updateDoc(postRef, {
    comments: arrayUnion(commentId),
  });

  return commentId;
}

/**
 * Like a post
 * @param {*} postId
 * @param {*} userId
 */
async function likePost(postId) {
  // if (!currentUserId) {
  //   throw new Error("User is not authenticated");
  // }

  // const postRef = collection("posts").doc(postId);
  // // const postRef = doc(db, "posts", postId);

  // const postSnapshot = await postRef.get();

  // if (!postSnapshot.exists) {
  //   throw new Error(`Post document with ID ${postId} does not exist`);
  // }

  // const newlikeRef = {
  //   currentUserId,
  // };

  // const postData = postSnapshot.data();
  // const likesArray = (await postData.likes) || [];
  // console.log("likesArray: ", likesArray);
  // if (likesArray.includes(currentUserId)) {
  //   return;
  // } else {
  //   console.log("entró a update like:");
  //   // Update the "likes" field of the post document
  //   await updateDoc(postRef, {
  //     likes: arrayUnion(newlikeRef),
  //   });
  // }

  const userId = getCurrentUserId();
  const author = getCurrentUserName();

  const likesRef = collection(db, "posts", postId, "likes");
  const newLikeRef = await addDoc(likesRef, {
    userId,
    author,
    createdAt: serverTimestamp(),
  });
  const likeId = newLikeRef.id;

  // Update the "likes" field of the post document
  const postRef = doc(db, "posts", postId);
  await updateDoc(postRef, {
    likes: arrayUnion(likeId),
  });

  getPosts();

  return likeId;

  // getLikeCount(postId);
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
 

  // Get the post document
  const subcollectionRef = collection("posts").doc(postId).collection("likes");

  // // Get the likes array and count its length
  // const likesArray = postDoc.data().likes;

  let totalLikes = 0;

subcollectionRef.get().then(querySnapshot => {
  querySnapshot.forEach(doc => {
    const data = doc.data();
    totalLikes += data.likes;
  });
  console.log(`Total likes: ${totalLikes}`);
}).catch(error => {
  console.error(error);
});
console.log(`Antes de return Total likes: ${totalLikes}`);

  return totalLikes;
}

async function getPosts() {
  postContainer.innerHTML = "";

  const q = query(collection(db, "posts"), where("privacy", "==", "public"));
  const querySnapshot = await getDocs(q);

  await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      // querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const post = doc.data();
      const postId = doc.id;

      // Clear any existing posts from the page
      const postContainer = document.getElementById("postContainer");

      // Create post elements
      const postArticle = document.createElement("article");
      postArticle.classList.add("post");
      const postTitle = document.createElement("h2");
      postTitle.textContent = post.title;
      const postContent = document.createElement("p");
      postContent.textContent = post.content;
      const postAuthor = document.createElement("p");
      postAuthor.textContent = `Propuesto por: ${post.author}`;
      const postDate = document.createElement("time");
      const date = new Date();
      postDate.textContent = `Publicado el: ${date.toLocaleDateString()} a las ${date.toLocaleTimeString()}`;
      const postPrivacy = document.createElement("p");
      postPrivacy.textContent = `Privacidad: ${post.privacy}`;
      const postImage = document.createElement("img");
      postImage.src = post.imageURL;
      const postLikes = document.createElement("p");
      postLikes.textContent = `Interesad@s: ${getLikeCount(postId) ? post.likes.length : 0
      }`;
      postContainer.appendChild(postArticle);

      // Create edit button
      const editButton = document.createElement("button");
      editButton.textContent = "Editar";
      editButton.setAttribute("id", "editPost");
      editButton.addEventListener("click", () => {
        console.log("entro al edit ");
        editPost(postId, post);
      });

      // Create delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar";
      deleteButton.setAttribute("id", "deleteButton");
      deleteButton.addEventListener("click", () => {
        console.log("Entro al delete");
        deletePost(postId);
      });

      // Create like button
      const likeButton = document.createElement("button");
      likeButton.textContent = "Interesante";
      likeButton.setAttribute("id", "likeButton");
      likeButton.addEventListener("click", () => {
        console.log("likes: ", post.likes.length);
        console.log("post id: ", postId);

        likePost(postId);
      });

      // // Create a span element to display the number of likes
      // const likeCount = document.createElement('span');
      // likeCount.setAttribute('id', `likeCount${postId}`);
      // likeCount.innerText = post.likes ? post.likes.length : 0;

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
        console.log("entro al comment");
        addComment(postId, commentInput.value);
        commentInput.value = "";
      });
      const commentsList = document.createElement("ul");
      const footer = document.createElement("footer");
      footer.setAttribute("id", "footerComment");
      footer.appendChild(commentSection);

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
      postArticle.appendChild(footer);
      postContainer.appendChild(postArticle);
      getComments(postId);
    })
  );
}

/**
 * Get the post comments
 * @param {*} postId
 */
async function getComments(postId) {
  const footer = document.getElementById("footerComment");
  const commentArticle = document.createElement("article");
  commentArticle.innerHTML = "";

  const commentsRef = collection("posts").doc(postId).collection("comments");
  const querySnapshot = await getDocs(commentsRef);

  await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      // querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      const comment = doc.data();
      console.log("comment: ", comment);
      // const commentId = doc.id;
      // Create commet elements
      commentArticle.classList.add("post");
      const commentContent = document.createElement("p");
      commentContent.textContent = comment.content;
      const commentAuthor = document.createElement("p");
      commentAuthor.textContent = `Propuesto por: ${comment.author}`;
      const commentDate = document.createElement("time");
      const dateComment = comment.createdAt;
      commentDate.textContent = `Publicado el: ${dateComment.toLocaleDateString()} a las ${dateComment.toLocaleTimeString()}`;
      commentArticle.appendChild(commentElement);
      footer.appendChild(commentArticle);
    })
  );
}

//https://firebase.google.com/docs/firestore/security/rules-query?hl=es-419
// o
/**
 * Create a new collection if it does not exist
 * @param {*} collectionName
 */
/* async function createCollectionIfNotExist(collectionName) {
  const collections = await listCollections();
  const collectionExists = collections.some((col) => col.id === collectionName);
  if (!collectionExists) {
    await collection(collectionName).doc().set({}); 
    console.log(`Colección de '${collectionName}' creada exitosamente.`);
  } else {
    console.log(`Colección de '${collectionName}' ya existe. `);
  }
}

// Usage:
createCollectionIfNotExist('likes'); */

export {
  createPost,
  getPosts,
  editPost,
  deletePost,
  addComment,
  likePost,
  getLikeCount,
};
