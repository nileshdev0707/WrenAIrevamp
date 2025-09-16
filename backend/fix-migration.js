const { Client } = require("pg");

const pgClient = new Client({
  connectionString:
    "postgresql://wrenairevamp_user:bZrYZRcC72jLtKeLMGeZNYZ0iGMkE4AM@dpg-d34ffe3ipnbc73fu7j8g-a.oregon-postgres.render.com/wrenairevamp",
  ssl: { rejectUnauthorized: false },
});

async function fixHomePageData() {
  try {
    await pgClient.connect();
    console.log("✅ Connected to PostgreSQL");

    // Insert the home page data manually with proper timestamp conversion
    const homePageData = [
      {
        id: 1,
        document_id: "t7pob48x6i6lt1tksx8v9rvo",
        created_at: new Date(1757684547165),
        updated_at: new Date(1757933222371),
        published_at: null,
        created_by_id: 1,
        updated_by_id: 1,
        locale: null,
      },
      {
        id: 25,
        document_id: "t7pob48x6i6lt1tksx8v9rvo",
        created_at: new Date(1757684547165),
        updated_at: new Date(1757933222371),
        published_at: new Date(1757933222398),
        created_by_id: 1,
        updated_by_id: 1,
        locale: null,
      },
    ];

    // Clear existing data
    await pgClient.query("DELETE FROM home_pages");
    console.log("🗑️  Cleared existing home_pages data");

    // Insert corrected data
    for (const row of homePageData) {
      try {
        await pgClient.query(
          `
          INSERT INTO home_pages (id, document_id, created_at, updated_at, published_at, created_by_id, updated_by_id, locale) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `,
          [
            row.id,
            row.document_id,
            row.created_at,
            row.updated_at,
            row.published_at,
            row.created_by_id,
            row.updated_by_id,
            row.locale,
          ]
        );
        console.log(`✅ Inserted home_page record with id: ${row.id}`);
      } catch (err) {
        console.log(`❌ Error inserting home_page ${row.id}: ${err.message}`);
      }
    }

    // Check the result
    const result = await pgClient.query("SELECT COUNT(*) FROM home_pages");
    console.log(`📊 Total home_pages records: ${result.rows[0].count}`);

    // Also check if the record is published
    const publishedResult = await pgClient.query(
      "SELECT COUNT(*) FROM home_pages WHERE published_at IS NOT NULL"
    );
    console.log(
      `📊 Published home_pages records: ${publishedResult.rows[0].count}`
    );
  } catch (error) {
    console.error("❌ Fix failed:", error);
  } finally {
    await pgClient.end();
  }
}

fixHomePageData();
