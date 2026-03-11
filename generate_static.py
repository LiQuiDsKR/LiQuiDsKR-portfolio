"""
정적 index.html 생성 스크립트
Flask 템플릿을 렌더링하여 루트의 index.html로 저장합니다.
프로젝트 데이터를 window.PROJECTS_DATA로 임베드하여
API 없이도 모달이 작동하도록 합니다.

사용법: python generate_static.py
"""

import json
import re
from app import app, load_projects, resolve_main_image, TECH_STACK, TECH_ICONS, PROFILE

with app.test_request_context():
    projects = load_projects()

    projects_with_images = []
    for project in projects:
        p = project.copy()
        p['main_image'] = resolve_main_image(project)
        p['tech_icons'] = {
            tech: TECH_ICONS.get(tech, tech.lower())
            for tech in project['tech_stack']
        }
        projects_with_images.append(p)

    html = app.jinja_env.get_template('index.html').render(
        profile=PROFILE,
        projects=projects_with_images,
        tech_stack=TECH_STACK,
        tech_icons=TECH_ICONS
    )

# /static/ → static/ (상대 경로로 변환, 모든 속성 대상)
html = re.sub(r'="/static/', '="static/', html)

# window.PROJECTS_DATA 임베드 + STATIC_BASE 설정 (정적 모드)
projects_json = json.dumps(projects_with_images, ensure_ascii=False)
inject = (
    '<script>\n'
    f'window.STATIC_BASE = "static";\n'
    f'window.PROJECTS_DATA = {projects_json};\n'
    '</script>\n    '
)
html = html.replace('<script src="static/js/main.js"></script>',
                    inject + '<script src="static/js/main.js"></script>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("index.html generated OK")
print(f"  {len(projects_with_images)} projects embedded")
