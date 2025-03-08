import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">

      <div className="text-center mt-20">
        <img
          src="/LiQuiDsKR-portfolio/images/home/profile.png"
          alt="이재형"
          width={200}
          height={200}
          className="rounded-full mx-auto"
        />
        <h1 className="text-4xl font-semibold mt-4">이재형</h1>
        <p className="text-xl mt-2">2002.05.31</p>
        <p className="mt-6 text-lg max-w-xl mx-auto">
          안녕하세요. 가장 특이하다고 자부하는 개발자 이재형입니다. <br />
          제 포트폴리오를 보시는 여러분께 신선한 충격을 드리고자 합니다.
        </p>
      </div>
    </div>
  );
}
