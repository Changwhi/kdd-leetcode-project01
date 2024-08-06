import postgres from 'postgres';
export default async function TestDB() {
  async function create(formData) {
    "use server";
    const sql = postgres(process.env.NEXT_PUBLIC_DATABASE_URL, { ssl: 'require' });
    await sql`CREATE TABLE IF NOT EXISTS comments (comment TEXT)`;
    const comment = formData.get("comment");
    await sql`INSERT INTO comments (comment) VALUES (${comment})`;
  }
  return (
    <form action={create}>
      <input type="text" placeholder="write a comment" name="comment" />
      <button type="submit">Submit</button>
    </form>
  );
}