import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Content {
  id: string;
  title: string;
  description: string;
  category: string;
  views: number;
  updatedAt: string;
}

export function useContent() {
  const [content, setContent] = useState<Content[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'content'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const contentData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Content[];
      setContent(contentData);
    });

    return () => unsubscribe();
  }, []);

  const addContent = async (data?: Partial<Content>) => {
    try {
      const defaultData = {
        title: 'محتوى جديد',
        description: '',
        category: 'عام',
        views: 0,
        updatedAt: new Date().toISOString()
      };
      await addDoc(collection(db, 'content'), { ...defaultData, ...data });
    } catch (error) {
      console.error('Error adding content:', error);
      throw error;
    }
  };

  const updateContent = async (contentId: string, data?: Partial<Content>) => {
    try {
      const contentRef = doc(db, 'content', contentId);
      await updateDoc(contentRef, {
        ...data,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating content:', error);
      throw error;
    }
  };

  const deleteContent = async (contentId: string) => {
    try {
      await deleteDoc(doc(db, 'content', contentId));
    } catch (error) {
      console.error('Error deleting content:', error);
      throw error;
    }
  };

  return { content, addContent, updateContent, deleteContent };
}