import getDate from "./helpers";
const idb = {
  //Store in ls
  openCostsDB: function (dbName = "costsdb", vesrion = 1) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, vesrion);

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
        objectStore.createIndex("categoryOfItem", "categoryOfItem", {
          unique: false,
        });
        objectStore.createIndex("date", "date", { unique: false });
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  },
  addCost: function (data) {
    return new Promise((resolve, reject) => {
      this.openCostsDB() // Use 'this' to call the method
        .then((db) => {
          const transaction = db.transaction(["userCosts"], "readwrite");
          const objectStore = transaction.objectStore("userCosts");
          if (!data.date) {            
            data.date = getDate();
          }
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
  },
  getAllData: function () {
    return new Promise((resolve, reject) => {
      this.openCostsDB()
        .then((db) => {
          const transaction = db.transaction(["userCosts"], "readonly");
          const objectStore = transaction.objectStore("userCosts");

          const getAllRequest = objectStore.getAll();

          getAllRequest.onsuccess = () => {
            resolve(getAllRequest.result);
          };

          getAllRequest.onerror = () => {
            reject(getAllRequest.error);
          };

          transaction.oncomplete = () => {
            db.close();
          };
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getCostsByMonthAndYear: function (yearMonth) {
    return new Promise((resolve, reject) => {
      this.openCostsDB()
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
  },
};

export default idb;
