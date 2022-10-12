const updateFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#update-title").value.trim();
  const content = document.querySelector("#update-post").value.trim();
  if (title && content) {
    // What API to grab
    const response = await fetch("/api/update", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // How to render
      document.location.replace("/");
    } else {
      alert("Failed to update.");
    }
  }
};

const deleteHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    const response = await fetch(`/api/post/${id}`, { method: "DELETE" });
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to delete");
    }
  }
};

document
  .querySelector(".update-form")
  .addEventListener("submit", updateFormHandler);

document.querySelector("#delete-btn").addEventListener("click", deleteHandler);
