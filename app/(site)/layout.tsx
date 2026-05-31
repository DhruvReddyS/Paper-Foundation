import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { CampaignBanner } from "@/components/site/CampaignBanner";
import { Cursor } from "@/components/ui/Cursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <Cursor />
      <CampaignBanner />
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
