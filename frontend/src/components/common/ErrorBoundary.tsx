import React, { type ReactNode, type ErrorInfo } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-[400px] flex items-center justify-center p-4">
            <div className="bg-white/70 backdrop-blur-[25px] border border-red-500/30 rounded-[32px] p-12 max-w-[600px] text-center shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
                  <AlertCircle className="text-red-500" size={32} />
                </div>
              </div>
              
              <h2 className="text-2xl font-black text-text-primary mb-2">حدث خطأ</h2>
              <p className="text-text-secondary font-bold mb-4">
                عذراً، حدث خطأ غير متوقع. يرجى محاولة مرة أخرى.
              </p>
              
              {this.state.error && (
                <details className="mb-6 text-left bg-red-500/5 border border-red-500/20 rounded-xl p-4 text-sm text-red-600 font-mono">
                  <summary className="cursor-pointer font-bold mb-2">التفاصيل</summary>
                  <pre className="whitespace-pre-wrap break-words text-xs overflow-auto max-h-[200px]">
                    {this.state.error.message}
                  </pre>
                </details>
              )}

              <button
                onClick={this.resetError}
                className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-bold transition-colors mx-auto"
              >
                <RefreshCw size={18} />
                حاول مرة أخرى
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
