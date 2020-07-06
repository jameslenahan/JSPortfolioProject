class HandsAdapter {
    constructor() {
        this.baseURL = "http://localhost:3000/hands"
    }

    getHands() {
        return fetch(this.baseURL).then(response => response.json()).then(json => json.data)
    }

    postHandToApi(configurationObject) {
        return fetch(this.baseURL, configurationObject)
            .then(response => response.json())
            .catch(error => console.log("Error: " + error))
    }

    getHandByPiece(piece) {
        return fetch(this.baseURL + `/${piece}`).then(response => response.json())
    }
}
