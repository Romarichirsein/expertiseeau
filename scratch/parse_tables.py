
import re
import json
import os

raw_file = 'scratch/tables_raw.txt'

def parse_raw():
    os.makedirs('data/institutions', exist_ok=True)
    with open(raw_file, 'r', encoding='utf-8', errors='ignore') as f:
        for line in f:
            # Each line is an INSERT row
            # Format: (ID, ..., 'JSON_DATA', 'Title', 'Slug', ..., 'tablepress_table', ...)
            # The JSON starts after some columns. 
            # In TablePress, the content column is the 5th (index 4)
            # Row pattern: (ID, author, date, date_gmt, content, title, excerpt, status, comment_status, ping_status, password, name, ...)
            
            # Let's extract the Title (which is near the end) and the JSON (which is long)
            # Title is at index -7 roughly
            parts = re.split(r"','", line)
            if len(parts) > 10 and 'tablepress_table' in line:
                try:
                    # Heuristic: Find the JSON part
                    # It usually starts with [[' or ["
                    # Find part that starts with [
                    json_data = None
                    title = None
                    
                    for i, part in enumerate(parts):
                        if part.startswith('[[') or part.startswith('["'):
                            json_data = part
                        if 'tablepress_table' in part:
                            # Title is likely 2 or 3 parts before
                            title = parts[i-4]
                    
                    if json_data and title:
                        # Clean up JSON
                        json_data = json_data.replace("\\'", "'").replace('\\"', '"')
                        # Sometimes it ends with ', ' or other things
                        if json_data.endswith("',"): json_data = json_data[:-2]
                        
                        data = json.loads(json_data)
                        safe_title = "".join([c if c.isalnum() else "_" for c in title])
                        with open(f'data/institutions/{safe_title}.json', 'w', encoding='utf-8') as out:
                            json.dump(data, out, indent=2, ensure_ascii=False)
                        print(f"Parsed: {title}")
                except Exception as e:
                    # print(f"Error parsing line: {str(e)}")
                    pass

if __name__ == "__main__":
    parse_raw()
