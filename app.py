from flask import Flask, render_template, jsonify
from datetime import datetime
import os

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
    'Figma': 'figma'
}

# 프로젝트 데이터 (쉽게 추가/수정 가능)
PROJECTS = [
    {
        'id': 1,
        'title': 'AVOID',
        'description': 'Unity 기반 3D 모바일 게임입니다. 개인 프로젝트로 Unity 엔진을 활용하여 개발했습니다.',
        'tech_stack': ['Unity', 'C#'],
        'image': 'project1.jpg',
        'github_url': 'https://github.com/LiQuiDsKR/Avoid',
        'github_private': True,
        'service_url': None,
        'date': '2025-11',
        'date_range': '2025.11 ~ 현재',
        'category': '게임',
        'subtitle': 'Unity 게임 프로젝트',
        'type': 'Personal'
    },
    {
        'id': 2,
        'title': '똑똑이',
        'description': 'POSCO GY솔루션 외주 프로젝트로, 공기구 대여반납 및 재고 관리 서비스입니다. Java 서버, 관리자·사용자용 모바일 앱, 관리 대시보드를 개발했습니다.',
        'tech_stack': ['Spring', 'SQLite', 'Android', 'Kotlin'],
        'image': 'project2.jpg',
        'github_url': 'https://github.com/LiQuiDsKR/MrSmart',
        'service_url': None,
        'date': '2023-10',
        'date_range': '2023.10 ~ 2024.01',
        'category': '모바일 앱',
        'subtitle': '공기구 대여반납 및 재고 관리 서비스',
        'type': 'Team'
    },
    {
        'id': 3,
        'title': '재형닷컴',
        'description': '모바일게임 \'마피아42\' 서드파티 서비스입니다. Google Cloud Platform 기반 웹 서버를 구축하고 웹 프레임워크를 이용한 서비스 로직을 구현했습니다.',
        'tech_stack': ['Google Cloud', 'Flask', 'HTML5', 'CSS3', 'JavaScript'],
        'image': 'project3.jpg',
        'github_url': 'https://github.com/LiQuiDsKR/MafiaSupportWeb',
        'github_private': True,
        'service_url': 'https://재형.com',
        'date': '2024-08',
        'date_range': '2024.08 ~ 현재',
        'category': '웹',
        'subtitle': '모바일게임 \'마피아42\' 서드파티 서비스',
        'type': 'Personal'
    },
    {
        'id': 4,
        'title': '로스트 시티',
        'description': '실존하는 보드 게임 \'로스트 시티\'의 웹 게임 버전입니다. 2인용 카드 게임을 웹 브라우저에서 즐길 수 있도록 구현했습니다.',
        'tech_stack': ['HTML5', 'CSS3', 'JavaScript'],
        'image': 'project4.jpg',
        'github_url': 'https://github.com/LiQuiDsKR/LostCities',
        'service_url': 'https://liquidskr.github.io/LostCities/',
        'date': '2024-01',
        'date_range': '2024.01',
        'category': '웹',
        'subtitle': '보드 게임 웹 구현',
        'type': 'Personal'
    },
]

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
    """메인 페이지 - SPA 스타일"""
    # 프로젝트 이미지 존재 여부 확인
    projects_with_images = []
    for project in PROJECTS:
        project_copy = project.copy()
        image_path = os.path.join(app.static_folder, 'images', 'projects', project['image'])
        if not os.path.exists(image_path):
            project_copy['image'] = 'noimg.png'
        projects_with_images.append(project_copy)
    
    return render_template('index.html', 
                         profile=PROFILE,
                         projects=projects_with_images,
                         tech_stack=TECH_STACK,
                         tech_icons=TECH_ICONS)

@app.route('/api/projects')
def api_projects():
    """프로젝트 데이터 API"""
    return jsonify(PROJECTS)

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
