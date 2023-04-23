class TTT {
    /*
        Add a constructor that 
        -   defines and initializes all variables
        -   binds the keyword this to the class for each function because
            this will otherwise will refer to the clicked square
            -   this.calculateWinner = this.calculateWinner.bind(this);
            -   DON'T bind this for handleClick at this point
        -   calls the init method
    */
    constructor(xIsNext, squares, winner, winningLine, lines) {
        this.xIsNext = xIsNext;
        this.squares = squares;
        this.winner = winner;
        this.winningLine = winningLine;
        this.lines = lines;
        this.calculateWinner = this.calculateWinner.bind(this);
        this.highlightWinner = this.highlightWinner.bind(this);
        this.disableAll = this.disableAll.bind(this);
        this.init();
    }
    /*
        Convert each function to a method
        -   move it inside the class
        -   remove the keyword function
        -   add this to all of the variables that belong to the class
        -   change var to let or const for local variables
        -   add this to all method calls
     
        Init
        -   bind both this and i to handleClick
            -   this.handleClick.bind(this, i);
        CalculateWinner
        -   use destructuring assingment to assign values to
            a b and c in one line
        HandleClick
        -   add a parameter i rather than getting i from this
            -   this now refers to the class not the square
        -   remove the local variable i
        -   add a local variable to refer to the clicked square
            -   remember that squares have an integer id 0 - 8
    */
    init() {
        let uiSquares = document.getElementsByName("square");
        for (let i = 0; i < uiSquares.length; i++) {
            uiSquares[i].onclick = this.handleClick.bind(this, i);
        }
    }

    handleClick(i) {
        let index = i;
        if (this.xIsNext) {
            var player = "X"
        }
        else {
            var player = "O"
        }
        this.xIsNext = !this.xIsNext;
        this.squares[index] = player;
        document.getElementById(index).innerHTML = player;
        this.onclick = () => { };

        if (this.calculateWinner()) {
            this.highlightWinner();
            this.disableAll();
        }
        else {
            document.getElementById("status").innerHTML = "Next Player: " + player;
        }
    }

    calculateWinner() {
        for (let i = 0; i < this.lines.length; i++) {
            var a = this.lines[i][0];
            var b = this.lines[i][1];
            var c = this.lines[i][2];
            if (this.squares[a] &&
                this.squares[a] === this.squares[b] &&
                this.squares[a] === this.squares[c]) {
                this.winner = this.squares[a];
                this.winningLine = this.lines[i];
                return true;
            }
        }
        this.winner = null;
        this.winningLine = Array();
        return false;
    }

    highlightWinner() {
        for (let i = 0; i < this.winningLine.length; i++) {
            document.getElementById(this.winningLine[i]).classList.add("red");
        }
    }

    disableAll() {
        let uiSquares = document.getElementsByName("square");
        for (let i = 0; i < uiSquares.length; i++) {
            uiSquares[i].onclick = () => { };
        }

    }
}
var ttt;
addEventListener("load", (event) => {
    ttt = new TTT(true, Array(9).fill(null), null, Array(), [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ])
})
