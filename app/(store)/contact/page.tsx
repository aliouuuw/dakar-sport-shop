import { HugeiconsIcon } from "@hugeicons/react";
import { Call02Icon, Mail01Icon, Location01Icon, Clock01Icon } from "@hugeicons/core-free-icons";
import { ContactForm } from "@/components/contact-form";

const siteSettings = {
  phones: [
    { label: "Fixe", number: "+221 33 840 09 45" },
    { label: "Mobile", number: "+221 77 634 51 15" },
    { label: "WhatsApp", number: "+221 77 041 49 30" },
  ],
  email: "promosportsdakar@yahoo.fr",
  address: "Avenue G. Pompidou, en face Restaurant Ali baba, Dakar, Sénégal",
  hours: {
    weekday: "09:00 - 19:30",
    weekend: "Fermé",
  },
};

export const metadata = {
  title: "Contactez-nous | Dakar Sport",
  description: "Contactez Dakar Sport pour vos questions sur nos équipements sportifs. Nous sommes à votre écoute.",
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Contactez-nous
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Vous avez une question? Nous sommes là pour vous aider. Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-3xl border border-slate-200 p-8 lg:p-10">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-8">
                Envoyez-nous un message
              </h2>
              <ContactForm />
            </div>
          </div>

          {/* Contact Info + Map */}
          <div className="flex flex-col gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-6">
                Informations de contact
              </h2>

              {/* Phone Numbers */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1E40AF]">
                    <HugeiconsIcon icon={Call02Icon} size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">
                      Téléphone
                    </h3>
                    <div className="space-y-2">
                      {siteSettings.phones.map((phone) => (
                        <a
                          key={phone.number}
                          href={`tel:${phone.number.replace(/\s/g, "")}`}
                          className="flex items-center gap-2 text-slate-600 hover:text-[#1E40AF] transition-colors font-medium"
                        >
                          <span className="text-sm text-slate-500">{phone.label}:</span>
                          <span>{phone.number}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1E40AF]">
                    <HugeiconsIcon icon={Mail01Icon} size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      Email
                    </h3>
                    <a
                      href={`mailto:${siteSettings.email}`}
                      className="text-slate-600 hover:text-[#1E40AF] transition-colors font-medium break-all"
                    >
                      {siteSettings.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1E40AF]">
                    <HugeiconsIcon icon={Location01Icon} size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      Adresse
                    </h3>
                    <p className="text-slate-600 font-medium">
                      {siteSettings.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1E40AF]">
                    <HugeiconsIcon icon={Clock01Icon} size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">
                      Horaires
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Lundi - Samedi:</span>
                        <span className="font-semibold text-slate-900">
                          {siteSettings.hours.weekday}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Dimanche:</span>
                        <span className="font-semibold text-slate-900">
                          {siteSettings.hours.weekend}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.7475849999997!2d-17.0596!3d14.6928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec172f5c5c5c5c5d%3A0x1234567890abcdef!2sAvenue%20G.%20Pompidou%2C%20Dakar!5e0!3m2!1sfr!2ssn!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation de Dakar Sport"
              />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-slate-50 border-t border-slate-200 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-12 text-center">
            Questions fréquemment posées
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Quel est le délai de livraison?
              </h3>
              <p className="text-slate-600">
                Nous offrons une livraison gratuite à Dakar pour toute commande de plus de 50 000 FCFA. La livraison est généralement effectuée dans les 2-3 jours ouvrables.
              </p>
            </div>
            <div className="bg-white rounded-3xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Acceptez-vous les retours?
              </h3>
              <p className="text-slate-600">
                Oui, nous acceptons les retours dans les 14 jours suivant l'achat, à condition que le produit soit en bon état et non utilisé.
              </p>
            </div>
            <div className="bg-white rounded-3xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Puis-je commander en gros?
              </h3>
              <p className="text-slate-600">
                Absolument! Nous proposons des tarifs spéciaux pour les commandes en gros. Contactez-nous directement pour discuter de vos besoins.
              </p>
            </div>
            <div className="bg-white rounded-3xl border border-slate-200 p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Quels modes de paiement acceptez-vous?
              </h3>
              <p className="text-slate-600">
                Nous acceptons les virements bancaires, les paiements mobiles (Orange Money, Wave) et les paiements en espèces à la livraison.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
