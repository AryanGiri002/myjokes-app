const fetchBtn = document.getElementById('fetch-btn');
const jokeContainer = document.getElementById('joke-container');
const jokeCount = document.getElementById('joke-count');
const loader = document.getElementById('loader');

fetchBtn.addEventListener('click', async () => {
  loader.classList.remove('hidden');
  jokeContainer.innerHTML = '';
  try {
    const res = await fetch('http://localhost:3000/api/jokes');
    if (!res.ok) throw new Error('Network error');
    const jokes = await res.json();

    jokeCount.textContent = `JOKES: ${jokes.length}`;
    loader.classList.add('hidden');

    jokes.forEach((joke, index) => {
      const card = document.createElement('div');
      card.className = 'fade-in bg-gray-900 border border-gray-800 hover:border-emerald-500 transition-all rounded-2xl p-5 shadow-md';
      card.innerHTML = `
        <h3 class="text-xl font-semibold text-emerald-400 mb-1">
          <span class="text-gray-500 text-sm mr-2">#${joke.id ?? index + 1}</span> ${joke.title}
        </h3>
        <p class="text-gray-300">${joke.content}</p>
      `;
      jokeContainer.appendChild(card);
    });

  } catch (err) {
    loader.classList.add('hidden');
    jokeContainer.innerHTML = `<p class="text-center text-red-400">Failed to fetch jokes 😢</p>`;
    console.error(err);
  }
});
