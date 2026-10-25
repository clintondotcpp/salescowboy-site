import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Market Research & Intelligence | Sales Cowboy Marketing Solutions",
  description: "Nigerian market feasibility audits, competitor pricing intelligence, and consumer willingness-to-pay studies.",
};

export default function MarketResearchPage() {
  return (
    <LandingPage
      title={<>Know your market before you <span className="text-accent">burn capital.</span></>}
      subtitle="Competitor intelligence, consumer pricing sensitivity, and market feasibility audits in Nigeria."
      features={[
        { title: "Competitor Benchmarking", text: "Deep dive into your top 5 local competitors' pricing, funnels, and offers." },
        { title: "Consumer Willingness-to-Pay", text: "Identify exact price thresholds that drive maximum profit without losing volume." },
        { title: "Channel Effectiveness", text: "Discover where your Nigerian buyers actually spend time and discover products." },
        { title: "Customer Objection Audits", text: "Real data on why prospects hesitate and how to structure your offer to close them." },
        { title: "Go-to-Market Strategy", text: "Actionable roadmap covering packaging, pricing, ad angles, and launch timelines." },
        { title: "Executive Decision Decks", text: "Clean presentation decks ready for investor boards and executive reviews." },
      ]}
      plans={[
        {
          name: "Competitor Audit",
          price: "₦100,000",
          note: "one-time report",
          features: [
            "Audit of top 5 direct competitors in Nigeria",
            "Pricing & packaging matrix comparison",
            "Market gap & differentiation opportunities",
            "Executive summary slide deck",
          ],
          whatsapp: "Hi Sales Cowboy! I want the ₦100k Competitor Audit report.",
        },
        {
          name: "Consumer Sentiment Study",
          price: "₦280,000",
          note: "one-time engagement",
          featured: true,
          features: [
            "Survey of 100+ target consumers in Nigeria",
            "Buying objections & willingness-to-pay data",
            "Acquisition channel effectiveness breakdown",
            "Tactical go-to-market action plan",
          ],
          whatsapp: "Hi Sales Cowboy! I want the ₦280k Consumer Sentiment Study.",
        },
        {
          name: "Nationwide Feasibility",
          price: "₦650,000+",
          note: "one-time engagement",
          features: [
            "Multi-state qualitative & quantitative research",
            "Regulatory & distribution channel analysis",
            "Financial forecast model & risk mitigation",
            "Executive board presentation & walkthrough",
          ],
          whatsapp: "Hi Sales Cowboy! I want to discuss a Nationwide Feasibility study.",
        },
      ]}
      steps={[
        { title: "Scope", text: "We align on target demographics, competitors, and core hypotheses." },
        { title: "Investigate", text: "We gather primary surveys, analyze competitor channels, and synthesize data." },
        { title: "Present", text: "We deliver the findings deck and strategic recommendations." },
      ]}
      whatsappMessage="Hi Sales Cowboy! I need market research for my business."
    />
  );
}
