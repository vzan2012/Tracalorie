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
      { id: 0, name: "Apple", calories: 500 },
      { id: 1, name: "Bread", calories: 250 },
      { id: 2, name: "Chocolates", calories: 650 }
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
    logData: () => data
  };
})();

// UI Controller
const UICtrl = (function() {
  //   console.log("UI Controller");
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories"
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
  };

  // Add Item Event
  const itemAddSubmit = e => {
    // Get the form input from UI Controller
    const input = UICtrl.getItemInput();

    // Check for the name and calorie input
    if (input.name !== "" && input.calories !== "") {
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);
    }

    e.preventDefault();
  };

  // For the Initialization
  //   Public Methods
  return {
    init: () => {
      // Fetch the items from the data structure
      const items = ItemCtrl.getItems();
      // console.log(items);

      // Populate the list with the items
      UICtrl.populateItemList(items);

      // Load event listeners
      loadEventListeners();
    }
  };
})(ItemCtrl, UICtrl);

// Calling the Initialization
AppCtrl.init();

// Custom Scripts - End
