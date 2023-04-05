//   Firebase CDN imports
import * as auth from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import * as storage from "https://www.gstatic.com/firebasejs/9.18.0/firebase-storage.js";

import * as firestore from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

import {showPost} from "showPost";

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
async function getCurrentUserProfileImage() {
  const id = getCurrentUserId();
  const ref = storage.ref(`users/${id}/profileImage`);
  const url = await ref.getDownloadURL();
  return url;
}
//Get a reference to the posts collection in Firestore


/**
 * Add a new post to Firestore
 * @param {*} title 
 * @param {*} content 
 * @param {*} privacy 
 * @param {*} imageFile 
 */
function addPost(title, content, privacy, imageFile) {
    const postsRef = firestore.collection().doc("users");

  const userId = getCurrentUserId();
  const userName = getCurrentUserName();
  const userProfileImage = getCurrentUserProfileImage();

  // Create a new post object with the given data
  const newPost = {
    title: title,
    content: content,
    privacy: privacy,
    userId: userId,
    userName: userName,
    userProfileImage: userProfileImage,
    timestamp: firestore.FieldValue.serverTimestamp(),
    likes: 0,
    comments: [],
  };

  // If an image was selected, upload it to Firebase Storage and get the URL
  if (imageFile) {
    const storageRef = storage.ref(`postImages/${imageFile.name}`);
    storageRef.put(imageFile).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((imageUrl) => {
        newPost.image = imageUrl;
        // Add the new post object to Firestore
        postsRef.add(newPost).then(() => {
          document.getElementById("formPost").reset();
  
        });
      });
    });
  } else {
    // Add the new post object to Firestore without an image
    postsRef.add(newPost).then(() => {
      document.getElementById("formPost").reset();
    });
  }
}

/**
 * Get all posts from Firestore and display them on the page
 */
function getPosts() {
    const postsRef = firestore.collection().doc("users");

  // Get all posts from Firestore and add them to the page
  postsRef
    .orderBy("timestamp", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const post = doc.data();
        const postId = doc.id;
        showPost()
        // Get comments for this post and add them to the page
        getComments(postId, commentsList);
      });
    });
}

/**
 * Function to delete a post from Firestore
 * @param {*} postId 
 */
function deletePost(postId) {
  firestore.collection("posts")
    .doc(postId)
    .delete()
    .then(() => {
      console.log("Post successfully deleted!");
      // Reload the page to update the posts list
      location.reload();
    })
    .catch((error) => {
      console.error("Error removing post: ", error);
    });
}

/**
 * Function to update a post in Firestore.
 * @param {*} postId 
 * @param {*} updatedData 
 */
async function editPost(postId, updatedData) {
  try {
    const postRef = firestore.collection("posts").doc(postId);
    await postRef.update(updatedData);
    console.log("Publicación actualizada exitosamente");
  } catch (error) {
    console.error("Error actualizandopublicación: ", error);
  }
}


export{ addPost, getPosts, deletePost, editPost}