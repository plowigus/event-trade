// src/app/(pages)/[slug]/components/DefaultPage.js
export default function DefaultPage({ pageData, slug }) {
  return (
    <div className="default-page py-16">
      <div className="container mx-auto px-4">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-8 font-chillax">
            {pageData.label}
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 mb-8">
              Witaj na stronie {pageData.label.toLowerCase()}. To jest
              automatycznie wygenerowany layout dla slug:{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">{slug}</code>
            </p>

            {/* Placeholder content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Sekcja 1</h3>
                <p className="text-gray-600">
                  Tutaj możesz dodać specyficzną treść dla tej strony.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Sekcja 2</h3>
                <p className="text-gray-600">
                  Każda strona może mieć swój unikalny design.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Debug info */}
        <section className="bg-gray-100 p-6 rounded-lg">
          <h4 className="font-bold mb-4">Debug Info:</h4>
          <pre className="text-sm bg-white p-4 rounded overflow-auto">
            {JSON.stringify(pageData, null, 2)}
          </pre>
        </section>
      </div>
    </div>
  );
}
