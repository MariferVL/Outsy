//   Firebase CDN imports
import * as auth from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js';
import { updateDoc, collection, query, where, addDoc, getDocs, getFirestore, serverTimestamp, arrayUnion } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js';

import app from './firebase';

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
  const userName = getCurrentUserName();
  const postRef = await addDoc(collection(db, 'posts'), {
    // userId,
    // userName,
    title,
    content,
    privacy,
    likes: [],
    comments: []
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
  await collection('posts').doc(postId).updateDoc({
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
  await collection('posts').doc(postId).deleteDoc();
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
  //FIXME: add collection 
  const commentsRef = collection(db, 'posts', postId, 'comments');
  const newCommentRef = await addDoc(commentsRef, {
    text: commentText,
    //FIXME: obtener usuarios.
    // userId: getCurrentUserId(),
    // userName: getCurrentUserName(),
    createdAt: serverTimestamp(),
  });
  const commentId = newCommentRef.id;

  // Update the "comments" field of the post document
  const postRef = doc(db, 'posts', postId);
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
  //FIXME: update  ??? spread operator??
  await collection('posts').doc(postId).collection('likes').setDoc({

  });

  const likesRef = collection(db, 'posts', postId, 'likes');
  const newlikeRef = await addDoc(likesRef, {
    text: likeText,
    //FIXME: obtener usuarios.
    // userId: getCurrentUserId(),
    //userName: getCurrentUserName(),
    createdAt: new Date()
  });
  const likeId = newlikeRef.id;

  // Update the "likes" field of the post document
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, {
    likes: arrayUnion(likeId),
  });
}

/**
 * Unlike a post
 * @param {*} postId 
 * @param {*} userId 
 */
async function unlikePost(postId, userId) {
  //FIXME: como recorrer array likes????   
  await collection('posts').doc(postId).collection('likes').doc(userId).deleteDoc();
}


/**
 * Get the number of likes on a post
 * @param {*} postId 
 * @returns 
 */
async function getLikeCount(postId) {
  //FIXME: size o length
  const likesRef = await collection('posts').doc(postId).collection('likes').getDocs();
  return likesRef.size;
}




async function getPosts() {
  const q = query(collection(db, 'posts'), where('privacy', '==', 'public'));
  const querySnapshot = await getDocs(q);
  postContainer.innerHTML = '';

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const post = doc.data();
    console.log('post: ' , post);
    console.log('comments:' , post.comment);
    const postId = doc.id;

    // Clear any existing posts from the page
    const postContainer = document.getElementById('postContainer');

    // Create post elements
    const postArticle = document.createElement('article');
    postArticle.classList.add('post');
    const postTitle = document.createElement('h2');
    postTitle.textContent = post.title;
    const postContent = document.createElement('p');
    postContent.textContent = post.content;
    const postAuthor = document.createElement('p');
    postAuthor.textContent = `Propuesto por: ${post.author}`;
    const postDate = document.createElement('time');
    const date = new Date();
    postDate.textContent = `Publicado el: ${date.toLocaleDateString()} a las ${date.toLocaleTimeString()}`;
    const postPrivacy = document.createElement('p');
    postPrivacy.textContent = `Privacidad: ${post.privacy}`;
    const postImage = document.createElement('img');
    postImage.src = post.imageURL;
    const postLikes = document.createElement('p');
    postLikes.textContent = `Interesad@s: ${post.likes.length ? post.likes.length : 0}`;
    postContainer.appendChild(postArticle);

    // Create edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.setAttribute("id", "editPost");
    editButton.addEventListener('click', () => {
      editPost(postId, post);
    });

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', () => {
      deletePost(postId);
    });

    // Create like button
    const likeButton = document.createElement('button');
    likeButton.textContent = 'Interesante';
    likeButton.addEventListener('click', () => {
      console.log('likes: ' + post.likes.length);
      likePost(postId);
    });

    // // Create a span element to display the number of likes
    // const likeCount = document.createElement('span');
    // likeCount.setAttribute('id', `likeCount${postId}`);
    // likeCount.innerText = post.likes ? post.likes.length : 0;

    //Create a article element to display comments.
    const commentContainer = document.createElement('article');
    commentContainer.setAttribute('id', 'commentContainer');

    // Create comment section
    const commentSection = document.createElement('form');
    commentSection.classList.add('comment-section');
    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Agrega un Comentario...';
    const commentButton = document.createElement('button');
    commentButton.textContent = 'Comentario';
    commentButton.addEventListener('click', () => {
      addComment(postId, commentInput.value);
      commentInput.value = '';
    });
    const commentsList = document.createElement('ul');
    const footer = document.createElement('footer');
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
  });
}


/**
 * Get the post comments
 * @param {*} postId 
 */
async function getComments(postId) {

  // Get the post document
  const postRef = collection('posts').doc(postId);

  // Get the comments subcollection of the post
  const commentsRef = postRef.collection('comments');

  // Listen for changes in the comments collection
  commentsRef.onSnapshot((querySnapshot) => {
    // Clear the existing comments from the DOM
    const commentsContainer = document.getElementById('commentContainer');
    commentsContainer.innerHTML = '';

    // Iterate through the comments and display them in the DOM
    querySnapshot.forEach((doc) => {
      const comment = doc.data();
      // Create commet elements
      const commentArticle = document.createElement('article');
      commentArticle.classList.add('post');
      const commentContent = document.createElement('p');
      commentContent.textContent = comment.content;
      const commentAuthor = document.createElement('p');
      commentAuthor.textContent = `Propuesto por: ${comment.author}`;
      const commentDate = document.createElement('time');
      const dateComment = new Date();
      commentDate.textContent = `Publicado el: ${dateComment.toLocaleDateString()} a las ${dateComment.toLocaleTimeString()}`;
      commentsContainer.appendChild(commentElement);
    });
  });


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













export { createPost, getPosts, editPost, deletePost, addComment, likePost, unlikePost, getLikeCount }