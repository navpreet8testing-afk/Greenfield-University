#!/usr/bin/env python3
"""Phase 2: Aggressive emoji cleanup for remaining patterns."""

import re
import os

# Extended emoji-to-image mapping
E2I = {
    "🏠": "house", "🏡": "house", "🏢": "building", "🏛": "government", "🏭": "factory",
    "🏙": "city", "🌎": "globe", "🌐": "web",
    "🏀": "basketball", "🏏": "cricket", "⚽": "soccer", "🏸": "badminton", "🎾": "tennis",
    "🏊": "swimming", "🏃": "running", "🏓": "tabletennis", "♟": "chess", "🧘": "yoga",
    "🏋": "gym",
    "💻": "coding", "🤖": "ai_robot", "🧠": "brain", "🌐": "web",
    "🎵": "music", "💃": "dance", "🎭": "drama", "🎨": "art", "📸": "camera",
    "🎤": "microphone", "🎸": "guitar", "👗": "dress",
    "🍽": "food", "🥗": "salad", "☕": "coffee", "🌙": "night",
    "📚": "books", "🔬": "lab", "❓": "support",
    "🤖": "ai_robot", "📊": "chart", "⛓": "chain", "🌱": "sprout", "🧬": "dna",
    "⚡": "lightning", "🔒": "security", "📜": "document",
    "🏫": "university", "👨": "graduation", "🎓": "graduation",
    "🏆": "trophy", "📈": "chart", "🎯": "compass", "💛": "trophy",
    "📍": "location", "📅": "calendar", "⏰": "clock",
    "💰": "money", "🛠": "workshop", "📄": "document", "🧠": "brain",
    "🤝": "handshake", "📝": "document", "🖼": "art",
    "🛡": "shield", "💡": "innovation", "🔮": "research",
    "📡": "satellite", "🖥": "monitor", "🧪": "biotech",
}

IMG_MAP = {
    "house": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=120&q=80",
    "building": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&q=80",
    "government": "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=120&q=80",
    "factory": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=120&q=80",
    "city": "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=120&q=80",
    "globe": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=120&q=80",
    "web": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=120&q=80",
    "basketball": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=120&q=80",
    "cricket": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=120&q=80",
    "soccer": "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=120&q=80",
    "badminton": "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=120&q=80",
    "tennis": "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=120&q=80",
    "swimming": "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=120&q=80",
    "running": "https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=120&q=80",
    "tabletennis": "https://images.unsplash.com/photo-1534158914592-062992fbe900?w=120&q=80",
    "chess": "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=120&q=80",
    "yoga": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=120&q=80",
    "gym": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=120&q=80",
    "coding": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=120&q=80",
    "ai_robot": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=120&q=80",
    "brain": "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=120&q=80",
    "music": "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=120&q=80",
    "dance": "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=120&q=80",
    "drama": "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=120&q=80",
    "art": "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=120&q=80",
    "camera": "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=120&q=80",
    "microphone": "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=120&q=80",
    "guitar": "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=120&q=80",
    "dress": "https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?w=120&q=80",
    "food": "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=120&q=80",
    "salad": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=120&q=80",
    "coffee": "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=120&q=80",
    "night": "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=120&q=80",
    "books": "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=120&q=80",
    "lab": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=120&q=80",
    "support": "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=120&q=80",
    "chart": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&q=80",
    "chain": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=120&q=80",
    "sprout": "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=120&q=80",
    "dna": "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=120&q=80",
    "lightning": "https://images.unsplash.com/photo-1606204280238-1bfb3a2b0e65?w=120&q=80",
    "security": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=120&q=80",
    "document": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=120&q=80",
    "university": "https://images.unsplash.com/photo-1562774053-701939374585?w=120&q=80",
    "graduation": "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=120&q=80",
    "trophy": "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=120&q=80",
    "compass": "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=120&q=80",
    "location": "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=120&q=80",
    "calendar": "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=120&q=80",
    "clock": "https://images.unsplash.com/photo-1504333638930-c8787321eee0?w=120&q=80",
    "money": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=120&q=80",
    "workshop": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=120&q=80",
    "handshake": "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=120&q=80",
    "shield": "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=120&q=80",
    "innovation": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=120&q=80",
    "research": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=120&q=80",
    "satellite": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=120&q=80",
    "monitor": "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=120&q=80",
    "biotech": "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=120&q=80",
    "presentation": "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=120&q=80",
    "interview": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&q=80",
    "resume": "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=120&q=80",
    "construction": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=120&q=80",
    "scholarship": "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=120&q=80",
    "process": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=120&q=80",
    "checklist": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=120&q=80",
    "link": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=120&q=80",
    "newsletter": "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=120&q=80",
    "stadium": "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=120&q=80",
    "hotel": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=120&q=80",
    "scenery": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=120&q=80",
    "architecture": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&q=80",
}

def get_url(emoji):
    key = E2I.get(emoji)
    if key:
        return IMG_MAP.get(key, IMG_MAP["university"])
    return None

# Emojis to KEEP (functional text, not decorative icons)
KEEP = set('✓★⭐▶▪▫●○►') 

def replace_standalone_div_emojis(content):
    """Replace <div style="font-size:Xrem;...">EMOJI</div> patterns."""
    # Pattern 1: <div style="font-size:2.5rem;margin-bottom:1rem">EMOJI</div>
    def repl(m):
        full = m.group(0)
        emoji_match = re.search(r'>([^\s<]+?)</div>', full)
        if emoji_match:
            emoji = emoji_match.group(1)
            if emoji in KEEP:
                return full
            url = get_url(emoji)
            if url:
                style = re.search(r'style="([^"]*)"', full)
                s = style.group(1) if style else ""
                return f'<div style="{s};overflow:hidden"><img src="{url}" alt="" style="width:100%;height:100%;object-fit:cover" loading="lazy"></div>'
        return full
    
    content = re.sub(
        r'<div style="font-size:[\d.]+rem[^"]*">[^\s<]{1,10}</div>',
        repl, content
    )
    return content

def replace_standalone_span_emojis(content):
    """Replace <span style="font-size:Xrem">EMOJI</span> patterns."""
    def repl(m):
        full = m.group(0)
        emoji_match = re.search(r'>([^\s<]+?)</span>', full)
        if emoji_match:
            emoji = emoji_match.group(1)
            if emoji in KEEP:
                return full
            url = get_url(emoji)
            if url:
                style = re.search(r'style="([^"]*)"', full)
                s = style.group(1) if style else ""
                return f'<span style="{s};display:inline-block;width:1.5rem;height:1.5rem;border-radius:0.375rem;overflow:hidden;vertical-align:middle"><img src="{url}" alt="" style="width:100%;height:100%;object-fit:cover" loading="lazy"></span>'
        return full
    
    content = re.sub(
        r'<span style="font-size:[\d.]+rem">[^\s<]{1,10}</span>',
        repl, content
    )
    return content

def replace_h3_leading_emojis(content):
    """Replace emoji at start of h3 text."""
    def repl(m):
        emoji = m.group(1)
        rest = m.group(2)
        if emoji in KEEP:
            return m.group(0)
        url = get_url(emoji)
        if url:
            return f'<img src="{url}" alt="" style="width:1.25rem;height:1.25rem;object-fit:cover;border-radius:0.25rem;display:inline-block;vertical-align:middle;margin-right:0.5rem" loading="lazy">{rest}'
        return m.group(0)
    
    content = re.sub(
        r'(<h3[^>]*>)(\s*)([^\s<]{1,10})(\s+)',
        lambda m: f'{m.group(1)}{m.group(2)}{m.group(3)}{m.group(4)}' if m.group(3) in KEEP else repl2(m),
        content
    )
    return content

def replace_h3_leading_emojis_v2(content):
    """Replace emoji at start of h3 text - improved version."""
    lines = content.split('\n')
    result = []
    for line in lines:
        # Match h3 tags with emoji at start
        m = re.match(r'^(\s*<h3[^>]*>)(\s*)([^\s<>]{1,6})(\s+)(.*)', line)
        if m:
            prefix = m.group(1)
            space1 = m.group(2)
            emoji = m.group(3)
            space2 = m.group(4)
            rest = m.group(5)
            if emoji in KEEP:
                result.append(line)
                continue
            url = get_url(emoji)
            if url:
                new_line = f'{prefix}{space1}<img src="{url}" alt="" style="width:1.25rem;height:1.25rem;object-fit:cover;border-radius:0.25rem;display:inline-block;vertical-align:middle;margin-right:0.5rem" loading="lazy">{space2}{rest}'
                result.append(new_line)
                continue
        result.append(line)
    return '\n'.join(result)

def replace_gradient_box_emojis(content):
    """Replace gradient boxes containing emojis with image backgrounds."""
    def repl(m):
        full = m.group(0)
        emoji_match = re.search(r'font-size:2\.5rem[^"]*">([^<]+)', full)
        if emoji_match:
            emoji = emoji_match.group(1).strip()
            if emoji in KEEP:
                return full
            url = get_url(emoji)
            if url:
                return f'<div style="width:100%;height:140px;border-radius:var(--radius-lg);overflow:hidden;margin-bottom:1rem"><img src="{url}" alt="" style="width:100%;height:100%;object-fit:cover" loading="lazy"></div>'
        return full
    
    content = re.sub(
        r'<div style="width:100%;height:140px;background:linear-gradient\([^)]+\);border-radius:var\(--radius-lg\);display:flex;align-items:center;justify-content:center;font-size:2\.5rem[^"]*">[^<]+</div>',
        repl, content
    )
    return content

def replace_inline_date_location_time(content):
    """Replace remaining date/location/time emojis that might not have been caught."""
    # <span style="font-size:1rem">📅</span> followed by text
    content = re.sub(
        r'<span style="font-size:1rem">📅</span>\s*',
        '<span style="font-size:1rem;color:var(--emerald);font-family:\'DM Sans\',sans-serif">Date:</span> ',
        content
    )
    content = re.sub(
        r'<span style="font-size:1rem">📍</span>\s*',
        '<span style="font-size:1rem;color:var(--emerald);font-family:\'DM Sans\',sans-serif">Location:</span> ',
        content
    )
    content = re.sub(
        r'<span style="font-size:1rem">⏰</span>\s*',
        '<span style="font-size:1rem;color:var(--emerald);font-family:\'DM Sans\',sans-serif">Time:</span> ',
        content
    )
    return content

def replace_faculty_page_emojis(content):
    """Replace specific emojis on faculty page."""
    # <div style="font-size:1.5rem;margin-bottom:0.5rem">EMOJI</div> in faculty stats
    def repl(m):
        full = m.group(0)
        emoji_match = re.search(r'>([^\s<]+?)</div>', full)
        if emoji_match:
            emoji = emoji_match.group(1)
            if emoji in KEEP:
                return full
            url = get_url(emoji)
            if url:
                return f'<div style="font-size:1.5rem;margin-bottom:0.5rem;width:1.5rem;height:1.5rem;border-radius:0.375rem;overflow:hidden"><img src="{url}" alt="" style="width:100%;height:100%;object-fit:cover" loading="lazy"></div>'
        return full
    
    content = re.sub(
        r'<div style="font-size:1\.5rem;margin-bottom:0\.5rem">[^\s<]{1,10}</div>',
        repl, content
    )
    return content

def replace_careers_inline_emojis(content):
    """Replace inline emojis in careers page cards (not inside stat-icon)."""
    def repl(m):
        full = m.group(0)
        emoji_match = re.search(r'>([^\s<]+?)</div>', full)
        if emoji_match:
            emoji = emoji_match.group(1)
            if emoji in KEEP:
                return full
            url = get_url(emoji)
            if url:
                return f'<div style="width:2.5rem;height:2.5rem;border-radius:0.5rem;overflow:hidden;flex-shrink:0"><img src="{url}" alt="" style="width:100%;height:100%;object-fit:cover" loading="lazy"></div>'
        return full
    
    # Pattern in careers: emoji inside small styled divs
    content = re.sub(
        r'<div style="width:2\.5rem;height:2\.5rem;border-radius:0\.5rem;background:[^"]+;display:flex;align-items:center;justify-content:center;font-size:1\.25rem;flex-shrink:0">[^\s<]{1,10}</div>',
        repl, content
    )
    return content

def replace_events_category_emojis(content):
    """Replace emojis in events category icons."""
    def repl(m):
        full = m.group(0)
        emoji_match = re.search(r'>([^\s<]+?)</div>', full)
        if emoji_match:
            emoji = emoji_match.group(1)
            if emoji in KEEP:
                return full
            url = get_url(emoji)
            if url:
                style = re.search(r'style="([^"]*)"', full)
                s = style.group(1) if style else ""
                return f'<div style="{s};overflow:hidden"><img src="{url}" alt="" style="width:100%;height:100%;object-fit:cover" loading="lazy"></div>'
        return full
    
    # Pattern: <div style="width:3rem;height:3rem;...font-size:1.25rem;...">EMOJI</div>
    content = re.sub(
        r'<div style="width:3rem;height:3rem;[^"]*font-size:1\.25rem[^"]*">[^\s<]{1,10}</div>',
        repl, content
    )
    return content

def replace_alumni_chapter_emojis(content):
    """Replace emojis in alumni chapter cards."""
    def repl(m):
        full = m.group(0)
        emoji_match = re.search(r'>([^\s<]+?)</div>', full)
        if emoji_match:
            emoji = emoji_match.group(1)
            if emoji in KEEP:
                return full
            url = get_url(emoji)
            if url:
                return f'<div class="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald text-lg" style="overflow:hidden"><img src="{url}" alt="" style="width:100%;height:100%;object-fit:cover" loading="lazy"></div>'
        return full
    
    content = re.sub(
        r'<div class="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald text-lg">[^\s<]{1,10}</div>',
        repl, content
    )
    return content

def replace_research_inline_emojis(content):
    """Replace emojis in research page inline text."""
    # Pattern: <span>EMOJI</span> in research project items
    def repl(m):
        full = m.group(0)
        emoji_match = re.search(r'>([^\s<]+?)</span>', full)
        if emoji_match:
            emoji = emoji_match.group(1)
            if emoji in KEEP:
                return full
            url = get_url(emoji)
            if url:
                return f'<span style="display:inline-block;width:1.25rem;height:1.25rem;border-radius:0.25rem;overflow:hidden;vertical-align:middle"><img src="{url}" alt="" style="width:100%;height:100%;object-fit:cover" loading="lazy"></span>'
        return full
    
    content = re.sub(
        r'<span style="font-size:1\.25rem">[^\s<]{1,10}</span>',
        repl, content
    )
    return content

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    content = replace_standalone_div_emojis(content)
    content = replace_standalone_span_emojis(content)
    content = replace_h3_leading_emojis_v2(content)
    content = replace_gradient_box_emojis(content)
    content = replace_inline_date_location_time(content)
    content = replace_faculty_page_emojis(content)
    content = replace_careers_inline_emojis(content)
    content = replace_events_category_emojis(content)
    content = replace_alumni_chapter_emojis(content)
    content = replace_research_inline_emojis(content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    base = '/home/z/my-project/public'
    files = [
        'about.html', 'academics.html', 'admissions.html', 'alumni.html',
        'campus-life.html', 'careers.html', 'contact.html', 'events.html',
        'faculty.html', 'gallery.html', 'news.html', 'portal.html',
        'research.html', 'testimonials.html'
    ]
    
    changed = 0
    for f in files:
        path = os.path.join(base, f)
        if os.path.exists(path):
            if process_file(path):
                changed += 1
                print(f"  Updated: {f}")
            else:
                print(f"  No changes: {f}")
        else:
            print(f"  Not found: {f}")
    
    print(f"\nTotal files updated: {changed}/{len(files)}")

if __name__ == '__main__':
    main()