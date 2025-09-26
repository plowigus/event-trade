// src/app/(pages)/[slug]/components/RealizacjePage.js
export default function RealizacjePage({ pageData }) {
  return (
    <div className="realizacje-page py-16">
      <div className="container mx-auto px-4">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Nasze Realizacje</h2>

          {/* Grid projektów */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-br from-purple-400 to-blue-500"></div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">Projekt {item}</h3>
                  <p className="text-gray-600">Opis realizacji projektu...</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center">
          <h3 className="text-2xl font-bold mb-4">Chcesz zobaczyć więcej?</h3>
          <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors">
            Skontaktuj się z nami
          </button>
        </section>
      </div>
    </div>
  );
}
