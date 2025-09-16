const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("🚀 Starting migration from SQLite to PostgreSQL...");

// Step 1: Export SQLite data to SQL dump
console.log("📤 Exporting SQLite data...");
try {
  execSync("sqlite3 .tmp/data.db .dump > sqlite_dump.sql", {
    stdio: "inherit",
  });
  console.log("✅ SQLite data exported to sqlite_dump.sql");
} catch (error) {
  console.error("❌ Failed to export SQLite data:", error.message);
  process.exit(1);
}

// Step 2: Create a PostgreSQL-compatible version of the dump
console.log("🔄 Converting SQLite dump to PostgreSQL format...");
try {
  let sqlContent = fs.readFileSync("sqlite_dump.sql", "utf8");

  // Basic SQLite to PostgreSQL conversions
  sqlContent = sqlContent
    // Remove SQLite-specific pragmas
    .replace(/PRAGMA[^;]*;/g, "")
    // Convert SQLite autoincrement to PostgreSQL serial
    .replace(/INTEGER PRIMARY KEY AUTOINCREMENT/g, "SERIAL PRIMARY KEY")
    // Convert SQLite boolean values
    .replace(/\b0\b/g, "FALSE")
    .replace(/\b1\b/g, "TRUE")
    // Fix quote issues
    .replace(/`/g, '"')
    // Remove SQLite-specific table options
    .replace(/WITHOUT ROWID/g, "")
    // Convert datetime format
    .replace(/datetime\('now'\)/g, "NOW()")
    // Handle text fields that should be JSON
    .replace(/TEXT CHECK\(json_valid\([^)]+\)\)/g, "JSONB");

  fs.writeFileSync("postgres_dump.sql", sqlContent);
  console.log("✅ PostgreSQL-compatible dump created as postgres_dump.sql");
} catch (error) {
  console.error("❌ Failed to convert dump:", error.message);
  process.exit(1);
}

console.log("🎉 Migration preparation complete!");
console.log("");
console.log("Next steps:");
console.log("1. Start your Strapi application with: npm run develop");
console.log(
  "2. Strapi will automatically create the database schema in PostgreSQL"
);
console.log("3. You can then manually import specific data if needed");
console.log("");
console.log(
  "Note: The postgres_dump.sql file contains your data, but you may need to"
);
console.log(
  "manually adjust some parts due to differences between SQLite and PostgreSQL."
);
