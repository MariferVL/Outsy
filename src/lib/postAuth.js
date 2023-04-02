
//   Firebase CDN imports
import * as auth from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import * as database from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js"
import * as storage from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js"

/**
 *  Firebase initialization and configuration
 */
    const firebaseConfig = {
      // Add your Firebase configuration here
    };
    firebase.initializeApp(firebaseConfig);

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


    /**
     * Function to create a new post element
     * @param {*} postId 
     * @param {*} post 
     */
    function createPostElement(postId, post) {
      const postList = document.getElementById('postList');

      // Create a div for the post
      const div = document.createElement('div');
      div.setAttribute('id', `post${postId}`);

      // Create a header for the post
      const header = document.createElement('h2');
      header.innerText = post.title;
      div.appendChild(header);

      // Create a paragraph for the post content
      const content = document.createElement('p');
      content.innerText = post.content;
      div.appendChild(content);

      // Create an image for the post
      if (post.imageUrl) {
        const image = document.createElement('img');
        image.setAttribute('src', post.imageUrl);
        div.appendChild(image);
      }

      // Create a footer for the post
      const footer = document.createElement('div');

      // Create a button to delete the post
      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.addEventListener('click', () => deletePost(postId));
      footer.appendChild(deleteButton);

      // Create a button to edit the post
      const editButton = document.createElement('button');
      editButton.innerText = 'Edit';
      editButton.addEventListener('click', () =>
      editPost(postId, post.title, post.content, post.privacy, post.imageUrl));
      footer.appendChild(editButton);
    
      // Create a select element for privacy settings
      const privacySelect = document.createElement('select');
      privacySelect.setAttribute('id', `privacy${postId}`);
      privacySelect.addEventListener('change', () => {
        updatePostPrivacy(postId, privacySelect.value);
      });
    
      // Create option elements for privacy settings
      const publicOption = document.createElement('option');
      publicOption.setAttribute('value', 'public');
      publicOption.innerText = 'Public';
      const privateOption = document.createElement('option');
      privateOption.setAttribute('value', 'private');
      privateOption.innerText = 'Private';
    
      // Set the selected option based on the post's privacy setting
      if (post.privacy === 'public') {
        publicOption.setAttribute('selected', 'selected');
      } else {
        privateOption.setAttribute('selected', 'selected');
      }
    
      // Add the options to the select element and append it to the footer
      privacySelect.appendChild(publicOption);
      privacySelect.appendChild(privateOption);
      footer.appendChild(privacySelect);
    
      // Create a span element to display the number of likes
      const likeCount = document.createElement('span');
      likeCount.setAttribute('id', `likeCount${postId}`);
      likeCount.innerText = post.likes ? post.likes.length : 0;
      footer.appendChild(likeCount);
    
      // Create a button to like the post
      const likeButton = document.createElement('button');
      likeButton.innerText = 'Like';
      likeButton.addEventListener('click', () => likePost(postId));
      footer.appendChild(likeButton);
    
      div.appendChild(footer);
    
      // Add the post to the post list
      postList.appendChild(div);
    }
    
    // Function to render all posts
    function renderPosts() {
      const postList = document.getElementById('postList');
      postList.innerHTML = '';
    
      database.ref('posts').once('value')
        .then(snapshot => {
          const posts = snapshot.val();
          for (const postId in posts) {
            const post = posts[postId];
            createPostElement(postId, post);
          }
        });
    }
    
    // Function to add a new post
    function addPost(title, content, privacy, imageUrl) {
      const userId = getCurrentUserId();
      const userName = getCurrentUserName();
      const userProfileImage = getCurrentUserProfileImage();
    
      database.ref('posts').push({
        title,
        content,
        privacy,
        imageUrl,
        userId,
        userName,
        userProfileImage,
        timestamp: Date.now(),
        likes: []
      })
        .then(() => {
          document.getElementById('formPost').reset();
          renderPosts();
        });
    }
    
    // Function to delete a post
    function deletePost(postId) {
      database.ref(`posts/${postId}`).remove()
        .then(() => {
          const postElement = document.getElementById(`post${postId}`);
          postElement.parentNode.removeChild(postElement);
        });
    }
    
    // Function to edit a post
    function editPost(postId, title, content, privacy, imageUrl) {
      const postRef = database.ref(`posts/${postId}`);
      postRef.update({
        title,
        content,
        privacy,
        imageUrl
      })
        .then(() => {
          const header = document.getElementById(`post${postId}`).getElementsByTagName('h2')[0];
          header.innerText = title;
          const contentElement = document.getElementById(`post${postId}`).getElementsByTagName('p')[0];
          contentElement.innerText = content;
          if (imageUrl) {
            const image = document.createElement('img');
            image.setAttribute('src', imageUrl);
            const postElement = document.getElementById(`post${postId}`);
            postElement.insertBefore(image, postElement.childNodes[0]);
            } else {
              const image = document.getElementById(`image${postId}`);
              if (image) {
                image.parentNode.removeChild(image);
              }
            }
          });
      }
      
      // Function to update a post's privacy setting
      function updatePostPrivacy(postId, privacy) {
        database.ref(`posts/${postId}`).update({
          privacy
        });
      }
      
      // Function to add a comment to a post
      function addComment(postId, comment) {
        const userId = getCurrentUserId();
        const userName = getCurrentUserName();
        const userProfileImage = getCurrentUserProfileImage();
      
        const commentsRef = database.ref(`posts/${postId}/comments`);
        commentsRef.push({
          comment,
          userId,
          userName,
          userProfileImage,
          timestamp: Date.now()
        })
          .then(() => {
            renderComments(postId);
          });
      }
      
      // Function to render the comments for a post
      function renderComments(postId) {
        const commentsList = document.getElementById(`commentsList${postId}`);
        commentsList.innerHTML = '';
      
        database.ref(`posts/${postId}/comments`).once('value')
          .then(snapshot => {
            const comments = snapshot.val();
            for (const commentId in comments) {
              const comment = comments[commentId];
      
              // Create a div element for the comment
              const div = document.createElement('div');
              div.setAttribute('class', 'comment');
              div.setAttribute('id', `comment${commentId}`);
      
              // Create an image element for the user profile picture
              const image = document.createElement('img');
              image.setAttribute('src', comment.userProfileImage);
              image.setAttribute('class', 'commentImage');
              div.appendChild(image);
      
              // Create a div element for the comment text and user information
              const commentInfo = document.createElement('div');
              commentInfo.setAttribute('class', 'commentInfo');
      
              // Create a span element for the user's name
              const userName = document.createElement('span');
              userName.setAttribute('class', 'commentUserName');
              userName.innerText = comment.userName;
              commentInfo.appendChild(userName);
      
              // Create a span element for the comment text
              const commentText = document.createElement('span');
              commentText.setAttribute('class', 'commentText');
              commentText.innerText = comment.comment;
              commentInfo.appendChild(commentText);
      
              div.appendChild(commentInfo);
      
              commentsList.appendChild(div);
            }
          });
      }
      
      // Function to like a post
      function likePost(postId) {
        const userId = getCurrentUserId();
      
        database.ref(`posts/${postId}/likes`).once('value')
          .then(snapshot => {
            const likes = snapshot.val() || [];
            if (!likes.includes(userId)) {
              likes.push(userId);
            }
            database.ref(`posts/${postId}/likes`).set(likes)
              .then(() => {
                const likeCount = document.getElementById(`likeCount${postId}`);
                likeCount.innerText = likes.length;
              });
          });
      }
      
      // Function to get the currently logged in user's ID
      function getCurrentUserId() {
        return auth.currentUser.uid;
      }
      
      // Function to get the currently logged in user's name
      function getCurrentUserName() {
        return auth.currentUser.displayName;
      }
      
      // Function to get the currently logged in user's profile image URL
      function getCurrentUserProfileImage() {
        return auth.currentUser.photoURL;
      }
      
      // Add event listener for the submit button on the add post form
      document.getElementById('addPostButton').addEventListener('click', event => {
        event.preventDefault();
        const title = document.getElementById('postTitle').value;
        const content = document.getElementById('postContent').value;
        const privacy = document.getElementById('postPrivacy').value;
        const imageFile = document.getElementById('postImage').files[0];
        addPost(title, content, privacy, imageFile);

        // Reset the form
        document.getElementById('addPostForm').reset();
      });
      
      // Add event listener for the edit button on a post
      function addEditPostEventListeners(postId) {
        const editButton = document.getElementById(`editButton${postId}`);
        editButton.addEventListener('click', () => {
          const title = document.getElementById(`postTitle${postId}`);
          const content = document.getElementById(`postContent${postId}`);
          const privacy = document.getElementById(`postPrivacy${postId}`);
          const editForm = document.getElementById(`editForm${postId}`);
          const cancelButton = document.getElementById(`cancelButton${postId}`);
      
          // Hide the post content and show the edit form
          title.style.display = 'none';
          content.style.display = 'none';
          privacy.style.display = 'none';
          editForm.style.display = 'block';
          cancelButton.style.display = 'inline-block';
        });
      
        // Add event listener for the cancel button on the edit form
        const cancelButton = document.getElementById(`cancelButton${postId}`);
        cancelButton.addEventListener('click', () => {
          const title = document.getElementById(`postTitle${postId}`);
          const content = document.getElementById(`postContent${postId}`);
          const privacy = document.getElementById(`postPrivacy${postId}`);
          const editForm = document.getElementById(`editForm${postId}`);
          const cancelButton = document.getElementById(`cancelButton${postId}`);
      
          // Hide the edit form and show the post content
          title.style.display = 'block';
          content.style.display = 'block';
          privacy.style.display = 'block';
          editForm.style.display = 'none';
          cancelButton.style.display = 'none';
        });
      
        // Add event listener for the submit button on the edit form
        const submitButton = document.getElementById(`editPostButton${postId}`);
        submitButton.addEventListener('click', event => {
          event.preventDefault();
          const title = document.getElementById(`postTitle${postId}`).value;
          const content = document.getElementById(`postContent${postId}`).value;
          const privacy = document.getElementById(`postPrivacy${postId}`).value;
      
          updatePost(postId, title, content, privacy);
      
          // Hide the edit form and show the updated post content
          const postTitle = document.getElementById(`postTitle${postId}`);
          const postContent = document.getElementById(`postContent${postId}`);
          const postPrivacy = document.getElementById(`postPrivacy${postId}`);
          const editForm = document.getElementById(`editForm${postId}`);
          const cancelButton = document.getElementById(`cancelButton${postId}`);
      
          postTitle.style.display = 'block';
          postTitle.innerText = title;
          postContent.style.display = 'block';
          postContent.innerText = content;
          postPrivacy.style.display = 'block';
          postPrivacy.innerText = `Privacy: ${privacy}`;
          editForm.style.display = 'none';
          cancelButton.style.display = 'none';
        });
      }
      
      // Add event listener for the delete button on a post
      function addDeletePostEventListeners(postId) {
        const deleteButton = document.getElementById(`deleteButton${postId}`);
        deleteButton.addEventListener('click', () => {
          deletePost(postId);
        });
      }
      
      // Add event listener for the privacy dropdown on a post
      function addPrivacyDropdownEventListeners(postId) {
        const privacyDropdown = document.getElementById(`postPrivacy${postId}`);
        privacyDropdown.addEventListener('change', () => {
          const privacy = privacyDropdown.value;
          updatePostPrivacy(postId, privacy);
        });
      }
      
      // Add event listener for the add comment button on a post
function addCommentEventListeners(postId) {
const commentButton = document.getElementById(commentButton${postId});
commentButton.addEventListener('click', () => {
const commentInput = document.getElementById(commentInput${postId}).value;
addComment(postId, commentInput);
// Clear the comment input field
document.getElementById(commentInput${postId}).value = '';
});
}

// Add event listener for the like button on a post
function addLikeEventListeners(postId) {
    const likeButton = document.getElementById(`likeButton${postId}`);
    likeButton.addEventListener('click', () => {
      const likeCount = document.getElementById(`likeCount${postId}`);
      const currentLikes = parseInt(likeCount.innerText);
      const newLikes = currentLikes + 1;
      likePost(postId, newLikes);
      likeCount.innerText = newLikes;
    });
  }
  
  // Get a reference to the posts collection in Firestore
  const postsRef = firebase.firestore().collection('posts');
  
  // Add a new post to Firestore
  function addPost(title, content, privacy, imageFile) {
    // Create a new post object with the given data
    const newPost = {
      title: title,
      content: content,
      privacy: privacy,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      likes: 0,
      comments: []
    };
  
    // If an image was selected, upload it to Firebase Storage and get the URL
    if (imageFile) {
      const storageRef = firebase.storage().ref(`postImages/${imageFile.name}`);
      storageRef.put(imageFile).then(snapshot => {
        snapshot.ref.getDownloadURL().then(imageUrl => {
          newPost.image = imageUrl;
          // Add the new post object to Firestore
          postsRef.add(newPost);
        });
      });
    } else {
      // Add the new post object to Firestore without an image
      postsRef.add(newPost);
    }
  }
  
  // Update an existing post in Firestore
  function updatePost(postId, title, content, privacy) {
    const postRef = postsRef.doc(postId);
    postRef.update({
      title: title,
      content: content,
      privacy: privacy
    });
  }
  
  // Delete a post from Firestore
  function deletePost(postId) {
    const postRef = postsRef.doc(postId);
    postRef.delete();
  }
  
  // Update the privacy of a post in Firestore
  function updatePostPrivacy(postId, privacy) {
    const postRef = postsRef.doc(postId);
    postRef.update({
      privacy: privacy
    });
  }
  
  // Add a comment to a post in Firestore
  function addComment(postId, commentInput) {
    const postRef = postsRef.doc(postId);
    postRef.update({
      comments: firebase.firestore.FieldValue.arrayUnion(commentInput)
    });
  }
  
  // Update the number of likes on a post in Firestore
  function likePost(postId, newLikes) {
    const postRef = postsRef.doc(postId);
    postRef.update({
      likes: newLikes
    });
  }
  
  // Get all posts from Firestore and display them on the page
  function getPosts() {
    // Clear any existing posts from the page
    const postContainer = document.getElementById('postContainer');
    postContainer.innerHTML = '';
  
    // Get all posts from Firestore and add them to the page
    postsRef.orderBy('timestamp', 'desc').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const post = doc.data();
        const postId = doc.id;
  
  // Create HTML elements
  const postDiv = document.createElement('div');
  postDiv.classList.add('post');
  const postTitle = document.createElement('h2');
  postTitle.textContent = post.title;
  const postContent = document.createElement('p');
  postContent.textContent = post.content;
  const postAuthor = document.createElement('p');
  postAuthor.textContent = `Written by: ${post.author}`;
  const postDate = document.createElement('p');
  const date = new Date(post.timestamp.toDate());
  postDate.textContent = `Posted on: ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  const postPrivacy = document.createElement('p');
  postPrivacy.textContent = `Privacy: ${post.privacy}`;
  const postImage = document.createElement('img');
  postImage.src = post.imageURL;
  const postLikes = document.createElement('p');
  postLikes.textContent = `Likes: ${post.likes}`;

  // Create edit button
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', () => {
    editPost(postId, post);
  });

  // Create delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    deletePost(postId);
  });

  // Create like button
  const likeButton = document.createElement('button');
  likeButton.textContent = 'Like';
  likeButton.addEventListener('click', () => {
    likePost(postId, post.likes);
  });

  // Create comment section
  const commentSection = document.createElement('div');
  commentSection.classList.add('comment-section');
  const commentInput = document.createElement('input');
  commentInput.type = 'text';
  commentInput.placeholder = 'Add a comment...';
  const commentButton = document.createElement('button');
  commentButton.textContent = 'Comment';
  commentButton.addEventListener('click', () => {
    addComment(postId, commentInput.value);
    commentInput.value = '';
  });
  const commentsList = document.createElement('ul');

  // Add HTML elements to post container
  postDiv.appendChild(postTitle);
  postDiv.appendChild(postContent);
  postDiv.appendChild(postAuthor);
  postDiv.appendChild(postDate);
  postDiv.appendChild(postPrivacy);
  postDiv.appendChild(postImage);
  postDiv.appendChild(postLikes);
  postDiv.appendChild(editButton);
  postDiv.appendChild(deleteButton);
  postDiv.appendChild(likeButton);
  commentSection.appendChild(commentInput);
  commentSection.appendChild(commentButton);
  commentSection.appendChild(commentsList);
  postDiv.appendChild(commentSection);
  postContainer.appendChild(postDiv);

  // Get comments for this post and add them to the page
  getComments(postId, commentsList);
});
});
}
        

        // Function to delete a post from Firestore
function deletePost(postId) {
    db.collection('posts').doc(postId).delete()
      .then(() => {
        console.log("Post successfully deleted!");
        // Reload the page to update the posts list
        location.reload();
      })
      .catch((error) => {
        console.error("Error removing post: ", error);
      });
  }
  
  // Function to toggle the privacy of a post
  function togglePrivacy(postId, isPrivate) {
    db.collection('posts').doc(postId).update({
      isPrivate: !isPrivate
    })
      .then(() => {
        console.log("Post privacy successfully updated!");
        // Reload the page to update the posts list
        location.reload();
      })
      .catch((error) => {
        console.error("Error updating post privacy: ", error);
      });
  }
  
  // Function to add a comment to a post in Firestore
  function addComment(postId, commentText) {
    db.collection('posts').doc(postId).collection('comments').add({
      text: commentText,
      userId: auth.currentUser.uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
      .then(() => {
        console.log("Comment successfully added!");
        // Reload the page to update the comments list
        location.reload();
      })
      .catch((error) => {
        console.error("Error adding comment: ", error);
      });
  }
  
  // Function to add a like to a post in Firestore
  function addLike(postId) {
    db.collection('posts').doc(postId).update({
      likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.uid)
    })
      .then(() => {
        console.log("Like successfully added!");
        // Reload the page to update the like count
        location.reload();
      })
      .catch((error) => {
        console.error("Error adding like: ", error);
      });
  }
  
  // Function to remove a like from a post in Firestore
  function removeLike(postId) {
    db.collection('posts').doc(postId).update({
      likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.uid)
    })
      .then(() => {
        console.log("Like successfully removed!");
        // Reload the page to update the like count
        location.reload();
      })
      .catch((error) => {
        console.error("Error removing like: ", error);
      });
  }
  
  // Function to get the like count for a post in Firestore
  function getLikeCount(postId) {
    db.collection('posts').doc(postId).get()
      .then((doc) => {
        const post = doc.data();
        const likeCount = post.likes.length;
        console.log("Like count: ", likeCount);
        // Update the like count in the DOM
        const likeCountElement = document.getElementById(`like-count-${postId}`);
        likeCountElement.innerText = likeCount;
      })
      .catch((error) => {
        console.error("Error getting like count: ", error);
      });
  }
  