import { fetchJokes } from './api.js';
import { saveJoke } from './storage.js';

export function displayHome(categories) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <form id="search-form">
            <div>
                <label for="category">Category</label>
                <select id="category" name="category">
                    <option value="">Select Category</option>
                    ${categories.map(category => `<option value="${category}">${category}</option>`).join('')}
                </select>
            </div>
            <div>
                <label for="search">Search</label>
                <input type="text" id="search" name="search" placeholder="Enter a keyword">
            </div>
            <button type="submit">Search</button>
        </form>
        <div id="jokes-grid"></div>
    `;

    const categorySelect = document.getElementById('category');
    const searchInput = document.getElementById('search');

    categorySelect.addEventListener('change', () => {
        if (categorySelect.value) {
            searchInput.disabled = true;
            searchInput.value = '';
        } else {
            searchInput.disabled = false;
        }
    });

    searchInput.addEventListener('input', () => {
        if (searchInput.value) {
            categorySelect.disabled = true;
            categorySelect.value = '';
        } else {
            categorySelect.disabled = false;
        }
    });

    const form = document.getElementById('search-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const query = categorySelect.value || searchInput.value;

        if (!query) return;

        try {
            const jokes = await fetchJokes(query);
            displayJokes(jokes.result);
        } catch (error) {
            console.error('Error:', error);
        }
    });
}

export function displayJokes(jokes) {
    const jokesGrid = document.getElementById('jokes-grid');
    jokesGrid.innerHTML = jokes.map(joke => `
        <div class="joke">
            <p>${joke.value}</p>
            <button class="save-joke" data-joke='${JSON.stringify(joke)}'>Save</button>
        </div>
    `).join('');

    const saveButtons = document.querySelectorAll('.save-joke');
    saveButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const joke = JSON.parse(event.target.dataset.joke);
            saveJoke(joke);
        });
    });
}

export function displayJokeList(jokes) {
    const mainContent = document.getElementById('main-content');
    if (jokes.length === 0) {
        mainContent.innerHTML = '<p>No jokes saved yet.</p>';
    } else {
        mainContent.innerHTML = `
            <div id="jokes-list">
                ${jokes.map(joke => `
                    <div class="joke">
                        <p>${joke.value}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }
}
