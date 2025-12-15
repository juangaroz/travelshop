import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { AITravelAssistant } from "./AITravelAssistant";

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  onSearch?: (query: string) => void;
}

export function Layout({ children, currentPage, onNavigate, onSearch }: LayoutProps) {
  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar currentPage={currentPage} onNavigate={onNavigate} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar onNavigate={onNavigate} onSearch={onSearch} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
      <AITravelAssistant />
    </div>
  );
}