const postID = document.querySelector("input[name='post-id']").value;
const updateFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#update-title").value.trim();
  const body = document.querySelector("#update-post").value.trim();
  if (title && body) {
    // What API to grab
    const response = await fetch(`/api/post/${postID}`, {
      method: "PUT",
      body: JSON.stringify({ title, body }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // How to render
      document.location.replace("/dashboard");
    } else {
      alert("Failed to update.");
    }
  }
};

const deleteHandler = async (event) => {
  const response = await fetch(`/api/post/${postID}`, {
    method: "DELETE",
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to delete");
  }
};

document
  .querySelector(".update-form")
  .addEventListener("submit", updateFormHandler);

document.querySelector("#delete-btn").addEventListener("click", deleteHandler);
