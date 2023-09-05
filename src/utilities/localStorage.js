export default class StorageActions {
  //Store in ls
  openIDBDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("userCostsDB", 1);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const objectStore = db.createObjectStore("userCosts", {
          keyPath: "id",
          autoIncrement: true,
        });
        objectStore.createIndex("costItem", "costItem", { unique: false });
        objectStore.createIndex("sumOfItem", "sumOfItem", { unique: false });
        objectStore.createIndex("itemDescription", "itemDescription", {
          unique: false,
        });
        objectStore.createIndex("categoryOfItem", "categoryOfItem", { unique: false });
        objectStore.createIndex("date", "date", { unique: false });
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }

  addData(data) {
    return new Promise((resolve, reject) => {
      this.openIDBDatabase() // Use 'this' to call the method
        .then((db) => {
          const transaction = db.transaction(["userCosts"], "readwrite");
          const objectStore = transaction.objectStore("userCosts");

          const addRequest = objectStore.add(data);

          addRequest.onsuccess = () => {
            resolve(addRequest.result);
          };

          addRequest.onerror = () => {
            reject(addRequest.error);
          };

          transaction.oncomplete = () => {
            db.close();
          };
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  getData(id) {
    return new Promise((resolve, reject) => {
      this.openIDBDatabase()
        .then((db) => {
          const transaction = db.transaction(["userCosts"], "readonly");
          const objectStore = transaction.objectStore("userCosts");

          const getRequest = objectStore.get(id);

          getRequest.onsuccess = () => {
            resolve(getRequest.result);
          };

          getRequest.onerror = () => {
            reject(getRequest.error);
          };

          transaction.oncomplete = () => {
            db.close();
          };
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getCostsByMonthAndYear(yearMonth) {
    return new Promise((resolve, reject) => {
      this.openIDBDatabase()
        .then((db) => {
          const transaction = db.transaction(["userCosts"], "readonly");
          const objectStore = transaction.objectStore("userCosts");
          const index = objectStore.index("date"); // assuming you've created an index on the 'date' attribute
          const request = index.getAll(IDBKeyRange.only(yearMonth));
          request.onsuccess = () => {
            resolve(request.result);
          };
          request.onerror = () => {
            reject(request.error);
          };
          transaction.oncomplete = () => {
            db.close();
          };
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
