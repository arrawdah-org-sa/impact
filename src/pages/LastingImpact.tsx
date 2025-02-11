import React from 'react';
import { HabitsTracker } from '../components/HabitsTracker';
import { BackToHome } from '../components/common/BackToHome';
import { useHabits } from '../hooks/useHabits';
import { defaultHabits, habitTips } from '../data/lastingImpactData';

export function LastingImpact() {
  const {
    habits,
    selectedHabit,
    showNotePrompt,
    setSelectedHabit,
    addHabit,
    updateHabitDay,
    addNote
  } = useHabits(defaultHabits);

  return (
    <>
      <BackToHome />
      <HabitsTracker
        title="كن ذا أثر يبقى بعدك"
        defaultHabits={defaultHabits}
        habitTips={habitTips}
        selectedHabit={selectedHabit}
        habits={habits}
        showNotePrompt={showNotePrompt}
        onHabitSelect={setSelectedHabit}
        onHabitAdd={addHabit}
        onDayUpdate={updateHabitDay}
        onNoteAdd={addNote}
      />
    </>
  );
}