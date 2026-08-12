import Header from "@/components/Header";

import BattleModalProvider from "@/components/BattleModalProvider";
import Hero from "@/components/Hero";
import MarqueeBanner from "@/components/MarqueeBanner";
import TopGifters from "@/components/TopGifters";
import UpcomingBattles from "@/components/UpcomingBattles";
import HowToJoinBoxBattle from "@/components/HowToJoinBoxBattle";
import HowToJoinLoveCrew from "@/components/HowToJoinLoveCrew";
import GravitasQ from "@/components/GravitasQ";
import LiveExperiences from "@/components/LiveExperiences";
import BottomMarquee from "@/components/BottomMarquee";
import Footer from "@/components/Footer";
import { getUpcomingBattles } from "@/lib/king-kaly";

export default async function HomePage() {
  const battles = await getUpcomingBattles();

  return (
    <BattleModalProvider>
      <Header variant="home" />
      <Hero />
      <MarqueeBanner />
      <TopGifters />
      <UpcomingBattles battles={battles} />
      <HowToJoinBoxBattle />
      <HowToJoinLoveCrew />
      <GravitasQ />
      <LiveExperiences />
      <BottomMarquee />
      <Footer />
    </BattleModalProvider>
  );
}
