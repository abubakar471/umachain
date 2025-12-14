import Footer from "@/components/landing-page/Footer";
import Hero from "@/components/landing-page/Hero";
import Team from "@/components/landing-page/Team";
import WhatIsUmacoin from "@/components/landing-page/WhatIsUmacoin";
import Image from "next/image";

export default function Home() {
  return (
    <div >
      <Hero />
      <WhatIsUmacoin />
      <Team />
      <Footer />
    </div>
  );
}
