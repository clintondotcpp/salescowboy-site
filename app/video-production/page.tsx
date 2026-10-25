import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Video Production & Real Estate Marketing | Sales Cowboy Marketing Solutions",
  description: "4K cinematic drone tours, property walkthroughs, brand commercial films, and short-form social cuts for Nigerian real estate and businesses.",
};

export default function VideoProductionPage() {
  return (
    <LandingPage
      title={<>Cinematic video production that <span className="text-accent">sells high-ticket deals.</span></>}
      subtitle="4K drone aerials, luxury real estate walkthroughs, founder interviews, and paid ad cutdowns."
      features={[
        { title: "4K Cinema Cameras", text: "Shot on high-end cinema sensors with professional lighting and color grading." },
        { title: "Licensed Drone Aerials", text: "Sweeping exterior and neighborhood establishing shots capturing full property grandeur." },
        { title: "Realtor / Founder On-Camera", text: "Guided talking-head interviews positioning you as the authority in your niche." },
        { title: "Multi-Platform Ad Cutdowns", text: "9:16 vertical cuts for TikTok and Reels, plus 16:9 widescreen master files." },
        { title: "Audio & Music Licensing", text: "Studio-grade wireless lav microphones and commercial music rights included." },
        { title: "Fast 7-Day Turnaround", text: "Reliable 7-day turnaround so you can market listings while buyer momentum is peak." },
      ]}
      plans={[
        {
          name: "Spotlight Shoot",
          price: "₦120,000",
          note: "per shoot",
          features: [
            "1x 60-Second 4K video reel with color grade",
            "10 High-resolution edited property photos",
            "Professional audio & licensed music",
            "Turnaround within 7 days",
          ],
          whatsapp: "Hi Sales Cowboy! I want the ₦120,000 Spotlight Shoot.",
        },
        {
          name: "Cinematic Walkthrough",
          price: "₦280,000",
          note: "per shoot",
          featured: true,
          features: [
            "Licensed drone aerial videography",
            "Interior & exterior walkthrough tour",
            "Founder / realtor on-camera interview",
            "3 Social cutdowns for Meta & TikTok ads",
            "Full raw 4K b-roll archive included",
          ],
          whatsapp: "Hi Sales Cowboy! I want the ₦280,000 Cinematic Walkthrough.",
        },
        {
          name: "Multi-Property Campaign",
          price: "₦650,000+",
          note: "per campaign",
          features: [
            "TV-commercial grade 4K production crew",
            "Multi-location shoot (Lagos or Abuja)",
            "Paid video ad distribution setup",
            "Broadcast-ready master files with full commercial buyout",
          ],
          whatsapp: "Hi Sales Cowboy! I want to discuss a Multi-Property Campaign.",
        },
      ]}
      steps={[
        { title: "Shotlist", text: "We plan key angles, features, on-camera dialogue, and timing." },
        { title: "Shoot", text: "Our crew arrives on location with cinema cameras, drones, and lighting." },
        { title: "Edit", text: "Color-graded masters and social-ready cutdowns delivered within days." },
      ]}
      whatsappMessage="Hi Sales Cowboy! I need video production / real estate marketing."
    />
  );
}
