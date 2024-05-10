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
    from: z
        .string()
        .transform(val => Number(val.replace(/[^\d.-]/g, '')))
        .or(z.null()),
    to: z
        .string()
        .transform(val => Number(val.replace(/[^\d.-]/g, '')))
        .or(z.null()),
});

export type FilterProductSchemaType = z.infer<typeof filterProductSchema>;
