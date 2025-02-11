import React from 'react';
import { AppIcons } from './AppIcons';

export function IconExample() {
  return (
    <div className="grid grid-cols-6 gap-4 p-4">
      <div className="flex flex-col items-center gap-2">
        <AppIcons.HomeOutline />
        <AppIcons.HomeFilled />
        <span className="text-sm">Home</span>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <AppIcons.ProfileOutline />
        <AppIcons.ProfileFilled />
        <span className="text-sm">Profile</span>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <AppIcons.SettingsOutline />
        <AppIcons.SettingsFilled />
        <span className="text-sm">Settings</span>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <AppIcons.SearchOutline />
        <AppIcons.SearchFilled />
        <span className="text-sm">Search</span>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <AppIcons.HeartOutline />
        <AppIcons.HeartFilled />
        <span className="text-sm">Favorite</span>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <AppIcons.MenuOutline />
        <AppIcons.MenuFilled />
        <span className="text-sm">Menu</span>
      </div>
    </div>
  );
}