import FancyBox from "./components/fancyBox"; // Ensure the file exists at this path or update the path to the correct location

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-900 text-white py-8 text-center">
        <h1 className="text-4xl font-bold">The</h1>
        <h2 className="text-6xl font-extrabold">Hot or Cold Box</h2>
      </header>

      <div className="bg-blue-100 h-16">
        {/* Divider SVG will be placed here */}
      </div>

      <main className="flex-grow flex items-center justify-center">
        <FancyBox srp={""} gameRtp={""} difference={""} />
      </main>
    </div>
  );
}
