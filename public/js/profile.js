const projectFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#project-name").value.trim();
  const description = document
    .querySelector("#project-description")
    .value.trim();

  if (name && description) {
    const response = await fetch("/api/projects", {
      method: "POST",
      body: JSON.stringify({ name, description }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to sign up.");
    }
  }
};

const deleteHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    const response = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to delete");
    }
  }
};

document
  .querySelector(".project-form")
  .addEventListener("submit", projectFormHandler);

document
  .querySelector(".project-list")
  .addEventListener("click", deleteHandler);

// document.querySelector("#new-post-btn").addEventListener("click", () => {
//   console.log("testing");
// });
