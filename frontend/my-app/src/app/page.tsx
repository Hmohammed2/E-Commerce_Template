import ProductCarousel from "@/components/ProductCarousel";
import Navbar from "@/components/navbar";
import WaitlistForm from "@/components/WaitListForm";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// Fetch products server-side
async function getProducts() {
  const res = await fetch(`${baseUrl}/api/products/`, {
    cache: "no-store", // disable caching for dev
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function LandingPage() {
  const products = await getProducts();
 
  return (
    <div className="min-h-screen text-gray-800 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="relative overflow-hidden">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/arcade-image.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 via-black/70 to-pink-900/70" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Hero content */}
          <div className="relative max-w-4xl mx-auto px-6 py-32 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Build your arcade stick the right way
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-gray-200">
              Curated arcade parts from Sanwa, Seimitsu, Brook, and more. Small-batch
              quantities, fast UK shipping, and builder-friendly bundles.
            </p>

            {/* Waitlist Form (client component) */}
            <WaitlistForm />
          </div>
        </section>

        {/* Product carousel */}
        <section className="bg-white py-12">
          <ProductCarousel products={products} />
        </section>

        {/* About us */} 
        <section className="bg-white" id='about'> <div 
        className="max-w-4xl mx-auto px-6 py-16 text-center"> 
        <h2 className="text-2xl font-semibold text-gray-900">About ArcadeStickLabs</h2> 
        <p className="mt-4 text-gray-700 leading-relaxed"> At ArcadeStickLabs, we set out to solve a challenge every UK fightstick builder knows too well: finding reliable arcade parts without waiting weeks for international shipping. For years, enthusiasts across the UK and Europe have had to import components from Japan or the US, often facing high costs, customs delays, and uncertainty about compatibility. </p>
         <p className="mt-4 text-gray-700 leading-relaxed"> We built ArcadeStickLabs to change that. Based here in the UK, we supply curated, tournament-grade parts from trusted brands like Sanwa, Seimitsu, Brook, and Crown, all stocked locally and ready to ship quickly. Whether you’re a casual player looking to customise your first stick, a competitor chasing precision, or a modder experimenting with new builds, we make it simple to get the right parts when you need them. </p> 
         <p className="mt-4 text-gray-700 leading-relaxed"> No more expensive overseas orders or long waits at customs—just quality arcade gear, fast UK delivery, and the confidence that you’re building with components the fighting game community relies on. ArcadeStickLabs exists to support the FGC here at home and help you craft your perfect stick without compromise. </p> 
         </div> 
         </section>

        {/* Features */}
        <section
          id="products"
          className="bg-gradient-to-br from-indigo-50 via-white to-pink-50"
        >
          <div className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-2xl font-semibold text-center text-gray-900">
              Why choose us
            </h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Feature title="Curated parts" desc="Only trusted brands, tested for compatibility." />
              <Feature title="Small minimums" desc="Buy exactly what you need — no bulk required." />
              <Feature title="Fast shipping" desc="Local UK/EU warehousing for quick delivery." />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white mt-auto py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
          <span>© 2025 ArcadeStickLabs. All rights reserved.</span>
          <span className="mt-2 sm:mt-0">Made with ❤️ for the FGC.</span>
        </div>
      </footer>
    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
      <h4 className="font-semibold text-gray-900">{title}</h4>
      <p className="mt-2 text-sm text-gray-600">{desc}</p>
    </div>
  );
}
