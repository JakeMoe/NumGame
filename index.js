/*
 * This file is part of NumGame	.
 *
 * NumGame is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * NumGame is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Foobar.  If not, see <https://www.gnu.org/licenses/>.
 */
 
var circleColour = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
var circleRadius = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
var circleX = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
var circleY = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
var gameCanvas;
var gameContext;
var numberToGuess;
var statusBar;
var totalGuesses;
var correctGuesses;
var wrongGuesses;

function init() {
//   alert("in init");
  gameCanvas = document.getElementById('gameCanvas');
  statusBar = document.getElementById('statusBar');
  gameContext = gameCanvas.getContext('2d');
  gameContext.strokeRect(0, 0, 500, 500);
  totalGuesses = 0;
  correctGuesses = 0;
  wrongGuesses = 0;
  getRandomNumbers();
  drawCircles();
  updateScore();
}

function circlesOverlap(x) {
  if (x > 1) {
    for (var y = 1 ; y < x ; y++) {
      if (Math.pow(circleX[x] - circleX[y], 2) + Math.pow(circleY[x] - circleY[y], 2) < Math.pow(circleRadius[x] + circleRadius[y], 2)) {
        return true;
      }
    }
  }
  return false;
}

function clickHandler(btn) {
  if (btn == numberToGuess) {
    getRandomNumbers();
    drawCircles();
    correctGuesses++;
  } else {
    wrongGuesses++;
  }
  totalGuesses++;
  updateScore();
}

function drawCircles() {
//  alert("in drawCircles");
  gameContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  gameContext.lineWidth = 1;
  for (var x = 1; x <= numberToGuess; x++) {
    if (circleColour[x] == 0) {
      gameContext.fillStyle = "#FFFFFF";
      gameContext.strokeStyle = "#000000";
    } else if (circleColour[x] == 1) {
      gameContext.fillStyle = "#000000";
      gameContext.strokeStyle = "#FFFFFF";
    } else if (circleColour[x] == 2) {
      gameContext.fillStyle = "#FF0000";
      gameContext.strokeStyle = "#00FFFF";
    } else if (circleColour[x] == 3) {
      gameContext.fillStyle = "#00FF00";
      gameContext.strokeStyle = "#FF00FF";
    } else if (circleColour[x] == 4) {
      gameContext.fillStyle = "#0000FF";
      gameContext.strokeStyle = "#FFFF00";
    } else if (circleColour[x] == 5) {
      gameContext.fillStyle = "#00FFFF";
      gameContext.strokeStyle = "#FF0000";
    } else if (circleColour[x] == 6) {
      gameContext.fillStyle = "#FF00FF";
      gameContext.strokeStyle = "#00FF00";
    } else if (circleColour[x] == 7) {
      gameContext.fillStyle = "#FFFF00";
      gameContext.strokeStyle = "#0000FF";
    }
    gameContext.beginPath();
    gameContext.arc(circleX[x], circleY[x], circleRadius[x], 0, Math.PI * 2, false);
    gameContext.fill();
    gameContext.stroke();
  }
}

function getRandomNumbers() {
//   alert("in getRandomNumber");
  numberToGuess = Math.floor(Math.random() * 10);
  if (numberToGuess != 0) {
    for (var x = 1 ; x <= numberToGuess; x++) {
      do {
        circleColour[x] = Math.floor(Math.random() * 8);
        circleRadius[x] = Math.floor(Math.random() * 15) + 10;
        circleX[x] = Math.floor(Math.random() * (500 - (circleRadius[x]) * 2)) + circleRadius[x];
        circleY[x] = Math.floor(Math.random() * (500 - (circleRadius[x]) * 2)) + circleRadius[x];
      } while (circlesOverlap(x))
    }
  }
}

function updateScore() {
    if (totalGuesses == 0) {
      score = 0;
    } else {
      score = (Math.floor(correctGuesses / totalGuesses * 10000)) / 100
    }
    statusBar.innerHTML = "Correct Guesses: " + correctGuesses + "<br />" +
                          "Wrong Guesses: " + wrongGuesses + "<br />" +
                          "Total Guesses: " + totalGuesses + "<br />" +
                          "Score: " + score + "%";
}
