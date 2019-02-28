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
  // var solution = undefined; //fixme

  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // return solution;
  // if(n === 0 || n === undefined) {
  //   return undefined;
  // }
  // var board = new Board({'n' : n});
  // for(var i = 0; i < n; i++) {
  //   board[i][i] = 1;
  // }

  // return board;

  // //i: number that indicates board size and number of rooks
  //o: object with a matrix solution
  //c: square board, all rooks must be played, diagonal conflicts don't matter
  //e: if n = 0 or undefined
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
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
