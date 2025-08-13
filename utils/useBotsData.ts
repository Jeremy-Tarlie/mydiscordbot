import { useState, useEffect, useCallback, useMemo } from 'react';

interface Bot {
  id: string;
  name: string;
  description: string;
  image: string;
  commands: Array<{
    name: string;
    description: string;
  }>;
}

interface BotData {
  bots: Bot[];
  currentPage: number;
  totalPages: number;
  total: number;
  botsPerPage: number;
}

interface UseBotsDataOptions {
  page: number;
  limit: number;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

interface UseBotsDataReturn {
  data: BotData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  isStale: boolean;
}

// Cache global pour les données des bots
const globalCache = new Map<string, { data: BotData; timestamp: number; isStale: boolean }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const STALE_TTL = 2 * 60 * 1000; // 2 minutes

export function useBotsData({ 
  page, 
  limit, 
  autoRefresh = false, 
  refreshInterval = 30000 
}: UseBotsDataOptions): UseBotsDataReturn {
  const [data, setData] = useState<BotData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isStale, setIsStale] = useState(false);

  const cacheKey = useMemo(() => `bots-${page}-${limit}`, [page, limit]);

  const fetchData = useCallback(async (forceRefresh = false) => {
    const cached = globalCache.get(cacheKey);
    const now = Date.now();

    // Vérifier si on peut utiliser le cache
    if (!forceRefresh && cached && now - cached.timestamp < CACHE_TTL) {
      setData(cached.data);
      setLoading(false);
      setError(null);
      setIsStale(now - cached.timestamp > STALE_TTL);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`/api/bots?page=${page}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newData = await response.json();
      
      // Mettre en cache
      globalCache.set(cacheKey, { 
        data: newData, 
        timestamp: now, 
        isStale: false 
      });

      setData(newData);
      setLoading(false);
      setIsStale(false);
    } catch (err) {
      console.error('Error fetching bots data:', err);
      
      // En cas d'erreur, essayer d'utiliser les données en cache même si elles sont expirées
      if (cached) {
        setData(cached.data);
        setIsStale(true);
        setError('Données en cache - connexion perdue');
      } else {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      }
      
      setLoading(false);
    }
  }, [page, limit, cacheKey]);

  const refetch = useCallback(() => {
    fetchData(true);
  }, [fetchData]);

  // Effet principal pour charger les données
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh si activé
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      if (!loading) {
        fetchData(true);
      }
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, loading, fetchData]);

  // Nettoyer le cache périodiquement
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      for (const [key, value] of globalCache.entries()) {
        if (now - value.timestamp > CACHE_TTL * 2) {
          globalCache.delete(key);
        }
      }
    }, 60000); // Nettoyer toutes les minutes

    return () => clearInterval(cleanupInterval);
  }, []);

  return {
    data,
    loading,
    error,
    refetch,
    isStale,
  };
}

// Hook pour précharger les données de la page suivante
export function usePreloadNextPage(currentPage: number, limit: number) {
  const nextPage = currentPage + 1;
  const cacheKey = `bots-${nextPage}-${limit}`;

  useEffect(() => {
    const preloadData = async () => {
      // Vérifier si les données sont déjà en cache
      if (globalCache.has(cacheKey)) return;

      try {
        const response = await fetch(`/api/bots?page=${nextPage}&limit=${limit}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          globalCache.set(cacheKey, { 
            data, 
            timestamp: Date.now(), 
            isStale: false 
          });
        }
      } catch (error) {
        // Ignorer les erreurs de préchargement
        console.debug('Preload failed for page', nextPage);
      }
    };

    // Précharger en arrière-plan
    preloadData();
  }, [nextPage, limit, cacheKey]);
}
