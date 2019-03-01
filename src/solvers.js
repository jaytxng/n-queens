/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {

  if (n === undefined) {
    return undefined;
  }
  
  var board = new Board({'n' : n});

  if (n > 0) {
    for (var i = 0; i < n; i++) {
      board.togglePiece(i, i);
    }
  }
  
  return board.rows();

  // //i: number that indicates board size and number of rooks
  //o: object with a matrix solution
  //c: square board, all rooks must be played, diagonal conflicts don't matter
  //e: if n = undefined
  //j: return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
  //explain: Create a new board. based on the board size (n) given, we create an matrix that takes the sets the rook where column[i] === row[i]. 
    //we then return the object that contains that matrix

  
  //instatiate the new board with an n size
  //iterate through board size
    //where the board's column and row index are the same, set the value to 1
  //return board

  
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; 

  if (n === undefined) {
    return undefined;
  }

  var board = new Board({'n' : n});

  var placeRook = function(row) {
    if (row === n) {
      solutionCount++;
      return;
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyRooksConflicts()) {
        placeRook(row + 1);
      } 
      board.togglePiece(row, i);
    }
  };

  placeRook(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;

  //i: n
  //o: number of solutions
  //c: rooks cannot be on the same row or column, there must be n number of rooks, solution count cannot exceed the size of the board,
  //e: n is undefined
  //justification: the purpose of this function is return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
  //explanation: run a function that toggles one piece, and then find the next location where we can place another rook, without any conflicts 
    //() for a board of n size. Count all the solutions and return that count

  //Pseudo-code
    // create variable for solution count 
    // if n is equal to undefined, return undedfined
    // initiate the board in a variable, set the property n = n
    //create a recurse function to iterate through the row
      //if row is size
        //solution counter increment
        //return;
      //iterate through column indices of that row
        //toggle on rook on that column index
        //if index has no row or column conflicts
          //run recursive function on row + 1
        //toggle off rook on that column index
    
    //initiate recursion func
      
    //return solution counter  


};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  //i: n 
  //o: matrix of one solution
  //c: queens have row, col, diag conflicts, queen for every row, n queens on a nxn board
  //e: n is undefined, n is 2 or 3 (no solution)
  //j: return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
  //explanation: in a n size board, iterate through each row of the board and place the queen on a space where there are no conflicts,
  //and return the first solution matrix we get.
  var board = new Board({'n' : n});
  // if (n === undefined /*|| n === 2 || n === 3*/) {
  //   return undefined;
  // }
  // var solution = [];
  var solution = board.rows();
  var found = false;

  var placeQueens = function(row) {
    if (row === n) {
      found = true;
      solution = board.rows();
      return;
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts()) {
          placeQueens(row + 1);
      }
      if (found) {
        return;
      }
      board.togglePiece(row, i);
    }
  }

  placeQueens(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(board.rows()));
  return solution;

  //pseudocode
  //if n is undefined or 2 or 3
    //return undefined;
  
  //create new instance of board with nxn
  //create solution var

  //recursion function with row input
    //if row equals size
      //solution var equals current matrix we're on
      //return;
    //iterate through col indices
      //toggle on queen
      //if !queenconflict
        // recurse row + 1
      //toggle off queen
  
  //initiate recursion func

  // return solution var 
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; 

  if (n === 2 || n === 3) {
    return 0;
  }

  var board = new Board({'n' : n});

  var countQueenSolutions = function(row) {
    if (row === n) {
      solutionCount++;
      return;
    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if(!board.hasAnyQueensConflicts()) {
        countQueenSolutions(row + 1);
      }
      board.togglePiece(row, i);
    }
  }
  
  countQueenSolutions(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
//i: n 
  //o: number of solutions
  //c: queens have row, col, diag conflicts, queen for every row, n queens on a nxn board
  //e: none
  //j: // return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
  //explanation: run a function that toggles one piece, and then find the next location where we can place another queen, without any conflicts 
    //() for a board of n size. Count all the solutions and return that count

//pseudocode  
  //if n is 2 or 3
    //return 0;
  
//create new instance of board with nxn
//create solution var

  //recursion function with row input
    //if row equals size
      //increment solution count
      //return;
    //iterate through col indices
      //toggle on queen
      //if !queenconflict
        // recurse row + 1
      //toggle off queen
  
  //initiate recursion func

  // return solution count
};
