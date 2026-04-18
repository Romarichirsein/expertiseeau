
import re
import json

sql_file = r"c:\Users\COMPUTER STORES\Downloads\projets ia\Sites wellborne\expertiseaucameroun\u703004442_FABRICE.expertiseaucameroun-org.20260416123448.sql\u703004442_FABRICE.sql"

def extract_tables():
    tables = {}
    with open(sql_file, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        
        # Look for tablepress_table post types
        # Rows: (ID, author, date, date_gmt, content, title, ...)
        # The content is JSON
        pattern = re.compile(r"\((\d+),.*?'(.*?)','(.*?)','(.*?)','publish',.*?'tablepress_table',.*?\)", re.DOTALL)
        matches = pattern.findall(content)
        
        for post_id, author_id, date1, date2, row in matches:
            # The content might be very long. Let's find title and JSON
            # In the matches above, group 2 should be the content (JSON)
            # Actually findstr output showed title is 'Entreprises du secteur de l’eau au Cameroun'
            # Let's try to find title in the row
            title_match = re.search(r"','(.*?)','(.*?)','publish'", row)
            if title_match:
                title = title_match.group(1)
                # The JSON is at the beginning of the row content
                # We need to unescape SQL strings (roughly)
                json_content = row.split("','")[0].replace("\\'", "'").replace('\\"', '"')
                try:
                    data = json.loads(json_content)
                    tables[title] = data
                except:
                    # Try to clean it further if needed
                    pass
    return tables

if __name__ == "__main__":
    results = extract_tables()
    # Save each table to a JSON file
    import os
    os.makedirs('data/institutions', exist_ok=True)
    for title, data in results.items():
        safe_title = "".join([c if c.isalnum() else "_" for c in title])
        with open(f'data/institutions/{safe_title}.json', 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"Extracted: {title} ({len(data)} rows)")
