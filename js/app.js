// Custom Scripts - Start

// Storage Controller

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
    items: [
      // { id: 0, name: "Apple", calories: 500 },
      // { id: 1, name: "Bread", calories: 250 },
      // { id: 2, name: "Chocolates", calories: 650 }
    ],
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
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
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
const AppCtrl = (function(ItemCtrl, UICtrl) {
  // console.log(ItemCtrl.logData());

  // Load the event listeners
  const loadEventListeners = () => {
    // Get the UI selectors
    const UISelectors = UICtrl.getSelectors();

    // Add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);

    // Edit icon click event
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemUpdateSubmit);
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

      // Clear Fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  };

  // Update item submit
  const itemUpdateSubmit = e => {
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

      // Load event listeners
      loadEventListeners();
    }
  };
})(ItemCtrl, UICtrl);

// Calling the Initialization
AppCtrl.init();

// Custom Scripts - End
