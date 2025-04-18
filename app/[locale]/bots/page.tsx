"use client"
import React, { useEffect, useState } from 'react'
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

export default function Page() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<BotData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 6;
  const t = useTranslations("bots");

  useEffect(() => {
    const fetchBots = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await fetch(`/api/bots?page=${page}&limit=${limit}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const botData = await res.json();
        setData(botData);
      } catch (err) {
        console.error("Error fetching bots:", err);
        setError("Une erreur est survenue lors du chargement des bots");
      } finally {
        setLoading(false);
      }
    };

    fetchBots();
  }, [page, limit]); // Recharger les données quand la page ou la limite change

  if (loading) {
    return <div>{t("loading_spinner")}</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>{t("error_message")}</div>;
  }

  return (
    <div>
      <BotList 
        data={{
          bots: data.bots,
          currentPage: page,
          totalPages: data.totalPages,
          total: data.total,
          botsPerPage: limit
        }} 
      />
    </div>
  );
}