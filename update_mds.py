'''
Usage: add / remove .md files in the notes directory, and run this script.(recursive)
To Undo a Change: Manually delete the line in notes.html and mod_history.md.
Warning: Run from an environment that support Your Language.
'''

import os
import re
import sys

# ok
def read_history():
    history = {}  # {filname:time}
    if os.path.exists('mod_history.md'):
        with open('mod_history.md', 'r') as f:
            line = f.readline()
            while line:
                history[line.split('/')[0]] = float(line.split('/')[1].strip('/n'))
                line = f.readline()
    return history

# ok
def read_notes():
    notes = {} # {filname:last_modified_time}
    for root, dirs, files in os.walk('notes'):
        for file in files:
            if file.endswith('.md'):
                notes[file] = os.path.getmtime(os.path.join(root, file))
    return notes
    
# ok
def update_mod_history():
    history = read_history()
    notes = read_notes()
    new_notes = []
    for note in notes:
        if note not in history or (notes[note] > history[note]):
            new_notes.append(note)
    with open('mod_history.md','a') as f:
        for note in new_notes:
            f.write(note+'/'+str(notes[note])+'\n')
    

# ok
def add_notes_html(note_name):
    tag = f"""\n\t<a onclick="loadNote('{note_name}')">\n\t\t<span class="noteBtn">{note_name[:-3]}</span>\n\t</a>"""
    with open("notes.html", 'r') as f:
        html = f.read()
        
    pattern = rf"<a.*?>.*?</a>"
    match = list(re.finditer(pattern,html,re.DOTALL))
    if match:
        start = match[-1].end()  # Use end() instead of start()
        html = html[:start] + tag + html[start:]
    
    with open('notes.html', 'w') as f:
        f.write(html+'\n')


# ok
def remove_notes_html(note_name):
    with open("notes.html", 'r') as f:
        html = f.read()
    pattern = r'<a.*?</a>'
    matches = re.findall(pattern, html, flags=re.DOTALL)
    
    for match in matches:
        if note_name in match:
            tag_to_remove = f'{match}'
            html = html.replace(tag_to_remove, '')
    
    with open("notes.html", 'w') as f:
        f.write(html)        
            

# ok
def update_notes_html():
    # Get datas
    notes_cur = read_notes()
    notes_pre = read_history()
    
    print(f'curNote:\n\t{notes_cur}\n\npreNote:\n\t{notes_pre}\n')
    
    # Get the differeces
    notes_mod = {}
    notes_add = {}
    notes_del = []
    for note in notes_pre:
        if note not in notes_cur:
            notes_del.append(note)
    for note in notes_cur:
        if note not in notes_pre:
            notes_add[note] = notes_cur[note]
        elif notes_cur[note] > notes_pre[note]:
            notes_mod[note] = notes_cur[note]
            
    print(f'mod\n{notes_mod}\n\nadd\n{notes_add}\n\ndel\n{notes_del}\n')
    
    # add and remove tags from html
    for note in notes_add:
        add_notes_html(note)
    for note in notes_del:
        remove_notes_html(note)
        with open('mod_history.md', 'a') as f:
            f.write(f'{note}/-{notes_pre[note]}\n')


def main():
    update_notes_html()
    update_mod_history()
    return 0


main()