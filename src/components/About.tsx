import Image from "next/image";

const About = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground" style={{ fontFamily: 'Rye, serif' }}>
              We're Not Your Average Agency — We're the Wild West of Marketing.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At SalesCowboy, we don't follow the herd. We blaze trails with bold, data-driven strategies that deliver real results for Nigerian businesses. From building stunning websites to dominating search rankings and running high-ROI ad campaigns, we bring the grit and expertise your brand needs to win in the Nigerian market.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We're a team of fearless marketers, developers, and strategists based in Nigeria, combining Western tenacity with cutting-edge tech. We understand the Nigerian market and know what works here. No fluff. No gimmicks. Just strategies that work for Nigerian businesses.
            </p>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-gold rounded-lg blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
            <Image 
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
              alt="SalesCowboy team collaborating with Nigerian real estate agents"
              className="relative rounded-lg shadow-elegant hover-lift w-full"
              width={800}
              height={600}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
