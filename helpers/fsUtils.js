// Use fs.promises directly
const fs = require('fs').promises;

/**
 *  Function to read data from a file
 *  @param {string} file The path to the file you want to read.
 *  @returns {Promise<object>} The parsed content of the file.
 */
const readFromFile = async (file) => {
  try {
    const data = await fs.readFile(file, 'utf8');
    // validate data is reading
    console.log(`Data read from file ${file}:`, data);
    // parse data directly
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading from file ${file}:`, err);
    throw err;
  }
};

/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {Promise<void>} A promise that resolves when the file is written.
 */
const writeToFile = async (destination, content) => {
  try {
    // validate data written is correct
    console.log(`Writing data to file ${destination}:`, content);
    await fs.writeFile(destination, JSON.stringify(content, null, 4));
  } catch (err) {
    console.error(`Error writing to file ${destination}:`, err);
    throw err;
  }
};

/**
 *  Function to read data from a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {Promise<void>} A promise that resolves when the content is appended.
 */
const readAndAppend = async (content, file) => {
  try {
    const parsedData = await readFromFile(file);
    parsedData.push(content);
    await writeToFile(file, parsedData);
  } catch (err) {
    console.error('Error in readAndAppend function:', err);
    throw err;
  }
};

/**
 *  Function to delete data from a file based on ID
 *  @param {string} id The ID of the item to delete.
 *  @param {string} file The path to the file you want to modify.
 *  @returns {Promise<void>} A promise that resolves when the item is deleted.
 */
const deleteAndAppend = async (id, file) => {
  try {
    let parsedData = await readFromFile(file);
    // Find index of the note with the given ID
    const indexOfId = parsedData.findIndex((pData) => pData.id === id);

    // note selected does not have an ID
    if (indexOfId === -1) {
      console.error(`Note with ID ${id} not found.`);
      // rethrow error to handle it in calling function
      throw new Error('Note not found');
    }

    // Remove the note from the array
    parsedData.splice(indexOfId, 1);
    // Write the updated array back to the file
    await writeToFile(file, parsedData);
  } catch (err) {
    console.error('Error in deleteAndAppend function:', err);
    throw err;
  }
};

module.exports = { readFromFile, writeToFile, readAndAppend, deleteAndAppend };
