import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to the database');

  try {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');

    const existingContent = await store.get(1);
    if (existingContent) {
      existingContent.content = content;
      await store.put(existingContent);
      console.log('🚀 - Data updated in the database');
    } else {
      const newContent = { content };
      await store.add(newContent);
      console.log('🚀 - Data added to the database');
    }

    await tx.done;
  } catch (error) {
    console.error('Error adding content to the database:', error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  try {
    const db = await openDB('jate', 1);
    const tx = db.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const content = await store.get(1);
    await tx.done;

    if (content) {
      console.log('Content retrieved from the database:', content.content);
      return content.content;
    } else {
      console.log('No content found in the database.');
      return null;
    }
  } catch (error) {
    console.error('Error getting content from the database:', error);
    return null;
  }
};

initdb();
