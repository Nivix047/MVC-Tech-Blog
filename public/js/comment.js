// post_id has to match database
const post_id = document.querySelector("input[name='post-id']").value;
const commentFormHandler = async (event) => {
  event.preventDefault();
  console.log("----post_id----");
  console.log(post_id);
  const body = document.querySelector("#comment-post").value.trim();
  if (body) {
    // What API to grab
    const response = await fetch(`/api/comment`, {
      method: "POST",
      body: JSON.stringify({ post_id, body }),
      headers: { "Content-Type": "application/json" },
    });
    console.log("----TEST-----");
    console.log(body);
    if (response.ok) {
      // How to render
      // document.location.replace("/");
    } else {
      alert("Failed to post comment.");
    }
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submit", commentFormHandler);
