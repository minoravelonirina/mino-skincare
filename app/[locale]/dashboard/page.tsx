'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getIntlayer, getLocaleFromPath } from 'intlayer';
import Link from 'next/link';
import { UserData } from "../../../lib/types";

const navItems = [
  { key: 'overview', href: '#overview', labelKey: 'overview' },
  { key: 'orders', href: '#orders', labelKey: 'orders' },
  { key: 'favorites', href: '#favorites', labelKey: 'favorites' },
  { key: 'settings', href: '#settings', labelKey: 'settings' },
] as const;

type ContentKeys = typeof navItems[number]['labelKey'];

export default function DashboardPage() {
  const locale = getLocaleFromPath();
  const content = getIntlayer("dashboard", locale)
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [protectedData, setProtectedData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProtectedData();
  }, []);

  const fetchProtectedData = async () => {
    try {
      const response = await fetch('/api/protected');
      const result = await response.json();

      if (result.success) {
        setUserData(result.data.user);
        setProtectedData(result.data.data);
      }
    } catch (error) {
      console.error('Error fetching protected data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.refresh();
      router.push(`/${locale}/login`);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#FAFAF7]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#e0ddd5] border-t-[#2d5a3d]" />
          <div className="text-sm text-[#777]">{content.loading}</div>
        </div>
      </div>
    );
  }

  const role = userData?.role === 'ADMIN' ? content.roleAdmin : content.roleCustomer;

  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#1a1a1a]">
      {/* Top nav */}
      <nav className="sticky top-0 z-30 border-b border-[#e0ddd5] bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
          <Link href={`/${locale}`} className="group flex items-center gap-1">
            <span className="font-serif text-[22px] font-semibold tracking-tight text-[#2d5a3d] transition-colors duration-300 group-hover:text-[#1e3d2a]">
              Mino
            </span>
            <span className="font-serif text-[22px] font-light italic tracking-tight text-[#8BAF7C] transition-colors duration-300 group-hover:text-[#6d9460]">
              Skincare
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href={`/${locale}/catalogue`}
              className="hidden items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium text-[#555] transition-colors duration-300 hover:text-[#2d5a3d] sm:inline-flex"
            >
              {content.goToShop}
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-full bg-[#2d5a3d] px-5 py-2.5 text-[13px] font-medium text-white transition-all duration-300 hover:bg-[#1e3d2a] hover:shadow-lg hover:shadow-[#2d5a3d]/20"
            >
              {content.logout}
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[2rem] border border-[#e0ddd5] bg-white p-2">
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.key}
                    href={`#${item.href.replace('#', '')}`}
                    className="rounded-2xl px-5 py-3 text-[14px] font-medium text-[#6b6b6b] transition-all duration-300 hover:bg-[#eef3e8] hover:text-[#2d5a3d]"
                  >
                    {content[item.labelKey]}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="flex flex-col gap-8">
            {/* Welcome header */}
            <section className="relative overflow-hidden rounded-[2rem] bg-[#2d5a3d] p-8 text-white sm:p-12">
              <div className="absolute inset-0 bg-gradient-to-br from-[#2d5a3d] via-[#2d5a3d] to-[#1e3d2a]" />
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#8BAF7C]/20 blur-3xl" />
              <div className="relative">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium tracking-wide">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#8BAF7C]" />
                    {content.statusOnline}
                  </span>
                  <span className="rounded-full bg-[#E6A817] px-3 py-1 text-[11px] font-semibold text-white">
                    {role}
                  </span>
                </div>

                <h1 className="mt-6 font-serif text-3xl leading-[1.15] tracking-tight sm:text-4xl">
                  {content.welcome},
                </h1>
                <p className="mt-2 font-serif text-xl font-light italic text-[#8BAF7C] sm:text-2xl">
                  {userData?.email}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-6 text-[13px] text-[#eef3e8]">
                  <div>
                    <span className="block uppercase tracking-wider text-[#8BAF7C]">{content.email}</span>
                    <span className="mt-1 block font-medium text-white">{userData?.email}</span>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div>
                    <span className="block uppercase tracking-wider text-[#8BAF7C]">{content.userID}</span>
                    <span className="mt-1 block font-medium text-white">#{userData?.userId}</span>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div>
                    <span className="block uppercase tracking-wider text-[#8BAF7C]">{content.role}</span>
                    <span className="mt-1 block font-medium text-white">{role}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Account info */}
            <section id="overview" className="rounded-[2rem] border border-[#e0ddd5] bg-white p-8">
              <h2 className="font-serif text-2xl font-semibold tracking-tight">
                {content.accountInfo}
              </h2>
              <p className="mt-2 text-[14px] leading-7 text-[#777]">
                {content.protectedHint}
              </p>
              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#f8f6f3] p-5">
                  <dt className="text-[11px] uppercase tracking-wider text-[#8BAF7C]">{content.email}</dt>
                  <dd className="mt-1.5 text-[15px] font-medium text-[#1a1a1a]">{userData?.email}</dd>
                </div>
                <div className="rounded-2xl bg-[#f8f6f3] p-5">
                  <dt className="text-[11px] uppercase tracking-wider text-[#8BAF7C]">{content.userID}</dt>
                  <dd className="mt-1.5 text-[15px] font-medium text-[#1a1a1a]">#{userData?.userId}</dd>
                </div>
                <div className="rounded-2xl bg-[#f8f6f3] p-5">
                  <dt className="text-[11px] uppercase tracking-wider text-[#8BAF7C]">{content.role}</dt>
                  <dd className="mt-1.5 text-[15px] font-medium text-[#1a1a1a]">{role}</dd>
                </div>
              </dl>
            </section>

            {/* Protected data */}
            <section id="settings" className="rounded-[2rem] border border-[#e0ddd5] bg-white p-8">
              <h2 className="font-serif text-2xl font-semibold tracking-tight">
                {content.protectedTitle}
              </h2>
              {protectedData ? (
                <div className="mt-6 space-y-3">
                  <div className="rounded-2xl bg-[#eef3e8] p-5">
                    <p className="text-[15px] leading-7 text-[#1a1a1a]">{protectedData.secretInfo}</p>
                  </div>
                  <p className="text-[13px] text-[#999]">
                    <span className="font-medium text-[#6b6b6b]">{content.lastAccess}: </span>
                    {new Date(protectedData.timestamp).toLocaleString()}
                  </p>
                </div>
              ) : (
                <p className="mt-4 text-[14px] text-[#777]">{content.secretUnavailable}</p>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
