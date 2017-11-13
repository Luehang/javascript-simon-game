$(document).ready(function() {
  var mainCount = 0;
  var mainPatternArr = [];
  var playerCount = 0;
  var playerPatternArr = [];
  var disable = true;
  var strictMode = false;
  var power = false;
  const light = [
    {
      "type": "green",
      "id": "greenLight"
    },
    {
      "type": "red",
      "id": "redLight"
    },
    {
      "type": "yellow",
      "id": "yellowLight"
    },
    {
      "type": "blue",
      "id": "blueLight"
    }
  ]
  const flicker = (location, total) => {
    var numberOfTimes = 0;
    var flickering = setInterval (function() {
      if (numberOfTimes <= total) {
        $(location).animate({
          opacity: 0,
        }, 50);
        $(location).animate({
          opacity: 1,
        }, 50);
        numberOfTimes += 1;
      } else if (numberOfTimes > total) {
        clearInterval(flickering);
      }
    },
    300);
  }
  var changingColors;
  const changingColor = () => {
    changingColors = setInterval (function() {
      var color = setTimeout(function() {
        var randomNum = Math.floor(Math.random() * 999999);
        $('#strictButton').attr('style', 'background-color: #' + randomNum.toString());
      }, 550)
      $('#strictButton').removeAttr('style');
    },700);
  }
  const lighting = (lightNum) => {
    $('.light' + lightNum.toString()).attr('id', light[lightNum].id);
    $('#audio' + lightNum.toString()).trigger('play');
    disable = true;
    var lighting = setTimeout(function() {
      $('.light' + lightNum.toString()).removeAttr('id');
    },
    800)
    disable = false;
  }
  const playPattern = () => {
    disable = true;
    var num = 0;
    var playPattern = setInterval(function() {
      lighting(mainPatternArr[num]);
      num += 1;
      if (num === mainPatternArr.length) {
        disable = false;
        clearInterval(playPattern);
      }
    },1200)
  }
  const comTurn = () => {
    mainCount += 1;
    var randomNum = Math.floor(Math.random() * 3);
    mainPatternArr.push(randomNum);
    playPattern();
    var countTotal = mainPatternArr.length;
    if (countTotal.toString().match(/[0-9]/g).length === 1) {
      $('#countNumber').html("0" + countTotal.toString());
      flicker('#countNumber', 4);
    } else if (countTotal.toString().match(/[0-9]/g).length === 2) {
      $('#countNumber').html(countTotal);
      flicker('#countNumber', 4);
    }
  }
  const reset = () => {
    if (power) {
      mainCount = 0;
      mainPatternArr = [];
      playerCount = 0;
      playerPatternArr = [];
      disable = true;
      clearInterval(playPattern);
      $('#countNumber').html("00");
      comTurn();
    }
  }
  const strictGame = () => {
    if (strictMode === false && power) {
      strictMode = true;
      changingColor();
    } else if (strictMode === true && power) {
      strictMode = false;
      clearInterval(changingColors);
      $('#strictButton').attr('style', 'background-color:#FFEF06');
    }
  }
  const comparison = () => {
    for (var z = 0; z < playerPatternArr.length; z++) {
      if (playerPatternArr[z] !== mainPatternArr[z] && strictMode === false) {
        playerCount = 0;
        playerPatternArr = [];
        playPattern();
      } else if (playerPatternArr[z] !== mainPatternArr[z] && strictMode === true) {
        reset();
      }
    }
  }
  const playerTurn = (number) => {
    if(playerCount <= mainCount && disable === false) {
      lighting(number);
      playerPatternArr.push(number);
      playerCount += 1;
      comparison();
    }
    if(playerCount === mainCount && disable === false) {
      disable = true;
      playerCount = 0;
      playerPatternArr = [];
      comTurn();
    }
  }
  $('#powerSwitch').click(function() {
    if (power === false) {
      power = true;
      $('#countNumber').html("00");
      flicker('#countNumber', 5);
      $('#powerButton').animate({
        marginLeft: '24px'
      }, 200)
    } else if (power === true) {
      power = false;
      reset();
      strictMode = false;
      clearInterval(changingColors);
      $('#countNumber').html("");
      $('#powerButton').animate({
        marginLeft: '0px'
      }, 200)
    }
  });
  $('#strictButton').click(function() {
    strictGame();
  });
  $('#startButton').click(function() {
    reset();
  });
  $('#resetButton').click(function() {
    reset();
  });
  $('.light0').click(function() {
    playerTurn(0);
  });
  $('.light1').click(function() {
    playerTurn(1);
  });
  $('.light2').click(function() {
    playerTurn(2);
  });
  $('.light3').click(function() {
    playerTurn(3);
  });
});
