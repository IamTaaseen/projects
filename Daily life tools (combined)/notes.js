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
let noteinfo = JSON.parse(localStorage.getItem("noteinfo")) || [];
//localStorage.removeItem("noteinfo");
noteinfo.forEach(info => {
    NoteContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="note" id="${info.id}">
                <div class="nameSection">
                    <h3 class = "noteTitle">Name</h3>
                    <textarea readonly>${info.name}</textarea>
                </div>
                <div class="noteSection">
                    <h3 class="noteTitle">Notes</h3>
                    <textarea readonly  class="noteTextarea">${info.notes}</textarea>
                </div>
                <button class="delete">Delete</button>
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
            
           `<div class="note" id="${id}">
                <div class="nameSection">
                    <h3 class = "noteTitle">Name</h3>
                    <textarea readonly>${name}</textarea>
                </div>
                <div class="noteSection">
                    <h3 class="noteTitle">Notes</h3>
                    <textarea readonly class="noteTextarea">${notes}</textarea>
                </div>
                <button class="delete">Delete</button>
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
        const noteEl = e.target.closest(".note");
        if(!noteEl) return;
        const noteId = Number(noteEl.id);
        noteinfo = noteinfo.filter(note => note.id !== noteId);
        localStorage.setItem("noteinfo", JSON.stringify(noteinfo));
        noteEl.remove();
    }
    else{
        return;
    }
})