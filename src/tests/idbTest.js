const idb = {
  async openCostsDB(dbName = "costsdb", version = 1) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, version);

       request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const objectStore = db.createObjectStore("userCosts", {
          keyPath: "id",
          autoIncrement: true,
        });
        objectStore.createIndex("costItem", "costItem", { unique: false });
        objectStore.createIndex("sum", "sum", { unique: false });
        objectStore.createIndex("description", "description", {
          unique: false,
        });
        objectStore.createIndex("category", "category", {
          unique: false,
        });
        objectStore.createIndex("date", "date", { unique: false });
      };

      request.onsuccess = function (event) {
        const db = event.target.result;
        // Attach the addCost method directly to the db object.
        db.addCost = async function (cost) {
          return new Promise((resolve, reject) => {
            if (!cost.date) {
              const date = new Date();
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0"); // +1 because months are 0-based
              cost.date = `${year}-${month}`;
            }
            const transaction = db.transaction(["userCosts"], "readwrite");
            const store = transaction.objectStore("userCosts");
            const request = store.add(cost);

            request.onsuccess = function () {
              resolve(true);
            };

            request.onerror = function (event) {
              reject(`Error adding cost: ${event.target.errorCode}`);
            };
          });
        };
        resolve(db);
      };

      request.onerror = function (event) {
        reject(`Error opening DB: ${event.target.errorCode}`);
      };
    });
  },
};

// Expose idb to global scope so it can be used in index.html
window.idb = idb;
