import React, { useEffect } from 'react';
import { Container } from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  useEffect(() => {
    document.title = 'Page Not Found | Dhanush M';
  }, []);

  return (
    <div className="flex-1 min-h-[60vh] flex items-center justify-center py-20">
      <Container className="text-center max-w-2xl flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-(--color-surface-2) border border-(--color-border) text-xs font-mono text-(--color-primary) mb-6">
          <span>404</span>
          <span className="text-(--color-muted)">/</span>
          <span>Page Not Found</span>
        </div>

        <h1 className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-(--color-text) tracking-tight mb-4">
          Oops, page not found
        </h1>

        <p className="font-sans text-base sm:text-lg text-(--color-muted) leading-relaxed mb-8 max-w-lg">
          The project or page you are looking for doesn't exist, has been moved, or the link may be incorrect.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            href="/"
            variant="primary"
            size="md"
            icon={<Home className="w-4 h-4" />}
          >
            Back to Home
          </Button>
          <Button
            href="/#projects"
            variant="secondary"
            size="md"
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            View Projects
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default NotFound;
