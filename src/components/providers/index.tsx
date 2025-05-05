import { NuqsAdapter } from "nuqs/adapters/next/app";

import QueryProvider from "./query-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <NuqsAdapter>{children}</NuqsAdapter>
    </QueryProvider>
  );
}
