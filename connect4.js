// This file declares a class for use in main
class Connect4 {
    constructor(selector) {
        this.ROWS = 6;
        this.COLS = 7;
        this.player = 'red'; // start off as player red
        this.selector = selector;
        this.isGameOver = false;
        this.onPlayerMove = function() {};
        this.createGrid(); // when createGrid initialises - create the html for the grid
        this.setupEventListeners(); // for mouseover, hover events, etc
    
   // const $grid = $(selector);
   // $grid.html('hello');  // adds 'hello' inside the html div - TEST only
    }
    createGrid() {   // create 6 x 7 array of DIVs
        const $board = $(this.selector);  // grab DOM element
        $board.empty();  // remove all HTML elements on restart
        this.isGameOver = false;    // for restart
        this.plasyer = 'red';       // for restart
        console.log($board);
        for (let row = 0; row < this.ROWS; row++) {
            const $row = $('<div>')  // creates a new html elment called DIV. 
                .addClass('row');    // Use convention '$row' for jQuery stuff.
            
            for (let col = 0; col < this.COLS; col++) {
                const $col = $('<div>')  // creates 7 col divs inside each row 
                    .addClass('col empty')    // Use convention '$row' for jQuery stuff.
                    .attr('data-col', col) // add column attributes to the cell
                    .attr('data-row', row) // add row attributes to the cell
                $row.append($col);
            }
            $board.append($row);
        }
        console.log($board.html());  // will see 6 row divs each with 7 col divs in the html
    }

    setupEventListeners() {
        const $board = $(this.selector);  // grab connect4 DOM element
        const that = this;  // hack to retain access to original this attribute

        function findLastEmptyCell(col) {
            const cells = $(`.col[data-col='${col}']`);  // grab all the cells in current column
            for (let i = cells.length - 1; i >= 0; i--) { // start at the bottom of the col and go up.
                const $cell = $(cells[i]);
                if ($cell.hasClass('empty')) {
                    return $cell; // at least one empty cell in current column
                }
            }
            return null;  // no empty cells in the current column
            console.log(cells);
        }

        $board.on('mouseenter', '.col.empty', function() {
            //console.log('here', this); // output all div attributes for the mouse-over'd cell
            if (that.isGameOver) return; // ignore mouseenter actions if game over
            const col = $(this).data('col'); // want to find last empty cell in the mouseover'd column
            const $lastEmptyCell = findLastEmptyCell(col);
            $lastEmptyCell.addClass(`next-${that.player}`);  // adds token to empty cell
            //console.log(col); // output col ID (needed when looking for empty row to fill in the game)
        });

        $board.on('mouseleave', '.col', function() {
            $('.col').removeClass(`next-${that.player}`);  // remove last token added by .addClass
        });

        $board.on('click', '.col.empty', function() {
            if (that.isGameOver) return; // dont click on anything if game over
            const col = $(this).data('col'); // col ID of clicked row
            const row = $(this).data('row'); // col ID of clicked row
            const $lastEmptyCell = findLastEmptyCell(col);  // want to put token into last empty cell in col
            $lastEmptyCell.removeClass(`empty next-${that.player}`);
            //$lastEmptyCell.addClass('red');
            $lastEmptyCell.addClass(that.player);
            $lastEmptyCell.data('player', that.player);

            const winner = that.checkForWinner(
                $lastEmptyCell.data('row'),
                $lastEmptyCell.data('col')
            )
            if (winner) {
                that.isGameOver = true;
                alert(`Game over! Player ${that.player} has won!`);
                $('.col.empty').removeClass('empty'); // get rid of pointer cursor over empty cells
                return;
            }
            
            that.player = (that.player === 'red') ? 'black' : 'red'; // alternate between red and black
            that.onPlayerMove(); // alternate displayed text
            $(this).trigger('mouseenter');
        });
    }

    checkForWinner(row, col) {  // input last row/col clicked
    // looking for 4 rows, columns, diagonal of same colour starting from last token
        const that = this;
        
        function $getCell(i, j) {
            return $(`.col[data-row='${i}'][data-col='${j}']`);
        }

        function checkDirection(direction) {
            let total = 0;
            let i = row + direction.i;
            let j = col + direction.j;
            let $next = $getCell(i, j);  // one cell above token
            while (i >= 0 &&
                i < that.ROWS &&
                j >= 0 &&
                j < that.COLS &&
                $next.data('player') === that.player
              ) {
                    // while current player = player just dropped, then. 
                    total++;
                    i += direction.i;
                    j += direction.j;
                    $next = $getCell(i, j);
              }
              return total;
        }

        function checkWin(directionA, directionB) {
            const total = 1 + 
                checkDirection(directionA) + 
                checkDirection(directionB);
            if (total >= 4) {
                return that.player;
            } else {
                return null;  // no player has won yet
            }
        } 
    
        function checkDiagonalBLtoTR() {
            return checkWin({i: 1, j: -1}, {i: 1, j: 1});
        }

        function checkDiagonalTLtoBR() {
            return checkWin({i: 1, j: 1}, {i: -1, j: -1});
        }

        function checkVerticals() {
            return checkWin({i: -1, j: 0}, {i: 1, j: 0});
        }

        function checkHorizontals() {
            return checkWin({i: 0, j: -1}, {i: 0, j: 1});
        }

        return checkVerticals() || 
            checkHorizontals() || 
            checkDiagonalBLtoTR() ||
            checkDiagonalTLtoBR();
    }

    restart () {
        this.createGrid();
        this.onPlayerMove(); // change player on restart
    }
}
