import os
import zipfile
import xml.etree.ElementTree as ET

path = r"c:\Users\jsfla\OneDrive\Documentos\Flávio\Trabalhos\Belo Gole - Joao Paulo\tabela_preços.ods"
print("exists", os.path.exists(path))

with zipfile.ZipFile(path) as z:
    content = z.read('content.xml')

root = ET.fromstring(content)
ns = {
    'office': 'urn:oasis:names:tc:opendocument:xmlns:office:1.0',
    'table': 'urn:oasis:names:tc:opendocument:xmlns:table:1.0',
    'text': 'urn:oasis:names:tc:opendocument:xmlns:text:1.0',
}

rows = []
for table in root.findall('.//table:table', ns):
    for row in table.findall('table:table-row', ns):
        cells = []
        for cell in row.findall('table:table-cell', ns):
            texts = []
            for p in cell.findall('.//text:p', ns):
                text_parts = []
                for elem in p.iter():
                    if elem.text and elem.text.strip():
                        text_parts.append(elem.text.strip())
                    for child in list(elem):
                        if child.tail and child.tail.strip():
                            text_parts.append(child.tail.strip())
                texts.append(' '.join(text_parts).strip())
            cells.append(' | '.join(t for t in texts if t))
        rows.append(cells)

for i, row in enumerate(rows[:120], 1):
    print(i, row)
