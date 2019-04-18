import { initializeEditPage, renderLastEdited } from './views'
import { updateNote, removeNote } from './notes'

const titleElement = document.querySelector('#note-title')
const lastEditedElement = document.querySelector('#last-edited')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
const noteId = location.hash.substring(1)

initializeEditPage(noteId)


titleElement.addEventListener('input', (e) => {
    const note = updateNote (noteId, {
        title: e.target.value
   })
    lastEditedElement.textContent = renderLastEdited(note.updatedAt)
 })

// Update local storate with putted body 
 bodyElement.addEventListener('input', (e) => {
    const note = updateNote (noteId, {
        body: e.target.value
   })
    lastEditedElement.textContent = renderLastEdited(note.updatedAt)
 })



// remove element and redirect to index when clicked
 removeElement.addEventListener('click', (e) => {
    removeNote(noteId)
    location.assign('/index.html')  
 })

//listen for changes in the window and change other windows to reflect them 
window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {

        initializeEditPage(noteId)

    }
})