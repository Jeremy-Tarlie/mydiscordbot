"use client"
import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useBotsData, usePreloadNextPage } from '@/utils/useBotsData';

// Lazy loading du composant BotList
const BotListLazy = dynamic(() => import('@/components/Bots/BotList'), {
  loading: () => <BotListSkeleton />,
  ssr: false
});

// Composant skeleton amélioré
function BotListSkeleton() {
  return (
    <div className="bots-skeleton">
      <div className="skeleton-intro">
        <div className="skeleton-title"></div>
        <div className="skeleton-description"></div>
      </div>
      
      <div className="skeleton-grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="skeleton-card">
            <div className="skeleton-image"></div>
            <div className="skeleton-content">
              <div className="skeleton-card-title"></div>
              <div className="skeleton-card-description"></div>
              <div className="skeleton-button"></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="skeleton-pagination">
        <div className="skeleton-pagination-button"></div>
        <div className="skeleton-pagination-numbers">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="skeleton-pagination-number"></div>
          ))}
        </div>
        <div className="skeleton-pagination-button"></div>
      </div>
    </div>
  );
}

// Composant d'erreur amélioré
function ErrorMessage({ message, onRetry }: { message: string | null; onRetry?: () => void }) {
  const t = useTranslations("bots");
  return (
    <div className="error-container">
      <div className="error-message">
        <h3>{t("error_title")}</h3>
        <p>{message || t("error_message")}</p>
        {onRetry && (
          <button onClick={onRetry} className="error-retry-button">
            {t("error_retry")}
          </button>
        )}
      </div>
    </div>
  );
}

// Composant principal des bots optimisé
function BotListWrapper({ page, limit }: { page: number, limit: number }) {
  const { data, loading, error, refetch, isStale } = useBotsData({
    page,
    limit,
    autoRefresh: false,
    refreshInterval: 30000
  });

  // Précharger la page suivante
  usePreloadNextPage(page, limit);

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  if (loading || !data) {
    return <BotListSkeleton />;
  }

  return (
    <>
      {isStale && (
        <div className="stale-data-notice">
          <p>Données en cache - actualisation en cours...</p>
        </div>
      )}
      <BotListLazy 
        data={{
          bots: data.bots,
          currentPage: page,
          totalPages: data.totalPages,
          total: data.total,
          botsPerPage: limit
        }} 
      />
    </>
  );
}

// Page principale optimisée
export default function Page() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 6;

  return (
    <div className="bots-container">
      <Suspense fallback={<BotListSkeleton />}>
        <BotListWrapper page={page} limit={limit} />
      </Suspense>
    </div>
  );
}