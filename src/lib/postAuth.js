//   Firebase CDN imports
import * as auth from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import * as storage from "https://www.gstatic.com/firebasejs/9.18.0/firebase-storage.js";

import * as firestore from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

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



// Add a new post to Firestore
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
 * Function to create a new post element
 * @param {*} postId
 * @param {*} post
 */


// Get all posts from Firestore and display them on the page
function getPosts() {
    const postsRef = firestore.collection().doc("users");

  // Clear any existing posts from the page
  const postContainer = document.getElementById("postContainer");
  postContainer.innerHTML = "";

  // Get all posts from Firestore and add them to the page
  postsRef
    .orderBy("timestamp", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const post = doc.data();
        const postId = doc.id;

        // Create HTML elements
        
        const postArticle = document.createElement("article");
        postArticle.classList.add("post");
        const postTitle = document.createElement("h2");
        postTitle.textContent = post.title;
        const postContent = document.createElement("p");
        postContent.textContent = post.content;
        const postAuthor = document.createElement("p");
        postAuthor.textContent = `Written by: ${post.author}`;
        const postDate = document.createElement("p");
        const date = new Date(post.timestamp.toDate());
        postDate.textContent = `Posted on: ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
        const postPrivacy = document.createElement("p");
        postPrivacy.textContent = `Privacy: ${post.privacy}`;
        const postImage = document.createElement("img");
        postImage.src = post.imageURL;
        const postLikes = document.createElement("p");
        postLikes.textContent = `Likes: ${post.likes}`;

        // Create edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
          editPost(postId, post);
        });

        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
          deletePost(postId);
        });

        // Create like button
        const likeButton = document.createElement("button");
        likeButton.textContent = "Like";
        likeButton.addEventListener("click", () => {
          likePost(postId, post.likes);
        });


        // Create a span element to display the number of likes
        const likeCount = document.createElement("span");
        likeCount.setAttribute("id", `likeCount${postId}`);
        likeCount.innerText = post.likes ? post.likes.length : 0;
        footer.appendChild(likeCount);

        // Create comment section
        const commentSection = document.createElement("div");
        commentSection.classList.add("comment-section");
        const commentInput = document.createElement("input");
        commentInput.type = "text";
        commentInput.placeholder = "Add a comment...";
        const commentButton = document.createElement("button");
        commentButton.textContent = "Comment";
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

        // Get comments for this post and add them to the page
        //getComments(postId, commentsList);
      });
    });
}

export{ addPost, getPosts }