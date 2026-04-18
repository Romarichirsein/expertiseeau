
import re
import json

sql_file = r"c:\Users\COMPUTER STORES\Downloads\projets ia\Sites wellborne\expertiseaucameroun\u703004442_FABRICE.expertiseaucameroun-org.20260416123448.sql\u703004442_FABRICE.sql"

def extract_pages():
    pages = []
    # Simplified regex for WordPress post insert rows
    # Structure: (ID, author, date, date_gmt, content, title, excerpt, status, ...)
    
    with open(sql_file, 'r', encoding='utf-8', errors='ignore') as f:
        # Read in large chunks or whole file if memory allows
        content = f.read()
        
        # Find all rows in FDnp838_posts
        # They are usually in the format: (ID, ..., 'title', 'slug', ..., 'publish', ..., 'page')
        # This is a safer regex to find pages
        pattern = re.compile(r"\(\d+,.*?'publish',.*?'page',.*?\)")
        matches = pattern.findall(content)
        
        for match in matches:
            # Extract ID, Title, Slug
            # ID is at the start
            id_match = re.search(r"^\((\d+),", match)
            # Title and slug are strings
            strings = re.findall(r"'(.*?)'", match)
            # Find the index of 'publish' and 'page' to orient
            try:
                # Titre is usually the 5th or 6th string
                # Let's just collect all strings and look for things that look like titles
                if id_match:
                    pages.append({
                        "id": id_match.group(1),
                        "strings": strings
                    })
            except:
                continue
    return pages

if __name__ == "__main__":
    results = extract_pages()
    for p in results:
        # Heuristic to find title and slug
        # Usually: content, title, excerpt, status, password, slug, ...
        # status 'publish' is at index 3 or 4 of strings
        try:
            publish_idx = p['strings'].index('publish')
            title = p['strings'][publish_idx - 2]
            slug = p['strings'][publish_idx + 2]
            print(f"ID: {p['id']} | Title: {title} | Slug: {slug}")
        except:
            continue
