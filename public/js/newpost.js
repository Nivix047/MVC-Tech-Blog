const postFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-name").value.trim();
  const body = document.querySelector("#post-description").value.trim();

  if (title && body) {
    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ title, body }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to post");
    }
  }
};

document
  .querySelector(".post-form")
  .addEventListener("submit", postFormHandler);
