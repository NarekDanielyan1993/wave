import { z } from 'zod';

export const getUserPermissionsSchema = z.object({
    role: z.string(),
});
