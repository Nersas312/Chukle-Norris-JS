import { fetchCategories } from './api.js';
import { displayHome, displayJokeList } from './ui.js';
import { getSavedJokes } from './storage.js';

async function init() {
    const homeLink = document.getElementById('home-link');
    const jokeListLink = document.getElementById('joke-list-link');

    homeLink.addEventListener('click', async (event) => {
        event.preventDefault();
        try {
            const categories = await fetchCategories();
            displayHome(categories);
        } catch (error) {
            console.error('Error:', error);
        }
    });

    jokeListLink.addEventListener('click', (event) => {
        event.preventDefault();
        const savedJokes = getSavedJokes();
        displayJokeList(savedJokes);
    });

    homeLink.click();
}

init();
