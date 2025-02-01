import { TypewriterText } from "./TypewriterText";

export const Hero = () => {
  const words = ["Rich", "Famous", "Successful", "Profitable"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-DEFAULT to-accent-DEFAULT text-white p-4">
      <div className="max-w-4xl mx-auto text-center animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Get <TypewriterText words={words} />. Get a website.
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300">
          Your professional website is just one click away
        </p>
        <button className="bg-secondary-DEFAULT text-secondary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:scale-105 transition-transform">
          Get Your Website Now for 15 USD
        </button>
      </div>
    </div>
  );
};