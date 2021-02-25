const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
class Notes {
    readNotes() {
        return readFileAsync('db/db.json', 'utf8');
    };
    writeNotes(data) {
        return writeFileAsync('db/db.json', JSON.stringify(data));
    };
    getNotes() {
        return this.readNotes().then(data => {
            let notes;
            try {
                notes = [].concat(JSON.parse(data))
            } catch (error) {
                notes = [];
            };
            return notes
        });
    };
    addNotes(data) {
        const { title, text } = data
        if (!title || !text) {
            throw new Error('Must type a title and text.');
        }
        const finalNote = { title, text, id, }
        return this.getNotes().then(data => [...data, finalNote]).then(data => this.writeNotes(data));
    };
    deleteNotes(id) {
        return this.getNotes().then(data => data.filter(note => note.id !== id)).then(data => this.writeNotes(data));
    }
};
module.exports = new Notes();