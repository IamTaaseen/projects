const NoteTakerDialog = document.querySelector(".NoteTakerDialog");
const addNoteButton = document.querySelector(".addNoteButton");
const done = document.querySelector(".done");
const back = document.querySelector(".back");
const NoteTakerInput = document.querySelector(".NoteTakerInput");
const NoteContainer = document.querySelector(".NoteContainer");
const NoteTakerName = document.querySelector(".NoteTakerName");

let id;
let name;
let notes;
let noteId
let noteEl;
let noteinfo = JSON.parse(localStorage.getItem("noteinfo")) || [];
//localStorage.removeItem("noteinfo");
noteinfo.forEach(info => {
    NoteContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="note" id="${info.id}" data-name="${info.name}" data-note="${info.notes}">
                <div class="nameSection">
                    <h3 class = "noteTitle">Name</h3>
                    <textarea readonly>${info.name}</textarea>
                </div>
                <div class="noteSection">
                    <h3 class="noteTitle">Notes</h3>
                    <textarea readonly  class="noteTextarea">${info.notes}</textarea>
                </div>
                <button class="utilButton delete">Delete</button>
                <button class="utilButton edit">Edit</button>
         </div>`
    );
});

addNoteButton.addEventListener("click", () => {
    NoteTakerDialog.classList.toggle("active");

});
back.addEventListener("click", () => {
    NoteTakerDialog.classList.remove("active")
});
done.addEventListener("click", () => { 
    if(NoteTakerInput.value.trim() !== "" && NoteTakerName.value.trim() !== ""){
        
        id = Date.now();
        notes = NoteTakerInput.value;
        name = NoteTakerName.value;
        NoteContainer.insertAdjacentHTML(
            "beforeend",
            
           `<div class="note" id="${id}" data-name="${name}" data-note="${notes}">
                <div class="nameSection">
                    <h3 class = "noteTitle">Name</h3>
                    <textarea readonly>${name}</textarea>
                </div>
                <div class="noteSection">
                    <h3 class="noteTitle">Notes</h3>
                    <textarea readonly class="noteTextarea">${notes}</textarea>
                </div>
                <button class="delete">Delete</button>
                <button class="utilButton edit">Edit</button>

         </div>`
        )
        noteinfo.push({
            id,
            name,
            notes});
        localStorage.setItem("noteinfo", JSON.stringify(noteinfo));
        NoteTakerDialog.classList.remove("active");
        NoteTakerInput.value = "";
        NoteTakerName.value = "";
    }
});
NoteContainer.addEventListener("click", (e) => {
    if(e.target.classList.contains("delete")){
        noteEl = e.target.closest(".note");
        if(!noteEl) return;
        noteId = Number(noteEl.id);
        noteinfo = noteinfo.filter(note => note.id !== noteId);
        localStorage.setItem("noteinfo", JSON.stringify(noteinfo));
        noteEl.remove();
    }
});
NoteContainer.addEventListener("click", (e) => { 
    if(e.target.classList.contains("edit")){
        noteEl = e.target.closest(".note");
        if(!noteEl) return;
        noteId = Number(noteEl.id);
        NoteTakerName.value = noteEl.dataset.name;
        NoteTakerInput.value = noteEl.dataset.note;
        NoteTakerDialog.classList.toggle("active");
        done.addEventListener("click", () => {
            noteinfo = noteinfo.filter(note => note.id !== noteId);
            localStorage.setItem("noteinfo", JSON.stringify(noteinfo));
            noteEl.remove();
        });;
    }
});