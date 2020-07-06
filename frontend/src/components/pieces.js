
class Pieces {
    constructor() {
        this.adapter = new PiecesAdapter();
        this.pieceDropDown = document.getElementById("filter-dropdown");
        this.fetchAndPopulateDropDown();
    }

    fetchAndPopulateDropDown() {
        this.adapter.getPieces().then(json => this.populatePieceDropDown(json))
    }

    populatePieceDropDown(data) {
        data.sort((a, b) => (a.attributes.name > b.attributes.name) ? 1 : -1)
        for (let piece of data) {
            let option = document.createElement("option")
            option.value = piece.attributes.name
            option.innerHTML = piece.attributes.name
            this.pieceDropDown.appendChild(option)
        }
    }
}