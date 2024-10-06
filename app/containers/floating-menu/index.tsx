import React from "react";
import { Button } from "@/app/components/ui/button";
import {
  Home,
  Settings,
  Bell,
  User,
  HelpCircle,
  Folder,
  Users,
} from "lucide-react";

const FloatingMenu: React.FC = () => {
  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50">
      <div className="flex flex-col justify-between rounded-2xl px-2 py-4 h-[80vh] bg-white/60 backdrop-blur-[11px]">
        <div className="flex flex-col justify-center items-start space-y-5">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Home className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Users className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Folder className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Bell className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <HelpCircle className="h-6 w-6" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <Settings className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default FloatingMenu;
