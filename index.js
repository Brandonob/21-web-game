document.addEventListener("DOMContentLoaded", () => {
    let startGameButton = document.createElement("button")
    let hitButton = document.createElement("button")
    let stayButton= document.createElement("button")
    let div1 = document.createElement("div")
    let div2 = document.createElement("div")
    let div3 = document.createElement("div")
    let deck_id = 0
    let sumOfCards = 0
    let scores = []

    let title = document.createElement("title")
    title.innerText = "21 BlackJack"
    document.head.appendChild(title)
    
    const mainPage = () => {
        let div = document.createElement("div")
        let h3 = document.createElement("h3")
        
        h3.innerText = "Simple 21"
        startGameButton.innerText = "START GAME"
        
        document.body.appendChild(div)
        div.appendChild(h3)
        div.appendChild(startGameButton)
    }
    
    const playerPage = async () => {
        let shuffledDeck = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        deck_id = shuffledDeck.data.deck_id
        let drawACard = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`)
        // debugger
        hitButton.innerText = "HIT"
        stayButton.innerText = "STAY"
        div2.className = "playerOneDiv"
        
        document.body.appendChild(div1)
        document.body.appendChild(div2)
        
        div1.appendChild(hitButton)
        div1.appendChild(stayButton)

        let h3 = document.createElement("h3")
        for(let i = 0; i < 2; i++) {
            let img = document.createElement("img")
            let cardValue = drawACard.data.cards[i].value
            img.src = drawACard.data.cards[i].image

            if(cardValue === "JACK" || cardValue === "QUEEN" || cardValue === "KING"){
                sumOfCards += 10
            } else if(cardValue === "ACE") {
                sumOfCards += 11
            } else {
                sumOfCards += Number(drawACard.data.cards[i].value)
            }
            h3.innerText = "YOUR SCORE IS: " + sumOfCards
            div2.appendChild(img)
            
        }
        let card1 = drawACard.data.cards[0].value
        let card2 = drawACard.data.cards[1].value
        if(card1 === "ACE" && card2 === "ACE") {      //CHECKS TO SEE IF YOU HAVE 2 ACES TO START WITH
            sumOfCards = 12
            h3.innerText = "YOUR SCORE IS: " + sumOfCards
        }
        div2.appendChild(h3)

    }
    // playerPage()
    mainPage()
    //draw 2 if value is more than player one value stay and win else draw until 
    const cpuFunc = async () => {
        sumOfCards = 0
        let drawACard = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`)
        div3.className = "cpuDiv"
        document.body.appendChild(div3)

        let h3 = document.createElement("h3")
        for(let i = 0; i < 2; i++) {
            let img = document.createElement("img")
            let cardValue = drawACard.data.cards[i].value
            img.src = drawACard.data.cards[i].image

            if(cardValue === "JACK" || cardValue === "QUEEN" || cardValue === "KING"){
                sumOfCards += 10
            } else if(cardValue === "ACE") {
                sumOfCards += 11
            } else {
                sumOfCards += Number(drawACard.data.cards[i].value)
            }
            h3.innerText = "YOUR SCORE IS: " + sumOfCards
            div2.appendChild(img)
            
        }
        let card1 = drawACard.data.cards[0].value
        let card2 = drawACard.data.cards[1].value
        if(card1 === "ACE" && card2 === "ACE") {      //CHECKS TO SEE IF YOU HAVE 2 ACES TO START WITH
            sumOfCards = 12
            h3.innerText = "YOUR SCORE IS: " + sumOfCards
        }
        div2.appendChild(h3)



    }
    const hitFunc = async (div) => {
        let playerDiv = document.querySelector(`.${div}`)
        let img = document.createElement("img")
        let h3 = document.createElement("h3")
        let drawACard = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
        let cardValue = drawACard.data.cards[0].value
        img.src = drawACard.data.cards[0].image
        // debugger
        if(cardValue === "JACK" || cardValue === "QUEEN" || cardValue === "KING"){
            sumOfCards += 10
        } else if(cardValue === "ACE") {
            sumOfCards += 11
        } else {
            sumOfCards += Number(cardValue)
        }
        if (sumOfCards > 21){
            h3.innerText = "BUSTED"
        }else {
            h3.innerText = "YOUR SCORE IS: " + sumOfCards
        }
        if(div === "playerOneDiv") {scores[0] = sumOfCards}
        if(div === "cpuDiv") {scores[1] = sumOfCards}
        playerDiv.appendChild(img)
        playerDiv.appendChild(h3)

    }
    const findWinner = () => {
        let div4 = document.createElement("div")
        let h1 = document.createElement("h1")
        if(scores[0] === scores[1]) {h1.innerText = "IT IS A TIE"}
        if(scores[0] > scores[1]) {
            h1.innerText = "YOU WIN !"
        }else {
            h1.innerText = "THE COMPUTER WINS !"
        }
        document.body.appendChild(div4)
        div4.appendChild(h1)
        //append winners to screen
        //clears screen
        //gives option for new game (button)
        
    }
    const newGame = () => {

    }
    startGameButton.addEventListener("click", () => {
        document.body.innerText = ""
        playerPage()
    })
    let playerTurn = "playerOneDiv"

    hitButton.addEventListener("click", () => {
        let h3 = div2.querySelector("h3")
        div2.removeChild(h3)
        hitFunc(playerTurn)
        stayButton.addEventListener("click", () => {
            if(playerTurn === "playerOneDiv"){
                playerTurn = "cpuDiv"
                div3.removeChild(h3)
                cpuFunc()
            }else {
                playerTurn = "playerOneDiv"
            }
        })
        // debugger
    })
    stayButton.addEventListener("click", () => {
        playerTurn = "cpuDiv"
        cpuFunc()
    })

})