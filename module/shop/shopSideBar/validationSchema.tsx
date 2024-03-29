import { z } from 'zod';

export const filterProductSchema = z.object({
    frets: z.array(
        z.object({
            name: z.string(),
            checked: z.boolean(),
        })
    ),
    brands: z.array(
        z.object({
            name: z.string(),
            checked: z.boolean(),
        })
    ),
    from: z.coerce.number().min(0).or(z.null()),
    to: z.coerce.number().min(0).or(z.null()),
});

export type FilterProductSchemaType = z.infer<typeof filterProductSchema>;
