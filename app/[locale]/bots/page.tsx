"use client"
import React, { Suspense, useEffect, useState, useTransition, cache } from 'react'
import BotList from '@/components/Bots/BotList'
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface BotData {
  bots: Array<{
    id: string;
    name: string;
    description: string;
    image: string;
    commands: Array<{
      name: string;
      description: string;
    }>;
  }>;
  currentPage: number;
  totalPages: number;
  total: number;
  botsPerPage: number;
}

// Cache de la fonction de fetch
const fetchBotsData = cache(async (page: number, limit: number) => {
  const res = await fetch(`/api/bots?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
});

// Composant de chargement
function LoadingSpinner() {
  const t = useTranslations("bots");
  return <div className="loading-spinner">{t("loading_spinner")}</div>;
}

// Composant d'erreur
function ErrorMessage({ message }: { message: string | null }) {
  const t = useTranslations("bots");
  return <div className="error-message">{t("error_message")}</div>;
}

// Composant principal des bots
function BotListWrapper({ page, limit }: { page: number, limit: number }) {
  const [data, setData] = useState<BotData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      try {
        const botData = await fetchBotsData(page, limit);
        setData(botData);
      } catch (err) {
        console.error("Error fetching bots:", err);
        setError("Une erreur est survenue");
      }
    });
  }, [page, limit]);

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!data) {
    return null;
  }

  return (
    <BotList 
      data={{
        bots: data.bots,
        currentPage: page,
        totalPages: data.totalPages,
        total: data.total,
        botsPerPage: limit
      }} 
    />
  );
}

// Page principale
export default function Page() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 6;

  return (
    <div className="bots-container">
      <Suspense fallback={<LoadingSpinner />}>
        <BotListWrapper page={page} limit={limit} />
      </Suspense>
    </div>
  );
}