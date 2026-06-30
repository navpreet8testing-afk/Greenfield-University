#!/usr/bin/env python3
"""Apply display fonts, remove emojis, fix images across all 14 static HTML pages."""

import re
import os
import glob

GOOGLE_FONTS_LINK = """<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Cinzel:wght@700;900&family=Space+Grotesk:wght@400;700&family=Chakra+Petch:wght@600;700&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Bebas+Neue&family=Great+Vibes&family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;700&family=Lora:wght@400;700&display=swap" rel="stylesheet">"""

OLD_FONTS_LINK = """<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">"""

# Image mapping: context keyword -> Unsplash URL for Indian university/college context
IMG_MAP = {
    # Academic / education
    "classroom": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=120&q=80",
    "lecture": "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=120&q=80",
    "student_study": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=120&q=80",
    "books": "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=120&q=80",
    "library": "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=120&q=80",
    "graduation": "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=120&q=80",
    "university": "https://images.unsplash.com/photo-1562774053-701939374585?w=120&q=80",
    "campus": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=120&q=80",
    # Tech / science
    "lab": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=120&q=80",
    "research": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=120&q=80",
    "tech": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=120&q=80",
    "coding": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=120&q=80",
    "ai_robot": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=120&q=80",
    "biotech": "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=120&q=80",
    "data": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&q=80",
    # Business / career
    "business": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=120&q=80",
    "career": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=120&q=80",
    "team": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=120&q=80",
    "office": "https://images.unsplash.com/photo-1497366216548-37526070297c?w=120&q=80",
    "placement": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=120&q=80",
    "money": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=120&q=80",
    # Campus life
    "sports": "https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=120&q=80",
    "basketball": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=120&q=80",
    "culture": "https://images.unsplash.com/photo-1511578314322-379afb476865?w=120&q=80",
    "music": "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=120&q=80",
    "cafeteria": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=120&q=80",
    "hostel": "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=120&q=80",
    "nature": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=120&q=80",
    "garden": "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=120&q=80",
    "yoga": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=120&q=80",
    "chess": "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=120&q=80",
    "swimming": "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=120&q=80",
    "cricket": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=120&q=80",
    "photography": "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=120&q=80",
    "art": "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=120&q=80",
    "drama": "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=120&q=80",
    "dance": "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=120&q=80",
    # Awards / achievements
    "trophy": "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=120&q=80",
    "medal": "https://images.unsplash.com/photo-1607604276583-c986900aaaa4?w=120&q=80",
    "certificate": "https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=120&q=80",
    "award": "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=120&q=80",
    # Communication / contact
    "location": "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=120&q=80",
    "phone": "https://images.unsplash.com/photo-1580910051074-3eb694886571?w=120&q=80",
    "email": "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=120&q=80",
    "clock": "https://images.unsplash.com/photo-1504333638930-c8787321eee0?w=120&q=80",
    # Global / network
    "globe": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=120&q=80",
    "network": "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=120&q=80",
    "city": "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=120&q=80",
    "factory": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=120&q=80",
    "government": "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=120&q=80",
    # Misc
    "security": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=120&q=80",
    "calendar": "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=120&q=80",
    "download": "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=120&q=80",
    "form": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=120&q=80",
    "medical": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=120&q=80",
    "food": "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=120&q=80",
    "stadium": "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=120&q=80",
    "hotel": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=120&q=80",
    "building": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&q=80",
    "night": "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=120&q=80",
    "coffee": "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=120&q=80",
    "salad": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=120&q=80",
    "microphone": "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=120&q=80",
    "podcast": "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=120&q=80",
    "presentation": "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=120&q=80",
    "interview": "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&q=80",
    "resume": "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=120&q=80",
    "construction": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=120&q=80",
    "link": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=120&q=80",
    "lock": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=120&q=80",
    "newsletter": "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=120&q=80",
    "monitor": "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=120&q=80",
    "brain": "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=120&q=80",
    "workshop": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=120&q=80",
    "handshake": "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=120&q=80",
    "document": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=120&q=80",
    "shield": "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=120&q=80",
    "lightning": "https://images.unsplash.com/photo-1606204280238-1bfb3a2b0e65?w=120&q=80",
    "dna": "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=120&q=80",
    "sprout": "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=120&q=80",
    "chain": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=120&q=80",
    "chart": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&q=80",
    "compass": "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=120&q=80",
    "architecture": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&q=80",
    "web": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=120&q=80",
    "satellite": "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=120&q=80",
    "mission": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=120&q=80",
    "partnership": "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=120&q=80",
    "innovation": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=120&q=80",
    "scholarship": "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=120&q=80",
    "process": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=120&q=80",
    "checklist": "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=120&q=80",
    "guitar": "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=120&q=80",
    "dress": "https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?w=120&q=80",
    "running": "https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=120&q=80",
    "tabletennis": "https://images.unsplash.com/photo-1534158914592-062992fbe900?w=120&q=80",
    "badminton": "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=120&q=80",
    "tennis": "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=120&q=80",
    "soccer": "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=120&q=80",
    "hiking": "https://images.unsplash.com/photo-1551632811-561732d1e306?w=120&q=80",
    "scenery": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=120&q=80",
    "house": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=120&q=80",
    "gym": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=120&q=80",
    "camera": "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=120&q=80",
    "fees": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=120&q=80",
    "results": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=120&q=80",
    "attendance": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=120&q=80",
    "payment": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=120&q=80",
    "registration": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=120&q=80",
    "schedule": "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=120&q=80",
    "support": "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=120&q=80",
    "machine": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=120&q=80",
    "frequency": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=120&q=80",
}

# Emoji to image key mapping
EMOJI_IMG_MAP = {
    # Academic
    "🎓": "graduation", "📚": "books", "📖": "books", "📜": "document", "📐": "architecture",
    "💻": "coding", "🔬": "lab", "🧪": "biotech", "🧬": "dna", "🤖": "ai_robot",
    "📊": "chart", "📈": "chart", "🏢": "building", "🏫": "university", "🎓": "graduation",
    "🌐": "web", "🔗": "link", "🌍": "globe", "🌎": "globe", "⚡": "lightning",
    "🌱": "sprout", "🌿": "sprout", "⛓️": "chain", "📎": "document", "📄": "document",
    "📝": "document", "📋": "checklist", "✏️": "form", "📥": "download",
    "🗓️": "calendar", "📅": "calendar", "👑": "trophy", "🏅": "medal", "🏆": "trophy",
    # Campus life
    "🏀": "basketball", "🏏": "cricket", "🏟️": "stadium", "🏠": "house", "🏡": "house",
    "🏞️": "scenery", "🌙": "night", "☕": "coffee", "🥗": "salad", "🍽️": "food",
    "🏥": "medical", "🏨": "hotel", "📸": "camera", "🎨": "art", "🎭": "drama",
    "💃": "dance", "🎵": "music", "🎤": "microphone", "🎸": "guitar", "👗": "dress",
    "🏃": "running", "🏊": "swimming", "🎾": "tennis", "🏸": "badminton", "🏓": "tabletennis",
    "⚽": "soccer", "🏋️": "gym", "🧘": "yoga", "♟️": "chess", "🏃": "running",
    "🔭": "research", "📡": "satellite", "🧠": "brain", "🖥️": "monitor",
    # Business / career
    "💼": "business", "💰": "money", "🎯": "compass", "📍": "location", "🤝": "handshake",
    "🏗️": "construction", "🔄": "process", "🌏": "globe", "🏙️": "city", "🏛️": "government",
    "🏭": "factory",
    # Communication
    "📞": "phone", "✉️": "email", "🕐": "clock", "⏰": "clock", "📷": "camera",
    "🔒": "security", "📬": "newsletter", "💡": "innovation", "🚀": "innovation",
    "👔": "business", "👨": "graduation",
    # Portal specific
    "💳": "payment", "📊": "results",
    # Check marks (keep these, not emoji)
    "✓": None, "★": None,
    # Research specific
    "🔍": "research", "🛠️": "workshop",
}

# News card emoji to image URL mapping (for the large gradient boxes)
NEWS_IMG_MAP = {
    "🔬": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&q=80",
    "📝": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
    "💻": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80",
    "🌍": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
    "🏆": "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&q=80",
    "📖": "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=600&q=80",
    "🎓": "https://images.unsplash.com/photo-1523050854058-8df90110c476?w=600&q=80",
    "🏅": "https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?w=600&q=80",
}

def get_img_url(emoji, context=""):
    """Get image URL for an emoji based on mapping."""
    key = EMOJI_IMG_MAP.get(emoji)
    if key is None:
        return None  # Keep as-is (e.g., check marks, stars)
    return IMG_MAP.get(key, IMG_MAP["university"])

def replace_google_fonts(content):
    """Replace Google Fonts link."""
    return content.replace(OLD_FONTS_LINK, GOOGLE_FONTS_LINK)

def replace_html_entity_emojis(content):
    """Replace HTML entity-encoded emojis (like &#x1F3C6;) with their Unicode chars for processing."""
    import html
    # Match common HTML entity patterns for emojis
    entity_map = {
        '&#x1F3C6;': '🏆', '&#x1F4CA;': '📊', '&#x1F4DC;': '📜',
        '&#x2705;': '✓', '&#x1F6E1;&#xFE0F;': '🛡️', '&#x1F30D;': '🌐',
        '&#x1F3C5;': '🏅', '&#x1F4D6;': '📖', '&#x1F33F;': '🌿',
        '&#x1F4A1;': '💡', '&#x1F4BC;': '💼', '&#x1F310;': '🌐',
        '&#x1F91D;': '🤝', '&#x1F4BB;': '💻',
        '&#x1F3C6;&#xFE0F;': '🏆',
    }
    for entity, char in entity_map.items():
        content = content.replace(entity, char)
    return content

def replace_stat_icon_emojis(content):
    """Replace emoji inside .stat-icon divs with img tags."""
    # Pattern: <div class="stat-icon ...">EMOJI</div>
    def replacer(m):
        classes = m.group(1)
        emoji = m.group(2).strip()
        url = get_img_url(emoji)
        if url:
            return f'<div class="{classes}"><img src="{url}" alt="" aria-hidden="true"></div>'
        return m.group(0)
    
    content = re.sub(
        r'<div class="(stat-icon[^"]*)"[^>]*>(\S+?)</div>',
        replacer, content
    )
    return content

def replace_vision_mission_icon_emojis(content):
    """Replace emoji inside .vision-mission-icon divs."""
    def replacer(m):
        attrs = m.group(1)
        emoji = m.group(2).strip()
        url = get_img_url(emoji)
        if url:
            return f'<div class="vision-mission-icon" {attrs}><img src="{url}" alt="" aria-hidden="true"></div>'
        return m.group(0)
    
    content = re.sub(
        r'<div class="vision-mission-icon"([^>]*)>(\S+?)</div>',
        replacer, content
    )
    return content

def replace_accred_icon_emojis(content):
    """Replace emoji inside .accred-icon divs."""
    def replacer(m):
        attrs = m.group(1)
        emoji = m.group(2).strip()
        url = get_img_url(emoji)
        if url:
            return f'<div class="accred-icon" {attrs}><img src="{url}" alt="" aria-hidden="true"></div>'
        return m.group(0)
    
    content = re.sub(
        r'<div class="accred-icon"([^>]*)>(.*?)</div>',
        replacer, content
    )
    return content

def replace_award_icon_emojis(content):
    """Replace emoji inside .award-icon-wrap divs."""
    def replacer(m):
        emoji = m.group(1).strip()
        url = get_img_url(emoji)
        if url:
            return f'<div class="award-icon-wrap"><img src="{url}" alt="" aria-hidden="true"></div>'
        return m.group(0)
    
    content = re.sub(
        r'<div class="award-icon-wrap">(.*?)</div>',
        replacer, content
    )
    return content

def replace_quick_link_icon_emojis(content):
    """Replace emoji inside .quick-link-icon divs."""
    def replacer(m):
        emoji = m.group(1).strip()
        url = get_img_url(emoji)
        if url:
            return f'<div class="quick-link-icon"><img src="{url}" alt="" aria-hidden="true"></div>'
        return m.group(0)
    
    content = re.sub(
        r'<div class="quick-link-icon">(.*?)</div>',
        replacer, content
    )
    return content

def replace_inline_text_emojis(content):
    """Replace inline date/location/time emojis with text labels."""
    # Pattern: <span class="text-emerald font-medium">📅</span> DATE_TEXT
    content = re.sub(
        r'<span class="text-emerald font-medium">📅</span>\s*',
        '<span class="text-emerald font-medium font-body-alt">Date:</span> ',
        content
    )
    content = re.sub(
        r'<span class="text-emerald font-medium">📍</span>\s*',
        '<span class="text-emerald font-medium font-body-alt">Location:</span> ',
        content
    )
    content = re.sub(
        r'<span class="text-emerald font-medium">⏰</span>\s*',
        '<span class="text-emerald font-medium font-body-alt">Time:</span> ',
        content
    )
    return content

def replace_news_card_emojis(content):
    """Replace news card gradient+emoji boxes with real images."""
    def replacer(m):
        emoji = m.group(1).strip()
        url = NEWS_IMG_MAP.get(emoji)
        if url:
            return f'<img src="{url}" alt="" class="news-card-img" loading="lazy">'
        return m.group(0)
    
    content = re.sub(
        r'<span class="text-white text-5xl">(.*?)</span>',
        replacer, content
    )
    return content

def replace_gallery_cta_emoji(content):
    """Replace gallery virtual tour emoji with image."""
    content = re.sub(
        r'<div style="width:4rem;height:4rem;border-radius:1rem;background:var\(--emerald-50\);display:flex;align-items:center;justify-content:center;margin:0 auto 1\.5rem;font-size:2rem">🎓</div>',
        '<div style="width:4rem;height:4rem;border-radius:1rem;overflow:hidden;margin:0 auto 1.5rem"><img src="https://images.unsplash.com/photo-1523050854058-8df90110c476?w=120&q=80" alt="" style="width:100%;height:100%;object-fit:cover" loading="lazy"></div>',
        content
    )
    return content

def replace_newsletter_emoji(content):
    """Replace newsletter emoji with image."""
    content = re.sub(
        r'<div class="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald text-3xl mx-auto mb-4">📬</div>',
        '<div class="w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-4"><img src="https://images.unsplash.com/photo-1567521464027-f127ff144326?w=120&q=80" alt="" style="width:100%;height:100%;object-fit:cover" loading="lazy"></div>',
        content
    )
    return content

def replace_portal_login_emoji(content):
    """Replace portal login emoji."""
    content = re.sub(
        r'<div style="width:3\.5rem; height:3\.5rem; border-radius:0\.75rem; background:var\(--emerald\); color:white; display:flex; align-items:center; justify-content:center; margin:0 auto 1rem; font-size:1\.25rem;">🔒</div>',
        '<div style="width:3.5rem; height:3.5rem; border-radius:0.75rem; overflow:hidden; margin:0 auto 1rem"><img src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=120&q=80" alt="" style="width:100%;height:100%;object-fit:cover" loading="lazy"></div>',
        content
    )
    return content

def replace_portal_support_emojis(content):
    """Replace portal support section emojis in dark cards."""
    pattern = r'<div style="width:3rem; height:3rem; border-radius:0\.75rem; background:rgba\(5,150,105,0\.2\); color:var\(--emerald-400\); display:flex; align-items:center; justify-content:center; margin:0 auto 1rem; font-size:1\.25rem;">(.*?)</div>'
    def replacer(m):
        emoji = m.group(1).strip()
        url = get_img_url(emoji)
        if url:
            return f'<div style="width:3rem; height:3rem; border-radius:0.75rem; overflow:hidden; margin:0 auto 1rem"><img src="{url}" alt="" style="width:100%;height:100%;object-fit:cover" loading="lazy"></div>'
        return m.group(0)
    content = re.sub(pattern, replacer, content)
    return content

def replace_contact_emojis(content):
    """Replace contact page stat-icon emojis (which don't have .stat-icon class)."""
    # Pattern: <div class="stat-icon" style="flex-shrink:0;">EMOJI</div>
    def replacer(m):
        emoji = m.group(1).strip()
        url = get_img_url(emoji)
        if url:
            return f'<div class="stat-icon" style="flex-shrink:0;overflow:hidden"><img src="{url}" alt="" aria-hidden="true"></div>'
        return m.group(0)
    
    content = re.sub(
        r'<div class="stat-icon" style="flex-shrink:0;">(.*?)</div>',
        replacer, content
    )
    return content

def replace_campus_life_emojis(content):
    """Replace campus-life specific emojis in facility cards."""
    # Pattern for facility icon: <div class="text-3xl mb-3">EMOJI</div>
    def replacer(m):
        emoji = m.group(1).strip()
        url = get_img_url(emoji)
        if url:
            return f'<div class="mb-3" style="width:3rem;height:3rem;border-radius:0.75rem;overflow:hidden"><img src="{url}" alt="" style="width:100%;height:100%;object-fit:cover" loading="lazy"></div>'
        return m.group(0)
    
    content = re.sub(
        r'<div class="text-3xl mb-3">(.*?)</div>',
        replacer, content
    )
    return content

def replace_social_media_emoji(content):
    """Replace 📷 emoji in Instagram card."""
    content = content.replace(
        '<div class="stat-icon" style="background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888); color:white; font-size:1.25rem;">📷</div>',
        '<div class="stat-icon" style="background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888); color:white; font-size:1.25rem;overflow:hidden"><img src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=120&q=80" alt="" style="width:100%;height:100%;object-fit:cover" loading="lazy"></div>'
    )
    return content

def replace_event_category_emojis(content):
    """Replace emojis in event category card icons."""
    # Pattern: <div class="text-3xl mb-4">EMOJI</div> in events page
    def replacer(m):
        emoji = m.group(1).strip()
        url = get_img_url(emoji)
        if url:
            return f'<div class="mb-4" style="width:3rem;height:3rem;border-radius:0.75rem;overflow:hidden"><img src="{url}" alt="" style="width:100%;height:100%;object-fit:cover" loading="lazy"></div>'
        return m.group(0)
    
    content = re.sub(
        r'<div class="text-3xl mb-4">(.*?)</div>',
        replacer, content
    )
    return content

def replace_remaining_standalone_emojis(content):
    """Catch any remaining emoji characters used as standalone icons."""
    # Remove checkmarks from replacement (keep them as functional)
    lines = content.split('\n')
    result = []
    for line in lines:
        # Look for lines where emoji is the only content in a span/div (icon usage)
        # But skip star ratings and checkmarks
        if '★★★★' in line:
            result.append(line)
            continue
        if '>✓<' in line or '>✓' in line:
            result.append(line)
            continue
        result.append(line)
    return '\n'.join(result)

def add_quote_font_class(content):
    """Add font-quote class to testimonial quote paragraphs in testimonials.html."""
    # Add to testimonial text paragraphs (those in student/parent/employer cards)
    # Pattern: <p class="text-sm text-muted leading-relaxed">"QUOTE TEXT"</p>
    # Only in testimonials page
    if 'testimonials.html' not in content[:500].lower():
        return content
    content = re.sub(
        r'(<p class="text-sm( text-slate-400)? leading-relaxed")>',
        r'\1 class="font-quote text-sm leading-relaxed"',
        content
    )
    return content

def process_file(filepath):
    """Process a single HTML file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # 1. Replace Google Fonts link
    content = replace_google_fonts(content)
    
    # 2. Replace HTML entity emojis
    content = replace_html_entity_emojis(content)
    
    # 3. Replace emoji in icon containers
    content = replace_stat_icon_emojis(content)
    content = replace_vision_mission_icon_emojis(content)
    content = replace_accred_icon_emojis(content)
    content = replace_award_icon_emojis(content)
    content = replace_quick_link_icon_emojis(content)
    content = replace_contact_emojis(content)
    content = replace_social_media_emoji(content)
    content = replace_portal_login_emoji(content)
    content = replace_portal_support_emojis(content)
    content = replace_gallery_cta_emoji(content)
    content = replace_newsletter_emoji(content)
    
    # 4. Replace campus-life specific emojis
    content = replace_campus_life_emojis(content)
    content = replace_event_category_emojis(content)
    
    # 5. Replace news card gradient+emoji boxes
    content = replace_news_card_emojis(content)
    
    # 6. Replace inline date/location/time emojis
    content = replace_inline_text_emojis(content)
    
    # 7. Clean remaining
    content = replace_remaining_standalone_emojis(content)
    
    # 8. Add font classes to elements not handled by CSS
    # Add font-feature-title to feature/tile h3 headings
    # This is optional since CSS handles section-title, stat-number, etc.
    
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