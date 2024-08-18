chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fetch_headlines') {
    fetchHeadlines().then(headlines => {
      sendResponse({ headlines });
    }).catch(error => {
      console.error('Error fetching headlines:', error);
      sendResponse({ headlines: [] });
    });
    return true; // Keep the messaging channel open for async response
  }
});

async function fetchHeadlines() {
  const response = await fetch('https://www.livemint.com/market/stock-market-news');
  const text = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'text/html');

  const headlines = [];
  const headlineElements = doc.querySelectorAll('.listtostory.clearfix');

  for (let i = 0; i < Math.min(5, headlineElements.length); i++) {
    const headline = headlineElements[i].querySelector('a').innerText.trim();
    headlines.push(headline);
  }

  return headlines;
}
