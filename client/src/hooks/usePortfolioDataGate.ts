import { useEffect, useRef, useState } from 'react';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';

const DATA_LOAD_TIMEOUT_MS = 20_000;
const SLEEP_GAP_MS = 30_000;
const WAKE_CHECK_INTERVAL_MS = 15_000;

type PortfolioDataQuery = {
  queryKey: string[];
  queryFn: () => Promise<unknown>;
  staleTime: number;
  refetchOnMount: 'always';
  retry: number;
};

const criticalDataQueries: PortfolioDataQuery[] = [
  { queryKey: ['settings'], queryFn: api.settings.get, staleTime: 0, refetchOnMount: 'always', retry: 1 },
];

const backgroundDataQueries: PortfolioDataQuery[] = [
  { queryKey: ['certification'], queryFn: api.certification.getAll, staleTime: 0, refetchOnMount: 'always', retry: 1 },
  { queryKey: ['skills'], queryFn: api.skills.getAll, staleTime: 0, refetchOnMount: 'always', retry: 1 },
  { queryKey: ['projects'], queryFn: api.projects.getAll, staleTime: 0, refetchOnMount: 'always', retry: 1 },
  { queryKey: ['education'], queryFn: api.education.getAll, staleTime: 0, refetchOnMount: 'always', retry: 1 },
  { queryKey: ['community'], queryFn: api.community.getAll, staleTime: 0, refetchOnMount: 'always', retry: 1 },
  { queryKey: ['testimonials'], queryFn: api.testimonials.getAll, staleTime: 0, refetchOnMount: 'always', retry: 1 },
];

const refreshQueries = (queryClient: ReturnType<typeof useQueryClient>, queries: PortfolioDataQuery[]) =>
  Promise.allSettled(
    queries.map(({ queryKey, queryFn }) =>
      queryClient.fetchQuery({ queryKey, queryFn, staleTime: 0 }),
    ),
  );

export const usePortfolioDataGate = () => {
  const queryClient = useQueryClient();
  const [initialLoadFinished, setInitialLoadFinished] = useState(false);
  const [refreshingAfterSleep, setRefreshingAfterSleep] = useState(false);
  const wakeRefreshInFlight = useRef(false);

  const criticalQueryResults = useQueries({ queries: criticalDataQueries });
  const isFetchingCriticalData = criticalQueryResults.some((query) => query.isPending || query.isFetching);
  const showInitialLoader = !initialLoadFinished && isFetchingCriticalData;

  useEffect(() => {
    if (initialLoadFinished) return;

    if (!isFetchingCriticalData) {
      setInitialLoadFinished(true);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setInitialLoadFinished(true);
    }, DATA_LOAD_TIMEOUT_MS);

    return () => window.clearTimeout(timeoutId);
  }, [initialLoadFinished, isFetchingCriticalData]);

  useEffect(() => {
    let disposed = false;
    let lastSeen = Date.now();
    let timeoutId: number | undefined;

    const fetchLatestPortfolioData = async () => {
      if (wakeRefreshInFlight.current) return;

      wakeRefreshInFlight.current = true;
      setRefreshingAfterSleep(true);

      try {
        void refreshQueries(queryClient, backgroundDataQueries);
        const fetches = refreshQueries(queryClient, criticalDataQueries);
        const timeout = new Promise<void>((resolve) => {
          timeoutId = window.setTimeout(resolve, DATA_LOAD_TIMEOUT_MS);
        });

        await Promise.race([fetches, timeout]);
      } finally {
        if (timeoutId) window.clearTimeout(timeoutId);
        wakeRefreshInFlight.current = false;

        if (!disposed) {
          setRefreshingAfterSleep(false);
        }
      }
    };

    const checkForWake = () => {
      const now = Date.now();
      const wasSleeping = now - lastSeen > SLEEP_GAP_MS;
      lastSeen = now;

      if (document.visibilityState === 'visible' && wasSleeping) {
        void fetchLatestPortfolioData();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkForWake();
      }
    };

    const intervalId = window.setInterval(checkForWake, WAKE_CHECK_INTERVAL_MS);

    window.addEventListener('focus', checkForWake);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      disposed = true;
      window.clearInterval(intervalId);
      if (timeoutId) window.clearTimeout(timeoutId);
      window.removeEventListener('focus', checkForWake);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [queryClient]);

  return {
    showInitialLoader,
    showWakeLoader: refreshingAfterSleep,
  };
};
