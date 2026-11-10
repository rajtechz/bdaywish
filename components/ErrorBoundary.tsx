"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Sparkles, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="my-8 mx-auto max-w-lg p-6 rounded-3xl glass-card border-pink-300/30 text-center bg-gradient-to-br from-[#2a0845] to-[#120024]">
          <div className="w-12 h-12 mx-auto rounded-full bg-pink-500/20 border border-gold-300/40 flex items-center justify-center mb-3 text-gold-300">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <h3 className="text-xl font-serif font-bold text-pink-gradient mb-2">
            {this.props.fallbackTitle || "Happy Birthday Megha! ✨"}
          </h3>
          <p className="text-xs text-lavender-200/80 mb-4">
            A small sparkle needed a quick reset. Tap below to reload this section smoothly.
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card-gold text-xs font-semibold text-gold-200 hover:text-white transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reload Section</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

