
class Hand {
    constructor(title, pieces) {
        this.title = title;
        this.pieces = pieces;
    }
    createHandCard() {
        const card = document.createElement('div')
        card.className = "card"

        const cardInfo = document.createElement('div')
        cardInfo.className = "card-info"
        const title = document.createElement('h1')
        title.innerHTML = this.title

        cardInfo.appendChild(title)
        const ingHeader  = document.createElement('h3')
        ingHeader.innerHTML = "Cards:"
        cardInfo.appendChild(ingHeader)
        const ul = document.createElement('ul')
        for (let piece of this.pieces) {
            let li = document.createElement('li')
            li.innerHTML = piece
            ul.appendChild(li)
        }
        cardInfo.appendChild(ul)
        const footer = document.createElement('div')
        footer.className = "card-footer"

        card.appendChild(cardInfo)
        card.appendChild(footer)
        document.getElementById('hand-card-container').appendChild(card)
    }
}