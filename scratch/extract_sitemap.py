
import re
import json

sql_file = r"c:\Users\COMPUTER STORES\Downloads\projets ia\Sites wellborne\expertiseaucameroun\u703004442_FABRICE.expertiseaucameroun-org.20260416123448.sql\u703004442_FABRICE.sql"

def extract_pages():
    pages = []
    # Simplified regex for WordPress post insert rows
    # Structure: (ID, author, date, date_gmt, content, title, excerpt, status, ...)
    # This is a very rough regex because SQL is technically not regex-clean
    # We look for rows that contain 'page' and 'publish'
    
    with open(sql_file, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
        
        # Find the FDnp838_posts insert section
        insert_pattern = re.compile(r"INSERT INTO `FDnp838_posts` VALUES (.*?);", re.DOTALL)
        matches = insert_pattern.findall(content)
        
        for match in matches:
            # Each match is a series of rows like (1,...),(2,...)
            rows = re.findall(r"\((\d+),(.*?)\)", match)
            for post_id, row_content in rows:
                if "'page'" in row_content and "'publish'" in row_content:
                    # Very crude split - assuming standard WP column order
                    cols = row_content.split(',')
                    # post_title is around index 4 or 5 after dates
                    # Actually let's just find the title and slug strings
                    title_match = re.search(r"'(.*?)','(.*?)','publish'", row_content)
                    if title_match:
                        title = title_match.group(1)
                        slug = title_match.group(2)
                        pages.append({
                            "id": post_id,
                            "title": title,
                            "slug": slug
                        })
    return pages

if __name__ == "__main__":
    results = extract_pages()
    print(json.dumps(results, indent=2))
