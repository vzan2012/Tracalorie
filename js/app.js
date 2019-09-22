// Custom Scripts - Start

// Storage Controller
const StorageCtrl = (function() {
  // Public methods
  return {
    storeItem: item => {
      let items;
      // Check the items in the Local Storage
      if (localStorage.getItem("items") === null) {
        items = [];

        // Push new item
        items.push(item);

        // Set the Local Storage
        localStorage.setItem("items", JSON.stringify(items));
      } else {
        // Get the Local Storage
        items = JSON.parse(localStorage.getItem("items"));

        // Push new item
        items.push(item);

        // Reset the LocalStorage
        localStorage.setItem("items", JSON.stringify(items));
      }
    },
    getItemsFromStorage: () => {
      let items;
      if (localStorage.getItem("items") === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem("items"));
      }

      return items;
    }
  };
})();

// Item Controller
const ItemCtrl = (function() {
  // Item Constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structures (State similar to React and Angular)
  const data = {
    // items: [
    //   // { id: 0, name: "Apple", calories: 500 },
    //   // { id: 1, name: "Bread", calories: 250 },
    //   // { id: 2, name: "Chocolates", calories: 650 }
    // ],
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0
  };

  //   Public Methods
  return {
    getItems: () => data.items,
    addItem: (name, calories) => {
      let ID;

      // Create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Calories to number
      calories = parseInt(calories);

      // Create new item
      newItem = new Item(ID, name, calories);

      // Add to items array
      data.items.push(newItem);

      return newItem;
    },
    getItemById: id => {
      let foundItem = null;
      // Looping the items
      data.items.forEach(item => {
        if (item.id === id) {
          foundItem = item;
        }
      });
      return foundItem;
    },
    updateItem: (name, calories) => {
      // Convert calories to number
      calories = parseInt(calories);

      let found = null;

      data.items.forEach(item => {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });

      return found;
    },
    deleteItem: id => {
      // Get ids
      const ids = data.items.map(item => item.id);

      // Get index
      const index = ids.indexOf(id);

      // Remove item
      data.items.splice(index, 1);
    },
    clearAllItems: () => {
      data.items = [];
    },
    setCurrentItem: item => {
      data.currentItem = item;
    },
    getCurrentItem: () => data.currentItem,
    getTotalCalories: () => {
      let total = 0;
      // Loop through the item and add the calories
      data.items.forEach(item => {
        total += item.calories;
      });

      // Set the total calories in data structures
      data.totalCalories = total;

      // Return total
      return data.totalCalories;
    },
    logData: () => data
  };
})();

// UI Controller
const UICtrl = (function() {
  //   console.log("UI Controller");
  const UISelectors = {
    itemList: "#item-list",
    listItems: "#item-list li",
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    clearBtn: ".clear-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories"
  };

  //   Public Methods
  return {
    populateItemList: items => {
      let html = "";

      items.forEach(item => {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong><em>${item.calories} Calories</em>
        <a href="" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
      </li>`;
      });

      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: () => {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      };
    },
    addListItem: item => {
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = "block";

      // Create li element
      const li = document.createElement("li");

      // Add Class
      li.className = "collection-item";

      // Add ID
      li.id = `item-${item.id}`;

      // Add HTML
      li.innerHTML = `
      <strong>${item.name}: </strong><em>${item.calories} Calories</em>
        <a href="" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
      `;

      // Insert Item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },
    updateListItem: item => {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Convert the NodeList to Array
      listItems = Array.from(listItems);

      listItems.forEach(listItem => {
        const itemID = listItem.getAttribute("id");

        if (itemID === `item-${item.id}`) {
          document.querySelector(
            `#${itemID}`
          ).innerHTML = `<strong>${item.name}: </strong><em>${item.calories} Calories</em>
          <a href="" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
        }
      });
    },
    deleteListItem: id => {
      const itemId = `#item-${id}`;
      const item = document.querySelector(itemId);
      item.remove();
    },
    clearInput: () => {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    addItemToForm: () => {
      document.querySelector(
        UISelectors.itemNameInput
      ).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(
        UISelectors.itemCaloriesInput
      ).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    removeItems: () => {
      let listItems = document.querySelectorAll(UISelectors.listItems);

      // Turn the Node list into Array
      listItems = Array.from(listItems);

      listItems.map(item => item.remove());
    },
    hideList: () => {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
    showTotalCalories: totalCalories => {
      document.querySelector(
        UISelectors.totalCalories
      ).textContent = totalCalories;
    },
    clearEditState: () => {
      UICtrl.clearInput();
      document.querySelector(UISelectors.addBtn).style.display = "inline";
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
    },
    showEditState: () => {
      document.querySelector(UISelectors.addBtn).style.display = "none";
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
    },
    getSelectors: () => UISelectors
  };
})();

// App Controller
const AppCtrl = (function(ItemCtrl, StorageCtrl, UICtrl) {
  // console.log(ItemCtrl.logData());

  // Load the event listeners
  const loadEventListeners = () => {
    // Get the UI selectors
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);

    // Disable submit on enter
    document.addEventListener("keypress", e => {
      if (e.keyCode == 13 || e.which == 13) {
        e.preventDefault();
        return false;
      }
    });

    // Edit icon click event
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemEditClick);

    // Update item event
    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener("click", itemUpdateSubmit);

    // Delete Button Event
    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener("click", itemDeleteSubmit);

    // Back Button event
    document.querySelector(UISelectors.backBtn).addEventListener("click", e => {
      UICtrl.clearEditState();
      e.preventDefault();
    });

    // Clear Items Event
    document
      .querySelector(UISelectors.clearBtn)
      .addEventListener("click", clearAllItemsClick);
  };

  // Add Item Event
  const itemAddSubmit = e => {
    // Get the form input from UI Controller
    const input = UICtrl.getItemInput();

    // Check for the name and calorie input
    if (input.name !== "" && input.calories !== "") {
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Adding item to the UI list
      UICtrl.addListItem(newItem);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Adding total calories to UI
      UICtrl.showTotalCalories(totalCalories);

      // Store in local storage
      StorageCtrl.storeItem(newItem);

      // Clear Fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  };

  // Click Edit Item
  const itemEditClick = e => {
    if (e.target.classList.contains("edit-item")) {
      // Get list - item id (item-0, item-1)
      const listId = e.target.parentNode.parentNode.id;

      // Break the list - item-id into array
      const listIdArr = listId.split("-");

      // Get the actual id
      const id = parseInt(listIdArr[1]);

      // Get item
      const itemToEdit = ItemCtrl.getItemById(id);

      // Set current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // Add item to form
      UICtrl.addItemToForm();
    }
    e.preventDefault();
  };

  // Update item submit
  const itemUpdateSubmit = e => {
    // Get the item input
    const input = UICtrl.getItemInput();

    // Update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    // Update UI
    UICtrl.updateListItem(updatedItem);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Adding total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();

    e.preventDefault();
  };

  // Delete Button Event
  const itemDeleteSubmit = e => {
    // Get the current item
    const currentItem = ItemCtrl.getCurrentItem();

    // Delete the item from the data structure
    ItemCtrl.deleteItem(currentItem.Id);

    // Delete from the UI - List
    UICtrl.deleteListItem(currentItem.id);

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Adding total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    UICtrl.clearEditState();

    e.preventDefault();
  };

  // Clear items event
  const clearAllItemsClick = e => {
    // Delete all items from the data strcuture
    ItemCtrl.clearAllItems();

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories();

    // Adding total calories to UI
    UICtrl.showTotalCalories(totalCalories);

    // Remvoe from UI
    UICtrl.removeItems();

    // Hide the UI List
    UICtrl.hideList();

    e.preventDefault();
  };

  // For the Initialization
  //   Public Methods
  return {
    init: () => {
      // Clear edit state or set initial state
      UICtrl.clearEditState();

      // Fetch the items from the data structure
      const items = ItemCtrl.getItems();
      // console.log(items);

      // Check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate the list with the items
        UICtrl.populateItemList(items);
      }

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);      

      // Load event listeners
      loadEventListeners();
    }
  };
})(ItemCtrl, StorageCtrl, UICtrl);

// Calling the Initialization
AppCtrl.init();

// Custom Scripts - End
