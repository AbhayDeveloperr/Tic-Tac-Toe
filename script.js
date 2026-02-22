let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#newbtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;  //playerX,playerO
let counter=0;
const winPatterns = [                //indexing of winning patterns
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () =>{
    turnO = true;
    enableBoxes();
    counter=0;
    msgContainer.classList.add("hide");
}

boxes.forEach((box) =>{
    box.addEventListener("click", () =>{
        if(turnO){
            box.innerText = "O";
            turnO = false;
            counter++;
            console.log(counter);
            checkWinner();
        }else{
            box.innerText = "X";
            turnO = true;
            counter++;
            console.log(counter);
            checkWinner();
        }
        box.disabled = true;
    });
});

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}
const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) =>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const checkWinner = ()=>{
    for(let pattern of winPatterns){
        let p1 = boxes[pattern[0]].innerText
        let p2 = boxes[pattern[1]].innerText
        let p3 = boxes[pattern[2]].innerText
        if(p1!="" && p2!="" && p3!=""){
            if(p1===p2 && p2 ===p3){
                console.log("winner",p1);
                showWinner(p1);
                return;
            }
        }
    }
    if(counter==9){
        msg.innerText = "It's a draw";
        msgContainer.classList.remove("hide");
        disableBoxes();
        setTimeout(resetGame,2000);
    }
};
newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);