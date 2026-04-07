import { HugeiconsIcon } from "@hugeicons/react";
import { Call02Icon, Mail01Icon, Location01Icon, Clock01Icon } from "@hugeicons/core-free-icons";
import { ContactForm } from "@/components/contact-form";
import { ScrollReveal } from "@/components/scroll-reveal";

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
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Page Header */}
      <div className="bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-20">
          <ScrollReveal direction="down">
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-4">
              Contactez-<span className="text-[#1E40AF]">nous</span>
            </h1>
            <p className="max-w-2xl text-xl text-slate-300 font-medium">
              Vous avez une question? Nous sommes là pour vous aider. Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 relative z-30 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <ScrollReveal direction="up" delay={100}>
            <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 p-8 lg:p-12 border border-slate-100">
              <h2 className="text-3xl font-black tracking-tighter text-slate-900 uppercase mb-8">
                Envoyez-nous un message
              </h2>
              <ContactForm />
            </div>
          </ScrollReveal>

          {/* Contact Info + Map */}
          <div className="flex flex-col gap-12">
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ScrollReveal direction="up" delay={200}>
                <div className="bg-white rounded-3xl border border-slate-200 p-6 h-full hover:border-[#1E40AF]/30 transition-colors">
                  <div className="flex flex-col">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1E40AF] mb-4">
                      <HugeiconsIcon icon={Call02Icon} size={24} />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider mb-3">
                      Téléphone
                    </h3>
                    <div className="space-y-2">
                      {siteSettings.phones.map((phone) => (
                        <a
                          key={phone.number}
                          href={`tel:${phone.number.replace(/\s/g, "")}`}
                          className="flex items-center justify-between text-slate-600 hover:text-[#1E40AF] transition-colors font-medium"
                        >
                          <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">{phone.label}</span>
                          <span>{phone.number}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={300}>
                <div className="bg-white rounded-3xl border border-slate-200 p-6 h-full hover:border-[#1E40AF]/30 transition-colors">
                  <div className="flex flex-col">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1E40AF] mb-4">
                      <HugeiconsIcon icon={Mail01Icon} size={24} />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider mb-2">
                      Email
                    </h3>
                    <a
                      href={`mailto:${siteSettings.email}`}
                      className="text-slate-600 hover:text-[#1E40AF] transition-colors font-medium break-all mt-1"
                    >
                      {siteSettings.email}
                    </a>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={400} className="sm:col-span-2">
                <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center hover:border-[#1E40AF]/30 transition-colors">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1E40AF]">
                    <HugeiconsIcon icon={Location01Icon} size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider mb-1">
                      Adresse
                    </h3>
                    <p className="text-slate-600 font-medium">
                      {siteSettings.address}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Google Maps Embed */}
            <ScrollReveal direction="up" delay={500}>
              <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-sm h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.7475849999997!2d-17.0596!3d14.6928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec172f5c5c5c5c5d%3A0x1234567890abcdef!2sAvenue%20G.%20Pompidou%2C%20Dakar!5e0!3m2!1sfr!2ssn!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation de Dakar Sport"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase mb-16 text-center">
              Questions <span className="text-[#1E40AF]">Fréquentes</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollReveal delay={100} direction="up">
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 hover:bg-white/10 transition-colors">
                <h3 className="text-xl font-black uppercase tracking-wider mb-4">
                  Quel est le délai de livraison?
                </h3>
                <p className="text-slate-300 leading-relaxed font-medium">
                  Nous offrons une livraison gratuite à Dakar pour toute commande de plus de 50 000 FCFA. La livraison est généralement effectuée dans les 2-3 jours ouvrables.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200} direction="up">
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 hover:bg-white/10 transition-colors">
                <h3 className="text-xl font-black uppercase tracking-wider mb-4">
                  Acceptez-vous les retours?
                </h3>
                <p className="text-slate-300 leading-relaxed font-medium">
                  Oui, nous acceptons les retours dans les 14 jours suivant l'achat, à condition que le produit soit en bon état et non utilisé.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300} direction="up">
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 hover:bg-white/10 transition-colors">
                <h3 className="text-xl font-black uppercase tracking-wider mb-4">
                  Puis-je commander en gros?
                </h3>
                <p className="text-slate-300 leading-relaxed font-medium">
                  Absolument! Nous proposons des tarifs spéciaux pour les commandes en gros. Contactez-nous directement pour discuter de vos besoins.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={400} direction="up">
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 hover:bg-white/10 transition-colors">
                <h3 className="text-xl font-black uppercase tracking-wider mb-4">
                  Quels modes de paiement acceptez-vous?
                </h3>
                <p className="text-slate-300 leading-relaxed font-medium">
                  Nous acceptons les virements bancaires, les paiements mobiles (Orange Money, Wave) et les paiements en espèces à la livraison.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
