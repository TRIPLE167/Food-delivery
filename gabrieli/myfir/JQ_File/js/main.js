$(document).ready(function () {
  $(".clc").click(function () {
    $("#display").val($("#display").val() + $(this).val());
  });
  $(".clear").click(function () {
    $("#display").val(" ");
  });
  $("#finalresult").click(function () {
    $("#display").val(eval($("#display").val()));
  });
  $("#display").on("input", function () {
    $(this).val(
      $(this)
        .val()
        .replace(/[^0-9/]/g, " ")
        .trim()
    );
  });
  //   $(".radio-btn").click(function () {
  //     $(".radio").toggleClass("active");
  //     $("body").toggleClass("dark");
  //   });
  // },
  // $(".gamravleba").click(function multiply(x, y, a) {
  //   x = $("#first").val();
  //   y = $("#second").val();
  //   a = parseFloat(x) + parseFloat(y);
  //   $("#demo").html(a);
  // }),
  // $(".misalmeba").click(function sayHello(saxeli, gvari) {
  //   saxeli = $("#name").val();
  //   gvari = $("#lastname").val();
  //   $("#hello").html(
  //     "gamarjoba " +
  //       saxeli +
  //       " " +
  //       gvari +
  //       " chven vart vigac vigac da es aris satesto davaleba madloba<3"
  //   );
  // }),
  // function () {
  //   const array = ["gabo", "ss"];
  //   array.forEach(function (car) {
  //     console.log();
  //   });
});
