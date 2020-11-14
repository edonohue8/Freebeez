// Getting references to our form and inputs
$(document).ready(() => {
  //ned to add the table id's or classes to use
  //ajax to grab them
  // ex.
  // const loginForm = $("form.login");
  // const emailInput = $("input#email-input");
  // const passwordInput = $("input#password-input");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleItemDelete);
  //new item boxes
  const titleInput = $("");
  // const itemSelect = $("");
  const category = $("");
  const price = $("");
  const description = $("");
  // const photo = $("");
  // const skuPic = $("");
  const sellIndicator = $("");
  const tradeIndicator = $("");
  const newUsed = $("");

  // Sets a flag for whether or not we're updating a post to be false initially
  const updating = false;

  //blank item id
  //const itemId

  //pulls all the items data
  getItems();

  //making a newitem to add to the database
  const newItem = {
    itemName: titleInput.val().trim(),
    category: category.val().trim(),
    price: price.val().trim(),
    description: description.val().trim(),
    // photo:
    // skuPic:
    sellIndicator: sellIndicator.val().trim(),
    tradeIndicator: tradeIndicator.val().trim(),
    newUsed: newUsed.val().trim()
  };

  // If we're updating a post run updatePost to update a post
  // Otherwise run submitPost to create a whole new post
  if (updating) {
    newItem.id = itemId;
    updateItem(newItem);
  } else {
    submitItem(newPost);
  }

  // Submits a new item and brings user to set page upon completion
  //href page needs to be update
  function submitItem(item) {
    $.post("/api/item_data", item, () => {
      window.location.href = "/";
    });
  }
  //update item user posted and then redirecting them to a page when done
  //after href a route needs to be added
  function updateItem(item) {
    $.ajax({
      method: "PUT",
      url: "/api/item_data",
      data: item
    }).then(() => {
      window.location.href = "/";
    });
  }

  //categories for the items in possible drop down
  // function getCategories() {
  //   $.get("/api/categories", renderCategories);
  // }
  //gets all the items from the created items data api
  function getItems() {
    $.get("/api/item_data");
  }
  //function to render the list of categories
  // function renderCategories() {
  //   itemSelect.val(itemId);
  // }

  // This function does an API call to delete items
  function deleteItem(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/item_data/" + id
    });
  }
  // This function figures out which post we want to delete and then calls deletePost
  function handleItemDelete() {
    const currentItem = $(this)
      .parent()
      .parent()
      .data("item");
    deleteItem(currentItem.id);
  }
});
