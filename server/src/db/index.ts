import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"
import { env, isProduction } from "../config/env"

// Query logging prints bound parameters, so keep it out of production.
const db = drizzle(env.databaseUrl, { schema, logger: !isProduction })

export default db;
