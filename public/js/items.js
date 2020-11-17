/* eslint-disable quotes */
// Getting references to our form and inputs
$(document).ready(() => {
  const addAnItem = $("form.addItem");
  const itemNameInput = $("input#item-name");
  const categoryInput = $("#category");
  const priceInput = $("input#price");
  const descriptionInput = $("input#description");
  

  addAnItem.on("submit", event => {
    const UserId = $(".member-name").attr("data-id");
    event.preventDefault();
    const itemData = {
      itemName: itemNameInput.val().trim(),
      category: categoryInput.val().trim(),
      price: priceInput.val().trim(),
      description: descriptionInput.val().trim()
    };

    if (!itemData.itemName) {
      return;
    }

    addItem(
      itemData.itemName,
      itemData.category,
      itemData.price,
      itemData.description,
      UserId
    );
    itemNameInput.val("");
    categoryInput.val("");
    priceInput.val("");
    descriptionInput.val("");
  });

  function addItem(itemName, category, price, description, UserId) {
    console.log(UserId)
    $.post("/api/item_post", {
      itemName: itemName,
      category: category,
      price: price,
      description: description,
      UserId: UserId
    }).then(() => {
      window.location.replace("/members");
      // If there's an error, log the error
    });
  }

  $.get("/api/item_data", data => {
    for (let i = 0; i < data.length; i++) {
      const wellSection = $("<div>");

      wellSection.addClass("well");
      // add an id to the well to mark which well it is
      wellSection.attr("id", "character-well-" + i);
      // append the well to the well section
      $("#well-section").append(wellSection);
      $("#character-well-" + i).append("<h2>" + data[i].itemName + "</h2>");
      $("#character-well-" + i).append("<h2>(" + data[i].category + ")</h2>");
      $("#character-well-" + i).append(
        "<h3>Asking Price: " + data[i].price + "</h4>"
      );
      $("#character-well-" + i).append(
        "<h3>Description: " + data[i].description + "</h4>"
      );
      $("#character-well-" + i).append(
        '<button data-toggle="modal" class="a" data-target="#staticBackdrop2">I want this!</button>'
      );
    }
  });
});

//ned to add the table id's or classes to use
// const itemList = $(".itemList");
// const itemContainer = $("#itemContainer");
//ajax to grab them
// ex.
// const loginForm = $("form.login");
// const emailInput = $("input.email-input");
// const passwordInput = $("input.password-input");
// Click events for the edit and delete buttons
// $(document).on("submit", "#item-form", handleItemFormSubmit);

// $(document).on("click", "button.delete", handleItemDelete);
//new item boxes
// const titleInput = $("");
// const itemSelect = $("");
// const category = $("");
// const price = $("");
// const description = $("");
// const photo = $("");
// const skuPic = $("");
// const sellIndicator = $("");
// const tradeIndicator = $("");
// const newUsed = $("");

// Sets a flag for whether or not we're updating a post to be false initially
// const updating = false;

//blank item id
//const itemId

//pulls all the items data
// getItems();

//making a newitem to add to the database
// const newItem = {
//   itemName: titleInput.val().trim(),
//   category: category.val().trim(),
//   price: price.val().trim(),
//   description: description.val().trim(),
// photo:
// skuPic:
//   sellIndicator: sellIndicator.val().trim(),
//   tradeIndicator: tradeIndicator.val().trim(),
//   newUsed: newUsed.val().trim()
// };

// If we're updating a post run updatePost to update a post
// Otherwise run submitPost to create a whole new post
// if (updating) {
//   newItem.id = itemId;
//   updateItem(newItem);
// } else {
//   submitItem(newPost);
// }

// A function to handle what happens when the form is submitted to create a new item
// function handleItemFormSubmit(event) {
//   event.preventDefault();
// Don't do anything if the name fields hasn't been filled out
// if (
//   !nameInput
//     .val()
//     .trim()
//     .trim()
// ) {
//   return;
// }
// Calling the upsertItem function and passing in the value of the name input
//   upsertItem({
//     name: nameInput.val().trim()
//   });
// }

// A function for creating an item. Calls getItem upon completion
// function upsertItem(item_data) {
//   $.post("/api/item_data", item_data).then(getItems);
// }

// Function for creating a new list row for items
// function createItemsRow(item_data) {
//   const newTr = $("<tr>");
//   newTr.data("item", item_data);
//   newTr.append("<td>" + item_data.name + "</td>");
//   if (item_data.Items) {
//     newTr.append("<td> " + item_data.Items.length + "</td>");
//   } else {
//     newTr.append("<td>0</td>");
//   }
//   newTr.append(
//     "<td><a href='/members?user_id=" +
//       item_data.id +
//       "'>Go to Members Page</a></td>"
//   );
// newTr.append("<td><a href='/cms?user_id=" + item_data.id + "'>Create a Post</a></td>");
// newTr.append("<td><a style='cursor:pointer;color:red' class='delete-author'>Delete Author</a></td>");
//   return newTr;
// }

// Function for retrieving items
// function getItems() {
//   $.get("/api/item_data", data => {
//     const rowsToAdd = [];
//     for (let i = 0; i < data.length; i++) {
//       rowsToAdd.push(createItemsRow(data[i]));
//     }
//     renderItemsList(rowsToAdd);
//     nameInput.val("");
//   });
// }

// Function for viewing items
// function renderItemsList(rows) {
//   itemList
//     .children()
//     .not(":last")
//     .remove();
//   itemContainer.children(".alert").remove();
//   if (rows.length) {
//     console.log(rows);
//     itemList.prepend(rows);
//   }
// }

// Submits a new item and brings user to set page upon completion
//href page needs to be update
// function submitItem(item) {
//   $.post("/api/item_data", item, () => {
//     window.location.href = "/";
//   });
// }
//update item user posted and then redirecting them to a page when done
//after href a route needs to be added
// function updateItem(item) {
//   $.ajax({
//     method: "PUT",
//     url: "/api/item_data",
//     data: item
//   }).then(() => {
//     window.location.href = "/";
//   });
// }

//categories for the items in possible drop down
// function getCategories() {
//   $.get("/api/categories", renderCategories);
// }
//gets all the items from the created items data api
// function getItems() {
//   $.get("/api/item_data");
// }
//function to render the list of categories
// function renderCategories() {
//   itemSelect.val(itemId);
// }

// This function does an API call to delete items
// function deleteItem(id) {
//   $.ajax({
//     method: "DELETE",
//     url: "/api/item_data/" + id
//   });
// }
// This function figures out which post we want to delete and then calls deletePost
// function handleItemDelete() {
//   const currentItem = $(this)
//     .parent()
//     .parent()
//     .data("item");
//   deleteItem(currentItem.id);
// }
