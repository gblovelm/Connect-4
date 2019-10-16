// This file declares a class for use in main
class Connect4 {
    constructor(selector) {
        this.ROWS = 6;
        this.COLS = 7;
        this.selector = selector;
        this.createGrid(); // when createGrid initialises - create the html for the grid
        this.setupEventListeners(); // for mouseover, hover events, etc
    
   // const $grid = $(selector);
   // $grid.html('hello');  // adds 'hello' inside the html div - TEST only
    }
    createGrid() {   // create 6 x 7 array of DIVs
        const $board = $(this.selector);  // grab DOM element
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

            const col = $(this).data('col'); // want to find last empty cell in the mouseover'd column
            const $lastEmptyCell = findLastEmptyCell(col);
            $lastEmptyCell.addClass(`next-red`);  // adds counter to empty cell
            //console.log(col); // output col ID (needed when looking for empty row to fill in the game)
        })

        $board.on('mouseleave', '.col', function() {
            $('.col').removeClass(`next-red`)  // remove last counter added by .addClass
        })
    }

}
