$(document).ready(() => {
  console.log("test");
  // Getting references to our form and input
  // Commented out the next line because the signUpForm variable is never used
  // const signUpForm = $("form.signup");

  const firstNameInput = $("input#first-name-input");
  const lastNameInput = $("input#last-name-input");
  const usernameInput = $("input#username-input");
  const addressInput = $("input#address-input");
  const cityInput = $("input#city-input");
  const stateInput = $("input#state-input");
  const zipInput = $("input#zip-input");
  const phoneInput = $("input#phone-input");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");

  $(".signup-button").on("click", event => {
    event.preventDefault();

    const userData = {
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      username: usernameInput.val().trim(),
      address1: addressInput.val().trim(),
      city: cityInput.val().trim(),
      state: stateInput.val().trim(),
      zip: zipInput.val().trim(),
      phone: phoneInput.val().trim(),
      email: emailInput.val(),
      password: passwordInput.val()
    };
    if (!userData.email || !userData.password) {
      console.log(userData);
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(
      userData.firstName,
      userData.lastName,
      userData.username,
      userData.address1,
      userData.city,
      userData.state,
      userData.zip,
      userData.phone,
      userData.email,
      userData.password
    );
    firstNameInput.val("");
    lastNameInput.val("");
    usernameInput.val("");
    addressInput.val("");
    cityInput.val("");
    stateInput.val("");
    zipInput.val("");
    phoneInput.val("");
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(
    firstName,
    lastName,
    username,
    address1,
    city,
    state,
    zip,
    phone,
    email,
    password
  ) {
    console.log("we are here");
    $.post("/api/signup", {
      firstName: firstName,
      lastName: lastName,
      username: username,
      address1: address1,
      city: city,
      state: state,
      zip: zip,
      phone: phone,
      email: email,
      password: password
    })
      .then(response => {
        console.log(response);
        window.location.replace("/");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
