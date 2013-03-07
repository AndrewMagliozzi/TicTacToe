var selectors = ["div.L", "div.M", "div.R", "div.U", "div.C", "div.B", "div#UL, div#CM, div#BR", "div#BL, div#CM, div#UR"];

function IsEmpty(element){
        return $(element).text() === " ";
} 

function IsClose(selector){
    var empty = jQuery.grep($(selector), IsEmpty);
    if($(selector).text().replace(" ", "") === "XX" || $(selector).text().replace(" ", "") === "OO"){
            return empty[0];
        }
    else
        return false;
}

function ChooseEmptySelector() {
var play = selectors.map(IsClose);
    for(i=0; i < play.length; i++){
        if (play[i] !== false){
            return play[i];
        }
    }
var blank = jQuery.grep($('.XorO'), IsEmpty);
var which = Math.round((Math.random() * blank.length));
    return blank[which];
}

function PlaceX(element){
    if (IsEmpty(element)){
       $(element).text('X');
    }
}
function PlaceO(){  
$(ChooseEmptySelector()).text("O");
}

var WhoWins = function(selector){
   if($(selector).text() === "XXX"){
   return "X";
   }
   else if($(selector).text() === "OOO"){
    return "O";
   }
    else
    return "";
};


function GameOver(){
  var winner = "";
  
    selectors.forEach(function (selector) {
        var whoWon = WhoWins(selector);
      
        if (whoWon === 'X'){
            $("div#winner").text("X is the winner!");
            winner = whoWon;
        }    
        else if (whoWon === "O"){
            $("div#winner").text("O is the winner!");
            winner = whoWon;
    }
    });

  if (!jQuery.grep($('.XorO'), IsEmpty) && winner === ""){            
        $("div#winner").text("The game is a draw.  Please play again.");
  return true;
    }
  else if (winner === "X" || winner === "O"){
    return true;
  }
  else
    return false;
}

function TicTac(clickedElement){
    PlaceX(clickedElement); 
    if (!GameOver()) {
        PlaceO();
        GameOver();
    }    
}

function AddClickHandler(index, element) {
    $(element).click(function(){
        TicTac(element);
    });
}

$(document).ready(function (){
    $('.XorO').each(AddClickHandler);
});


function NewGame(){
 $("div#winner").text("");
 $("div.XorO").each(function(i) {
   $( this ).text(" "); 
 });
}

$("input#reset").click(NewGame);
