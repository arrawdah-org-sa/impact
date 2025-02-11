import React from 'react';
import { HabitsTracker } from '../components/HabitsTracker';
import { BackToHome } from '../components/common/BackToHome';
import { MetaTags } from '../components/SEO/MetaTags';
import { DailyQuote } from '../components/HabitsTracker/DailyQuote';
import { HabitCategories } from '../components/HabitsTracker/HabitCategories';
import { AchievementBadges } from '../components/HabitsTracker/AchievementBadges';
import { ReminderSettings } from '../components/HabitsTracker/ReminderSettings';
import { useHabits } from '../hooks/useHabits';
import { useReminders } from '../hooks/useReminders';
import { defaultHabits, habitTips } from '../data/socialImpactData';

export function SocialImpact() {
  const {
    habits,
    selectedHabit,
    showNotePrompt,
    setSelectedHabit,
    addHabit,
    updateHabitDay,
    addNote
  } = useHabits(defaultHabits);

  const { settings: reminderSettings, setSettings: setReminderSettings } = useReminders();

  const totalProgress = Object.values(habits).reduce(
    (acc, habit) => acc + (habit.progress || 0),
    0
  ) / Object.keys(habits).length;

  const maxStreak = Math.max(
    ...Object.values(habits).map(habit => habit.streak || 0)
  );

  return (
    <>
      <MetaTags
        title="أثر على من حولك | منصة التأثير الإيجابي"
        description="كن مصدر إلهام للآخرين وساهم في تطوير مجتمعك من خلال العادات الإيجابية."
        path="/social-impact"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
        <BackToHome />
        
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              اصنع أثراً في مجتمعك
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              كل عمل صالح تقوم به يترك أثراً إيجابياً في حياة الآخرين. ابدأ اليوم في نشر الخير!
            </p>
          </div>

          <DailyQuote />

          <div className="flex justify-between items-center mb-8">
            <HabitCategories
              selectedCategory={selectedHabit || ''}
              onSelectCategory={setSelectedHabit}
            />
            <ReminderSettings onSave={setReminderSettings} />
          </div>

          <AchievementBadges
            progress={totalProgress}
            streak={maxStreak}
            totalHabits={Object.keys(habits).length}
          />

          <HabitsTracker
            title=""
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
        </div>
      </div>
    </>
  );
}