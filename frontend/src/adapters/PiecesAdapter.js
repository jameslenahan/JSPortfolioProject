
class PiecesAdapter {
    constructor() {
        this.baseURL = "http://localhost:3000/pieces"
    }

    getPieces() {
        return fetch(this.baseURL).then(response => response.json()).then(json => (json.data))
    }
}