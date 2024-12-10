import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar className="w-full bg-gray-900 text-white" />
      <main className="flex-grow container mx-auto p-8">
        <h1 className="text-5xl font-bold text-center text-gray-900 mb-12">
          İletişim
        </h1>

        <div className="flex flex-col lg:flex-row gap-12">
          <section className="flex-1 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
              Bize Ulaşın
            </h2>
            <form className="space-y-4">
              <div>
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="name"
                >
                  Adınız
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder="Adınızı girin"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="email"
                >
                  E-posta
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder="E-posta adresinizi girin"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="message"
                >
                  Mesajınız
                </label>
                <textarea
                  id="message"
                  className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder="Mesajınızı buraya yazın"
                  rows="5"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white p-3 rounded-lg text-lg font-semibold hover:bg-gray-700 transition"
              >
                Gönder
              </button>
            </form>
          </section>

          <section className="flex-1 ">
            <div className="w-full h-[80vh] rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6018.381915257368!2d29.00067714437751!3d41.04295298538239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7a02dde1ee7%3A0xc2a9388a2a080c63!2zQmXFn2lrdGHFnywgU2luYW5wYcWfYSwgQmXFn2lrdGHFny_EsHN0YW5idWw!5e0!3m2!1sen!2str!4v1731426586934!5m2!1sen!2str"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Harita"
                className="w-full h-full"
              ></iframe>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
