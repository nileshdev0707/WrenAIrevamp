const sqlite3 = require("sqlite3").verbose();
const { Client } = require("pg");
const fs = require("fs");

// PostgreSQL connection
const pgClient = new Client({
  connectionString:
    "postgresql://wrenairevamp_user:bZrYZRcC72jLtKeLMGeZNYZ0iGMkE4AM@dpg-d34ffe3ipnbc73fu7j8g-a.oregon-postgres.render.com/wrenairevamp",
  ssl: { rejectUnauthorized: false },
});

// SQLite connection
const sqliteDb = new sqlite3.Database(".tmp/data.db");

async function migrateData() {
  try {
    await pgClient.connect();
    console.log("✅ Connected to PostgreSQL");

    // Get all table names from SQLite
    const tables = await new Promise((resolve, reject) => {
      sqliteDb.all(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'",
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows.map((row) => row.name));
        }
      );
    });

    console.log(`📋 Found ${tables.length} tables to migrate`);

    for (const tableName of tables) {
      console.log(`\n🔄 Migrating table: ${tableName}`);

      // Get data from SQLite
      const data = await new Promise((resolve, reject) => {
        sqliteDb.all(`SELECT * FROM "${tableName}"`, (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
      });

      if (data.length === 0) {
        console.log(`  ⏭️  Skipping ${tableName} (no data)`);
        continue;
      }

      // Get column names
      const columns = Object.keys(data[0]);

      // Clear existing data in PostgreSQL table
      try {
        await pgClient.query(`DELETE FROM "${tableName}"`);
        console.log(`  🗑️  Cleared existing data in ${tableName}`);
      } catch (err) {
        console.log(`  ⚠️  Could not clear ${tableName}: ${err.message}`);
      }

      // Insert data into PostgreSQL
      for (const row of data) {
        const values = columns.map((col) => row[col]);
        const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");
        const columnNames = columns.map((col) => `"${col}"`).join(", ");

        try {
          await pgClient.query(
            `INSERT INTO "${tableName}" (${columnNames}) VALUES (${placeholders})`,
            values
          );
        } catch (err) {
          console.log(`  ❌ Error inserting into ${tableName}: ${err.message}`);
          // Continue with next row
        }
      }

      console.log(`  ✅ Migrated ${data.length} rows to ${tableName}`);
    }

    console.log("\n🎉 Migration completed!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
  } finally {
    await pgClient.end();
    sqliteDb.close();
  }
}

migrateData();
