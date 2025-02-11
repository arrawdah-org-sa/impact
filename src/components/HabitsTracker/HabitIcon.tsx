import React from 'react';
import { 
  Heart, 
  Book, 
  Compass,
  Moon, 
  Sun, 
  Users, 
  Leaf, 
  BookOpen, 
  Sprout,
  Building,
  Pencil,
  type LucideIcon
} from 'lucide-react';

const habitIcons: Record<string, LucideIcon> = {
  'صلة الرحم': Heart,
  'قراءة ورد يومي من القرآن': Book,
  'الالتزام بالصلاة في المسجد': Compass,
  'قيام الليل': Moon,
  'التبكير في الذكر': Sun,
  'زيارة المرضى': Users,
  'مساعدة المحتاجين': Heart,
  'تعليم الآخرين': BookOpen,
  'المشاركة في العمل التطوعي': Leaf,
  'نشر العلم النافع': BookOpen,
  'كتابة محتوى تعليمي': Pencil,
  'غرس الأشجار': Sprout,
  'بناء مشاريع خيرية': Building,
  'تأليف كتب نافعة': BookOpen,
  'إنشاء صدقة جارية': Heart,
};

interface HabitIconProps {
  habitName: string;
  className?: string;
}

export function HabitIcon({ habitName, className = '' }: HabitIconProps) {
  const IconComponent = habitIcons[habitName] || Heart;
  return <IconComponent className={`inline-block ${className}`} />;
}