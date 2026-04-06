import React, { useState, useCallback } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => setSidebarOpen((v) => !v), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  return (
    <div className="flex h-screen overflow-hidden text-slate-900 bg-slate-50 font-sans">
      {/* Desktop sidebar — always visible ≥1024px */}
      <div className="hidden lg:block shrink-0">
        <Sidebar onNavigate={closeSidebar} />
      </div>

      {/* Mobile/Tablet sidebar — drawer overlay <1024px */}
      {sidebarOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={closeSidebar}
          />
          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 z-50 lg:hidden animate-slide-in-left">
            <Sidebar onNavigate={closeSidebar} />
          </div>
        </>
      )}

      <div className="flex-1 flex flex-col overflow-y-auto min-w-0">
        <Topbar onToggleSidebar={toggleSidebar} />
        {children}
      </div>
    </div>
  );
};
