//   Firebase CDN imports
import * as auth from 'https://www.gstatic.com/firebasejs/9.19.0/firebase-auth.js';
import { ref, uploadBytes, getDownloadURL, getStorage } from 'https://www.gstatic.com/firebasejs/9.19.0/firebase-storage.js';

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
} from 'https://www.gstatic.com/firebasejs/9.19.0/firebase-firestore.js';

import Router from '../router/router';
import app from './firebase';


const db = getFirestore(app);
const authApp = auth.getAuth(app);
const storage = getStorage(app, 'gs://outsy-mxg.appspot.com');
const router = new Router();

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
  const postRef = await addDoc(collection(db, 'posts'), {
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
  await deleteDoc(doc(db, 'posts', postId));
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


  const postRef = doc(db, 'posts', postId);
  const commentsRef = collection(postRef, 'comments');
  const newCommentRef = await addDoc(commentsRef, {
    text: commentText,
    userId,
    author,
    createdAt,
  });
  const commentId = newCommentRef.id;

  //A falta de 1 método tenemos 2 ;)  
  // Update the 'comments' field of the post document
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

  const postRef = doc(db, 'posts', postId);
  const likesRef = collection(postRef, 'likes');
  const newLikeRef = await addDoc(likesRef, {
    userId,
    author,
  });
  const likeId = newLikeRef.id;

  // Update the 'likes' field of the post document
  await updateDoc(postRef, {
    likes: arrayUnion(likeId),
  });

  return likeId;

}

// /**
//  * Unlike a post
//  * @param {*} postId
//  * @param {*} userId
//  */
// async function unlikePost(postId, userId) {
//   const postRef = doc(db, 'posts', postId);
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
  const postRef = doc(db, 'posts', postId);
  const likesRef = collection(postRef, 'likes');

  // Get the like count from the server
  const snapshot = await getCountFromServer(likesRef);

  return snapshot.data().count;
}

/**
 * Get and print each post saved in firestore
 */
async function getPosts() {
  const postContainer = document.getElementById('postContainer');
  postContainer.innerHTML = '';

  const q = query(collection(db, 'posts'), where('privacy', '==', 'public'), orderBy('postDate', 'desc'));
  const querySnapshot = await getDocs(q);

  await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const post = doc.data();
      const postId = doc.id;

      // Create post element
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('card-feed');
      
      const flexBetweenDiv = document.createElement('div');
      flexBetweenDiv.classList.add('d-flex', 'justify-content-between', 'p-2', 'px-3');

      const flexRowDiv = document.createElement('div');
      flexRowDiv.classList.add('d-flex', 'flex-row', 'align-items-center');


      const flexColDiv = document.createElement('div');
      flexColDiv.classList.add('d-flex', 'flex-column', 'ml-2');

      const nameSpan = document.createElement('span');
      nameSpan.classList.add('font-weight-bold');
      nameSpan.textContent = `Propuesto por: ${post.author}`;

      const smallColleagues = document.createElement('small');
      smallColleagues.classList.add('text-primary');
      smallColleagues.textContent = `Lugar: ${post.location ? post.location : 'Indefinida'}`;
    

      const flexRowEllipsisDiv = document.createElement('div');
      flexRowEllipsisDiv.classList.add('d-flex', 'flex-row', 'mt-1', 'ellipsis');

      const date = post.postDate;
      const smallTimeAgo = document.createElement('small');
      smallTimeAgo.classList.add('mr-2');
      smallTimeAgo.textContent = `${date ? date : 'Indefinida'}`;

      const iEllipsis = document.createElement('i');
      iEllipsis.classList.add('fa', 'fa-ellipsis-h');

      const imgFluid = document.createElement('img');
      imgFluid.setAttribute('src', post.imageUrl);
      imgFluid.classList.add('img-fluid', 'postImage');
      
      const pDiv = document.createElement('div');
      pDiv.classList.add('p-2');

      const pTextJustify = document.createElement('p');
      pTextJustify.classList.add('text-justify');
      pTextJustify.textContent = post.content;
      
      const eventDate = document.createElement('time');
      eventDate.classList.add('text-justify');
      eventDate.textContent = `Vamos el: ${post.dateToStr ? post.dateToStr : 'Indefinida'}`;

      const hr1 = document.createElement('hr');

      const flexBetweenIconsDiv = document.createElement('div');
      flexBetweenIconsDiv.classList.add('d-flex', 'justify-content-between', 'align-items-center');

      const flexRowIconsDiv = document.createElement('div');
      flexRowIconsDiv.classList.add('d-flex', 'flex-row', 'icons', 'd-flex', 'align-items-center');

      const likeButton = document.createElement('button');
      likeButton.setAttribute('id', 'like' + postId);
      likeButton.classList.add('btn-icon');
      const iHeart = document.createElement('i');
      iHeart.classList.add('fa', 'fa-grin-stars', 'fa-sm');
    
      likeButton.addEventListener('click', () => {
        likePost(postId).then(() => {
          getPosts();

        })

      });


      const flexRowMutedDiv = document.createElement('div');
      flexRowMutedDiv.classList.add('d-flex', 'flex-row', 'muted-color');

      // Create edit button
      const editButton = document.createElement('button');
      editButton.setAttribute('id', 'edit' + postId);
      editButton.classList.add('btn-icon');
      const iEdit = document.createElement('i');
      iEdit.classList.add('fa', 'fa-pen', 'fa-sm');
      editButton.addEventListener('click', () => {
        console.log('postid:', postId);
        console.log('post: ', post);
        router.navigateTo('/post/edit');
        // editPost(postId, post);
      });

      // Create delete button
      const deleteButton = document.createElement('button');
      deleteButton.setAttribute('id', 'delete' + postId);
      deleteButton.classList.add('btn-icon');
      const iDelete = document.createElement('i');
      iDelete.classList.add('fa', 'fa-trash', 'fa-sm');

      deleteButton.addEventListener('click', () => {
        deletePost(postId);
      });


      const spanLikes = document.createElement('span');
      const countLikes = await getLikeCount(postId);
      spanLikes.textContent = `${countLikes ? countLikes : 0}`


      const hr2 = document.createElement('hr');
 
      const commentsArt = document.createElement('article');
      commentsArt.classList.add('comments');
      commentsArt.setAttribute('id', 'comment' + postId);

      const commentsDiv = document.createElement('div');
      
      const commentForm = document.createElement('form');
      commentForm.className = 'comment-input';
      const inputElement = document.createElement('input');
      inputElement.type = 'text';
      inputElement.placeholder = 'Agrega un Comentario...';
      inputElement.classList.add('form-control', 'comInput');

      const fontsDiv = document.createElement('div');
      fontsDiv.className = 'fonts';

      const commentButton = document.createElement('button');
      commentButton.classList.add('btn-icon');
      const imgComment1 = document.createElement('i');
      imgComment1.className = 'fa fa-comment-pen fa-sm';
      commentButton.addEventListener('click', () => {
        addComment(postId, inputElement.value);
        inputElement.value = '';
      });


      // Add HTML elements to post container

      likeButton.appendChild(iHeart);
      flexRowIconsDiv.appendChild(likeButton);
      flexRowIconsDiv.appendChild(spanLikes);
      editButton.appendChild(iEdit);
      flexRowMutedDiv.appendChild(editButton);
      deleteButton.appendChild(iDelete);
      flexRowMutedDiv.appendChild(deleteButton);
      flexBetweenIconsDiv.appendChild(flexRowIconsDiv);
      flexBetweenIconsDiv.appendChild(flexRowMutedDiv);

      commentButton.appendChild(imgComment1);
      fontsDiv.appendChild(commentButton);
      commentForm.appendChild(inputElement);
      commentForm.appendChild(fontsDiv);
      commentsDiv.appendChild(commentForm);
      pDiv.appendChild(pTextJustify);
      pDiv.appendChild(hr1);
      pDiv.appendChild(flexBetweenIconsDiv);
      pDiv.appendChild(hr2);
      pDiv.appendChild(commentsArt);
      pDiv.appendChild(commentsDiv);
      flexRowEllipsisDiv.appendChild(smallTimeAgo);
      flexRowEllipsisDiv.appendChild(iEllipsis);
      flexColDiv.appendChild(nameSpan);
      flexColDiv.appendChild(smallColleagues);
      flexRowDiv.appendChild(flexColDiv);
      flexBetweenDiv.appendChild(flexRowDiv);
      flexBetweenDiv.appendChild(flexRowEllipsisDiv);
      cardDiv.appendChild(flexBetweenDiv);
      cardDiv.appendChild(imgFluid);
      cardDiv.appendChild(pDiv);
      postContainer.appendChild(cardDiv)

      await getComments(postId);


    })
  );
}

/**
 * Get the post comments
 * @param {*} postId
 */
async function getComments(postId) {
  console.log('postId: ', postId);
  const comments = document.getElementById('comment' + postId);
  comments.innerHTML = '';

  const postRef = doc(db, 'posts', postId);
  const commentsRef = collection(postRef, 'comments');

  const querySnapshot = await getDocs(commentsRef);

  await Promise.all(
    querySnapshot.docs.map(async (doc) => {

      const comment = doc.data();

      const flexRowComment1Div = document.createElement('div');
      flexRowComment1Div.classList.add('d-flex', 'flex-row', 'mb-2');

      const commentDiv1 = document.createElement('div');
      commentDiv1.className = 'd-flex flex-row mb-2';

      const nameComment = document.createElement('span');
      nameComment.className = 'name';
      nameComment.textContent = comment.author;

      const commentTextSmall = document.createElement('small');
      commentTextSmall.className = 'comment-text';
      commentTextSmall.textContent = comment.text;

      const statusDiv = document.createElement('div');
      statusDiv.className = 'd-flex flex-row align-items-center status';

      const timeSmall = document.createElement('small');
      const dateComment = comment.createdAt;
      timeSmall.textContent = `${dateComment ? dateComment : 'Indefinida'}`;

      commentDiv1.appendChild(nameComment);
      commentDiv1.appendChild(commentTextSmall);
      statusDiv.appendChild(timeSmall);
      commentDiv1.appendChild(statusDiv);
      flexRowComment1Div.appendChild(commentDiv1);
      comments.appendChild(flexRowComment1Div);

    })
  );
}



export {
  createPost,
  getPosts,
};
