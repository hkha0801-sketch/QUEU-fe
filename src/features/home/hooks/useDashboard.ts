import { useState, useEffect } from "react";
import { HomeDashboard } from "../types/home.types";
import { fetchDashboard } from "../api/homeApi";

interface UseDashboardResult {
  data: HomeDashboard | null;
  loading: boolean;
  error: string | null;
}

export function useDashboard(): UseDashboardResult {
  const [data, setData] = useState<HomeDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    fetchDashboard()
      .then((res) => {
        if (!cancelled) {
          setData(res);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
