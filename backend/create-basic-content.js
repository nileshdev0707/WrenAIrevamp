const { Client } = require("pg");

const pgClient = new Client({
  connectionString:
    "postgresql://wrenairevamp_user:bZrYZRcC72jLtKeLMGeZNYZ0iGMkE4AM@dpg-d34ffe3ipnbc73fu7j8g-a.oregon-postgres.render.com/wrenairevamp",
  ssl: { rejectUnauthorized: false },
});

async function createBasicContent() {
  try {
    await pgClient.connect();
    console.log("✅ Connected to PostgreSQL");

    // Create a basic home page entry without foreign key dependencies
    const now = new Date();

    try {
      await pgClient.query(
        `
        INSERT INTO home_pages (document_id, created_at, updated_at, published_at, locale) 
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (document_id) DO NOTHING
      `,
        ["home-page-default", now, now, now, null]
      );

      console.log("✅ Created basic home page entry");

      // Check if it was created
      const result = await pgClient.query("SELECT * FROM home_pages");
      console.log(`📊 Total home_pages records: ${result.rows.length}`);

      if (result.rows.length > 0) {
        console.log("📄 Home page data:", result.rows[0]);
      }
    } catch (err) {
      console.log(`❌ Error creating home page: ${err.message}`);
    }
  } catch (error) {
    console.error("❌ Failed:", error);
  } finally {
    await pgClient.end();
  }
}

createBasicContent();
