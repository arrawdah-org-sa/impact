import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Activity {
  id: string;
  user: {
    username: string;
    id: string;
  };
  description: string;
  details?: string;
  timestamp: string;
}

interface Stats {
  activeUsers: number;
  engagementRate: number;
  completedHabits: number;
  avgTimeSpent: number;
}

export function useActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [stats, setStats] = useState<Stats>({
    activeUsers: 0,
    engagementRate: 0,
    completedHabits: 0,
    avgTimeSpent: 0
  });

  useEffect(() => {
    // Subscribe to activity logs
    const q = query(
      collection(db, 'activities'),
      orderBy('timestamp', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const activitiesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Activity[];
      setActivities(activitiesData);
    });

    // Calculate stats
    const calculateStats = async () => {
      // In a real application, these would be calculated server-side
      // This is just a mock implementation
      setStats({
        activeUsers: Math.floor(Math.random() * 1000) + 500,
        engagementRate: Math.floor(Math.random() * 30) + 70,
        completedHabits: Math.floor(Math.random() * 5000) + 1000,
        avgTimeSpent: Math.floor(Math.random() * 20) + 10
      });
    };

    calculateStats();
    const statsInterval = setInterval(calculateStats, 300000); // Update every 5 minutes

    return () => {
      unsubscribe();
      clearInterval(statsInterval);
    };
  }, []);

  return { activities, stats };
}