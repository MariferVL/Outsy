//   Firebase CDN imports
import * as auth from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js';
import { collection, query, where, addDoc, getDocs, getFirestore } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js';

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
async function createPost(title, content, image, privacy) {
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
async function editPost(postId, content, image, privacy) {
  await collection('posts').doc(postId).update({
    content,
    image,
    privacy
  });
}

/**
 * Delete a post
 * @param {*} postId 
 */
async function deletePost(postId) {
  await collection('posts').doc(postId).delete();
}


/**
 * Comment on a post
 * @param {*} postId 
 * @param {*} userId 
 * @param {*} content 
 * @returns 
 */
async function addComment(postId, content) {
  const userId = getCurrentUserId();
  const commentRef = await collection('posts').doc(postId).collection('comments').add({
    userId,
    content,
    createdAt: new Date()
  });
  return commentRef.id;
}


/**
 * Like a post
 * @param {*} postId 
 * @param {*} userId 
 */
async function likePost(postId) {
  await collection('posts').doc(postId).collection('likes').doc(userId).set({
    createdAt: new Date()
  });
}

/**
 * Unlike a post
 * @param {*} postId 
 * @param {*} userId 
 */
async function unlikePost(postId, userId) {
  await collection('posts').doc(postId).collection('likes').doc(userId).delete();
}


/**
 * Get the number of likes on a post
 * @param {*} postId 
 * @returns 
 */
async function getLikeCount(postId) {
  const likesRef = await collection('posts').doc(postId).collection('likes').get();
  return likesRef.size;
}


/**
 * Adjust privacy of a post
 * @param {*} postId 
 * @param {*} privacy 
 */
async function adjustPrivacy(postId, privacy) {
  await collection('posts').doc(postId).update({
    privacy
  });
}


/**
 * Add an image to a post
 * @param {*} postId 
 * @param {*} image 
 */
async function addImageToPost(postId, image) {
  await collection('posts').doc(postId).update({
    image
  });
}



async function getPosts() {




  const q = query(collection(db, 'posts'), where('privacy', '==', 'public'));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const post = doc.data();
    const postId = doc.id;

    // Clear any existing posts from the page
    const postContainer = document.getElementById('postContainer');
    postContainer.innerHTML = '';

    // Create HTML elements
    const postArticle = document.createElement('article');
    postArticle.classList.add('post');
    const postTitle = document.createElement('h2');
    postTitle.textContent = post.title;
    const postContent = document.createElement('p');
    postContent.textContent = post.content;
    const postAuthor = document.createElement('p');
    postAuthor.textContent = `Propuesto por: ${post.author}`;
    // const postDate = document.createElement('p');
    // const date = new Date(post.timestamp.toDate());
    // postDate.textContent = `Publicado el: ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
    const postPrivacy = document.createElement('p');
    postPrivacy.textContent = `Privacidad: ${post.privacy}`;
    const postImage = document.createElement('img');
    postImage.src = post.imageURL;
    const postLikes = document.createElement('p');
    postLikes.textContent = `Interesad@s: ${post.likes}`;

    // Create edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
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
      likePost(postId, post.likes);
    });

    // Create a span element to display the number of likes
    const likeCount = document.createElement('span');
    likeCount.setAttribute('id', `likeCount${postId}`);
    likeCount.innerText = post.likes ? post.likes.length : 0;
    const footer = document.createElement('footer');
    footer.appendChild(likeCount);

    // Create comment section
    const commentSection = document.createElement('article');
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

    // Add HTML elements to post container
    postArticle.appendChild(postTitle);
    postArticle.appendChild(postContent);
    postArticle.appendChild(postAuthor);
    // postArticle.appendChild(postDate);
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













export { createPost, getPosts, editPost, deletePost, addComment, likePost, unlikePost, getLikeCount, adjustPrivacy, addImageToPost }