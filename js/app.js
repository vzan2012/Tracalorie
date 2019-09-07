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
    logData: () => data
  };
})();

// UI Controller
const UICtrl = (function() {
  //   console.log("UI Controller");
  const UISelectors = {
    itemList: '#item-list'
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
    }
  };
})();

// App Controller
const AppCtrl = (function(ItemCtrl, UICtrl) {
  // console.log(ItemCtrl.logData());
  // For the Initialization
  //   Public Methods
  return {
    init: () => {
      // Fetch the items from the data structure
      const items = ItemCtrl.getItems();
      // console.log(items);

      // Populate the list with the items
      UICtrl.populateItemList(items);
    }
  };
})(ItemCtrl, UICtrl);

// Calling the Initialization
AppCtrl.init();

// Custom Scripts - End
