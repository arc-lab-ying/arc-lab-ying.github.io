"""Package the original website, four redesigns and their audited dependencies."""
from pathlib import Path
import argparse
import hashlib
import json
import shutil

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output', required=True, type=Path, help='New empty release directory; never the source checkout')
args = parser.parse_args()
root = Path(__file__).resolve().parent.parent
output = args.output.resolve()
output.mkdir(parents=True, exist_ok=False)

files = {'prototype-concepts.html'}
for concept in ('original', 'minimal', 'parentsquare', 'growthbook', 'boostlab'):
    for path in (root / 'prototypes' / concept).rglob('*'):
        if path.suffix in ('.html', '.css', '.js'):
            files.add(path.relative_to(root).as_posix())
files.update(line for line in (root / 'tools' / 'vercel-preview-assets.txt').read_text().splitlines() if line)
for relative in sorted(files):
    source = root / relative
    target = output / relative
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, target)

# The deployment root is the comparison experience. GitHub Pages keeps its index.
shutil.copy2(output / 'prototype-concepts.html', output / 'index.html')
shutil.copy2(root / 'tools' / 'vercel-preview.json', output / 'vercel.json')
manifest = [{'path': path.relative_to(output).as_posix(), 'bytes': path.stat().st_size,
             'sha256': hashlib.sha256(path.read_bytes()).hexdigest()}
            for path in sorted(output.rglob('*')) if path.is_file()]
manifest_path = output.parent / (output.name + '-manifest.json')
manifest_path.write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf-8')
print(json.dumps({'output': str(output), 'files': len(manifest),
                  'bytes': sum(file['bytes'] for file in manifest), 'manifest': str(manifest_path)}, indent=2))
