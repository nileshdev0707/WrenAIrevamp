const sqlite3 = require("sqlite3").verbose();
const { Client } = require("pg");

// PostgreSQL connection
const pgClient = new Client({
  connectionString:
    "postgresql://wrenairevamp_user:bZrYZRcC72jLtKeLMGeZNYZ0iGMkE4AM@dpg-d34ffe3ipnbc73fu7j8g-a.oregon-postgres.render.com/wrenairevamp",
  ssl: { rejectUnauthorized: false },
});

// SQLite connection
const sqliteDb = new sqlite3.Database(".tmp/data.db");

async function migrateCompleteData() {
  try {
    await pgClient.connect();
    console.log("✅ Connected to PostgreSQL");

    // Step 1: Migrate core system data first
    console.log("\n🔄 Step 1: Migrating core system data...");

    // Migrate admin users first
    await migrateTable("admin_users");
    await migrateTable("admin_roles");
    await migrateTable("admin_permissions");
    await migrateTable("admin_users_roles_lnk");
    await migrateTable("admin_permissions_role_lnk");

    // Migrate API tokens
    await migrateTable("strapi_api_tokens");
    await migrateTable("strapi_api_token_permissions");

    // Step 2: Migrate user permissions
    console.log("\n🔄 Step 2: Migrating user permissions...");
    await migrateTable("up_roles");
    await migrateTable("up_permissions");
    await migrateTable("up_users");
    await migrateTable("up_permissions_role_lnk");
    await migrateTable("up_users_role_lnk");

    // Step 3: Migrate content
    console.log("\n🔄 Step 3: Migrating content...");

    // Migrate components first
    const componentTables = [
      "components_shared_buttons",
      "components_shared_links",
      "components_home_features",
      "components_home_feature_cards",
      "components_sections_hero_sections",
      "components_sections_logos_sections",
      "components_shared_content_blocks",
      "components_home_case_studies",
      "components_home_trusted_by_data_teams",
      "components_home_core_capabilities",
      "components_home_core_capabilities_lists",
      "components_home_use_cases_s",
      "components_home_use_cases_items",
    ];

    for (const table of componentTables) {
      await migrateTable(table);
    }

    // Then migrate main content tables
    await migrateTable("home_pages", true); // Special handling for timestamps
    await migrateTable("home_pages_cmps");

    console.log("\n🎉 Migration completed!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
  } finally {
    await pgClient.end();
    sqliteDb.close();
  }
}

async function migrateTable(tableName, handleTimestamps = false) {
  try {
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
      return;
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

    let successCount = 0;
    let errorCount = 0;

    // Insert data into PostgreSQL
    for (const row of data) {
      let values = columns.map((col) => {
        let value = row[col];

        // Handle timestamp conversion for specific columns
        if (
          handleTimestamps &&
          (col === "created_at" ||
            col === "updated_at" ||
            col === "published_at")
        ) {
          if (value && typeof value === "number") {
            // Convert milliseconds to proper timestamp
            value = new Date(value);
          }
        }

        return value;
      });

      const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");
      const columnNames = columns.map((col) => `"${col}"`).join(", ");

      try {
        await pgClient.query(
          `INSERT INTO "${tableName}" (${columnNames}) VALUES (${placeholders})`,
          values
        );
        successCount++;
      } catch (err) {
        errorCount++;
        if (errorCount <= 3) {
          // Only show first 3 errors to avoid spam
          console.log(`  ❌ Error inserting into ${tableName}: ${err.message}`);
        }
      }
    }

    console.log(
      `  ✅ Migrated ${successCount} rows to ${tableName}${errorCount > 0 ? ` (${errorCount} errors)` : ""}`
    );
  } catch (error) {
    console.log(`  ❌ Failed to migrate ${tableName}: ${error.message}`);
  }
}

migrateCompleteData();
