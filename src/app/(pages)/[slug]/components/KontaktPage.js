// src/app/(pages)/[slug]/components/KontaktPage.js
export default function KontaktPage({ pageData }) {
  return (
    <div className="kontakt-page py-16">
      <div className="container mx-auto px-4">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-8 font-chillax">Kontakt</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Skontaktuj się z nami - odpowiemy na wszystkie Twoje pytania
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6">Napisz do nas</h3>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imię i Nazwisko
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Twoje imię i nazwisko"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="twoj@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wiadomość
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Opisz swoje wydarzenie..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Wyślij Wiadomość
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6">Dane kontaktowe</h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-purple-500 rounded-full mt-1 mr-4"></div>
                  <div>
                    <h4 className="font-medium">Adres</h4>
                    <p className="text-gray-600">
                      ul. Przykładowa 123
                      <br />
                      00-000 Warszawa
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-500 rounded-full mt-1 mr-4"></div>
                  <div>
                    <h4 className="font-medium">Telefon</h4>
                    <p className="text-gray-600">+48 123 456 789</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 rounded-full mt-1 mr-4"></div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-gray-600">kontakt@eventtrade.pl</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-gray-200 h-64 rounded-xl flex items-center justify-center">
              <p className="text-gray-500">Tutaj będzie mapa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
