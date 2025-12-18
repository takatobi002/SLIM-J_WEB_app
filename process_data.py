import csv
import json
import re

def process_file():
    input_path = 'SLIM-J.csv'
    output_csv_path = 'SLIM-J_fixed.csv' # Temporary, can overwrite original if confirmed
    output_json_path = 'src/questions.json'

    questions = []

    with open(input_path, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            
            # Split by first whitespace (tab or space)
            # The format seems to be "ID   Question Text"
            match = re.match(r'^(SLIM-\d+)\s+(.+)$', line)
            if match:
                q_id = match.group(1)
                text = match.group(2)
                questions.append({'id': q_id, 'text': text})
            else:
                print(f"Skipping line: {line}")

    # Write CSV
    with open(input_path, 'w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['id', 'text'])
        for q in questions:
            writer.writerow([q['id'], q['text']])
    
    print(f"Overwrote {input_path} with proper CSV.")

    # Write JSON
    with open(output_json_path, 'w', encoding='utf-8') as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)
    
    print(f"Generated {output_json_path}.")

if __name__ == '__main__':
    process_file()
