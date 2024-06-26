const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);
/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};
/**
 *  Function to delete data from a given a file and append file.
 *  @param {object} id The id is from the parameter and then its selected.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */
const deleteAndAppend = (id, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      return console.error(err);
    } else {
      let parsedData = JSON.parse(data);
      // Find index of the note with the given ID
      const indexOfId = parsedData.findIndex((pData) => pData.id === id);

      // note selected does not have an ID
      if (indexOfId === -1) {
        return console.error('Note not found');
      }

      // Remove the note from the array
      parsedData.splice(indexOfId, 1);
      // Write the updated array back to the file
      writeToFile(file, parsedData);
    }
  });
};

module.exports = { readFromFile, writeToFile, readAndAppend, deleteAndAppend };
