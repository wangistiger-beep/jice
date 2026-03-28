import { useCallback, useEffect, useState } from 'react';
import { apiRequest } from '../lib/api';
import { transformCaseToStartup } from '../lib/transform';

export function useSortedCases(sortBy, sortOrder) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSortedCases = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiRequest(`/interactions/sorted?sortBy=${sortBy}&sortOrder=${sortOrder}`);
      const transformed = (data || []).map(transformCaseToStartup);
      setItems(transformed);
    } catch (e) {
      setError(e);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [sortBy, sortOrder]);

  useEffect(() => {
    fetchSortedCases();
  }, [fetchSortedCases]);

  return { items, loading, error, refetch: fetchSortedCases };
}

export function useRecommendedCases() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecommendedCases = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiRequest('/interactions/recommended');
      const transformed = (data || []).map(transformCaseToStartup);
      setItems(transformed);
    } catch (e) {
      setError(e);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecommendedCases();
  }, [fetchRecommendedCases]);

  return { items, loading, error, refetch: fetchRecommendedCases };
}
