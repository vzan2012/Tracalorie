// Custom Scripts - Start

// Storage Controller

// Item Controller
const ItemCtrl = (function() {
  // Item Constructor
  const Item = (id, name, calories) => {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structures (State similar to React and Angular)
  const data = {
    items: [
        {id: 0, name: 'Apple', calories: 500},
        {id: 1, name: 'Bread', calories: 250},
        {id: 2, name: 'Chocolates', calories: 650},
    ],
    currentItem: null,
    totalCalories: 0
  };

  //   Public Methods
  return {
    logData: () => data
  };
})();

// UI Controller
const UICtrl = (function() {
  //   console.log("UI Controller");

  //   Public Methods
  return {};
})();

// App Controller
const AppCtrl = (function(ItemCtrl, UICtrl) {
  // console.log(ItemCtrl.logData());
  // For the Initialization
  //   Public Methods
  return {
    init: () => console.log("Initializing App...")
  };
})(ItemCtrl, UICtrl);

// Calling the Initialization
AppCtrl.init();

// Custom Scripts - End
