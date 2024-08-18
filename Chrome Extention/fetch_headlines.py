import requests
from bs4 import BeautifulSoup

def fetch_headlines():
    url = 'https://www.livemint.com/market/stock-market-news'
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    headlines = []
    headline_elements = soup.find_all('div', class_='listtostory clearfix')

    for i in range(min(5, len(headline_elements))):
        headline = headline_elements[i].find('a').get_text(strip=True)
        headlines.append(headline)

    return headlines

if __name__ == '__main__':
    headlines = fetch_headlines()
    for idx, headline in enumerate(headlines, 1):
        print(f"{idx}. {headline}")
