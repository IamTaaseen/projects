const bookmarksContainer = document.getElementById("bookmarks");
let name;
let url;
let icon;
let BookmarkEl;
let BookmarkId;

let id;
let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
bookmarks.forEach(bookmark => {
bookmarksContainer.insertAdjacentHTML(
  "beforeend",
    `<a href="${bookmark.url}" target="_blank" class="link" id="${bookmark.id}">
        <img src="${bookmark.icon}" alt="${bookmark.name}" width="40" class="linkImg">
        <button class="BookmarkMenu">⋮</button>
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
    id = Date.now();
    bookmarksContainer.insertAdjacentHTML(
          "beforeend",

          `<a href="${url}" target="_blank" class="link" id="${id}">
              <img src="${icon}" alt="${name}" width="40" class="linkImg">
              <button class="BookmarkMenu">⋮</i></button>
            
          </a>`
    );
    bookmarks.push({ name, url, icon, id });

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    dialog.close();
  }
})
const BookmarksMenu = document.querySelector(".BookmarksMenu");
const overlay = document.querySelector(".overlay");
const Bookmarkdelete = document.querySelector(".Bookmarkdelete");
bookmarksContainer.addEventListener("click", (e) => {
  if(e.target.classList.contains("BookmarkMenu")){
    e.preventDefault();
    e.stopPropagation();
    
    BookmarksMenu.classList.toggle("active");
    overlay.classList.toggle("active");
    BookmarkEl = e.target.closest(".link");
    console.log(BookmarkEl);
    BookmarkId = Number(BookmarkEl.id);
  }
})
Bookmarkdelete.addEventListener("click", (e) => {
  if(e.target.classList.contains("Bookmarkdelete")){
    bookmarks = bookmarks.filter(each => each.id !== BookmarkId);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    BookmarkEl.remove();
    overlay.classList.remove("active");
    BookmarksMenu.classList.remove("active");
  }
});