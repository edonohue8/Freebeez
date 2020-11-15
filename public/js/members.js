$(document).ready(() => {
  const addItemForm = $("form.addItem");
  const itemNameInput = $("input#item-name");

  addItemForm.on("submit", event => {
    event.preventDefault();
    const itemData = {
      itemName: itemNameInput.val().trim()
    };

    if (!itemData.itemName) {
      return;
    }

    addItemToDB(itemData.itemName);
    itemNameInput.val("");

    function addItemToDB(itemName) {
      $.post("/api/itemPost", {
        itemName: itemName
      });
    }

    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/userData").then(data => {
      $(".member-name").text(data.email);
    });
  });
});
