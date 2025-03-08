import Image from "next/image";

export default function Projects() {
  return (
    <div className="relative w-full min-h-screen pt-8 pb-12">
      <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>

      <div className="relative w-full max-w-3xl mx-auto">
        {/* 세로 선 (left: 199px, width: 2px → 가운데는 x=100px) */}
        <div className="absolute top-0 bottom-0 left-[99px] w-[2px] bg-foreground" />

        {/* 아래쪽 화살표 (가운데 x=100px에 정렬) */}
        <div
          className="
            absolute 
            left-[100px] 
            bottom-0 
            -translate-x-1/2 
            translate-y-2
            w-0 h-0
            border-l-[6px] border-l-transparent
            border-r-[6px] border-r-transparent
            border-t-[10px]
          "
        />

        {/* 첫 번째 아이템 */}
        <div className="relative mb-12 pl-[120px]">
          {/* 흰색 점 (가운데 x=100px) */}
          <div
            className="
              absolute 
              top-2 
              left-[100px] 
              w-[8px] h-[8px] 
              rounded-full 
              -translate-x-1/2
              bg-foreground
            "
          />
          <div className="text-sm text-gray-400 mt-1">개인 사이드 프로젝트</div>
          <div className="text-l text-gray-400 mb-1">2020.12 ~ 2021.02</div>
          <h3 className="text-2xl font-bold">BLΛCK (Personal)</h3>
          <h3 className="text-xl font-bold">Unity 게임 프로젝트 </h3>
          <p className="mt-1">
            Unity 기반 레이저 닷지 형식 모바일 게임 <br />
          </p>
          <img src="https://skillicons.dev/icons?i=cs,unity" />
        </div>

        {/* 두 번째 아이템 */}
        <div className="relative mb-12 pl-[120px]">
          <div
            className="
              absolute 
              top-2 
              left-[100px] 
              w-[8px] h-[8px] 
              rounded-full 
              -translate-x-1/2
              bg-foreground
            "
          />
          <div className="text-sm text-gray-400 mt-1">외주 - POSCO GY솔루션</div>
          <div className="text-l text-gray-400 mb-1">2023.10 ~ 2024.01</div>
          <h3 className="text-2xl font-bold">똑똑이 (TEAM)</h3>
          <h3 className="text-xl font-bold">공기구 대여반납 및 재고 관리 서비스</h3>
          <p className="mt-1">
            
            Java 서버 <br />
            관리자·사용자용 모바일 앱 <br />
            관리 대시보드 <br />
            <a href="https://github.com/LiQuiDsKR/MrSmart"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline">GitHub</a>
          </p>
          <img src="https://skillicons.dev/icons?i=spring,sqlite,androidstudio,kotlin" />
        </div>

        {/* 세 번째 아이템 */}
        <div className="relative mb-12 pl-[120px]">
          <div
            className="
              absolute 
              top-2 
              left-[100px] 
              w-[8px] h-[8px] 
              rounded-full 
              -translate-x-1/2
              bg-foreground
            "
          />
          <div className="text-sm text-gray-400 mt-1">개인 사이드 프로젝트</div>
          <div className="text-l text-gray-400 mb-1">2024.08 ~ 현재</div>
          <h3 className="text-2xl font-bold">재형닷컴 (Personal)</h3>
          <h3 className="text-xl font-bold">모바일게임 ‘마피아42’ 서드파티 서비스</h3>
          <p className="mt-1">
            Google Cloud Platform 기반 웹 서버 <br />
            웹 프레임워크를 이용한 서비스 로직 <br />
            
            <a href="https://github.com/LiQuiDsKR/MafiaSupportWeb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline">GitHub</a>  <br />
            <a href="https://재형.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline">재형닷컴(서비스)</a>
          </p>
          <img src="https://skillicons.dev/icons?i=gcp,flask,html,css,js" />
        </div>
      </div>
    </div>
  );
}
