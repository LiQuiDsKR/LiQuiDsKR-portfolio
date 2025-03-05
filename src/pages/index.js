import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">개발자 이재형입니다.</h1>
      <p className="text-xl mt-4 opacity-80">
        패러다임을 뒤집는 사람이 되고 싶습니다.
      </p>
    </div>
  );
}
