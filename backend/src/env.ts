import * as dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

export const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  JWT_SECRET_KEY: z.string().default('secret'),
  PRISMA_DATABASE_URL: z.string(),
});

export type Env = z.infer<typeof envSchema>;
export default envSchema.parse(process.env);
