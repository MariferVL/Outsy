import { async } from 'regenerator-runtime';
import { createPost, getPosts } from '../lib/postAuth';
import Router from '../router/router';

const router = new Router();

export function listenPostForm() {
    router.navigateTo('/feed');
    getPosts();
    document.getElementById('post').addEventListener('click', () => {
        router.navigateTo('/post/create');
        // Add event listener for the submit button on the add post form
        document.getElementById('addPostButton').addEventListener('click', async (event) => {
            event.preventDefault();
            const title = document.getElementById('postTitle').value;
            const date = document.getElementById('postTime').value;
            const location = document.getElementById('postLocation').value;
            const content = document.getElementById('postContent').value;
            const privacy = document.getElementById('postPrivacy').value;
            const image = document.getElementById('postImage').files[0];
            //FIXME: Declarar como argumento para fn en listener.
            const postId = createPost(title, date, location, content, image, privacy);
            router.navigateTo('/feed');
            await getPosts();


        });

    });



    // document.getElementById("editPost").addEventListener("click", (event) => {
    //       router.navigateTo('/post');
    //     editPost(postID, post);
    // })
}











// // Add event listener for the edit button on a post
// function addEditPostEventListeners(postId) {
//     const editButton = document.getElementById(`editButton${postId}`);
//     editButton.addEventListener('click', () => {
//         const title = document.getElementById(`postTitle${postId}`);
//         const content = document.getElementById(`postContent${postId}`);
//         const privacy = document.getElementById(`postPrivacy${postId}`);
//         const editForm = document.getElementById(`editForm${postId}`);
//         const cancelButton = document.getElementById(`cancelButton${postId}`);

//         // Hide the post content and show the edit form
//         title.style.display = 'none';
//         content.style.display = 'none';
//         privacy.style.display = 'none';
//         editForm.style.display = 'block';
//         cancelButton.style.display = 'inline-block';
//     });

//     // Add event listener for the cancel button on the edit form
//     const cancelButton = document.getElementById(`cancelButton${postId}`);
//     cancelButton.addEventListener('click', () => {
//         const title = document.getElementById(`postTitle${postId}`);
//         const content = document.getElementById(`postContent${postId}`);
//         const privacy = document.getElementById(`postPrivacy${postId}`);
//         const editForm = document.getElementById(`editForm${postId}`);
//         const cancelButton = document.getElementById(`cancelButton${postId}`);

//         // Hide the edit form and show the post content
//         title.style.display = 'block';
//         content.style.display = 'block';
//         privacy.style.display = 'block';
//         editForm.style.display = 'none';
//         cancelButton.style.display = 'none';
//     });

//     // Add event listener for the submit button on the edit form
//     const submitButton = document.getElementById(`editPostButton${postId}`);
//     submitButton.addEventListener('click', (event) => {
//         event.preventDefault();
//         const title = document.getElementById(`postTitle${postId}`).value;
//         const content = document.getElementById(`postContent${postId}`).value;
//         const privacy = document.getElementById(`postPrivacy${postId}`).value;

//         updatePost(postId, title, content, privacy);

//         // Hide the edit form and show the updated post content
//         const postTitle = document.getElementById(`postTitle${postId}`);
//         const postContent = document.getElementById(`postContent${postId}`);
//         const postPrivacy = document.getElementById(`postPrivacy${postId}`);
//         const editForm = document.getElementById(`editForm${postId}`);
//         const cancelButton = document.getElementById(`cancelButton${postId}`);

//         postTitle.style.display = 'block';
//         postTitle.innerText = title;
//         postContent.style.display = 'block';
//         postContent.innerText = content;
//         postPrivacy.style.display = 'block';
//         postPrivacy.innerText = `Privacy: ${privacy}`;
//         editForm.style.display = 'none';
//         cancelButton.style.display = 'none';
//     });
// }


// // Add event listener for the like button on a post
// function addLikeEventListeners(postId) {
//     const likeButton = document.getElementById(`likeButton${postId}`);
//     likeButton.addEventListener('click', () => {
//         const likeCount = document.getElementById(`likeCount${postId}`);
//         const currentLikes = parseInt(likeCount.innerText);
//         const newLikes = currentLikes + 1;
//         likePost(postId, newLikes);
//         likeCount.innerText = newLikes;
//     });
// }