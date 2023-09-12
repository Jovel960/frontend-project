//Yovel Hadad 207125329, Rotem Zagori 316389378, Nissim Cohen 308152537
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
        objectStore.createIndex("sum", "sum", { unique: false });
        objectStore.createIndex("description", "description", {
          unique: false,
        });
        objectStore.createIndex("category", "category", {
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
  //Adding cost
  addCost: function (data) {
    return new Promise((resolve, reject) => {
      this.openCostsDB() // Use 'this' to call the method
        .then((db) => {
           if (!data.date) {            
            data.date = getDate();
          }
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
  },
  //Fetching all costs
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
  //Fetching costs per year and month
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
