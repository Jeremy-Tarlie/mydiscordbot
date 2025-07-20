"use client";
import { useState, useEffect } from "react";

export type CookieConsent = "all" | "essential" | "declined" | null;

export const useCookies = () => {
  const [consent, setConsent] = useState<CookieConsent>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Récupérer le consentement depuis localStorage
    const savedConsent = localStorage.getItem("cookieConsent");
    if (savedConsent && ["all", "essential", "declined"].includes(savedConsent)) {
      setConsent(savedConsent as CookieConsent);
    }
    setIsLoaded(true);
  }, []);

  const updateConsent = (newConsent: CookieConsent) => {
    setConsent(newConsent);
    if (newConsent) {
      localStorage.setItem("cookieConsent", newConsent);
    } else {
      localStorage.removeItem("cookieConsent");
    }
    
    // Gérer les cookies selon le consentement
    handleCookieConsent(newConsent);
  };

  const handleCookieConsent = (consentType: CookieConsent) => {
    switch (consentType) {
      case "all":
        enableAllCookies();
        break;
      case "essential":
        enableEssentialCookies();
        break;
      case "declined":
        disableNonEssentialCookies();
        break;
    }
  };

  const enableAllCookies = () => {
    // Activer Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
        functionality_storage: "granted",
        personalization_storage: "granted",
        security_storage: "granted",
      });
    }
  };

  const enableEssentialCookies = () => {
    // Activer seulement les cookies essentiels
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        functionality_storage: "granted",
        personalization_storage: "denied",
        security_storage: "granted",
      });
    }
  };

  const disableNonEssentialCookies = () => {
    // Désactiver tous les cookies non essentiels
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        functionality_storage: "denied",
        personalization_storage: "denied",
        security_storage: "granted",
      });
    }
  };

  const resetConsent = () => {
    localStorage.removeItem("cookieConsent");
    setConsent(null);
  };

  return {
    consent,
    isLoaded,
    updateConsent,
    resetConsent,
    hasConsent: consent !== null,
  };
};

// Déclaration globale pour TypeScript
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
} 