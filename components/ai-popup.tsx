"use client";

import { useEffect, useState } from "react";
import { useAI } from "@/components/providers/ai-provider";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AIPopup() {
  const { setIsOpen } = useAI(); // Use global state
  const [showPopup, setShowPopup] = useState(false);

  // Show popup after 5 seconds (only once per session)
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("aiPopupShown");

    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        sessionStorage.setItem("aiPopupShown", "true");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  // Disable background scroll when popup is open
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showPopup]);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className={cn(
          "bg-card/90 backdrop-blur-xl border border-border/50 shadow-2xl rounded-2xl p-6 w-[90%] max-w-md",
          "animate-[popup_0.25s_ease-out]"
        )}
      >
        {/* Close Btn */}
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-muted"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>

        {/* Content */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center">
            <MessageCircle className="h-7 w-7 text-primary" />
          </div>

          <h2 className="text-xl font-semibold">Meet My AI Assistant</h2>

          <p className="text-sm text-muted-foreground">
            I built an interactive AI that can tell you anything about my skills, projects, and experience.
          </p>

          {/* Open AI Assistant */}
          <button
            onClick={() => {
              setShowPopup(false);
              setIsOpen(true); // open your real assistant
            }}
            className="mt-3 bg-primary/20 hover:bg-primary/30 transition-all rounded-full px-6 py-2 text-sm font-medium"
          >
            Ask Something
          </button>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx global>{`
        @keyframes popup {
          0% {
            transform: scale(0.85);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
