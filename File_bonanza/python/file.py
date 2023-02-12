import os
import csv
import json
import xml.etree.ElementTree as ET
import yaml

def read_text(file_path):
    with open(file_path, 'r') as file:
        return file.read()

def read_xml(file_path):
    tree = ET.parse(file_path)
    root = tree.getroot()
    return ET.tostring(root, encoding='unicode')

def read_yaml(file_path):
    with open(file_path, 'r') as file:
        return yaml.safe_load(file)

def read_json(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

def read_csv(file_path):
    with open(file_path, 'r') as file:
        reader = csv.reader(file)
        return list(reader)

file_types = {
    '.txt': read_text,
    '.xml': read_xml,
    '.yaml': read_yaml,
    '.json': read_json,
    '.csv': read_csv
}

file_path = input('Enter the file path: ')
_, file_extension = os.path.splitext(file_path)
if file_extension not in file_types:
    print(f'Error: unsupported file type {file_extension}')
else:
    contents = file_types[file_extension](file_path)
    print(contents)
