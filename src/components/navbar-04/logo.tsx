import Image from "next/image";

export const Logo = () => (
  <div className="relative h-12 w-32">
    <Image
      src="/images/logo_2.png"
      alt="Samrat Adhikari - Manaslu Trek Guide"
      fill
      className="object-contain"
      priority
    />
  </div>
);
