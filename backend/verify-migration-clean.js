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

async function verifyMigration() {
  try {
    await pgClient.connect();
    console.log("✅ Connected to PostgreSQL");
    console.log("✅ Connected to SQLite");

    console.log("\n" + "=".repeat(80));
    console.log("📊 MIGRATION VERIFICATION REPORT");
    console.log("=".repeat(80));

    // Get all tables from SQLite
    const sqliteTables = await new Promise((resolve, reject) => {
      sqliteDb.all(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'",
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows.map((row) => row.name));
        }
      );
    });

    // Get all tables from PostgreSQL
    const pgResult = await pgClient.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `);
    const pgTables = pgResult.rows.map((row) => row.table_name);

    console.log(`\n📋 SQLite Tables: ${sqliteTables.length}`);
    console.log(`📋 PostgreSQL Tables: ${pgTables.length}`);

    // Check each table
    let totalSqliteRows = 0;
    let totalPgRows = 0;
    let successfulTables = 0;
    let failedTables = 0;

    const migrationReport = [];

    for (const tableName of sqliteTables.sort()) {
      try {
        // Get SQLite count
        const sqliteCount = await new Promise((resolve, reject) => {
          sqliteDb.get(
            `SELECT COUNT(*) as count FROM "${tableName}"`,
            (err, row) => {
              if (err) reject(err);
              else resolve(row.count);
            }
          );
        });

        // Get PostgreSQL count
        let pgCount = 0;
        let pgExists = false;

        if (pgTables.includes(tableName)) {
          pgExists = true;
          try {
            const pgResult = await pgClient.query(
              `SELECT COUNT(*) FROM "${tableName}"`
            );
            pgCount = parseInt(pgResult.rows[0].count);
          } catch (err) {
            pgCount = `Error: ${err.message}`;
          }
        }

        totalSqliteRows += sqliteCount;
        if (typeof pgCount === "number") {
          totalPgRows += pgCount;
        }

        const status = pgExists
          ? pgCount === sqliteCount
            ? "✅ COMPLETE"
            : pgCount === 0
              ? "❌ EMPTY"
              : typeof pgCount === "number"
                ? "⚠️  PARTIAL"
                : "❌ ERROR"
          : "❌ MISSING";

        if (status === "✅ COMPLETE") successfulTables++;
        else failedTables++;

        migrationReport.push({
          table: tableName,
          sqliteRows: sqliteCount,
          pgRows: pgExists ? pgCount : "N/A",
          status: status,
        });
      } catch (error) {
        failedTables++;
        migrationReport.push({
          table: tableName,
          sqliteRows: "Error",
          pgRows: "Error",
          status: `❌ ERROR: ${error.message}`,
        });
      }
    }

    // Display detailed report
    console.log("\n" + "-".repeat(100));
    console.log("📊 DETAILED TABLE COMPARISON");
    console.log("-".repeat(100));

    // Header
    const header = `${"TABLE NAME".padEnd(45)} ${"SQLITE".padStart(8)} ${"POSTGRES".padStart(10)} ${"STATUS".padStart(15)}`;
    console.log(header);
    console.log("-".repeat(100));

    migrationReport.forEach((report) => {
      const tableName =
        report.table.length > 44
          ? report.table.substring(0, 41) + "..."
          : report.table;
      const line = `${tableName.padEnd(45)} ${String(report.sqliteRows).padStart(8)} ${String(report.pgRows).padStart(10)} ${report.status.padStart(15)}`;
      console.log(line);
    });

    // Summary
    console.log("\n" + "=".repeat(80));
    console.log("📈 MIGRATION SUMMARY");
    console.log("=".repeat(80));
    console.log(`Total Tables in SQLite: ${sqliteTables.length}`);
    console.log(`Tables Successfully Migrated: ${successfulTables}`);
    console.log(`Tables with Issues: ${failedTables}`);
    console.log(`Total SQLite Rows: ${totalSqliteRows}`);
    console.log(`Total PostgreSQL Rows: ${totalPgRows}`);
    console.log(
      `Migration Success Rate: ${((successfulTables / sqliteTables.length) * 100).toFixed(1)}%`
    );
    console.log(
      `Data Transfer Rate: ${((totalPgRows / totalSqliteRows) * 100).toFixed(1)}%`
    );

    // Check critical content tables
    console.log("\n" + "-".repeat(80));
    console.log("🎯 CRITICAL CONTENT TABLES STATUS");
    console.log("-".repeat(80));

    const criticalTables = [
      "home_pages",
      "admin_users",
      "admin_roles",
      "up_permissions",
      "up_roles",
      "strapi_api_tokens",
      "components_sections_hero_sections",
      "components_home_case_studies",
      "components_home_core_capabilities",
      "components_shared_buttons",
      "components_shared_links",
    ];

    for (const table of criticalTables) {
      const report = migrationReport.find((r) => r.table === table);
      if (report) {
        console.log(
          `${report.status.padEnd(15)} ${table} (${report.sqliteRows} → ${report.pgRows})`
        );
      } else {
        console.log(`❌ MISSING      ${table}`);
      }
    }

    // Show tables with successful migration
    console.log("\n" + "-".repeat(80));
    console.log("✅ SUCCESSFULLY MIGRATED TABLES");
    console.log("-".repeat(80));
    const successfulMigrations = migrationReport.filter(
      (r) => r.status === "✅ COMPLETE"
    );
    successfulMigrations.forEach((report) => {
      console.log(`✅ ${report.table} (${report.sqliteRows} rows)`);
    });

    // Show tables with issues
    console.log("\n" + "-".repeat(80));
    console.log("❌ TABLES WITH ISSUES");
    console.log("-".repeat(80));
    const failedMigrations = migrationReport.filter(
      (r) => r.status !== "✅ COMPLETE"
    );
    failedMigrations.forEach((report) => {
      console.log(
        `${report.status} ${report.table} (${report.sqliteRows} → ${report.pgRows})`
      );
    });

    // Recommendations
    console.log("\n" + "=".repeat(80));
    console.log("💡 RECOMMENDATIONS");
    console.log("=".repeat(80));

    if (failedTables > 0) {
      console.log("❌ Migration incomplete. Issues found:");
      console.log("   • Foreign key constraint violations");
      console.log("   • Timestamp format incompatibilities");
      console.log("   • Missing parent records");
      console.log("\n💡 Suggested actions:");
      console.log("   1. Use Strapi admin panel to recreate content");
      console.log("   2. Export/import specific content types");
      console.log("   3. Manual data entry for critical content");
      console.log("   4. Fix API permissions for public access");
    } else {
      console.log("✅ Migration appears successful!");
    }
  } catch (error) {
    console.error("❌ Verification failed:", error);
  } finally {
    await pgClient.end();
    sqliteDb.close();
  }
}

verifyMigration();
