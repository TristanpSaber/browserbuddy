document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search');
  const trendsList = document.getElementById('trendsList');

  let trends = [];

  // Load local trends or fetch from server
  fetch(chrome.runtime.getURL('trends.json'))
    .then(response => response.json())
    .then(data => {
      trends = data;
      displayTrends(trends);
    });

  searchInput.addEventListener('input', () => {
    const filtered = trends.filter(item => item.title.toLowerCase().includes(searchInput.value.toLowerCase()));
    displayTrends(filtered);
  });

  function displayTrends(trends) {
    trendsList.innerHTML = '';
    trends.forEach(trend => {
      const li = document.createElement('li');
      li.textContent = trend.title;
      li.addEventListener('click', () => bookmarkTrend(trend.title, li));
      trendsList.appendChild(li);
    });
  }

  function bookmarkTrend(title, liElement) {
    chrome.storage.local.get({ bookmarks: [] }, (result) => {
      const bookmarks = result.bookmarks;
      if (!bookmarks.includes(title)) {
        bookmarks.push(title);
        chrome.storage.local.set({ bookmarks }, () => {
          liElement.classList.add('bookmarked');
        });
      }
    });
  }
});
