import Image from "next/image";
import Logo from "@/app/assests/logo.png";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
        <Image
          src={Logo}
          alt="Logo Guardiões do Rio"
          width={350}
        />
    </div>
  );
}
