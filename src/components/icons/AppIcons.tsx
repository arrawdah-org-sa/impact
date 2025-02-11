import React from 'react';
import { 
  Home,
  User,
  Settings,
  Search,
  Heart,
  Menu,
  type LucideProps
} from 'lucide-react';

// Base icon configuration
const iconConfig: LucideProps = {
  size: 24,
  strokeWidth: 2,
};

// Filled variant wrapper
const FilledIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="relative">
    {children}
    <div className="absolute inset-0 bg-current opacity-10" />
  </div>
);

export const AppIcons = {
  // Home Icons
  HomeOutline: (props: LucideProps) => (
    <Home {...iconConfig} {...props} className="rounded-sm" />
  ),
  HomeFilled: (props: LucideProps) => (
    <FilledIcon>
      <Home {...iconConfig} {...props} fill="currentColor" className="rounded-sm" />
    </FilledIcon>
  ),

  // Profile Icons
  ProfileOutline: (props: LucideProps) => (
    <User {...iconConfig} {...props} className="rounded-sm" />
  ),
  ProfileFilled: (props: LucideProps) => (
    <FilledIcon>
      <User {...iconConfig} {...props} fill="currentColor" className="rounded-sm" />
    </FilledIcon>
  ),

  // Settings Icons
  SettingsOutline: (props: LucideProps) => (
    <Settings {...iconConfig} {...props} className="rounded-sm" />
  ),
  SettingsFilled: (props: LucideProps) => (
    <FilledIcon>
      <Settings {...iconConfig} {...props} fill="currentColor" className="rounded-sm" />
    </FilledIcon>
  ),

  // Search Icons
  SearchOutline: (props: LucideProps) => (
    <Search {...iconConfig} {...props} className="rounded-sm" />
  ),
  SearchFilled: (props: LucideProps) => (
    <FilledIcon>
      <Search {...iconConfig} {...props} fill="currentColor" className="rounded-sm" />
    </FilledIcon>
  ),

  // Heart Icons
  HeartOutline: (props: LucideProps) => (
    <Heart {...iconConfig} {...props} className="rounded-sm" />
  ),
  HeartFilled: (props: LucideProps) => (
    <FilledIcon>
      <Heart {...iconConfig} {...props} fill="currentColor" className="rounded-sm" />
    </FilledIcon>
  ),

  // Menu Icons
  MenuOutline: (props: LucideProps) => (
    <Menu {...iconConfig} {...props} className="rounded-sm" />
  ),
  MenuFilled: (props: LucideProps) => (
    <FilledIcon>
      <Menu {...iconConfig} {...props} fill="currentColor" className="rounded-sm" />
    </FilledIcon>
  ),
};