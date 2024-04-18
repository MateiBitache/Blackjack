let deck;
createDeck();
shuffle();
hit=document.getElementById("hit");
stay=document.getElementById("stay");
display1=document.getElementById("display1");
display2=document.getElementById("display2");
dealerr = document.getElementById("dealer");
display1.textContent=0;
let hideValue;
hideValue=deck.pop();
hideValue2=hideValue.split("-")[0];
let dealerValue=0;
let playerValue=0;

start();
hit.addEventListener("click", function(){
    card();
    if(playerValue>21)
    {
        alert("You lost");
        hit.disabled=true;
        stay.disabled=true;
    }
})
stay.addEventListener("click",function(){
    dealer();
})
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function createDeck()
{
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck=[];
    for(let i=0;i<types.length;i++)
        for(let j=0;j<values.length;j++)
            {
                deck.push(values[j]+ "-" + types[i]);
            }
}
function shuffle()
{
    for(let i=0;i<deck.length;i++)
    {
        let min = 1; 
        let max = deck.length; 
        let j = randomInt(1,deck.length);
        let temp;
        temp=deck[i];
        deck[i]=deck[j];
        deck[j]=temp;
    }
}
function start()
{
    carte = document.createElement("img");
    dealerr = document.getElementById("dealer");
    extras = deck.pop();
    carte.src = "cards/" + extras + ".png";
    valoare = extras.split('-')[0];
    if (valoare == 'J' || valoare == 'Q' || valoare == 'K')
        valoare = 10;
    else if (valoare == 'A')
        valoare = 11;
    else
        valoare = parseInt(valoare);
    dealerValue += valoare;
    display2.textContent=dealerValue;
    dealerr.append(carte);
    for(let i=0;i<2;i++)
    {
        card();
    }
}

function card()
{
    carte=document.createElement("img");
    player=document.getElementById("player");
    extras=deck.pop();
    carte.src="cards/" + extras + ".png" ;
    valoare=extras.split('-')[0];
    if(valoare=='J'||valoare=='Q'||valoare=='K')
        valoare=10;
    else if(valoare=='A')
        valoare=11;
    else
       valoare=parseInt(valoare);
    playerValue += valoare;
    display1.textContent=playerValue;
    player.append(carte);
}
function cardd() {
    return new Promise(resolve => {
        setTimeout(function() {
            carte = document.createElement("img");
            extras = deck.pop();
            carte.src = "cards/" + extras + ".png";
            valoare = extras.split('-')[0];
            if (valoare == 'J' || valoare == 'Q' || valoare == 'K')
                valoare = 10;
            else if (valoare == 'A')
                valoare = 11;
            else
                valoare = parseInt(valoare);
            dealerValue += valoare;
            display2.textContent=dealerValue;
            dealerr.append(carte);
            if(dealerValue > playerValue && dealerValue<22)
            {
                alert("You Lost");
                hit.disabled=true;
                stay.disabled=true;
                process.exit();
            }
            resolve();
        }, 1500);
    });
}
async function dealer() {
    document.getElementById("hidden").src="cards/"+hideValue+".png";
    if (hideValue2 == 'J' || hideValue2 == 'Q' || hideValue2 == 'K')
    hideValue2 = 10;
    else if (hideValue2 == 'A')
    hideValue2 = 11;
    else
    hideValue2 = parseInt(hideValue2);
        dealerValue += hideValue2;
    display2.textContent=dealerValue;
    while(dealerValue < 17) {
        await cardd();
        if(dealerValue > playerValue && dealerValue<22)
        {
            alert("You Lost");
            hit.disabled=true;
            stay.disabled=true;
            process.exit();
        }
    }
    if(dealerValue > playerValue && dealerValue<22)
    {
        alert("You Lost");
        hit.disabled=true;
        stay.disabled=true;
        process.exit();
    }
    if(dealerValue > 21) 
    {
        alert("You Won");
    } 
    else 
    {
        if(dealerValue > playerValue)
            alert("You Lost");
        else if(dealerValue == playerValue)
            alert("Draw");
        else
            alert("You Won");
    }
    hit.disabled=true;
    stay.disabled=true;
}