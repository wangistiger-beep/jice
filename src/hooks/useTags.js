import { useCallback, useEffect, useState } from 'react';
import { apiRequest } from '../lib/api';

export function useTags() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTags = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiRequest('/tags');
      setTags(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e);
      setTags([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  return { tags, loading, error, refetch: fetchTags };
}
