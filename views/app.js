const postsList = document.querySelector(".posts-list");
const addPostForm = document.querySelector(".add-post-form");
const titleValue = document.getElementById("title-value");
const bodyValue = document.getElementById("body-value");
const authorValue = document.getElementById("author-value");
const btnSubmit = document.querySelector(".btn-primary");
const btnEdit = document.querySelector(".btn-secondary");
const articleContainer = document.querySelector(".get-data");


const url = `http://127.0.0.1:5000/api/posts`;
let output = "";

const renderPosts = (posts) => {
  posts.forEach(post => {
    output += `<div class="post">
    <div class="post-body" data-id=${post._id}>
        <h5 class="post-title">${post.title}</h5>
        <h6 class="post-subtitle">${post.date}</h6>
        <p class="post-text">${post.body}</p>
        <a href="#" class="post-link" id="delete-post">Supprimer</a>
        <button class="btn" onclick="getArticle('${post._id}')">Détails</button>
    </div>
</div>`;
});
postsList.innerHTML = output;
}

// Fetching one post by ID
// Method : GET
const getArticle = (id) => {
  fetch(`http://localhost:5000/api/posts/${id}`)
    .then(res => res.json())
    .then(data => renderArticle(data));
};

const renderArticle = (article) => {
    const html = `<div class="article">
    <div class="article-body" data-id=${article._id}>
        <h5 class="article-title">${article.title}</h5>
        <h6 class="article-subtitle">${article.date}</h6>
        <p class="article-text">${article.body}</p>
        <p class="article-author">${article.author}</p>
        <a href="#" class="article-link" id="delete-post">Supprimer</a>
    </div>
    
</div>`;

postsList.innerHTML = html;
}

// Get - Read posts
// Method : GET
fetch(url)
  .then(res => res.json())
  .then(data =>  renderPosts(data));

postsList.addEventListener("click", (e) => {
  e.preventDefault();
  let delButtonClicked = e.target.id == "delete-post";

  let id = e.target.parentElement.dataset.id;

  // Delete - Remove existing post
  // Method : DELETE
  if(delButtonClicked) {
    fetch(`${url}/${id}`, {
      method: "DELETE",
    })
    .then(res => res.json())
    .then(() => location.reload())
  }
})
