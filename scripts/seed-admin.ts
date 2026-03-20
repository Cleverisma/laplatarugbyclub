/**
 * Seed script: Crea el usuario administrador inicial.
 *
 * Uso:
 *   npx tsx scripts/seed-admin.ts
 *
 * Variables de entorno necesarias en .env.local:
 *   TURSO_DATABASE_URL
 *   TURSO_AUTH_TOKEN
 *
 * Antes de ejecutar este script, asegurate de haber hecho el push del schema:
 *   pnpm exec drizzle-kit push
 */
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import bcrypt from 'bcryptjs';
import * as schema from '../src/db/schema';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'lprc2026'; // Cambiá esta contraseña después del primer login

async function main() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url) {
    console.error('❌ Falta TURSO_DATABASE_URL en las variables de entorno.');
    process.exit(1);
  }

  const client = createClient({ url, authToken });
  const db = drizzle(client, { schema });

  // Hash de la contraseña
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(ADMIN_PASSWORD, salt);

  // Insertar usuario (usar INSERT OR REPLACE para poder re-ejecutar)
  await db.insert(schema.users).values({
    username: ADMIN_USERNAME,
    passwordHash,
  }).onConflictDoUpdate({
    target: schema.users.username,
    set: { passwordHash },
  });

  console.log(`✅ Usuario '${ADMIN_USERNAME}' creado/actualizado correctamente.`);
  console.log(`   Contraseña: ${ADMIN_PASSWORD}`);
  console.log('   ⚠️  Cambiá la contraseña después del primer login.');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Error al ejecutar el seed:', err);
  process.exit(1);
});
