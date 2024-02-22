$(document).ready(function () {
  $("#logout").click(function () {
    $(".invisible").removeClass("invisible");
    $(".invisible1").removeClass("invisible1");
    $("#uxilavi").addClass("logshadow");
    $("#uxilavi1").addClass("logout-blank");
    $("body").css("overflow", "hidden");
  });
  $("#logout-cancel,#uxilavi,#x").click(function () {
    $("#uxilavi").removeClass("logshadow");
    $("#uxilavi1").removeClass("logout-blank");
    $("#uxilavi").addClass("invisible");
    $("#uxilavi1").addClass("invisible1");
    $("body").css("overflow", "auto");
    $("#logout-input").val("");
    $("#passwordIncorrect").text("");
  });
  $("#eye").click(function () {
    var fieldType = $("#logout-input").attr("type");
    if (fieldType === "password") {
      $("#logout-input").attr("type", "text");
    } else {
      $("#logout-input").attr("type", "password");
    }
  });
  $("#logout2").click(function () {
    const storedEmail = localStorage.getItem("userEmail");
    const logOutPassword = $("#logout-input").val(); // Corrected selector

    $.ajax({
      type: "POST",
      url: "http://localhost:4000/logout", // Update the port to match your server
      contentType: "application/json",
      data: JSON.stringify({ email: storedEmail, password: logOutPassword }),
      success: function (response) {
        console.log(response); // Log the response from the server

        // Clear stored email from localStorage
        localStorage.removeItem("userEmail");

        // Check if the password matches before redirecting
        if (response === "Logout successful") {
          // Redirect to the registration page
          window.location.href = "../docs/index.html";
        } else {
          console.error("Incorrect password");
        }
      },
      error: function (error) {
        console.error("Error during logout:", error.responseText);
        $("#passwordIncorrect").text("Incorrect password.");
        // Handle the error as needed
      },
    });
  });
});
