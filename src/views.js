import moment from 'moment' 
import { getFilters } from  './filters'
import { getNotes, sortNotes } from  './notes'

const generateNoteDOM = (note) => {
    
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')
   
    // Setup the note title text 

    if(note.title.length > 0) {
       textEl.textContent = note.title
    } else {
       textEl.textContent = 'Unnamed Note'
    }
   textEl.classList.add('list-item__title')
   noteEl.appendChild(textEl)
    // Setup the link
    noteEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.classList.add('list-item')
    
    //setup status message
    statusEl.textContent = renderLastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)
    return noteEl
}


// Render Notes Array 
const renderNotes = () => {
    const notesEl = document.querySelector('#notes')
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy)
     const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
  
     notesEl.innerHTML = ''
 
     if (filteredNotes.length > 0) {
       filteredNotes.forEach((note) => {
  
          const noteEl =  generateNoteDOM(note)
     
          notesEl.appendChild(noteEl)  
           })
      
     } else{
       const emptyMessage = document.createElement('p')
       emptyMessage.textContent = 'No Notes To Show'
       emptyMessage.classList.add("empty-message")
       notesEl.appendChild(emptyMessage)  
     } 
  }
  
  const initializeEditPage = (noteId) => {

    const titleElement = document.querySelector('#note-title')
    const lastEditedElement = document.querySelector('#last-edited')
    const bodyElement = document.querySelector('#note-body')
    const notes = getNotes()
    const note = notes.find((note) => note.id === noteId)

    if (!note){
        location.assign('/index.html')
    }
    titleElement.value = note.title
    bodyElement.value = note.body
    lastEditedElement.textContent = renderLastEdited(note.updatedAt)
  } 

//Generate Last Edited Text 
const renderLastEdited = (timeStamp) => `Last Edited ${moment(timeStamp).fromNow()}`


   export { generateNoteDOM, renderNotes, renderLastEdited, initializeEditPage }