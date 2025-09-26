// src/app/(pages)/[slug]/components/UslugiPage.js
export default function UslugiPage({ pageData }) {
  return (
    <div className="uslugi-page py-16">
      <div className="container mx-auto px-4">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-8 font-chillax">Nasze Usługi</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferujemy kompleksowe rozwiązania eventowe
          </p>
        </section>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Organizacja Eventów",
              desc: "Kompleksowa organizacja wydarzeń",
            },
            { title: "Catering", desc: "Profesjonalne usługi cateringowe" },
            { title: "Dekoracje", desc: "Piękne dekoracje na każdą okazję" },
            {
              title: "Fotografia",
              desc: "Profesjonalna dokumentacja wydarzeń",
            },
            { title: "Multimedia", desc: "Nowoczesne rozwiązania AV" },
            { title: "Konsultacje", desc: "Doradztwo w zakresie eventów" },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg mb-6 mx-auto"></div>
              <h3 className="text-xl font-bold mb-4 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center">{service.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-12 rounded-2xl text-center">
          <h3 className="text-3xl font-bold mb-4">
            Gotowy na swój wymarzony event?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Skontaktuj się z nami już dziś!
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
            Bezpłatna Wycena
          </button>
        </section>
      </div>
    </div>
  );
}
