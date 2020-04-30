const cellElements = document.querySelectorAll('[data-cell]');
const X = "x";
const O = "o";
const restartButton = document.getElementById("restartButton");
const WinningTextElement = document.querySelector('[data-winning-message-text]')
const WinningMessage= document.getElementById("winningMessage");
const Winning_Combinations = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],
    [2,4,6]
]
const board = document.getElementById("board");
let circleTurn;

startGame();
restartButton.addEventListener('click',startGame);
function startGame()
{
    circleTurn=false;
    cellElements.forEach(cell => {
        cell.classList.remove(O);
        cell.classList.remove(X);
        cell.addEventListener('click',handleClick,{ once:true});
    });
    setBoardHoverClass()
 WinningMessage.classList.remove("show");
}
function handleClick(e){
const cell =e.target;
const currentClass = circleTurn ? O : X;
placeMark(cell,currentClass);
if(checkWin(currentClass))
{
endGame(false);
}
else if(isDraw())
{
endGame(true);
}
else
{
swapTurn();
setBoardHoverClass();
}
}

function isDraw()
{
    return [...cellElements].every(cell=>{
        return cell.classList.contains(O) || cell.classList.contains(X);
    });
}

function endGame(draw)
{
    if(draw)
    {
     WinningTextElement.innerText = "It's a Draw!!";
    }
    else
    {
        WinningTextElement.innerText = `${circleTurn?"O's":"X's"} Wins`;
    }
    WinningMessage.classList.add("show");
}

function placeMark(cell,currentClass)
{
cell.classList.add(currentClass);
}

function swapTurn()
{
    circleTurn = !circleTurn;
}

function setBoardHoverClass()
{
    board.classList.remove(X);
    board.classList.remove(O);
    if(circleTurn)
    {
        board.classList.add(O);

    }
    else
    {
        board.classList.add(X);
    }
}

function checkWin(currentClass)
{
   return Winning_Combinations.some(combination =>{
       return combination.every(index =>
        {
            return cellElements[index].classList.contains(currentClass);
        })
   })
}