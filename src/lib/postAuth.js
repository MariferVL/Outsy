//   Firebase CDN imports
import * as auth from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import * as firestore from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

import app from "./firebase";

const db = firestore.getFirestore(app);

/**
 * Function to get the current user's display name
 * @returns
 */
function getCurrentUserName() {
  return auth.currentUser.displayName;
}

/**
 * Function to get the current user's ID
 * @returns
 */
function getCurrentUserId() {
  return auth.currentUser.uid;
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
  const userId =  getCurrentUserId();
  const userName = getCurrentUserName();
  const postRef = await addDoc(collection(db, 'posts'),{
    userId,
    userName,
    title,
    content,
    image,
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
  await db.collection('posts').doc(postId).update({
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
  await db.collection('posts').doc(postId).delete();
}


/**
 * Comment on a post
 * @param {*} postId 
 * @param {*} userId 
 * @param {*} content 
 * @returns 
 */
async function addComment(postId, content) {
  const userId =  getCurrentUserId();
  const commentRef = await db.collection('posts').doc(postId).collection('comments').add({
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
  await db.collection('posts').doc(postId).collection('likes').doc(userId).set({
    createdAt: new Date()
  });
}

/**
 * Unlike a post
 * @param {*} postId 
 * @param {*} userId 
 */
async function unlikePost(postId, userId) {
  await db.collection('posts').doc(postId).collection('likes').doc(userId).delete();
}

 
/**
 * Get the number of likes on a post
 * @param {*} postId 
 * @returns 
 */
async function getLikeCount(postId) {
  const likesRef = await db.collection('posts').doc(postId).collection('likes').get();
  return likesRef.size;
}


/**
 * Adjust privacy of a post
 * @param {*} postId 
 * @param {*} privacy 
 */
async function adjustPrivacy(postId, privacy) {
  await db.collection('posts').doc(postId).update({
    privacy
  });
}


/**
 * Add an image to a post
 * @param {*} postId 
 * @param {*} image 
 */
async function addImageToPost(postId, image) {
  await db.collection('posts').doc(postId).update({
    image
  });
}



//https://firebase.google.com/docs/firestore/security/rules-query?hl=es-419
// o
// /**
//  * Create a new collection if it does not exist
//  * @param {*} collectionName 
//  */
// async function createCollectionIfNotExist(collectionName) {
//   const collections = await db.listCollections();
//   const collectionExists = collections.some((col) => col.id === collectionName);
//   if (!collectionExists) {
//     await db.collection(collectionName).doc().set({}); 
//     console.log(`Colección de '${collectionName}' creada exitosamente.`);
//   } else {
//     console.log(`Colección de '${collectionName}' ya existe. `);
//   }
// }

// // Usage:
// createCollectionIfNotExist('likes');













export {createPost, editPost, deletePost, addComment, likePost, unlikePost, getLikeCount, adjustPrivacy, addImageToPost}