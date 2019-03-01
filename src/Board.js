// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return this.get('n') - 1 - colIndex - rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //initialize counter var
      //loop and add to counter
      //if more than 1, 
        //return true,
      //else 
        // return false
        var row = this.get(rowIndex);
        var count = 0;
  
        for (var i = 0; i < row.length; i++) {
          if(count === 1 && row[i]=== 1) {
            return true;
          }
          count += row[i];
        }
  
        return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //grab the number of width/height of grid
      var size = this.get('n');

      //iterate through the number
      for (var i = 0; i < size; i++) {
        //if any row has a conflict
        if (this.hasRowConflictAt(i)) {
          //return true
          return true;
        }
      }
      //if no row has a conflict, return false
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //[[0, 1, 0], 
      // [0, 0, 1], 
      // [0, 1, 0]]
      //i: column index
      //o: boolean - true if there is a conflict
      //explanation: pass in a column index, iterate over each array to find that index, see if more than 1 of the arrays has a 1. if so, our output is true, otherwise false

      //for loop to go over each row, find the index we're looking for, and store the value of the index in a variable (counter or currentIndex)
      //compare that variable to the next index value
      //if the counter and variable are equal to 1, return true



      var size = this.get('n');
      var count = 0;

      for (var i = 0; i < size; i++) {
        var row = this.get(i);
        if(count === 1 && row[colIndex] === 1) {
          return true;
        }
        count += row[colIndex];
      }

      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var size = this.get('n');

      for (var i = 0; i < size; i++) {
        if(this.hasColConflictAt(i)) {
          return true;
        }
      }

      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {

      //i: majorDiagonalColumnIndexAtFirstRow
      //o: boolean
      //c: it's a square grid
      //e: n/a
      //justification: make sure there's no two queens on a diagonal
      //explanation: we take in the majorDiagonalColumnIndexAtFirstRow. find the value at column index + 1 and row index + 1;
        //if multiple of those values === 1, there's a conflict (true), else false 
        
      //Pseudo-code
        //create a variable to store board size
        //create a variable for our counter = 0
        //create a variable for currentColIndex
        //'' for currentRowIndex
        //while currentColIndex < size, 
          // if counter is equal to 1 and current position value is equal to 1, return true
          // else --  
            // counter += board[row][col] 
            // currentColIndex += 1;
            // currentRowIndex += 1;
        
        var size = this.get('n');
        var counter = 0;
        var currentColIndex;
        var currentRowIndex;
        var currentValue;
        
        if(majorDiagonalColumnIndexAtFirstRow < 0) {
          currentRowIndex = majorDiagonalColumnIndexAtFirstRow * -1;
          currentColIndex = 0;
        } else {
          currentColIndex = majorDiagonalColumnIndexAtFirstRow;
          currentRowIndex = 0;
        }

        while(currentColIndex < size && currentRowIndex < size) {
          currentValue = this.get(currentRowIndex)[currentColIndex];
          if(counter === 1 && currentValue === 1) {
            return true;
          } else {
            counter += currentValue;
            currentColIndex += 1;
            currentRowIndex += 1;
          }
        }
        return false;      
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var size = this.get('n');
      for (var i = (size * -1) + 1; i < size; i++) {
        if(this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }

      return false;
      //i: none - create an internal input of the board
      //o: boolean
      //c: it's a square grid
      //e: n/a
      //justification: make sure there's no two queens on a diagonal
      //explanation: we take in the 0 index of the first row. We iterate over over the array 
        //run majorDiagnalConflicts function
        //if any of the them return true, then true
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      //i: first column index
      //o: boolean - true if conflict
      //c: square grid
      //e: n/a

      //justification: make sure there's no two queens on a minor diagonal
      //explanation: we take in the majorDiagonalColumnIndexAtFirstRow. find the value at column index - 1 and row index + 1;
        //if multiple of those values === 1, there's a conflict (true), else false

      // create size var
      // create counter var
      // create current position value var
      // create currentColIndex var
      // create currentRowIndex var

      // while currentRowIndex < size 
        //if counter and current position value both equals 1
          // return true
        // else 
          // counter += current position value
          // currentColIndex - 1;
          // currentRowIndex + 1;

      var size = this.get('n');
      var counter = 0;
      var currentColIndex;
      var currentRowIndex;
      var currentPositionValue;

      if(minorDiagonalColumnIndexAtFirstRow < 0) {
        currentRowIndex = minorDiagonalColumnIndexAtFirstRow * -1;
        currentColIndex = size - 1;
      } else {
        currentColIndex = size - minorDiagonalColumnIndexAtFirstRow - 1;
        currentRowIndex = 0;
      }

      while (currentRowIndex < size && currentColIndex >= 0) {
        currentPositionValue = this.get(currentRowIndex)[currentColIndex];
        if (counter === 1 && currentPositionValue === 1) {
          return true;
        } else {
          counter += currentPositionValue;
          currentColIndex -= 1;
          currentRowIndex += 1;
        }
      }

      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var size = this.get('n');
      
      for (var i = (size * -1) + 1; i < size; i++) {
        if(this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }

      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
