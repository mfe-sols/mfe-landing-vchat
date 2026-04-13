import { useEffect, useRef, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { getStoredLocale, setLocale } from "@mfe-sols/i18n";
import { createQueryClient } from "./mvp/service";
import { AppShell } from "./mvp/view";
import "./vr-res.css";

/* ─────────────────────────────────────────────────────────
   Root component — single-spa mount target
   Handles:  locale sync · theme observation · QueryClient
   ───────────────────────────────────────────────────────── */

const normalizeLocale = (v?: string | null): "en" | "vi" =>
  v === "en" ? "en" : "vi";

const LOCALE_STORAGE_KEY = "app-locale";
const LOCALE_CHANGE_EVENT = "app-locale-change";

export default function Root() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [queryClient] = useState(() => createQueryClient());

  /* ── Locale sync ───────────────────────────────────── */
  const [locale, setLocaleState] = useState<"en" | "vi">(() => {
    if (typeof window === "undefined") return "vi";
    /* localStorage may be empty → default to "vi" instead of lib's "en" */
    const raw = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    const resolved = raw === "en" ? "en" : "vi";
    setLocale(resolved);
    return resolved;
  });

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const applyLocale = (next?: string | null) => {
      const normalized = normalizeLocale(next);
      setLocale(normalized);
      setLocaleState(normalized);
    };

    const onLocaleChange = (event: Event) => {
      const detail = (event as CustomEvent<{ locale?: string }>).detail;
      if (detail?.locale) applyLocale(detail.locale);
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key !== LOCALE_STORAGE_KEY) return;
      applyLocale(event.newValue ?? getStoredLocale());
    };

    window.addEventListener(LOCALE_CHANGE_EVENT, onLocaleChange);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener(LOCALE_CHANGE_EVENT, onLocaleChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div ref={rootRef} className="vr-res-root landing-vchat-root" data-locale={locale}>
        <AppShell locale={locale} />
      </div>
    </QueryClientProvider>
  );
}
