import { getSiteSettings } from "./actions/site-settings";

export interface StoreSettings {
  siteName: string;
  tagline: string;
  phones: { label: string; number: string }[];
  email: string;
  address: string;
  whatsapp?: string;
  facebook?: string;
  instagram?: string;
  openingHours?: string;
}

export async function getStoreSettings(): Promise<StoreSettings> {
  const settings = await getSiteSettings();
  
  // Parse phones from JSON string if present
  let phones: { label: string; number: string }[] = [];
  try {
    if (settings.phones) {
      phones = JSON.parse(settings.phones);
    }
  } catch {
    // Fallback to default phones
    phones = [
      { label: "Fixe", number: "+221 33 840 09 45" },
      { label: "Mobile", number: "+221 77 634 51 15" },
      { label: "WhatsApp", number: "+221 77 041 49 30" },
    ];
  }

  return {
    siteName: settings.siteName || "Dakar Sport",
    tagline: settings.tagline || "Tout pour le Sport",
    phones,
    email: settings.email || "promosportsdakar@yahoo.fr",
    address: settings.address || "Avenue G. Pompidou, Dakar",
    whatsapp: settings.whatsapp || "221770414930",
    facebook: settings.facebook || "https://facebook.com/dakarsport",
    instagram: settings.instagram || "https://instagram.com/dakarsport",
    openingHours: settings.openingHours || "Lun-Sam: 8h-20h",
  };
}
