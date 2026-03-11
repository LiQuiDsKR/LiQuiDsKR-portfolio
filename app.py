from flask import Flask, render_template, jsonify, abort
from datetime import datetime
import os
import json

app = Flask(__name__)

# 기술 스택 아이콘 매핑 (skillicons.dev)
TECH_ICONS = {
    'Unity': 'unity',
    'C#': 'cs',
    'Spring': 'spring',
    'SQLite': 'sqlite',
    'Android': 'androidstudio',
    'Kotlin': 'kotlin',
    'Google Cloud': 'gcp',
    'Flask': 'flask',
    'HTML5': 'html',
    'CSS3': 'css',
    'JavaScript': 'js',
    'Python': 'python',
    'Java': 'java',
    'SQL': 'mysql',
    'MariaDB': 'mysql',
    'Node.js': 'nodejs',
    'Oracle Cloud': 'oracle',
    'AWS': 'aws',
    'Notion': 'notion',
    'GitHub': 'github',
    'PowerPoint': 'powerpoint',
    'Photoshop': 'photoshop',
    'Figma': 'figma',
    'Supabase': 'supabase',
    'Firebase': 'firebase',
}

def load_projects():
    """data/projects.json에서 프로젝트 데이터 로드"""
    json_path = os.path.join(os.path.dirname(__file__), 'data', 'projects.json')
    with open(json_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def resolve_main_image(project):
    """프로젝트의 대표 이미지 static 경로 반환"""
    folder = project.get('image', '')
    images = project.get('images', [])

    if images:
        first = images[0]
        path = os.path.join(app.static_folder, 'images', 'projects', folder, first)
        if os.path.exists(path):
            return f"images/projects/{folder}/{first}"
    else:
        # 구버전 단일 파일 호환
        path = os.path.join(app.static_folder, 'images', 'projects', folder)
        if os.path.exists(path):
            return f"images/projects/{folder}"

    return 'images/noimg.png'

# 기술 스택 데이터
TECH_STACK = {
    'languages': [
        {'name': 'Python', 'level': 90},
        {'name': 'C#', 'level': 75},
        {'name': 'Java', 'level': 70},
        {'name': 'JavaScript', 'level': 60},
        {'name': 'Kotlin', 'level': 40},
        {'name': 'SQL', 'level': 20},
    ],
    'libraries': [
        {'name': 'Flask', 'level': 90},
        {'name': 'Unity', 'level': 80},
        {'name': 'Android', 'level': 70},
        {'name': 'MariaDB', 'level': 65, 'custom_icon': 'stacks/mariadb.png'},
        {'name': 'Node.js', 'level': 55},
    ],
    'cloud': [
        {'name': 'Google Cloud', 'level': 90},
        {'name': 'Oracle Cloud', 'level': 75, 'custom_icon': 'stacks/oraclecloud.png'},
        {'name': 'AWS', 'level': 70},
    ],
    'collaboration': [
        {'name': 'Notion', 'level': 95},
        {'name': 'GitHub', 'level': 80},
    ],
    'design': [
        {'name': 'PowerPoint', 'level': 100, 'tooltip': '파워포인트 세부 기능을 활용하여 대부분의 디자인 역량을 커버할 수 있습니다.', 'custom_icon': 'stacks/powerpoint.png'},
        {'name': 'Photoshop', 'level': 45},
        {'name': 'Figma', 'level': 20},
    ]
}

# 개인 정보
PROFILE = {
    'name': '이재형',
    'email': 'littleplayer777@gmail.com',
    'github': 'https://github.com/LiQuiDsKR'
}

@app.route('/')
def index():
    """메인 페이지"""
    projects = load_projects()

    # 프로젝트 대표 이미지 경로 해석
    projects_with_images = []
    for project in projects:
        project_copy = project.copy()
        project_copy['main_image'] = resolve_main_image(project)
        projects_with_images.append(project_copy)

    return render_template('index.html',
                         profile=PROFILE,
                         projects=projects_with_images,
                         tech_stack=TECH_STACK,
                         tech_icons=TECH_ICONS)

@app.route('/api/projects')
def api_projects():
    """전체 프로젝트 목록 API"""
    return jsonify(load_projects())

@app.route('/api/projects/<int:project_id>')
def api_project_detail(project_id):
    """프로젝트 상세 API"""
    projects = load_projects()
    project = next((p for p in projects if p['id'] == project_id), None)
    if project is None:
        abort(404)

    project_copy = project.copy()
    project_copy['main_image'] = resolve_main_image(project)

    # tech_icons 정보 추가
    project_copy['tech_icons'] = {
        tech: TECH_ICONS.get(tech, tech.lower())
        for tech in project['tech_stack']
    }

    return jsonify(project_copy)

@app.route('/api/skills')
def api_skills():
    """기술 스택 데이터 API"""
    return jsonify(TECH_STACK)

@app.template_filter('year')
def year_filter(date_string):
    """날짜 포맷 필터"""
    try:
        return datetime.strptime(date_string, '%Y-%m').strftime('%Y년 %m월')
    except:
        return date_string

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
