export function saveJoke(joke) {
    const jokes = JSON.parse(localStorage.getItem('savedJokes')) || [];
    jokes.push(joke);
    localStorage.setItem('savedJokes', JSON.stringify(jokes));
}

export function getSavedJokes() {
    return JSON.parse(localStorage.getItem('savedJokes')) || [];
}
