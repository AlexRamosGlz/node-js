const fs = require("fs");
const validator = require("validator");
const chalk = require("chalk");
const yargs = require("yargs");
const name = require("/School/nodeJs/notes-app/utils");
const getNotes = require("/School/nodeJs/notes-app/getNotes");
const notes = require("./getNotes");

//create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demmandOption: true,
      type: "string",
    },

    body: {
      describe: "note body",
      demmandOption: true,
      type: "string",
    },
  },

  handler: (argv) => {
    notes.addNote(argv.title, argv.body);
  },
});

//create remove command
yargs.command({
  command: "remove",
  describe: "remove a note",
  builder: {
    title: {
      describe: "Note title",
      demmandOption: true,
      type: "string",
    },
  },

  handler: (argv) => {
    notes.removeNote(argv.title);
  },
});

//create read command
yargs.command({
  command: "read",
  describe: "read a note",
  handler: () => {
    console.log("reading note");
  },
});

//create list command
yargs.command({
  command: "list",
  describe: "list your notes",
  handler: () => {
    console.log(chalk.green("   Your notes!"));
    notes.listNotes();
  },
});

yargs.parse();
