import { Component, type ErrorInfo, type ReactNode } from 'react';
import Button from '../button/Button';
import styles from './ErrorBoundary.module.scss';

interface Props {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, info);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    const { hasError, error } = this.state;
    const { fallback } = this.props;

    if (!hasError) return this.props.children;

    if (typeof fallback === 'function') {
      return fallback(error as Error, this.reset);
    }

    if (fallback) return fallback;

    return (
      <div className={styles.errorBoundary}>
        <div className={styles.errorBoundary__content}>
          <h2 className={styles.errorBoundary__title}>
            Oops! Something went wrong
          </h2>
          <p className={styles.errorBoundary__message}>
            {error?.message || 'An unexpected error occurred.'}
          </p>

          <Button onClick={this.reset}>Try Again</Button>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
