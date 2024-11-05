import { Banner, PostventaHead, PostventaLinks, } from "@/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Postventa',
}

export default function PostventaPage() {
  return (
    <div>
      <Banner title="El cuidado que tu auto se merece." imgBg="postventa/bg-banner-postventa.jpg" className="uppercase sm:text-3xl" />
      <PostventaLinks />
      <PostventaHead />
    </div>
  );
}