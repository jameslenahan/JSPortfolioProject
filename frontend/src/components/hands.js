
class Hands {
    constructor() {
        this.hands = [];
        this.adapter = new HandsAdapter();
        this.formSubmit = document.getElementById("form-submit");
        this.formButtons = document.getElementById("form-show-buttons");
        this.addHandButton = document.getElementById("add-hand");
        this.dropDownButton = document.getElementById("filter-button");
        this.pieceDropDown = document.getElementById("filter-dropdown");
        this.cardContainer = document.getElementById('hand-card-container');
        this.sortButton = document.getElementById("sort-button")
        this.bindEventListeners();
        this.fetchAndLoadHands();
    }

    fetchAndLoadHands() {
        this.adapter.getHands().then(hands => this.createHands(hands)).then(() => this.addHandsToDom())
    }

    bindEventListeners() {
        this.formSubmit.addEventListener("click", function() {
            event.preventDefault();
            this.addHand();
        }.bind(this))
        this.addHandButton.addEventListener("click", function() {
            this.toggleForm();
            this.toggleButtons();
        }.bind(this))
        this.sortButton.addEventListener("click", function(){
            this.sortList();
        }.bind(this))
        this.dropDownButton.addEventListener("click", function() {
            this.toggleDropDown();
            this.toggleButtons();
         }.bind(this))
        this.pieceDropDown.addEventListener("change", function() {
            this.getAndLoadRandomHandByPiece();
        }.bind(this))
    }

    createArrayOfHandPieces(pieces) {
        let pieceArray = [];
        for (let piece of pieces) {
            pieceArray.push(piece.name);
        }
        return pieceArray
    }

    createHands(hands) {
        for (let hand of hands) {
            let pieces = this.createArrayOfHandPieces(hand.attributes.pieces)
            this.hands.push(new Hand(hand.attributes.title, pieces))
        }
    }

    addHandsToDom() {
        for (let hand of this.hands) {
            hand.createHandCard()
        }
    }

    addHand() {
        const form = event.target.parentElement
        const pieces = form[1].value.split(', ')
        const hand = new Hand(form[0].value, pieces)
        const configurationObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "title": form[0].value,
                "pieces": pieces,

            })
        };
        this.adapter.postHandToApi(configurationObject).then(function(json) {
            hand.createHandCard();
            this.toggleButtons();
            this.toggleForm();
        }.bind(this))
    }

    hideOrShowElement(element) {
        if (element.classList.contains("hidden")) {
            element.classList.remove("hidden");
        } else {
            element.className += " hidden";
        }
    }
    sortList() {
        const sort = this.sortButton;
        this.URL = "http://localhost:3000/hands"
            fetch(this.URL)
            .then(response => response.json())
            .then(json => {

                json.data.sort(function(a, b) {
                    var nameA = a.attributes.title.toUpperCase(); // ignore upper and lowercase
                    var nameB = b.attributes.title.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }

                    // names must be equal
                    return 0;
                });

                const ul = document.createElement('ul')
                for (let hand of json.data){

                    let li = document.createElement('li')
                    li.innerHTML = hand.attributes.title
                    ul.appendChild(li)
                    document.getElementById('hand-card-container').appendChild(ul)
                }


            })


    }

    toggleForm() {
        const form = this.formSubmit.parentElement;
        this.hideOrShowElement(form);
    }

    toggleButtons() {
        this.hideOrShowElement(this.formButtons);
    }

    toggleDropDown() {
        const dropDown = document.getElementById("filter-drop-down");
        this.hideOrShowElement(dropDown);
        new Pieces();
    }

    clearHands() {
        this.cardContainer.innerHTML = "";
    }

    getAndLoadRandomHandByPiece() {
        this.clearHands();
        const piece = event.target.value
        this.adapter.getHandByPiece(piece).then(json => this.loadRandomHand(json.data.attributes))
    }

    loadRandomHand(hand) {
        let pieces = this.createArrayOfHandPieces(hand.pieces)
        const r = new Hand(hand.title, pieces)
        r.createHandCard();
    }
}