const fs = require("fs");
const { title } = require("process");

const getNotes = () => {
  return "Your notes...";
};

const addNote = (title, body) => {
  debugger;

  const notes = loadNotes();
  const duplicateNote = notes.filter((note) => {
    return note.title === title;
  });

  if (duplicateNote.length !== 0) return;

  notes.push({
    title: title,
    body: body,
  });

  saveNote(notes);
};

const removeNote = (title) => {
  const notes = loadNotes();
  const exist = notes.filter((note) => {
    return note.title !== title;
  });

  if (exist) {
    console.log("no item found!");
    return;
  }

  saveNote(exist);
};

const listNotes = () => {
  const notes = loadNotes();

  notes.forEach((note, index) => {
    console.log(`${index + 1}: ${note.title}`);
  });
};

const saveNote = (note) => {
  const dataJSON = JSON.stringify(note);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const data = fs.readFileSync("notes.json").toString();
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
};
