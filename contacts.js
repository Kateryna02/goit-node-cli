


import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

async function readContacts() {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
}

async function writeContacts(contacts) {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

export async function listContacts() {
    return await readContacts();
}

export async function getContactById(contactId) {
    const contacts = await readContacts();
    const contact = contacts.find(c => c.id === contactId);
    return contact || null;
}

export async function removeContact(contactId) {
    const contacts = await readContacts();
    const index = contacts.findIndex(c => c.id === contactId);
    if (index === -1) return null;
    const [removedContact] = contacts.splice(index, 1);
    await writeContacts(contacts);
    return removedContact;
}

export async function addContact(name, email, phone) {
    const contacts = await readContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    };
    contacts.push(newContact);
    await writeContacts(contacts);
    return newContact;
}
