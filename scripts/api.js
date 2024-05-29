export async function fetchCategories() {
    try {
        const response = await fetch('https://api.chucknorris.io/jokes/categories');
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw new Error('Failed to fetch categories');
    }
}

export async function fetchJokes(query) {
    try {
        const url = `https://api.chucknorris.io/jokes/search?query=${query}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching jokes:', error);
        throw new Error('Failed to fetch jokes');
    }
}
