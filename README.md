# Puzzle-Game | Update to Previous Code

- Demo: https://sebastianszz.github.io

## Table of Contents

- [Introduction](#introduction)
- [HTML Code](#html-code)
- [CSS Code](#css-code)
- [JavaScript Code](#javascript-code)
  - [createPuzzlePieces()](#createpuzzlepieces)
  - [dragStart() - dragOver() - dragDrop()](#dragstart-dragover-dragdrop)
  - [dragEnd()](#dragend)
  - [playSound()](#playsound)
- [Functionality](#functionality)

## Introduction

This code is an HTML and JavaScript code that implements a puzzle game. The HTML code defines the structure of the puzzle game and imports the necessary CSS and JavaScript files. The JavaScript code provides the functionality to the game.

## HTML Code

The HTML code defines the structure of the puzzle game. It includes the necessary CSS and JavaScript files and sets up the layout for the puzzle board and pieces.

## CSS Code

The CSS code defines the styles for the puzzle game, including the background color, the borders, the fonts, and the layout of the puzzle board and pieces.

## JavaScript Code

The JavaScript code defines various constants, variables, and functions that are used to create the puzzle pieces, handle the drag and drop events, and count the number of turns taken to complete the puzzle.

### createPuzzlePieces()

- The **createPuzzlePieces()** function is used to create the puzzle pieces. It takes two arguments: the container where the images of the puzzle pieces will be added and the source of the images. It uses a **for** loop to create the images of the puzzle pieces, set the source of each image, and add event listeners for drag and drop events.

### dragStart(), dragOver(), dragDrop()

- The other functions are event handlers for the drag and drop events. When a user starts dragging a puzzle piece, the **dragStart()** function is called. When a user drags the piece over the target area, the **dragOver()** function is called. When a user drops the piece on the target area, the **dragDrop()** function is called. If an error occurs during the drag and drop events, the **error** flag is set to **true**.

### dragEnd()

- The **dragEnd()** function is called when the drag operation is finished, whether or not the piece was successfully dropped on the target area. The **turns** variable is incremented whenever a puzzle piece is successfully dropped on the target area.

### playSound()

- The playSound() function is called whenever a puzzle piece is dropped on the target area. It plays a sound effect to indicate that the user has successfully completed the puzzle.

## Functionality

- Overall, this code creates a basic puzzle game where the user can drag and drop puzzle pieces to complete the puzzle, with the added feature of sound effects.
