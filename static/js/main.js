// 테마 전환
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// 로컬 스토리지에서 테마 불러오기
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle?.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // 테마 전환 애니메이션
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
});

// 스크롤 진행 바
const scrollProgress = document.getElementById('scrollProgress');

// 모바일 100vh 문제 해결: 실제 뷰포트 높이를 CSS 변수로 설정
function setVh() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// 초기 설정 및 리사이즈/오리엔테이션 변경시 갱신
setVh();
window.addEventListener('resize', () => {
    // resize가 자주 발생할 수 있으니 간단 throttle
    clearTimeout(window._vhResizeTimeout);
    window._vhResizeTimeout = setTimeout(setVh, 150);
});
window.addEventListener('orientationchange', () => setVh());

function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    
    if (scrollProgress) {
        scrollProgress.style.transform = `scaleX(${progress / 100})`;
    }
}

window.addEventListener('scroll', updateScrollProgress);

// 스무스 스크롤 네비게이션
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        
        // 활성 링크 업데이트
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// 스크롤 시 네비게이션 활성화
function highlightNavOnScroll() {
    const scrollPos = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);

// Scroll 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            
            // 스킬 바 애니메이션
            if (entry.target.classList.contains('skill-item')) {
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    const progress = progressBar.getAttribute('data-progress');
                    progressBar.style.setProperty('--progress', progress + '%');
                    setTimeout(() => {
                        progressBar.style.width = progress + '%';
                    }, 100);
                }
            }
        }
    });
}, observerOptions);

// 페이지 로드 시 모든 애니메이션 대상 관찰
document.addEventListener('DOMContentLoaded', () => {
    // Scroll 애니메이션 대상
    const animatedElements = document.querySelectorAll('[data-scroll]');
    animatedElements.forEach(el => observer.observe(el));
    
    // 프로젝트 카드
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => observer.observe(card));
    
    // 스킬 카테고리
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => observer.observe(category));
    
    // 스킬 아이템
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => observer.observe(item));
    
    // 스토리 파트 (Value 섹션)
    const storyParts = document.querySelectorAll('.story-part');
    storyParts.forEach(part => observer.observe(part));
    
    // 파티클 생성
    createParticles();

    // 초기 스크롤 진행 상태 설정 (페이지 로드 시 작은 양수에서 시작하는 문제 방지)
    // requestAnimationFrame으로 브라우저 렌더링 직후 정확한 값으로 설정
    requestAnimationFrame(() => updateScrollProgress());
});

// 또한 완전한 리소스 로드 시 보장
window.addEventListener('load', () => updateScrollProgress());

// Navbar 스크롤 효과 (고정 - 그림자만 변경)
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 4px 20px var(--shadow-color)';
    }
});

// 파티클 생성 함수
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: var(--mint-color);
            border-radius: 50%;
            left: ${x}%;
            top: ${y}%;
            opacity: ${Math.random() * 0.3 + 0.1};
            animation: particleFloat ${duration}s ${delay}s infinite ease-in-out;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // 파티클 애니메이션 스타일 추가
    if (!document.getElementById('particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% {
                    transform: translate(0, 0);
                }
                25% {
                    transform: translate(10px, -20px);
                }
                50% {
                    transform: translate(-10px, -40px);
                }
                75% {
                    transform: translate(5px, -20px);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// 3D 틸트 효과 제거됨

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// 스크롤에 따른 요소 페이드 효과
const fadeElements = document.querySelectorAll('.project-card, .skill-category');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
        } else {
            // 스크롤 아웃 시 다시 숨김 (선택적)
            if (entry.boundingClientRect.top > 0) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(50px) scale(0.95)';
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px'
});

fadeElements.forEach(el => fadeObserver.observe(el));

// 페이지 전환 애니메이션
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
});

// 성능 최적화: Throttle 함수
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 리사이즈 이벤트 최적화
window.addEventListener('resize', throttle(() => {
    updateScrollProgress();
}, 250));

// Private 리포지토리 메시지 표시
function showPrivateRepoMessage(event) {
    event.preventDefault();
    
    // 토스트 메시지 생성
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = '🔒 Private 리포지토리입니다';
    
    document.body.appendChild(toast);
    
    // 애니메이션 시작
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // 3초 후 제거
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// 툴팁 위치 재계산 함수
function repositionTooltip(bubble, icon) {
    const skillItem = icon.closest('.skill-item');
    if (!skillItem || !bubble.parentNode) return;
    
    const iconRect = icon.getBoundingClientRect();
    const skillItemRect = skillItem.getBoundingClientRect();
    
    const iconCenterX = iconRect.left + iconRect.width / 2 - skillItemRect.left;
    const bubbleWidth = bubble.offsetWidth;
    const leftPosition = iconCenterX - (bubbleWidth / 2);
    
    bubble.style.left = `${leftPosition}px`;
}

// 스킬 툴팁 표시
function showSkillTooltip(event, tooltipText) {
    event.stopPropagation();
    
    // 클릭된 아이콘
    const icon = event.target;
    
    // 클릭된 아이콘의 부모 skill-item 찾기
    const skillItem = icon.closest('.skill-item');
    if (!skillItem) return;
    
    // 기존 툴팁 제거
    const existingBubble = skillItem.querySelector('.tooltip-bubble');
    if (existingBubble) {
        existingBubble.remove();
        // 리사이즈 이벤트 리스너 제거
        window.removeEventListener('resize', existingBubble._resizeHandler);
        return;
    }
    
    // 다른 모든 툴팁 제거
    document.querySelectorAll('.tooltip-bubble').forEach(bubble => {
        if (bubble._resizeHandler) {
            window.removeEventListener('resize', bubble._resizeHandler);
        }
        bubble.remove();
    });
    
    // 툴팁 버블 생성
    const bubble = document.createElement('div');
    bubble.className = 'tooltip-bubble';
    bubble.innerHTML = `
        <button class="tooltip-close" onclick="closeTooltip(event)">&times;</button>
        <p class="tooltip-text">${tooltipText}</p>
    `;
    
    skillItem.appendChild(bubble);
    
    // 말풍선의 중앙이 물음표 아이콘의 중앙에 오도록 계산
    setTimeout(() => {
        repositionTooltip(bubble, icon);
        bubble.style.right = 'auto';
        bubble.style.bottom = '100px';
        
        // 애니메이션 시작
        bubble.classList.add('show');
        
        // 리사이즈 이벤트 리스너 추가
        const resizeHandler = () => repositionTooltip(bubble, icon);
        bubble._resizeHandler = resizeHandler;
        window.addEventListener('resize', resizeHandler);
    }, 10);
}

// 툴팁 닫기
function closeTooltip(event) {
    if (event) {
        event.stopPropagation();
    }
    
    const bubbles = document.querySelectorAll('.tooltip-bubble');
    bubbles.forEach(bubble => {
        // 리사이즈 이벤트 리스너 제거
        if (bubble._resizeHandler) {
            window.removeEventListener('resize', bubble._resizeHandler);
        }
        
        bubble.classList.remove('show');
        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.remove();
            }
        }, 300);
    });
}

// 외부 클릭 시 툴팁 닫기
document.addEventListener('click', (e) => {
    if (!e.target.closest('.skill-tooltip-icon') && !e.target.closest('.tooltip-bubble')) {
        closeTooltip();
    }
});

// ESC 키로 툴팁 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeTooltip();
    }
});
