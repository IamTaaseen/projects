const bookmarksContainer = document.getElementById("bookmarks");
let name;
let url;
let icon;

let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
bookmarks.forEach(bookmark => {
bookmarksContainer.insertAdjacentHTML(
  "beforeend",
  `<a href="${bookmark.url}" target="_blank" class="link">
      <img src="${bookmark.icon}" alt="${bookmark.name}" width="40" class="linkImg">
   </a>`
);});
const dialog = document.querySelector(".addBookmarkDialog");

document.querySelector(".addBookmark").addEventListener("click", () => {
    dialog.showModal();
});

document.querySelector(".back").addEventListener("click", () => {
    dialog.close();
});
document.querySelector(".ok").addEventListener("click", () => {
  if(document.querySelector(".addName").value !== "" && document.querySelector(".addUrl").value !== ""){
    name = document.querySelector(".addName").value;
    url = document.querySelector(".addUrl").value;
    if (!url.startsWith("http")) {
    url = "https://" + url;
    
    const domain = new URL(url).hostname;
    icon = `https://icons.duckduckgo.com/ip3/${domain}.ico`;
  }
    bookmarksContainer.insertAdjacentHTML(
          "beforeend",
          `<a href="${url}" target="_blank" class="link">
              <img src="${icon}" alt="${name}" width="40" class="linkImg">
          </a>`
    );
    bookmarks.push({ name, url, icon });

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    dialog.close();
  }
})