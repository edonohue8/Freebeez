/* eslint-disable quotes */
// Getting references to our form and inputs
$(document).ready(() => {
  const addAnItem = $("form.addItem");
  const itemNameInput = $("input#item-name");
  const categoryInput = $("#category");
  const contactInput = $("input#contact");
  const descriptionInput = $("input#description");

  addAnItem.on("submit", event => {
    const UserId = $(".member-name").attr("data-id");
    event.preventDefault();
    const itemData = {
      itemName: itemNameInput.val().trim(),
      category: categoryInput.val().trim(),
      contact: contactInput.val().trim(),
      description: descriptionInput.val().trim()
    };

    if (!itemData.itemName) {
      return;
    }

    addItem(
      itemData.itemName,
      itemData.category,
      itemData.contact,
      itemData.description,
      UserId
    );
    itemNameInput.val("");
    categoryInput.val("");
    contactInput.val("");
    descriptionInput.val("");
  });

  function addItem(itemName, category, contact, description, UserId) {
    console.log(UserId);
    $.post("/api/item_post", {
      itemName: itemName,
      category: category,
      contact: contact,
      description: description,
      UserId: UserId
    }).then(() => {
      window.location.replace("/members");
      // If there's an error, log the error
    });
  }

  $.get("/api/user_data").then(data => {
    $(".member-contact").text(data.contact);
  });

  $.get("/api/item_data", data => {
    for (let i = 0; i < data.length; i++) {
      const wellSection = $("<div>");
      wellSection.addClass("well");
      wellSection.attr("id", "item-well-" + i);
      $("#well-section").append(wellSection);

      $("#item-well-" + i).append("<h2>" + data[i].itemName + "</h2>");

      if (data[i].category === "Electronics") {
        $("#item-well-" + i).append(
          `<h1 class="float"><i class="fas fa-lightbulb"></i></h1>`
        );
      } else if (data[i].category === "Sports/Outdoor") {
        $("#item-well-" + i).append(
          `<h1 class="float"><i class="fas fa-hiking"></i></h1>`
        );
      } else if (data[i].category === "Home/Garden") {
        $("#item-well-" + i).append(
          `<h1 class="float"><i class="fas fa-home"></i></h1>`
        );
      } else if (data[i].category === "Clothes/Fashion") {
        $("#item-well-" + i).append(
          `<h1 class="float"><i class="fas fa-tshirt"></i></h1>`
        );
      } else if (data[i].category === "Toys") {
        $("#item-well-" + i).append(
          `<h1 class="float"><i class="fas fa-puzzle-piece"></i></h1>`
        );
      } else if (data[i].category === "Collectibles/Art") {
        $("#item-well-" + i).append(
          `<h1 class="float"><i class="fas fa-palette"></i></h1>`
        );
      } else if (data[i].category === "Misc.") {
        $("#item-well-" + i).append(
          `<h1 class="float"><i class="fas fa-question-circle"></i></h1>`
        );
      }
      $("#item-well-" + i).append("<h4>" + data[i].description + "</h4>");
      $("#item-well-" + i).append("<h2>" + data[i].contact + "</h2>");
      $("#item-well-" + i).append(
        '<button data-toggle="modal" id="wantbtn" class="button button-float" data-target="#staticBackdrop2">I want this!</button>'
      );
    }
  });
  $.get("/api/item_data", data => {
    for (let i = 0; i < data.length; i++) {
      const wellSection = $("<div>");
      wellSection.addClass("well");
      wellSection.attr("id", "login-well-" + i);
      $("#well-section-prelogin").append(wellSection);

      $("#login-well-" + i).append("<h2>" + data[i].itemName + "</h2>");

      if (data[i].category === "Electronics") {
        $("#login-well-" + i).append(
          `<h1 class="float"><i class="fas fa-lightbulb"></i></h1>`
        );
      } else if (data[i].category === "Sports/Outdoor") {
        $("#login-well-" + i).append(
          `<h1 class="float"><i class="fas fa-hiking"></i></h1>`
        );
      } else if (data[i].category === "Home/Garden") {
        $("#login-well-" + i).append(
          `<h1 class="float"><i class="fas fa-home"></i></h1>`
        );
      } else if (data[i].category === "Clothes/Fashion") {
        $("#login-well-" + i).append(
          `<h1 class="float"><i class="fas fa-tshirt"></i></h1>`
        );
      } else if (data[i].category === "Toys") {
        $("#login-well-" + i).append(
          `<h1 class="float"><i class="fas fa-puzzle-piece"></i></h1>`
        );
      } else if (data[i].category === "Collectibles/Art") {
        $("#login-well-" + i).append(
          `<h1 class="float"><i class="fas fa-palette"></i></h1>`
        );
      } else if (data[i].category === "Misc.") {
        $("#login-well-" + i).append(
          `<h1 class="float"><i class="fas fa-question-circle"></i></h1>`
        );
      }
      $("#login-well-" + i).append("<h4>" + data[i].description + "</h4>");
      $("#login-well-" + i).append(
        '<button data-toggle="modal" id="wantbtn" class="button button-float" data-target="#staticBackdrop2">I want this!</button>'
      );
    }
  });
});
