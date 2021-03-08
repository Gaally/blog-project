const addPostForm = document.querySelector(".add-post-form");
const titleValue = document.getElementById("title-value");
const bodyValue = document.getElementById("body-value");
const authorValue = document.getElementById("author-value");

// Create - Insert new post
// Methode : POST
addPostForm.addEventListener("submit", (e) => {
  e.preventDefault(); // So browser won't reload when clicked
  fetch("http://127.0.0.1:5000/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: titleValue.value,
      body: bodyValue.value,
      author: authorValue.value,
    })
  })
  .then(res => res.json())
  .then(data => {
    const dataArr = [];
    dataArr.push(data); // the push method add elements to the end of an array & returns the lenght of the array formed
    renderPosts(dataArr);
  })

  // Reset input fields to empty
  titleValue.value = "";
  bodyValue.value = "";
  authorValue.value = "";
})