import StoreHeader from "@/components/store-header";
import StoreFooter from "@/components/store-footer";
import { getStoreSettings } from "@/lib/store-settings";
import { getActiveAnnouncements } from "@/lib/actions/announcements";

export const dynamic = "force-dynamic";

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, announcements] = await Promise.all([
    getStoreSettings(),
    getActiveAnnouncements(),
  ]);

  // Get first banner announcement or null
  const bannerAnnouncement = announcements.find(a => a.type === "banner")?.title ?? null;

  return (
    <div className="flex min-h-screen flex-col">
      <StoreHeader settings={settings} announcement={bannerAnnouncement} />
      <main className="flex-1">{children}</main>
      <StoreFooter settings={settings} />
    </div>
  );
}