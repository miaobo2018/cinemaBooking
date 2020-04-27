"use strict";

$(document).ready(function () {
  /* 隐藏部分component logout和座位布置，tickets等 */
  $(".wylogin").hide();
  $(".adminItem").hide();

  $("#ticket").hide();
  $("#hall").hide();

  $("#detail").hide();
  $("#summation").hide();
  $("#finishReservation").hide();

  /* Ajax 读取广告，设置成了news,有两个属性title content*/
  $(document).ready(function () {
    $.ajax({
      url: "/shownews",
      type: "POST",
      success: function (data) {
        //有三个广告位置
        for (var i = 1; i <= 3; i++) {
          $(".news" + i + " .title").text(data.news[i - 1].AdTitle);
          $(".news" + i + " .content").text(data.news[i - 1].AdContent);
        }
      },
    });
  });

  //Validation
  var nameReg = /^[A-Za-zęóąśłżźćńĘÓĄŚŁŻŹĆŃ]+$/;
  var numberReg = /^[0-9]{9}$/;
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

  //Details
  $("#name").keyup(function () {
    if (!nameReg.test($("#name").val())) {
      $("#name").css("background-color", "red");
    } else {
      $("#name").css("background-color", "#333");
    }
  });

  $("#email").keyup(function () {
    if (!emailReg.test($("#email").val())) {
      $("#email").css("background-color", "red");
    } else {
      $("#email").css("background-color", "#333");
    }
  });

  $("#phone").keyup(function () {
    if (!numberReg.test($("#phone").val())) {
      $("#phone").css("background-color", "red");
    } else {
      $("#phone").css("background-color", "#333");
    }
  });

  /* Ajaxy - base data about movie */
  $.ajax({
    url: "/getmovies",
    type: "POST",
    success: function (data) {
      $("#movie, #day, #startTime").empty();
      $("#movie, #day, #startTime").val("");

      $("#movie").append(
        "<option selected disabled style='display:none;'>Choose movie</option>"
      );
      $("#day").append(
        "<option selected disabled style='display:none;'>Choose day</option>"
      );
      $("#startTime").append(
        "<option selected disabled style='display:none;'>Choose startTime</option>"
      );

      //去重
      var arrayOfMoviesWithDuplicates = [];
      for (var i = 0; i < data.movies.length; i++) {
        arrayOfMoviesWithDuplicates.push(data.movies[i]);
      }

      var arrayOfUniqueMovies = arrayOfMoviesWithDuplicates.filter(function (
        item,
        index,
        self
      ) {
        return index == self.indexOf(item);
      });
      // console.log(arrayOfUniqueMovies);

      arrayOfUniqueMovies.sort(function (a, b) {
        if (a > b) {
          return 1;
        }

        if (a < b) {
          return -1;
        }

        return 0;
      });

      for (var i = 0; i < arrayOfUniqueMovies.length; i++) {
        $("#movie").append(
          "<option value='" +
            arrayOfUniqueMovies[i].filmName +
            "'>" +
            arrayOfUniqueMovies[i].filmName +
            "</option>"
        );
      }

      $("#movie, #day, #startTime").change(enableSelection);
      checkBaseData();
    },
  });

  //bo Ajax nie uruchomi sie podczas zmiany filmu - dorzucil dane i juz sie wiecej nie uruchomi

  var numberOfRoom = 0;

  $("#movie").change(function () {
    $.ajax({
      url: "/getdays",
      type: "POST",
      data: {
        movieName: $("#movie").val(),
      },
      success: function (data) {
        // console.log("#movie.val", $("#movie").val());
        $("#day, #startTime").empty();
        $("#day, #startTime").val("");

        $("#day").append(
          "<option selected disabled style='display:none;'>Choose day</option>"
        );
        $("#startTime").append(
          "<option selected disabled style='display:none;'>Choose startTime</option>"
        );

        //delete duplicates
        var arrayOfDaysWithDuplicates = [];
        for (var i = 0; i < data.days.length; i++) {
          arrayOfDaysWithDuplicates.push(data.days[i].day);
        }
        console.log("重复天数", arrayOfDaysWithDuplicates);
        var arrayOfUniqueDays = arrayOfDaysWithDuplicates.filter(function (
          item,
          index,
          self
        ) {
          return index == self.indexOf(item);
        });
        console.log(arrayOfUniqueDays);
        arrayOfUniqueDays.sort(function (a, b) {
          if (a > b) {
            return 1;
          }

          if (a < b) {
            return -1;
          }

          return 0;
        });

        for (var i = 0; i < arrayOfUniqueDays.length; i++) {
          $("#day").append(
            "<option value='" +
              arrayOfUniqueDays[i] +
              "'>" +
              arrayOfUniqueDays[i] +
              "</option>"
          );
        }

        //get number of room
        numberOfRoom = data.days[0].room;
        console.log("numberofRoom", numberOfRoom);

        $("#movie, #day, #startTime").change(enableSelection);
        checkBaseData();
      },
    });
  });

  $("#day").change(function () {
    $.ajax({
      url: "/gethours",
      type: "POST",
      data: {
        movieName: $("#movie").val(),
        movieDay: $("#day").val(),
      },
      success: function (data) {
        $("#startTime").empty();
        $("#startTime").val("");

        $("#startTime").append(
          "<option selected disabled style='display:none;'>Choose startTime</option>"
        );

        //Delete duplicates
        var arrayOfHoursWithDuplicates = [];
        for (var i = 0; i < data.startTimes.length; i++) {
          arrayOfHoursWithDuplicates.push(data.startTimes[i].startTime);
        }

        var arrayOfUniqueHours = arrayOfHoursWithDuplicates.filter(function (
          item,
          index,
          self
        ) {
          return index == self.indexOf(item);
        });

        arrayOfUniqueHours.sort(function (a, b) {
          if (a > b) {
            return 1;
          }

          if (a < b) {
            return -1;
          }

          return 0;
        });

        for (var i = 0; i < arrayOfUniqueHours.length; i++) {
          $("#startTime").append(
            "<option value='" +
              arrayOfUniqueHours[i] +
              "'>" +
              arrayOfUniqueHours[i] +
              "</option>"
          );
        }

        $("#movie, #day, #startTime").change(enableSelection);
        checkBaseData();
      },
    });
  });
  // 确定时间后，读取票价
  $("#startTime").change(function () {
    $.ajax({
      url: "/getPrice",
      type: "POST",
      data: {
        movieName: $("#movie").val(),
        movieDay: $("#day").val(),
        movieStartTime: $("#startTime").val(),
      },
      success: function (data) {
        $("#price").empty();
        $("#price").val("");

        $("#price").val(data);

        $("#movie, #day, #startTime").change(enableSelection);
        checkBaseData();
        clearClickedSeat();
      },
    });
  });

  //选项颜色调整 用户每选择一个option 下一个选项就激活
  function enableSelection() {
    var m = $("#movie").val();
    var d = $("#day").val();
    var h = $("#startTime").val();

    $("#day, #startTime").css("background-color", "#000000");
    $("#day, #startTime").css("color", "#333333");

    //用户选择movie 激活day option
    if ($("#movie").val() !== null) {
      $("#day").css("background-color", "#333333");
      $("#day").css("color", "#30d5c8");
    }
    //用户选择好day 激活startTime
    if ($("#day").val() !== null) {
      $("#startTime").css("background-color", "#333333");
      $("#startTime").css("color", "#30d5c8");
    }
  }

  var numberSeatsToReservation = 0;
  var clickedSeat = 0;
  var cost = 0;
  var seats = [];

  //Cost of tickets
  $("#normalTicket").change(function () {
    var normal = $("#normalTicket").val();

    if (normal < 0) {
      alert("The number of tickets should be postive!");
      $("#normalTicket").val(0);
      normal = $("#normalTicket").val();
      return;
    }

    cost = normal * $("#price").val();
    $("#money").text(cost);

    //避免一种情况 用户选择座位数->用户选定位置->用户再次设定座位数 而且比原来低
    numberSeatsToReservation = parseInt(normal);
    if (clickedSeat > numberSeatsToReservation) {
      removeAllReservationByUser();
    }

    if (clickedSeat < numberSeatsToReservation) {
      $("#summation").slideDown(300);
      $("#summationList").slideUp(200);
      $("#finishReservation").slideUp(200);
    }
  });

  function removeAllReservationByUser() {
    for (var i = 0; i < seats.length; i++) {
      $("div [value='" + seats[i] + "']").css("background-color", "#555");
      $("div [value='" + seats[i] + "']").css("color", "#30D5C8");
    }

    clearClickedSeat();
  }

  function clearClickedSeat() {
    var m = $("#movie").val();
    var d = $("#day").val();
    var h = $("#startTime").val();

    clickedSeat = 0;
    seats = [];

    $("#detail").slideUp(300);
    $("#summation").slideUp(300);
    $("#summationList").slideUp(200);
    $("#finishReservation").slideUp(200);
  }

  //座位图表
  function checkBaseData() {
    var m = $("#movie").val();
    var d = $("#day").val();
    var h = $("#startTime").val();

    if (m !== null && d !== null && h !== null) {
      //假定四个房间 每个房间座位数都不一样
      var numberOfRows = 0;
      var numberOfSeatsInRow = 0;

      if (numberOfRoom == 1) {
        numberOfRows = 4;
        numberOfSeatsInRow = 8;
      }

      if (numberOfRoom == 2) {
        numberOfRows = 6;
        numberOfSeatsInRow = 10;
      }

      if (numberOfRoom == 3) {
        numberOfRows = 8;
        numberOfSeatsInRow = 11;
      }

      if (numberOfRoom == 4) {
        numberOfRows = 8;
        numberOfSeatsInRow = 10;
      }

      var alfabet = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "W",
        "U",
        "Z",
      ];

      $("#hall").empty();
      $("#hall").append("<div class='screen'>Screen</div>");
      for (var k = 0; k <= numberOfRows; k++) {
        var data = "";
        for (var j = 1; j <= numberOfSeatsInRow; j++) {
          data +=
            "<div value='" + j + alfabet[k] + "'>" + j + alfabet[k] + "</div>";
        }

        $("#hall").append("<div class='row'>" + data + "</div>");
        data = "";
      }

      $(".row div").click(changeColor);

      $("#newsBox").slideUp(100);
      $("#ticket").slideDown(200);
      $("#hall").slideDown(500);
      $("#hall").ready(function () {
        $.ajax({
          url: "/getreservation",
          type: "POST",
          data: {
            movieName: $("#movie").val(),
            movieDay: $("#day").val(),
            movieHour: $("#startTime").val(),
          },
        }).done(function (data) {
          for (var i = 0; i < data.length; i++) {
            $('#hall div [value="' + data[i] + '"]').css(
              "background-color",
              "red"
            );
          }
        });
      });

      //get data about seat what is reserved, only for Admin
      if ($("#nameofuser").text() == "admin") {
        $("#hall .row div").mouseenter(function () {
          var valueOfSeat = $(this).attr("value");

          $.ajax({
            url: "/getinformationaboutseat",
            type: "POST",
            data: {
              movieName: $("#movie").val(),
              movieDay: $("#day").val(),
              movieHour: $("#startTime").val(),
              seat: valueOfSeat,
            },
          }).done(function (data) {
            if (data.length > 0) {
              $("#informationSeatBox").css("background-color", "#FFF");
              $("#informationSeatBox").empty();
              $("#informationSeatBox").append(
                "Information about seat: " +
                  "<br><b>Seat:</b> " +
                  data[0].seat +
                  "<br><b>Name:</b> " +
                  data[0].name +
                  "<br><b>E-Mail:</b> " +
                  data[0].email +
                  "<br><b>Phone number:</b> " +
                  data[0].phone
              );
            }
          });
        });
      }
    } else {
      $("#hall").slideUp(500);
    }
  }

  /* Hall */

  function changeColor() {
    var m = $("#movie").val();
    var d = $("#day").val();
    var h = $("#startTime").val();

    if ($(this).css("background-color") === "rgb(255, 0, 0)") {
      alert("This seat is reserved!");
      return;
    }

    if ($(this).css("background-color") === "rgb(255, 255, 0)") {
      alert("This seat is pending");
      return;
    }

    if ($(this).css("background-color") === "rgb(85, 85, 85)") {
      if (numberSeatsToReservation >= clickedSeat) {
        $(this).css("background-color", "green");
        $(this).css("color", "#FFF");
        clickedSeat = ++clickedSeat;
        var thisValue = $(this).attr("value");
        seats.push(thisValue);

        $("#summationList").slideUp(200);
        $("#finishReservation").slideUp(200);
        $("#detail").slideDown(300);
        $("#summation").slideDown(300);
        checkSummation();
      } else {
        alert("The number of reserved seats should not exceed the set value!");
      }
    } else {
      //返回灰色
      $(this).css("background-color", "#555");
      $(this).css("color", "#30D5C8");

      var thisValue = $(this).attr("value");
      seats = seats.filter((seat) => seat != thisValue);

      clickedSeat = --clickedSeat;
      if (clickedSeat == 0) {
        $("#detail").slideUp(300);
        $("#summation").slideUp(300);
      }

      if (clickedSeat < 0) {
        clickedSeat = 0;
      }

      $("#summation").slideDown(200);
      $("#summationList").slideUp(200);
      $("#finishReservation").slideUp(200);
    }
  }

  $("#name, #surname, #email, #phone").keyup(checkSummation);
  $("#name, #surname, #email, #phone").keyup(checkFinishReservation);

  /* 所有情况都满足时 summary按钮变色 */
  function checkSummation() {
    var n = $("#name").val();
    var s = $("#surname").val();
    var e = $("#email").val();
    var p = $("#phone").val();

    var nValidation = $("#name").css("background-color") != "rgb(255, 0, 0)";
    var sValidation = $("#surname").css("background-color") != "rgb(255, 0, 0)";
    var eValidation = $("#email").css("background-color") != "rgb(255, 0, 0)";
    var pValidation = $("#phone").css("background-color") != "rgb(255, 0, 0)";

    if (
      n !== "" &&
      s !== "" &&
      e !== "" &&
      p !== "" &&
      nValidation &&
      sValidation &&
      eValidation &&
      pValidation
    ) {
      $("#summation").css("background-color", "#30d5c8");
      $("#summation").css("color", "#FFF");
      $("#summation").css("border-color", "#FFF");
    } else {
      $("#summation").css("background-color", "#000");
      $("#summation").css("color", "#333");
      $("#summation").css("border-color", "#333");
    }
  }

  $("#summation").click(checkDetail);

  /* Summary reservation */
  function checkDetail() {
    if (clickedSeat == 0) {
      alert("At least one seat should be select!");
      return;
    }

    var nValidation = $("#name").css("background-color") != "rgb(255, 0, 0)";
    var sValidation = $("#surname").css("background-color") != "rgb(255, 0, 0)";
    var eValidation = $("#email").css("background-color") != "rgb(255, 0, 0)";
    var pValidation = $("#phone").css("background-color") != "rgb(255, 0, 0)";

    var name = $("#name").val();
    var surname = $("#surname").val();
    var email = $("#email").val();
    var phone = $("#phone").val();

    if (
      name !== "" &&
      surname !== "" &&
      email !== "" &&
      phone !== "" &&
      nValidation &&
      sValidation &&
      eValidation &&
      pValidation
    ) {
      $("#summation").css("background-color", "#30d5c8");
      $("#summation").css("color", "#FFF");
      $("#summation").css("border-color", "#FFF");
    } else {
      $("#summation").css("background-color", "#000");
      $("#summation").css("color", "#333");
      $("#summation").css("border-color", "#333");
    }

    if (
      name === "" ||
      surname === "" ||
      email === "" ||
      phone === "" ||
      !nValidation ||
      !sValidation ||
      !eValidation ||
      !pValidation
    ) {
      $("#summationList").slideUp(200);
      $("#finishReservation").slideUp(200);
      return;
    }
    $("#summation").slideUp(200);
    $("#summationList").slideDown(200);
    $("#finishReservation").slideDown(200);

    var m = $("#movie").val();
    var d = $("#day").val();
    var h = $("#startTime").val();

    if (clickedSeat == numberSeatsToReservation) {
      $("#summationList").empty();
      $("#summationList").append(
        "Movie: <span style='color: #FFF'>" +
          m +
          ", " +
          d +
          ", " +
          h +
          "</span><br/>User: <span style='color: #FFF'>" +
          name +
          ", " +
          email +
          ", " +
          phone +
          "</span><br/>Number of tickets: <span style='color: #FFF'>" +
          clickedSeat +
          " </span>Cost: <span style='color: #FFF'>" +
          cost +
          "</span>"
      );
    } else {
      alert("the number of selected seats doesn't match the set value! ");
    }
    checkFinishReservation();
  }
  //预约收集完毕 提交后台
  $("#finishReservation").click(clickFinishReservation);

  //Validation FinisheReservation
  function checkFinishReservation() {
    var nValidation = $("#name").css("background-color") != "rgb(255, 0, 0)";
    var sValidation = $("#surname").css("background-color") != "rgb(255, 0, 0)";
    var eValidation = $("#email").css("background-color") != "rgb(255, 0, 0)";
    var pValidation = $("#phone").css("background-color") != "rgb(255, 0, 0)";

    var name = $("#name").val();
    var surname = $("#surname").val();
    var email = $("#email").val();
    var phone = $("#phone").val();

    if (
      name !== "" &&
      surname !== "" &&
      email !== "" &&
      phone !== "" &&
      nValidation &&
      sValidation &&
      eValidation &&
      pValidation
    ) {
      $("#finishReservation").css("background-color", "#30d5c8");
      $("#finishReservation").css("color", "#FFF");
      $("#finishReservation").css("border-color", "#FFF");
      return true;
    } else {
      $("#finishReservation").css("background-color", "#000");
      $("#finishReservation").css("color", "#333");
      $("#finishReservation").css("border-color", "#333");
      return false;
    }
  }

  function clickFinishReservation() {
    if (!checkFinishReservation()) {
      return;
    }

    var m = $("#movie").val();
    var d = $("#day").val();
    var h = $("#startTime").val();
    var name = $("#name").val();

    var email = $("#email").val();
    var phone = $("#phone").val();

    $.ajax({
      url: "/makeReservation",
      type: "POST",
      data: {
        movieName: m,
        movieDay: d,
        movieStartTime: h,
        seats: seats,
        name: name,
        email: email,
        phone: phone,
      },
      success: function (data) {
        checkBaseData();
        clearClickedSeat();
      },
    });

    $("#selection").slideUp(500);
    $("#hall").slideUp(500);
    $("#detail").slideUp(500);
    $("#summation").slideUp(500);
    $("#summationList").slideUp(500);
    setTimeout(function () {
      $("main").empty();
      $("main").append("Booking was added!");
    }, 500);
  }
});
