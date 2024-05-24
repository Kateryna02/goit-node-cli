const { listContacts, getContactById, removeContact, addContact } = require("./contacts.js");
const { program } = require("commander");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      return console.log(allContacts);
    case "get":
      const oneContact = await getContactById(id);
      return console.log(oneContact);
    case "add":
      const newContact = await addContact(name, email, phone);
      return console.log(newContact);
    case "remove":
      const removedContact = await removeContact(id);
      return console.log(removedContact);
    default:
      console.log("Unknown action");
  }
};
invokeAction(options);

