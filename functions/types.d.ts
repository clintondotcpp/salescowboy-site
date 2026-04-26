// Fallback type definitions for Cloudflare Pages Functions
// These allow the typechecker to work when @cloudflare/workers-types is not installed

declare interface D1Database {
  prepare: (query: string) => D1PreparedStatement;
  dump: () => Promise<ArrayBuffer>;
  batch: (statements: D1PreparedStatement[]) => Promise<D1Result[]>;
  exec: (query: string) => Promise<D1ExecResult>;
}

declare interface D1PreparedStatement {
  bind: (...values: any[]) => D1PreparedStatement;
  first: <T = unknown>(colName?: string) => Promise<T | null>;
  run: <T = unknown>() => Promise<D1Result<T>>;
  all: <T = unknown>() => Promise<D1Result<T>>;
  raw: <T = unknown>() => Promise<T[]>;
}

declare interface D1Result<T = unknown> {
  results?: T[];
  success: boolean;
  error?: string;
  meta: {
    last_row_id: number | null;
    changes: number;
    duration: number;
    served_by: string;
  };
}

declare interface D1ExecResult {
  count: number;
  duration: number;
}

declare interface EventContext<Env, P extends string, Data> {
  request: Request;
  env: Env;
  params: { [K in P]: string };
  data: Data;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
}
