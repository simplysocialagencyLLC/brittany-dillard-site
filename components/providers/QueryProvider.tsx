"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

// Scoped to just the /admin route group (see app/admin/(dashboard)/layout.tsx)
// — the public marketing pages don't need query-client machinery. Mirrors
// king-kaly's apps/admin/components/providers/QueryProvider.tsx.
export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            // Default TanStack Query behavior refetches every query on window
            // focus and network reconnect — reads as unexplained background
            // polling to anyone tabbing in and out. Explicit actions
            // (marking an outcome) update the cache directly instead.
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
          },
        },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
