import postgres from "postgres";

export const sql = postgres(process.env.NEXT_PUBLIC_DATABASE_URL, {
  ssl: "require",
});
