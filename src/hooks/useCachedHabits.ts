import { useState, useEffect } from 'react';
import { useHabits } from './useHabits';

const CACHE_KEY = 'habits_cache';
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

interface CacheData {
  data: Record<string, any>;
  timestamp: number;
}

export function useCachedHabits(defaultHabits: string[]) {
  const habits = useHabits(defaultHabits);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFromCache = () => {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp }: CacheData = JSON.parse(cached);
        const isExpired = Date.now() - timestamp > CACHE_DURATION;
        
        if (!isExpired) {
          return data;
        }
      }
      return null;
    };

    const cachedData = loadFromCache();
    if (cachedData) {
      habits.setInitialData(cachedData);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (habits.habits) {
      const cacheData: CacheData = {
        data: habits.habits,
        timestamp: Date.now()
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    }
  }, [habits.habits]);

  return { ...habits, isLoading };
}