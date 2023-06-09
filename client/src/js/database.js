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


export const putDb = async (content) => {
  try{
    const jateDB = await openDB("jate", 1);
    const tx = jateDB.transaction("jate", "readwrite");
    const store = tx.objectStore("jate");
    const request = store.put({ id:1, value: content });
    const result = await request;
    console.log("Data saved to the database", result);
  }catch(err){
    console.error('putDb not implemented');
  }
}
  

export const getDb = async () => {
  try{
    const jateDB = await openDB("jate", 1);
    const tx = jateDB.transaction("jate", "readonly");
    const store = tx.objectStore("jate");
    const request = store.get(1);
    const result = await request;
    console.log(result);
    return result;
  }catch(err){
    console.error('getDb not implemented');
  }
}

initdb();
