import React from 'react';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../../lib/firebase';

export function NotesMarquee() {
  const [notes] = useCollectionData(
    query(collection(db, 'notes'), orderBy('createdAt', 'desc'), limit(10))
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-900 text-white py-3 z-50">
      <div className="relative overflow-hidden h-8">
        <div className="absolute whitespace-nowrap animate-marquee">
          {notes?.map((note, index) => (
            <span key={index} className="mx-8">
              "{note.content}" - {note.username}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}