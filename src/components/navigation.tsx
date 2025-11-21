"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Calendar, BookOpen, Smile, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard/chat", label: "对话", icon: MessageCircle },
  { href: "/dashboard/schedule", label: "日程", icon: Calendar },
  { href: "/dashboard/knowledge", label: "知识", icon: BookOpen },
  { href: "/dashboard/mood", label: "情绪", icon: Smile },
  { href: "/dashboard/profile", label: "我的", icon: User },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-screen-xl mx-auto flex justify-around items-center h-16">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full transition-colors",
                isActive
                  ? "text-primary"
                  : "text-text-secondary hover:text-primary"
              )}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function TopBar({ title }: { title: string }) {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between h-14 px-4">
        <h1 className="text-lg font-semibold text-primary">{title}</h1>
      </div>
    </div>
  );
}
