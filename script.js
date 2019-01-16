$(document).ready(function() {
  determineLevel();
});

function determineLevel() {
  //hide the board
  document.getElementById("wrapper_one").style.display = "none";
  //show the clickable text
  setTimeout(function() {
    document.getElementById("level_overlay").style.display = "block";
  }, 0);

  setUpLevelClicks();
}

function setUpLevelClicks() {
  $("#text_one").click(function(event) {
    //animate the number to be huge

    makeNumberHuge(1);
    setLevel(1);
  });

  $("#text_two").click(function(event) {
    makeNumberHuge(2);
    setLevel(2);
  });
}

function makeNumberHuge(value) {
  if (value == 1) {
    $("#overlay_text").addClass("disappear_overlay_text");
    $("#text_two").addClass("disappear_text_two");
    $("#text_one").addClass("animated_text_one");
    setTimeout(function() {
      removeLevelClasses();
    }, 1200);
  } else {
    $("#overlay_text").addClass("disappear_overlay_text");
    $("#text_one").addClass("disappear_text_one");
    $("#text_two").addClass("animated_text_two");
    setTimeout(function() {
      removeLevelClasses();
    }, 1200);
  }
}

function setLevel(value) {
  level = value;
  document.getElementById("levelindicator").innerHTML = " L" + value;

  setTimeout(function() {
    document.getElementById("level_overlay").style.display = "none";
  }, 800);
  setTimeout(function() {
    document.getElementById("wrapper_one").style.display = "grid";
  }, 800);
}

function removeLevelClasses() {
  if (level == 1) {
    $("#overlay_text").removeClass("disappear_overlay_text");
    $("#text_two").removeClass("disappear_text_two");
    $("#text_one").removeClass("animated_text_one");
  } else {
    $("#overlay_text").removeClass("disappear_overlay_text");
    $("#text_one").removeClass("disappear_text_one");
    $("#text_two").removeClass("animated_text_two");
  }
}

function unSetUpLevelClicks() {
  $("#text_one").removeClass("animated_text_one");
  $("#text_two").removeClass("animated_text_two");
}

//grabbing the div elements
var div_0 = document.getElementById("div_0");
var div_1 = document.getElementById("div_1");
var div_2 = document.getElementById("div_2");
var div_3 = document.getElementById("div_3");
var div_4 = document.getElementById("div_4");
var div_5 = document.getElementById("div_5");
var div_6 = document.getElementById("div_6");
var div_7 = document.getElementById("div_7");
var div_8 = document.getElementById("div_8");

//function to help set up event listeners for board clicks
function diver() {
  playerClick(this.getAttribute("id"), Player);
}

function playerClick(squareid, identity) {
  updateTheBoard(squareid, identity);
  //turn off all click events
  unSetUpClicks();
}

//setting up event listeners for board clicks
function setUpClicks() {
  div_0.addEventListener("click", diver);
  div_1.addEventListener("click", diver);
  div_2.addEventListener("click", diver);
  div_3.addEventListener("click", diver);
  div_4.addEventListener("click", diver);
  div_5.addEventListener("click", diver);
  div_6.addEventListener("click", diver);
  div_7.addEventListener("click", diver);
  div_8.addEventListener("click", diver);
}

//function for removing event listeners
function unSetUpClicks() {
  div_0.removeEventListener("click", diver);
  div_1.removeEventListener("click", diver);
  div_2.removeEventListener("click", diver);
  div_3.removeEventListener("click", diver);
  div_4.removeEventListener("click", diver);
  div_5.removeEventListener("click", diver);
  div_6.removeEventListener("click", diver);
  div_7.removeEventListener("click", diver);
  div_8.removeEventListener("click", diver);
}

function activateRemainingCellClickEvents() {
  for (i = 0; i <= theboard.length - 1; i++) {
    var x = typeof theboard[i];
    if (x == "number") {
      var divhandle = "div_" + theboard[i];
      var crack = document.getElementById(divhandle);
      crack.addEventListener("click", diver);
    }
  }
}

//global variables. I had these encapsulated in an object, but that became cumbersome.
var theboard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var winning_rows = [
  [theboard[0], theboard[1], theboard[2]],
  [theboard[3], theboard[4], theboard[5]],
  [theboard[6], theboard[7], theboard[8]],
  [theboard[0], theboard[4], theboard[8]],
  [theboard[2], theboard[4], theboard[6]],
  [theboard[0], theboard[3], theboard[6]],
  [theboard[1], theboard[4], theboard[7]],
  [theboard[2], theboard[5], theboard[8]]
];
var level = 0;
var Player = "";
var Computer = "";
var player_score = 0;
var computer_score = 0;
var whosTurn = "";
var id_x_original_state = "";
var id_o_original_state = "";
var original_state = "";
var drawArray = [];
var winningrow = [];
var emptyboardarray = [];
var gameover = false;

prepareXorOchoice();

//function for player's choice of X or O token
function prepareXorOchoice() {
  $("#O").click(function(event) {
    event.stopPropagation();

    toggleOn();
    choice("O");
  });
  $("#X").click(function(event) {
    event.stopPropagation();

    toggleOn();
    choice("X");
  });
}

function choice(letter) {
  if (letter == "X") {
    setUpClicks();
    Player = "X";
    Computer = "O";
    whosTurn = "player";
    youGoFirst();
  } else if (letter == "O") {
    setUpClicks();
    Player = "O";
    Computer = "X";
    whosTurn = "computer";
    var firstmove = minimax(theboard, Computer);
    var id = "div_" + firstmove.index;
    updateTheBoard(id, Computer);
  }
}

function toggleOn() {
  var t = document.getElementById("div_4").innerHTML;
  original_state = t;

  var l = document.getElementById("X").innerHTML;
  id_x_original_state = l;

  var m = document.getElementById("O").innerHTML;
  id_o_original_state = m;

  document.getElementById("div_4").innerHTML = "";
  $("#div_4").addClass("div82");
}

//a large event-handling function that plots the course of each game depending on outcome
function updateTheBoard(squareid, identity) {
  var squareID = squareid.toString();
  var patt = new RegExp(/[^div_]/g);
  var sendToTheBoard = patt.exec(squareID);

  var token = sendToTheBoard[0];
  var eventtoremove = sendToTheBoard[2];
  putTokenOnBoard(identity, squareID);
  theboard.splice(token, 1, identity);
  winning_rows = [
    [theboard[0], theboard[1], theboard[2]],
    [theboard[3], theboard[4], theboard[5]],
    [theboard[6], theboard[7], theboard[8]],
    [theboard[0], theboard[4], theboard[8]],
    [theboard[2], theboard[4], theboard[6]],
    [theboard[0], theboard[3], theboard[6]],
    [theboard[1], theboard[4], theboard[7]],
    [theboard[2], theboard[5], theboard[8]]
  ];

  var anybodyhaswon = winning(theboard, identity);
  var draw = isItaDraw();

  //case: there is a winner
  if (anybodyhaswon == true && gameover == false) {
    if (identity == Computer) {
      computer_score++;
      var whoWon = "Computer";
      var thedivs = findThreeinaRow(identity);
      flashWinningCells(thedivs, whoWon);
      changeWhosTurn();
    } else if (identity == Player) {
      player_score++;
      whoWon = "Player";
      var thedivs = findThreeinaRow(identity);
      flashWinningCells(thedivs, whoWon);
      changeWhosTurn();
    }
    //case: there is a draw
  } else if (anybodyhaswon != true && draw == true && gameover == false) {
    overlayOn("overlay", "div_blot", "It's a Draw!", 1000);
    overlayOff("overlay", 3000);
    draw = false;
    autoReset();

    //case: no winner, no draw
  } else if (anybodyhaswon == false && gameover == false && draw == false) {
    changeWhosTurn();

    if (whosTurn == "player") {
      //turn on only click events for cells that are still available
      activateRemainingCellClickEvents();

      //if in level 2, choose minimax for selection of computer move
    } else if (whosTurn == "computer" && level == 2) {
      unSetUpClicks();
      var best = minimax(theboard, Computer);

      var id = "div_" + best.index;
      setTimeout(function() {
        updateTheBoard(id, Computer);
      }, 600);

      //if in level 1, choose heuristic logic to select computer move
    } else if (whosTurn == "computer" && level == 1) {
      unSetUpClicks();
      //check if board is empty, if yes choose random from corners and middle
      var isItEmpty = isBoardEmpty();
      if (isItEmpty == true && gameover == false) {
        //call function to choose random spot, returns a div
        var firstmove = firstMove();
        setTimeout(function() {
          updateTheBoard(firstmove, Computer);
        }, 600);
      } else if (isItEmpty == false && gameover == false) {
        //if the board is not empty, check for a win and play if there is.
        var winningmove = canIWin();

        if (winningmove != false && gameover == false) {
          setTimeout(function() {
            updateTheBoard(winningmove, Computer);
          }, 600);
        } else if (
          winningmove == false &&
          gameover == false &&
          isItEmpty == false
        ) {
          var blockmove = shouldIBlock();
          if (blockmove != false && gameover == false) {
            //otherwise update the board with the blockmove
            setTimeout(function() {
              updateTheBoard(blockmove, Computer);
            }, 600);
          } else if (blockmove == false && gameover == false) {
            //if there is no block, choose a random move from corners and middle, if available
            var strategicmove = strategicMove();

            setTimeout(function() {
              updateTheBoard(strategicmove, Computer);
            }, 600);
          }
        }
      }
    }
  }
}

function isBoardEmpty() {
  for (i = 0; i <= theboard.length - 1; i++) {
    var c = typeof theboard[i];

    if (c == "number") {
      emptyboardarray.push(c);
    }
  }

  if (emptyboardarray.length == 9) {
    return true;
  } else {
    emptyboardarray = [];
    return false;
  }
}

function firstMove() {
  var aGoodFirstMove = ["div_0", "div_2", "div_4", "div_6", "div_8"];
  var num = Math.floor(Math.random() * 5 + 0);
  return aGoodFirstMove[num];
}

//helps computer decide if it has a current winning move
function canIWin() {
  var winner;
  var board0 = winning_rows[0].filter(matchingCells);
  var board1 = winning_rows[1].filter(matchingCells);
  var board2 = winning_rows[2].filter(matchingCells);
  var board3 = winning_rows[3].filter(matchingCells);
  var board4 = winning_rows[4].filter(matchingCells);
  var board5 = winning_rows[5].filter(matchingCells);
  var board6 = winning_rows[6].filter(matchingCells);
  var board7 = winning_rows[7].filter(matchingCells);

  if (
    board0.length == 2 &&
    board0.every(hasAllSameToken) == true &&
    areAllStrings(0) == false
  ) {
    winner = pickAWinningCell(0, 1, 2, 0);
    return "div_" + winner;
  } else if (
    board1.length == 2 &&
    board1.every(hasAllSameToken) == true &&
    areAllStrings(1) == false
  ) {
    winner = pickAWinningCell(3, 4, 5, 1);
    return "div_" + winner;
  } else if (
    board2.length == 2 &&
    board2.every(hasAllSameToken) == true &&
    areAllStrings(2) == false
  ) {
    winner = pickAWinningCell(6, 7, 8, 2);
    return "div_" + winner;
  } else if (
    board3.length == 2 &&
    board3.every(hasAllSameToken) == true &&
    areAllStrings(3) == false
  ) {
    winner = pickAWinningCell(0, 4, 8, 3);
    return "div_" + winner;
  } else if (
    board4.length == 2 &&
    board4.every(hasAllSameToken) == true &&
    areAllStrings(4) == false
  ) {
    winner = pickAWinningCell(2, 4, 6, 4);
    return "div_" + winner;
  } else if (
    board5.length == 2 &&
    board5.every(hasAllSameToken) == true &&
    areAllStrings(5) == false
  ) {
    winner = pickAWinningCell(0, 3, 6, 5);
    return "div_" + winner;
  } else if (
    board6.length == 2 &&
    board6.every(hasAllSameToken) == true &&
    areAllStrings(6) == false
  ) {
    winner = pickAWinningCell(1, 4, 7, 6);
    return "div_" + winner;
  } else if (
    board7.length == 2 &&
    board7.every(hasAllSameToken) == true &&
    areAllStrings(7) == false
  ) {
    winner = pickAWinningCell(2, 5, 8, 7);
    return "div_" + winner;
  } else {
    return false;
  }
}

function pickAWinningCell(firstDiv, secondDiv, thirdDiv, arrNum) {
  var firstdiver = winning_rows[arrNum][0];

  var firstdivertype = typeof firstdiver;

  var seconddiver = winning_rows[arrNum][1];
  var seconddivertype = typeof seconddiver;

  var thirddiver = winning_rows[arrNum][2];
  var thirddivertype = typeof thirddiver;

  if (firstdivertype == "number") {
    return firstDiv;
  } else if (seconddivertype == "number") {
    return secondDiv;
  } else if (thirddivertype == "number") {
    return thirdDiv;
  }
}

function areAllStrings(arrNum) {
  var firstdiver = winning_rows[arrNum][0];

  var firstdivertype = typeof firstdiver;

  var seconddiver = winning_rows[arrNum][1];
  var seconddivertype = typeof seconddiver;

  var thirddiver = winning_rows[arrNum][2];
  var thirddivertype = typeof thirddiver;

  if (
    firstdivertype == "string" &&
    seconddivertype == "string" &&
    thirddivertype == "string"
  ) {
    return true;
  } else {
    return false;
  }
}

function hasAllSameToken(currentvalue) {
  return currentvalue == Computer;
}

function hasNotAllSameToken(currentvalue) {
  return currentvalue != Computer;
}

function matchingCellsBlock(value) {
  return value == Player;
}
function matchingCells(value) {
  return value == Computer;
}

//helps the computer decide if it has to block a possible player win
function shouldIBlock() {
  var blocker;

  var board0 = winning_rows[0].filter(matchingCellsBlock);
  var board1 = winning_rows[1].filter(matchingCellsBlock);
  var board2 = winning_rows[2].filter(matchingCellsBlock);
  var board3 = winning_rows[3].filter(matchingCellsBlock);
  var board4 = winning_rows[4].filter(matchingCellsBlock);
  var board5 = winning_rows[5].filter(matchingCellsBlock);
  var board6 = winning_rows[6].filter(matchingCellsBlock);
  var board7 = winning_rows[7].filter(matchingCellsBlock);

  if (
    board0.length == 2 &&
    board0.every(hasNotAllSameToken) == true &&
    areAllStrings(0) == false
  ) {
    blocker = pickAWinningCell(0, 1, 2, 0);
    return "div_" + blocker;
  } else if (
    board1.length == 2 &&
    board1.every(hasNotAllSameToken) == true &&
    areAllStrings(1) == false
  ) {
    blocker = pickAWinningCell(3, 4, 5, 1);
    return "div_" + blocker;
  } else if (
    board2.length == 2 &&
    board2.every(hasNotAllSameToken) == true &&
    areAllStrings(2) == false
  ) {
    blocker = pickAWinningCell(6, 7, 8, 2);
    return "div_" + blocker;
  } else if (
    board3.length == 2 &&
    board3.every(hasNotAllSameToken) == true &&
    areAllStrings(3) == false
  ) {
    blocker = pickAWinningCell(0, 4, 8, 3);
    return "div_" + blocker;
  } else if (
    board4.length == 2 &&
    board4.every(hasNotAllSameToken) == true &&
    areAllStrings(4) == false
  ) {
    blocker = pickAWinningCell(2, 4, 6, 4);
    return "div_" + blocker;
  } else if (
    board5.length == 2 &&
    board5.every(hasNotAllSameToken) == true &&
    areAllStrings(5) == false
  ) {
    blocker = pickAWinningCell(0, 3, 6, 5);
    return "div_" + blocker;
  } else if (
    board6.length == 2 &&
    board6.every(hasNotAllSameToken) == true &&
    areAllStrings(6) == false
  ) {
    blocker = pickAWinningCell(1, 4, 7, 6);
    return "div_" + blocker;
  } else if (
    board7.length == 2 &&
    board7.every(hasNotAllSameToken) == true &&
    areAllStrings(7) == false
  ) {
    blocker = pickAWinningCell(2, 5, 8, 7);
    return "div_" + blocker;
  } else {
    return false;
  }
}

//if it can't win or block, this function helps the computer choose a suitable move from remaining positions
function strategicMove() {
  var remainingcells = [];
  var alternatecells = [];
  for (j = 0; j <= theboard.length - 1; j++) {
    var currentelement = theboard[j];
    var currentelementtype = typeof currentelement;

    var exactdiv = "div_" + [j];

    if (currentelementtype == "number") {
      remainingcells.push(exactdiv);
    }
  }

  //choose the center cell if available
  var middlecell = theboard[4];
  var middlecelltype = typeof middlecell;

  if (middlecelltype == "number") {
    return "div_4";
  } else {
    //otherwise make an array of corner cells so computer can randomly pick one
    var remainingGoodPlays = [];
    for (i = 0; i <= remainingcells.length - 1; i++) {
      var whatIsIt = remainingcells[i];

      if (whatIsIt == "div_0") {
        remainingGoodPlays.push("div_0");
      } else if (whatIsIt == "div_2") {
        remainingGoodPlays.push("div_2");
      } else if (whatIsIt == "div_6") {
        remainingGoodPlays.push("div_6");
      } else if (whatIsIt == "div_8") {
        remainingGoodPlays.push("div_8");
      } else {
        alternatecells.push(whatIsIt);
      }
    }
  }
  var heur = heuristicMove(remainingGoodPlays, alternatecells);

  return heur;
}

//this function chooses a random move from the possible empty corner cells only
function heuristicMove(array, alternatecells) {
  if (array.length > 1) {
    var moveChoices = array;
    var num = Math.floor(Math.random() * array.length + 0);
    return moveChoices[num];
  } else if (array.length == 1) {
    return array[0];
  } else {
    if (alternatecells.length > 1) {
      var otherChoice = alternatecells;
      var num = Math.floor(Math.random() * alternatecells.length + 0);
      return otherChoice[num];
    } else {
      return alternatecells[0];
    }
  }
}

function isItaDraw() {
  for (i = 0; i <= theboard.length - 1; i++) {
    var c = typeof theboard[i];

    if (c == "string") {
      drawArray.push(c);
    }
  }

  if (drawArray.length == 9) {
    return true;
  } else {
    drawArray = [];
    return false;
  }
}

function findThreeinaRow(identity) {
  if (
    theboard[0] == identity &&
    theboard[1] == identity &&
    theboard[2] == identity
  ) {
    winningrow = [0, 1, 2];
  } else if (
    theboard[3] == identity &&
    theboard[4] == identity &&
    theboard[5] == identity
  ) {
    winningrow = [3, 4, 5];
  } else if (
    theboard[6] == identity &&
    theboard[7] == identity &&
    theboard[8] == identity
  ) {
    winningrow = [6, 7, 8];
  } else if (
    theboard[0] == identity &&
    theboard[4] == identity &&
    theboard[8] == identity
  ) {
    winningrow = [0, 4, 8];
  } else if (
    theboard[2] == identity &&
    theboard[4] == identity &&
    theboard[6] == identity
  ) {
    winningrow = [2, 4, 6];
  } else if (
    theboard[0] == identity &&
    theboard[3] == identity &&
    theboard[6] == identity
  ) {
    winningrow = [0, 3, 6];
  } else if (
    theboard[1] == identity &&
    theboard[4] == identity &&
    theboard[7] == identity
  ) {
    winningrow = [1, 4, 7];
  } else if (
    theboard[2] == identity &&
    theboard[5] == identity &&
    theboard[8] == identity
  ) {
    winningrow = [2, 5, 8];
  }
  return winningrow;
}

function putTokenOnBoard(identity, squareID) {
  document.getElementById(squareID).innerHTML = identity;
}

function changeWhosTurn() {
  if (whosTurn == "player") {
    whosTurn = "computer";
  } else {
    whosTurn = "player";
  }
}

//footer link
var footer = document.getElementById("footer_link");
footer.onclick = function() {
  window.open("https://codepen.io/beowulfskin/full/jmEyjv/");
};
//adjust the scoreboard
function scoreboard() {
  document.getElementById("scoreboard").innerHTML =
    "Player: " + player_score + " " + "Comp: " + computer_score;
}

//function to reset the game landing page
function refreshPage() {
  history.go(0);
}

//set up the reset game button
var reset_game = document.getElementById("reset_text");
reset_game.onclick = function() {
  refreshPage();
};

function resetGame() {
  theboard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  winning_rows = [
    [theboard[0], theboard[1], theboard[2]],
    [theboard[3], theboard[4], theboard[5]],
    [theboard[6], theboard[7], theboard[8]],
    [theboard[0], theboard[4], theboard[8]],
    [theboard[2], theboard[4], theboard[6]],
    [theboard[0], theboard[3], theboard[6]],
    [theboard[1], theboard[4], theboard[7]],
    [theboard[2], theboard[5], theboard[8]]
  ];
  level = 0;
  Player = "O";
  Computer = "X";
  player_score = 0;
  computer_score = 0;
  drawArray = [];
}
//to reset the game automatically after completion
function autoReset() {
  setTimeout(function() {
    resetting();
  }, 3000);
}

function resetting() {
  for (i = 0; i <= 8; i++) {
    document.getElementById("div_" + i).innerHTML = "";
    var divHandle = "div_" + i;
  }

  $("#div_4").removeClass("div82");
  document.getElementById("div_4").innerHTML = original_state;
  theboard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  winning_rows = [
    [theboard[0], theboard[1], theboard[2]],
    [theboard[3], theboard[4], theboard[5]],
    [theboard[6], theboard[7], theboard[8]],
    [theboard[0], theboard[4], theboard[8]],
    [theboard[2], theboard[4], theboard[6]],
    [theboard[0], theboard[3], theboard[6]],
    [theboard[1], theboard[4], theboard[7]],
    [theboard[2], theboard[5], theboard[8]]
  ];
  Player = "O";
  Computer = "X";
  drawArray = [];
  gameover = false;
  whosTurn = "";

  prepareXorOchoice();
  unSetUpClicks();
}

// animate the winning cells

function flashWinningCells(winningcells, whoWon) {
  winner = whoWon;
  gameover = true;
  unSetUpClicks();

  overlayOn("overlay", "div_blot", winner + " Wins!", 1000);

  $("#div_" + winningcells[0]).addClass("animated" + winningcells[0]);
  $("#div_" + winningcells[1]).addClass("animated" + winningcells[1]);
  $("#div_" + winningcells[2]).addClass("animated" + winningcells[2]);

  setTimeout(function() {
    $("#div_" + winningcells[0]).removeClass("animated" + winningcells[0]);
    $("#div_" + winningcells[1]).removeClass("animated" + winningcells[1]);
    $("#div_" + winningcells[2]).removeClass("animated" + winningcells[2]);
  }, 3000);
  overlayOff("overlay", 3000);
  autoReset();
  scoreboard();
}

//cue for player move
function youGoFirst() {
  var encouragements = [
    "X Goes First!",
    "Your Turn",
    "Your Move",
    "You're Up!",
    "Place An X!"
  ];
  var num = Math.floor(Math.random() * 5 + 0);
  var randommessage = encouragements[num];
  overlayOn2("overlay", "div_blot", randommessage, 100);
  overlayOff("overlay", 1000);
}

function overlayOn2(element, otherElement, message, delay) {
  var redo = document.getElementById(otherElement);
  console.log("redo", redo);
  redo.innerHTML = message;
  var delayplusone = delay + 1000;
  console.log();
  setTimeout(function() {
    redo.style.zIndex = 20;
  }, delay);
  setTimeout(function() {
    redo.style.zIndex = 18;
  }, delayplusone);
}

function overlayOn(element, otherElement, message, delay) {
  setTimeout(function() {
    document.getElementById(element).style.display = "block";
  }, delay);
  var redo = document.getElementById(otherElement);
  console.log("redo", redo);
  redo.innerHTML = message;
  var delayplusone = delay + 2000;
  setTimeout(function() {
    redo.style.zIndex = 20;
  }, delay);
  setTimeout(function() {
    redo.style.zIndex = 18;
  }, delayplusone);
}

function overlayOff(element, delay) {
  var divblot = document.getElementById("div_blot");

  setTimeout(function() {
    document.getElementById(element).style.display = "none";
  }, delay);
  setTimeout(function() {
    divblot.style.zIndex = 18;
  }, delay);
}

function emptyIndexies(board) {
  return board.filter(s => s != "O" && s != "X");
}

// winning combinations using the board indexies

function winning(board, player) {
  if (
    (board[0] == player && board[1] == player && board[2] == player) ||
    (board[3] == player && board[4] == player && board[5] == player) ||
    (board[6] == player && board[7] == player && board[8] == player) ||
    (board[0] == player && board[3] == player && board[6] == player) ||
    (board[1] == player && board[4] == player && board[7] == player) ||
    (board[2] == player && board[5] == player && board[8] == player) ||
    (board[0] == player && board[4] == player && board[8] == player) ||
    (board[2] == player && board[4] == player && board[6] == player)
  ) {
    return true;
  } else {
    return false;
  }
}

/* the main minimax function. Many, many thanks to Ahmad Abdolsaheb for his awesome FCC article on recursion 
 and the minimax algorithm. Without it, I may never have gotten my head around this topic.*/
function minimax(newBoard, player) {
  //available spots
  var availSpots = emptyIndexies(newBoard);

  // checks for the terminal states such as win, lose, and tie and returning a value accordingly
  if (winning(newBoard, Player)) {
    return { score: -10 };
  } else if (winning(newBoard, Computer)) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }

  // an array to collect all the objects
  var moves = [];

  // loop through available spots
  for (var i = 0; i < availSpots.length; i++) {
    //create an object for each and store the index of that spot that was stored as a number in the object's index key
    var move = {};
    move.index = newBoard[availSpots[i]];

    // set the empty spot to the current player
    newBoard[availSpots[i]] = player;

    //if collect the score resulted from calling minimax on the opponent of the current player
    if (player == Computer) {
      var result = minimax(newBoard, Player);
      move.score = result.score;
    } else {
      var result = minimax(newBoard, Computer);
      move.score = result.score;
    }

    //reset the spot to empty
    newBoard[availSpots[i]] = move.index;

    // push the object to the array
    moves.push(move);
  }

  // if it is the computer's turn loop over the moves and choose the move with the highest score
  var bestMove;
  if (player === Computer) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    // else loop over the moves and choose the move with the lowest score
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  // return the chosen move (object) from the array to the higher depth
  return moves[bestMove];
}
