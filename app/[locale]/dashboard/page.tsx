'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useIntlayer, useLocale } from 'next-intlayer';
import Link from 'next/link';
import Image from 'next/image';
import {
  Camera,
  CreditCard,
  Heart,
  LayoutGrid,
  LogOut,
  Mail,
  Package,
  Save,
  Settings,
  ShoppingBag,
  Store,
  Trash2,
  User,
} from "lucide-react";
import { formatPrice } from '@/lib/format';
import type { UserRole } from '@/lib/types';

interface Profile {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  profileImage: string | null;
  role: UserRole;
  createdAt: string;
}

interface Order {
  id: number;
  orderNumber: string;
  status: string;
  totalAmount: number;
  createdAt: string;
}

interface CartItem {
  id: number;
  quantity: number;
}

const navItems = [
  { key: 'overview', href: '#overview', labelKey: 'overview', icon: LayoutGrid },
  { key: 'orders', href: '#orders', labelKey: 'orders', icon: ShoppingBag },
  { key: 'favorites', href: '#favorites', labelKey: 'favorites', icon: Heart },
  { key: 'settings', href: '#settings', labelKey: 'settings', icon: Settings },
] as const;

const ORDER_STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-violet-100 text-violet-700",
  DELIVERED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-red-100 text-red-700",
};

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  label: string;
  value: string | number;
}) {
  return (
    <div className="group flex items-center gap-4 rounded-[1.5rem] border border-[#e0ddd5] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-chocolate/10">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cream text-chocolate transition-colors duration-300 group-hover:bg-chocolate group-hover:text-white">
        <Icon size={22} />
      </div>
      <div className="min-w-0">
        <p className="text-[12px] font-medium uppercase tracking-wider text-[#999]">{label}</p>
        <p className="truncate text-xl font-semibold text-[#1a1a1a]">{value}</p>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { locale } = useLocale();
  const content = useIntlayer("dashboard");
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [protectedData, setProtectedData] = useState<{ secretInfo?: string; timestamp?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const [uploading, setUploading] = useState(false);
  const [photoMsg, setPhotoMsg] = useState("");

  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "" });
  const [saving, setSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState("");

  async function loadDashboard() {
    try {
      const meRes = await fetch("/api/users/me", { credentials: "include" });
      if (meRes.status === 401) {
        router.push(`/${locale}/login`);
        return;
      }
      const me = await meRes.json();
      if (me.success && me.data) {
        setProfile(me.data);
        setForm({
          firstName: me.data.firstName ?? "",
          lastName: me.data.lastName ?? "",
          phone: me.data.phone ?? "",
        });
      }

      const [ordersRes, cartRes] = await Promise.all([
        fetch("/api/orders", { credentials: "include" }),
        fetch("/api/cart-items", { credentials: "include" }),
      ]);

      const ordersJson = await ordersRes.json();
      if (ordersJson.success) setOrders(ordersJson.data ?? []);

      const cartJson = await cartRes.json();
      if (cartJson.success) {
        const items: CartItem[] = cartJson.data ?? [];
        setCartCount(items.reduce((sum, item) => sum + item.quantity, 0));
      }

      const protRes = await fetch("/api/protected", { credentials: "include" });
      const protJson = await protRes.json();
      if (protJson.success) setProtectedData(protJson.data);
    } catch (error) {
      console.error("Dashboard load error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void Promise.resolve().then(loadDashboard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setPhotoMsg(content.photoError.value);
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setPhotoMsg(content.photoError.value);
      return;
    }

    setUploading(true);
    setPhotoMsg("");
    try {
      const dataUrl = await fileToDataUrl(file);
      const res = await fetch("/api/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ profileImage: dataUrl }),
      });
      const json = await res.json();
      if (json.success) {
        setProfile((prev) => (prev ? { ...prev, profileImage: dataUrl } : prev));
        window.dispatchEvent(new CustomEvent("profile-image-updated"));
        setPhotoMsg(content.photoSaved.value);
      } else {
        setPhotoMsg(content.photoError.value);
      }
    } catch {
      setPhotoMsg(content.photoError.value);
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePhoto = async () => {
    setUploading(true);
    setPhotoMsg("");
    try {
      const res = await fetch("/api/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ profileImage: null }),
      });
      const json = await res.json();
      if (json.success) {
        setProfile((prev) => (prev ? { ...prev, profileImage: null } : prev));
        window.dispatchEvent(new CustomEvent("profile-image-updated"));
        setPhotoMsg(content.photoSaved.value);
      } else {
        setPhotoMsg(content.photoError.value);
      }
    } catch {
      setPhotoMsg(content.photoError.value);
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setProfileMsg("");
    try {
      const res = await fetch("/api/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          firstName: form.firstName || null,
          lastName: form.lastName || null,
          phone: form.phone || null,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setProfile(json.data);
        setForm({
          firstName: json.data.firstName ?? "",
          lastName: json.data.lastName ?? "",
          phone: json.data.phone ?? "",
        });
        setProfileMsg(content.profileSaved.value);
      } else {
        setProfileMsg(content.profileError.value);
      }
    } catch {
      setProfileMsg(content.profileError.value);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push(`/${locale}`);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#FAFAF7]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#e0ddd5] border-t-chocolate" />
          <div className="text-sm text-[#777]">{content.loading}</div>
        </div>
      </div>
    );
  }

  const role = profile?.role === 'ADMIN' ? content.roleAdmin : content.roleCustomer;
  const displayName = profile
    ? [profile.firstName, profile.lastName].filter(Boolean).join(" ") || profile.email
    : "";
  const initials = profile
    ? `${profile.firstName?.[0] ?? ""}${profile.lastName?.[0] ?? ""}`.toUpperCase() ||
      profile.email.slice(0, 2).toUpperCase()
    : "";
  const memberSince = profile
    ? new Date(profile.createdAt).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  const totalSpent = orders.reduce((sum, order) => sum + order.totalAmount, 0);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const orderStatusLabel = (status: string) => {
    const map: Record<string, string> =
      locale === "fr"
        ? { PENDING: "En attente", CONFIRMED: "Confirmée", SHIPPED: "Expédiée", DELIVERED: "Livrée", CANCELLED: "Annulée" }
        : { PENDING: "Pending", CONFIRMED: "Confirmed", SHIPPED: "Shipped", DELIVERED: "Delivered", CANCELLED: "Cancelled" };
    return map[status] ?? status;
  };

  const inputClass =
    "w-full rounded-2xl border border-[#e8e4dc] bg-[#faf9f6] px-4 py-3 text-sm text-[#1a1a1a] outline-none transition-all duration-300 placeholder:text-[#999] focus:border-chocolate focus:bg-white focus:ring-2 focus:ring-beige-light";

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#1a1a1a]">
      {/* Top nav */}
      <nav className="sticky top-0 z-30 border-b border-[#e0ddd5] bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
          <Link href={`/${locale}`} className="group flex items-center gap-1">
            <span className="font-serif text-[22px] font-semibold tracking-tight text-chocolate transition-colors duration-300 group-hover:text-terracotta">
              Mino
            </span>
            <span className="font-serif text-[22px] font-light italic tracking-tight text-beige transition-colors duration-300 group-hover:text-honey">
              Skincare
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href={`/${locale}/catalogue`}
              className="hidden items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium text-[#555] transition-colors duration-300 hover:text-chocolate sm:inline-flex"
            >
              <Store size={15} />
              {content.goToShop}
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full bg-chocolate px-5 py-2.5 text-[13px] font-medium text-white transition-all duration-300 hover:bg-terracotta hover:shadow-lg hover:shadow-chocolate/20"
            >
              <LogOut size={15} />
              {content.logout}
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[2rem] border border-[#e0ddd5] bg-white p-2 shadow-sm">
              <p className="px-5 pt-4 pb-2 text-[11px] font-semibold uppercase tracking-wider text-[#b0aca3]">
                {content.navigate}
              </p>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.key}
                      href={`#${item.key}`}
                      className="flex items-center gap-3 rounded-2xl px-5 py-3 text-[14px] font-medium text-[#6b6b6b] transition-all duration-300 hover:bg-cream hover:text-chocolate"
                    >
                      <Icon size={17} className="shrink-0" />
                      {content[item.labelKey]}
                    </a>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="flex flex-col gap-8">
            {/* Profile hero */}
            <section className="relative overflow-hidden rounded-[2rem] bg-chocolate p-8 text-white sm:p-12">
              <div className="absolute inset-0 bg-gradient-to-br from-chocolate via-chocolate to-terracotta" />
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-beige/20 blur-3xl" />
              <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-honey/25 blur-3xl" />

              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="relative shrink-0">
                  <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white/25 shadow-xl">
                    {profile?.profileImage ? (
                      <Image
                        src={profile.profileImage}
                        alt={content.avatarAlt}
                        width={96}
                        height={96}
                        unoptimized
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-cream font-serif text-3xl font-semibold text-chocolate">
                        {initials}
                      </div>
                    )}
                  </div>
                  <label
                    title={content.changePhoto}
                    className="absolute -bottom-1 -right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-chocolate shadow-lg transition-all duration-300 hover:bg-cream hover:shadow-xl"
                  >
                    <Camera size={16} />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoChange}
                    />
                  </label>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium tracking-wide">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-beige" />
                      {content.statusOnline}
                    </span>
                    <span className="rounded-full bg-[#E6A817] px-3 py-1 text-[11px] font-semibold text-white">
                      {role}
                    </span>
                  </div>
                  <h1 className="mt-4 font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
                    {content.welcome},{" "}
                    <span className="font-light italic text-beige">{displayName}</span>
                  </h1>
                  <p className="mt-2 flex items-center gap-2 text-sm text-beige">
                    <Mail size={14} />
                    {profile?.email}
                  </p>
                </div>

                {uploading && (
                  <span className="shrink-0 animate-pulse rounded-full bg-white/10 px-4 py-2 text-[12px] font-medium">
                    {content.uploading}
                  </span>
                )}
              </div>

              <div className="relative mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-white/10 pt-6 text-[13px]">
                <div>
                  <span className="block uppercase tracking-wider text-beige/80">{content.userID}</span>
                  <span className="mt-1 block font-medium text-white">#{profile?.id}</span>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <span className="block uppercase tracking-wider text-beige/80">{content.role}</span>
                  <span className="mt-1 block font-medium text-white">{role}</span>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <span className="block uppercase tracking-wider text-beige/80">{content.memberSince}</span>
                  <span className="mt-1 block font-medium text-white">{memberSince}</span>
                </div>
              </div>
            </section>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard icon={ShoppingBag} label={content.ordersCount} value={orders.length} />
              <StatCard icon={Package} label={content.cartCount} value={cartCount} />
              <StatCard icon={CreditCard} label={content.totalSpent} value={formatPrice(totalSpent)} />
            </div>

            {/* Personal information */}
            <section id="overview" className="rounded-[2rem] border border-[#e0ddd5] bg-white p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cream text-chocolate">
                  <User size={20} />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">{content.profileHeading}</h2>
                  <p className="text-[13px] text-[#888]">{content.profileSubtitle}</p>
                </div>
              </div>

              <form onSubmit={handleSaveProfile} className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm font-medium text-[#555]">
                    {content.firstName}
                  </label>
                  <input
                    id="firstName"
                    value={form.firstName}
                    onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm font-medium text-[#555]">
                    {content.lastName}
                  </label>
                  <input
                    id="lastName"
                    value={form.lastName}
                    onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-[#555]">
                    {content.phone}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="+261 34 00 000 00"
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-full bg-chocolate px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-terracotta hover:shadow-lg hover:shadow-chocolate/20 disabled:cursor-not-allowed disabled:bg-[#95a28f]"
                  >
                    <Save size={16} />
                    {saving ? content.saving : content.save}
                  </button>

                  {profile?.profileImage && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      disabled={uploading}
                      className="inline-flex items-center gap-2 rounded-full border border-[#e0ddd5] bg-white px-5 py-3 text-sm font-medium text-[#555] transition-all duration-300 hover:border-terracotta hover:text-terracotta disabled:opacity-50"
                    >
                      <Trash2 size={16} />
                      {content.removePhoto}
                    </button>
                  )}
                </div>

                {(profileMsg || photoMsg) && (
                  <p className="sm:col-span-2 rounded-2xl bg-cream px-4 py-3 text-sm font-medium text-chocolate">
                    {profileMsg || photoMsg}
                  </p>
                )}
              </form>
            </section>

            {/* Orders */}
            <section id="orders" className="rounded-[2rem] border border-[#e0ddd5] bg-white p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cream text-chocolate">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-semibold tracking-tight">{content.orders}</h2>
                  <p className="text-[13px] text-[#888]">{orders.length} · {content.stats}</p>
                </div>
              </div>

              {orders.length === 0 ? (
                <div className="flex flex-col items-center gap-3 rounded-3xl bg-[#faf9f6] px-6 py-14 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream text-chocolate">
                    <ShoppingBag size={26} />
                  </div>
                  <p className="text-lg font-semibold">{content.emptyOrders}</p>
                  <p className="max-w-sm text-sm text-[#777]">{content.emptyOrdersDesc}</p>
                  <Link
                    href={`/${locale}/catalogue`}
                    className="mt-3 inline-flex rounded-full bg-chocolate px-6 py-3 text-sm font-semibold text-white transition hover:bg-terracotta"
                  >
                    {content.goToShop}
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="flex flex-col gap-3 rounded-3xl border border-[#efebe3] bg-[#faf9f6] p-5 transition-all duration-300 hover:border-chocolate/30 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="font-semibold text-[#1a1a1a]">
                          {content.orderNumber} <span className="text-chocolate">#{order.orderNumber}</span>
                        </p>
                        <p className="mt-1 text-[13px] text-[#777]">
                          {content.date} : {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span
                          className={`rounded-full px-3 py-1 text-[12px] font-semibold ${
                            ORDER_STATUS_STYLES[order.status] ?? "bg-[#eee] text-[#666]"
                          }`}
                        >
                          {orderStatusLabel(order.status)}
                        </span>
                        <span className="text-[15px] font-semibold text-chocolate">
                          {formatPrice(order.totalAmount)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Favorites */}
            <section id="favorites" className="rounded-[2rem] border border-[#e0ddd5] bg-white p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cream text-chocolate">
                  <Heart size={20} />
                </div>
                <h2 className="font-serif text-2xl font-semibold tracking-tight">{content.favorites}</h2>
              </div>
              <div className="flex flex-col items-center gap-3 rounded-3xl bg-[#faf9f6] px-6 py-14 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream text-chocolate">
                  <Heart size={26} />
                </div>
                <p className="text-lg font-semibold">{content.emptyFavorites}</p>
                <p className="max-w-sm text-sm text-[#777]">{content.emptyFavoritesDesc}</p>
              </div>
            </section>

            {/* Settings / protected data */}
            <section id="settings" className="rounded-[2rem] border border-[#e0ddd5] bg-white p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cream text-chocolate">
                  <Settings size={20} />
                </div>
                <h2 className="font-serif text-2xl font-semibold tracking-tight">{content.protectedTitle}</h2>
              </div>
              {protectedData?.secretInfo ? (
                <div className="mt-6 space-y-3">
                  <div className="rounded-2xl bg-cream p-5">
                    <p className="text-[15px] leading-7 text-[#1a1a1a]">{protectedData.secretInfo}</p>
                  </div>
                  {protectedData.timestamp && (
                    <p className="text-[13px] text-[#999]">
                      <span className="font-medium text-[#6b6b6b]">{content.lastAccess}: </span>
                      {new Date(protectedData.timestamp).toLocaleString(locale === "fr" ? "fr-FR" : "en-US")}
                    </p>
                  )}
                </div>
              ) : (
                <p className="mt-6 rounded-2xl bg-[#faf9f6] p-5 text-[14px] text-[#777]">
                  {content.secretUnavailable}
                </p>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}