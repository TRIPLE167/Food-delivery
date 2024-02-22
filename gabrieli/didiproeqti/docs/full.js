$(document).ready(function () {
  let password = $("#password");
  let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  let passwordVal = $("#password").val();
  let passPattern = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;
  let emailVal = $("#email").val();

  function validationPassed() {
    return pattern.test(emailVal) && passPattern.test(passwordVal);
  }
  $(".login").click(function () {
    if (validationPassed) {
      const loginData = {
        email: $("#email").val(),
        password: $("#password").val(),
      };
      let emailVal = $("#email").val();
      localStorage.setItem("userEmail", emailVal);
      $.ajax({
        type: "POST",
        url: "http://localhost:4000/checkLogin", // Update the port to match your server
        contentType: "application/json",
        data: JSON.stringify({
          email: $("#email").val(),
          password: $("#password").val(),
        }),
        success: function (response) {
          console.log(response);

          if (response.success) {
            // Login successful, redirect to secondPage.html
            window.location.href = "../secondPage/secondPage.html";
          } else {
            // Login failed, handle accordingly
            console.log(response.message);
            $("#passValid").text(
              "The password or email you’ve entered is invalid."
            );
          }
        },
        error: function (error) {
          console.error("Error checking login:", error);

          // Handle the error as needed
        },
      });
    }
  });

  $("#eye").click(function () {
    var fieldType = password.attr("type");
    if (fieldType === "password") {
      password.attr("type", "text");
    } else {
      password.attr("type", "password");
    }
  });

  $("#signup,.sign_up").on("click", function () {
    $("body").css("overflow", "hidden");
    $(".for_registration").toggleClass("blank");
    $(".farda").toggleClass("forFarda");
  });

  $(".farda,#x ").on("click", function () {
    $("body").css("overflow", "auto");
    $(".for_registration").removeClass("blank");
    $(".invisibleValidation").removeClass("valid");
    $(".invisibleValidation1").removeClass("valid");
    $(".invisibleValidation2").removeClass("valid");
    $(".invisibleValidation3").removeClass("valid");
    $("#eye2").css("right", "13px");
  });

  $(".farda,#x").on("click", function () {
    $(".farda").removeClass("forFarda");
    $(".forempty").text("");
    $(".forempty1").text("");
    $("#emailtext").text("");
    $("#ordernot").text("");
    $("#ordernot").css("color", "black");
    $(".ordernot").text("");
    $("#checkbox-validation").text("");
    $("input").val("");
    $("#countries ").val("Country");
  });

  $("#register").click(function () {
    if ($("#name").val() == "") {
      $(".forempty").text("You must enter your first name.");
      $(".invisibleValidation").addClass("valid");
    }

    if ($("#lastname").val() == "") {
      $(".forempty1").text("You must enter your last name.");
      $(".invisibleValidation1").addClass("valid");
    }
    let passPattern = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;
    const regPasswordVal = $("#registration-password").val();
    if (!passPattern.test(regPasswordVal)) {
      $("#eye2").css("right", "40px");
      $("#ordernot").text(
        "you must create a strong password:Use Min. 8 Character / At least one uppercase letter / Add at least one digit"
      );
      $("#ordernot").css("color", "red");
      $(".invisibleValidation2").addClass("valid");
    }
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    let regEmailVal = $("#registration-email").val();
    if (!pattern.test(regEmailVal)) {
      $("#emailtext").text("Forgot your email?");
      $(".invisibleValidation3").addClass("valid");
    }
  });

  $("#name").on("input", function () {
    if ($(this).val() !== "") {
      $(".forempty").text("");
      $(".invisibleValidation").removeClass("valid");
    }
  });

  $("#lastname").on("input", function () {
    if ($(this).val() !== "") {
      $(".forempty1").text("");
      $(".invisibleValidation1").removeClass("valid");
    }
  });

  $("#registration-password").on("input", function () {
    if ($(this).val() !== "") {
      $("#eye2").css("right", "13px");
      $("#ordernot").text("");
      $(".invisibleValidation2").removeClass("valid");
    }
  });
  $("#registration-email").on("input", function () {
    if ($(this).val() !== "") {
      $("#emailtext").text("");
      $(".invisibleValidation3").removeClass("valid");
    }
  });

  $("#register").click(function () {
    if (!$("#checkbox").is(":checked")) {
      $("#checkbox-validation").text(
        "You'll need to accept this before continuing."
      );
    } else {
      $("#checkbox-validation").text("");
    }
  });
  $("#checkbox").on("input", function () {
    if ($("#checkbox").is(":checked")) {
      $("#checkbox-validation").text("");
    }
  });
  $("#eye2").click(function () {
    var fieldType = $("#registration-password").attr("type");
    if (fieldType === "password") {
      $("#registration-password").attr("type", "text");
    } else {
      $("#registration-password").attr("type", "password");
    }
  });
  $("#register").click(function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Your existing validation logic
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    let regEmailVal = $("#registration-email").val();
    let passPattern = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;
    const regPasswordVal = $("#registration-password").val();

    if (
      $("#name").val() !== "" &&
      $("#lastname").val() !== "" &&
      passPattern.test(regPasswordVal) &&
      pattern.test(regEmailVal) &&
      $("#checkbox").is(":checked")
    ) {
      // Get the form data
      const registrationData = {
        name: $("#name").val(),
        lastname: $("#lastname").val(),
        password: $("#registration-password").val(),
        email: $("#registration-email").val(),
      };

      // Send an asynchronous request to save the data to the server
      $.ajax({
        type: "POST",
        url: "http://localhost:4000/submit",
        contentType: "application/json",
        data: JSON.stringify(registrationData),
        success: function (response) {
          console.log(response); // Log the response from the server

          if (response === "Email already registered") {
            $("#emailtext").text("email already exists."); // Display the error message
          } else {
            // Store the user's email in localStorage
            localStorage.setItem("userEmail", $("#registration-email").val());

            // After saving the data, navigate to the desired page
            $("#name").val("");
            $("#lastname").val("");
            $("#registration-password").val("");
            $("#registration-email").val("");
            window.location.href = "../secondPage/secondPage.html";
          }
        },
        error: function (xhr) {
          console.error("Error:", xhr.statusText);
        },
      });
    } else {
      // Log to check if any validation condition fails
      console.log("Validation failed. Registration not submitted.");
    }
  });
});
