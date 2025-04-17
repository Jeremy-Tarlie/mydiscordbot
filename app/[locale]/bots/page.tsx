import React from 'react'
import BotList from '@/components/Bots/BotList'
// import { useTranslations } from 'next-intl';

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
  const limit = 6; // Nombre de bots par page

  try {
    const res = await fetch(`http://localhost:3000/api/bots?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    console.log(data)

    return (
      <div>
        <BotList 
          data={{
            bots: data.bots,
            currentPage: data.currentPage,
            totalPages: data.totalPages,
            total: data.total,
            botsPerPage: data.botsPerPage
          }} 
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching bots:", error);
    return (
      <div>
        <p>Une erreur est survenue lors du chargement des bots. Veuillez réessayer plus tard.</p>
      </div>
    );
  }
}

export default Page;