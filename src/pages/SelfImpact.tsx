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
import { LocalStorageHabitRepository } from '../repositories/HabitRepository';

const defaultHabits = [
  'صلة الرحم',
  'قراءة ورد يومي من القرآن',
  'الالتزام بالصلاة في المسجد',
  'قيام الليل',
  'التبكير في الذكر',
  'تقليل التشتت عند استخدام الجوال'
];

const habitTips = {
  'صلة الرحم': [
    'اتصل بأقاربك مرة في الأسبوع على الأقل',
    'قم بزيارة الوالدين بشكل منتظم',
    'شارك في المناسبات العائلية',
    'ساعد أقاربك في قضاء حوائجهم'
  ],
  'قراءة ورد يومي من القرآن': [
    'حدد وقتاً ثابتاً للقراءة',
    'ابدأ بورد صغير ثم زد تدريجياً',
    'استخدم تطبيقات القرآن للمتابعة',
    'اربط القراءة بعادة يومية'
  ],
  'الالتزام بالصلاة في المسجد': [
    'استعد للصلاة قبل الأذان بوقت كافٍ',
    'اختر مسجداً قريباً من منزلك أو عملك',
    'تعرف على أوقات الصلاة بدقة',
    'اجعل لك رفيقاً في الذهاب للمسجد'
  ],
  'قيام الليل': [
    'نم مبكراً لتستيقظ بنشاط',
    'اضبط منبهاً قبل الفجر',
    'توضأ وصلِ ركعتين خفيفتين',
    'اقرأ من القرآن ما تيسر'
  ],
  'التبكير في الذكر': [
    'اجعل لك ورداً يومياً من الأذكار',
    'استخدم تطبيقات الأذكار للتذكير',
    'اربط الذكر بأوقات محددة',
    'شارك الأذكار مع عائلتك'
  ],
  'تقليل التشتت عند استخدام الجوال': [
    'حدد أوقاتاً معينة لاستخدام الجوال',
    'أغلق الإشعارات غير الضرورية',
    'استخدم تطبيقات تتبع الوقت',
    'اجعل هاتفك بعيداً عند النوم'
  ]
};

export function SelfImpact() {
  // Create repository instance
  const repository = React.useMemo(() => new LocalStorageHabitRepository(), []);
  
  const {
    habits,
    selectedHabit,
    showNotePrompt,
    setSelectedHabit,
    addHabit,
    updateHabitDay,
    addNote
  } = useHabits(repository, defaultHabits);

  const { settings: reminderSettings, setSettings: setReminderSettings } = useReminders();

  const totalProgress = React.useMemo(() => {
    if (!habits || Object.keys(habits).length === 0) return 0;
    return Object.values(habits).reduce(
      (acc, habit) => acc + (habit.progress || 0),
      0
    ) / Object.keys(habits).length;
  }, [habits]);

  const maxStreak = React.useMemo(() => {
    if (!habits || Object.keys(habits).length === 0) return 0;
    return Math.max(
      ...Object.values(habits).map(habit => habit.streak || 0)
    );
  }, [habits]);

  return (
    <>
      <MetaTags
        title="أثر في نفسك | منصة التأثير الإيجابي"
        description="ابدأ رحلة التغيير من نفسك. طور عاداتك وقدراتك لتكون النسخة الأفضل من نفسك."
        path="/self-impact"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
        <BackToHome />
        
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              اصنع أثراً في نفسك
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              ابدأ يومك بقوة، واستمر في صناعة التغيير، وسترى النتائج قريبًا بإذن الله!
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