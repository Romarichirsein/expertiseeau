import requests
from bs4 import BeautifulSoup
import json

urls = {
    'transfrontaliere': 'https://www.expertiseaucameroun.org/institution-transfrontaliere',
    'ongs': 'https://www.expertiseaucameroun.org/ongs-et-oscs-2',
    'appui': 'https://www.expertiseaucameroun.org/education-et-recherche',
    'bureaux': 'https://www.expertiseaucameroun.org/acteur-publics',
    'enseignement': 'https://www.expertiseaucameroun.org/entreprises',
    'entreprises': 'https://www.expertiseaucameroun.org/acteur-dappui-au-developpement'
}

data = []

for category, url in urls.items():
    print(f"Fetching {url}...")
    try:
        response = requests.get(url, verify=False)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        tables = soup.find_all('table')
        if not tables:
            print(f"No tables found for {category}")
            continue
            
        table = tables[0]
        headers = [th.text.strip() for th in table.find_all('th')]
        
        for row in table.find_all('tr'):
            cells = row.find_all('td')
            if not cells:
                continue
                
            row_data = {}
            row_data['category'] = category
            
            # Map columns based on category
            if category == 'ongs':
                # N°, Noms, Ville, Région
                if len(cells) >= 4:
                    row_data['id'] = cells[0].text.strip()
                    row_data['noms'] = cells[1].text.strip()
                    row_data['ville'] = cells[2].text.strip()
                    row_data['region'] = cells[3].text.strip()
            else:
                # N°, Noms, Ville, Région, Spécialités
                if len(cells) >= 5:
                    row_data['id'] = cells[0].text.strip()
                    row_data['noms'] = cells[1].text.strip()
                    row_data['ville'] = cells[2].text.strip()
                    row_data['region'] = cells[3].text.strip()
                    row_data['specialites'] = cells[4].text.strip()
            
            if 'id' in row_data and row_data['id']:
                data.append(row_data)
                
    except Exception as e:
        print(f"Error scraping {category}: {e}")

# Read existing data
with open('../data/institutions.json', 'r', encoding='utf-8') as f:
    existing_data = json.load(f)

# Combine and save
existing_data.extend(data)

with open('../data/institutions.json', 'w', encoding='utf-8') as f:
    json.dump(existing_data, f, ensure_ascii=False, indent=2)

print("Scraping completed. institutions.json updated.")
