const resources = [
  // Apne resources yahan add karo.
  // Example:
  // {
  //   title: "My XMP Preset",
  //   type: "xmp",
  //   description: "My XMP preset.",
  //   url: "https://your-download-link.com",
  //   icon: "🎨"
  // }
];

const grid = document.getElementById("resourceGrid");
const noResults = document.getElementById("noResults");
const search = document.getElementById("search");
let currentFilter = "all";

function render() {
  const q = search.value.trim().toLowerCase();

  const items = resources.filter(item => {
    const categoryOK =
      currentFilter === "all" || item.type === currentFilter;

    const text =
      `${item.title} ${item.description} ${item.type}`.toLowerCase();

    return categoryOK && text.includes(q);
  });

  grid.innerHTML = items.map(item => `
    <article class="card">
      <div class="icon">${item.icon || "📦"}</div>
      <div class="type">${item.type}</div>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <a class="download" href="${item.url}" target="_blank" rel="noopener">
        Open / Download ↗
      </a>
    </article>
  `).join("");

  noResults.style.display = items.length ? "none" : "block";
}

document.querySelectorAll("[data-filter]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]")
      .forEach(b => b.classList.remove("active"));

    button.classList.add("active");
    currentFilter = button.dataset.filter;
    render();
  });
});

search.addEventListener("input", render);
render();
