import os

entries = os.listdir('.')
directories = [d for d in entries if os.path.isdir(d)]

for directory in directories:
    #check if a file meta.ts exists. if so, skip
    if os.path.isfile(directory + '/meta.ts'):
        continue

    #check if a file page.tsx exists. if not, skip
    if not os.path.isfile(directory + '/page.tsx'):
        continue

    #open page.tsx and find where `const Page = (): JSX.Element => {` starts
    with open(directory + '/page.tsx', 'r') as f:
        lines = f.readlines()
        for i, line in enumerate(lines):
            if 'const Page = (): JSX.Element => {' in line:
                break
        else:
            continue

    print(f'Creating meta.ts ({i} lines) for {directory}')

    #move all lines up to (not including) `const Page = (): JSX.Element => {` to meta.ts (new file), and remove them from page.tsx
    with open(directory + '/meta.ts', 'w') as f:
        f.writelines(lines[:i])

    with open(directory + '/page.tsx', 'w') as f:
        f.writelines(lines[i:])