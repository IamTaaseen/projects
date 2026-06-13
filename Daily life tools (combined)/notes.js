const NoteTakerDialog = document.querySelector(".NoteTakerDialog");
const addNoteButton = document.querySelector(".addNoteButton");
const done = document.querySelector(".done");
const back = document.querySelector(".back");
const NoteTakerInput = document.querySelector(".NoteTakerInput");
const NoteContainer = document.querySelector(".NoteContainer");
const NoteTakerName = document.querySelector(".NoteTakerName");

let name;
let notes;
let noteinfo = JSON.parse(localStorage.getItem("noteinfo")) || [];
//localStorage.removeItem("noteinfo");
noteinfo.forEach(info => {
    NoteContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="note">
                <div class="nameSection">
                    <h3 class = "noteTitle">Name</h3>
                    <textarea readonly>${info.name}</textarea>
                </div>
                <div class="noteSection">
                    <h3 class="noteTitle">Notes</h3>
                    <textarea readonly>${info.notes}</textarea>
                </div>
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
        
        notes = NoteTakerInput.value;
        name = NoteTakerName.value;
        NoteContainer.insertAdjacentHTML(
            "beforeend",
            
           `<div class="note">
                <div class="nameSection">
                    <h3 class = "noteTitle">Name</h3>
                    <textarea readonly>${name}</textarea>
                </div>
                <div class="noteSection">
                    <h3 class="noteTitle">Notes</h3>
                    <textarea readonly>${notes}</textarea>
                </div>
         </div>`
        )
        noteinfo.push({name,notes});
        localStorage.setItem("noteinfo", JSON.stringify(noteinfo));
        NoteTakerDialog.classList.remove("active");
        NoteTakerInput.value = "";
        NoteTakerName.value = "";
    }
});