// This file declares a class for use in main
class Connect4 {
    constructor(selector) {
        this.ROWS = 6;
        this.COLS = 7;
        this.selector = selector;
        this.createGrid(); // when createGrid initialises - create the html for the grid
    
   // const $grid = $(selector);
   // $grid.html('hello');  // adds 'hello' inside the html div - TEST only
    }
    createGrid() {
        const $board = $(this.selector);  // grab DOM element
        console.log($board);
        for (let row = 0; row < this.ROWS; row++) {
            const $row = $('<div>')  // creates a new html elment called DIV. 
                .addClass('row');    // Use convention '$row' for jQuery stuff.
            
            for (let col = 0; col < this.COLS; col++) {
                const $col = $('<div>')  // creates 7 col divs inside each row 
                    .addClass('col empty');    // Use convention '$row' for jQuery stuff.
                $row.append($col);
            }
            $board.append($row);
        }
        console.log($board.html());  // will see 6 row divs each with 7 col divs in the html
    }
}
