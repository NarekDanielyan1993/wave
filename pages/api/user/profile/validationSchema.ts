// import { emailSchema } from '@utils/validator';
// import { z } from 'zod';

// export const profileSchema = z.object({
//     email: emailSchema,
// });

// export const profileGetSchema = z.object({
//     email: emailSchema,
// });

// export const updateProfileSchema = z.object({
//     firstname: z.string().optional(),
//     lastname: z.string().optional(),
// });

// export const cartCreateSchema = z.object({
//     userId: z.string(),
//     productId: z.string(),
// });

// export const cartGetSchema = z.object({
//     userId: z.string(),
// });

// export const cartDeleteSchema = z.object({
//     ids: z.array(z.string()),
// });

// export const profileHistoryCreateSchema = z.object({
//     history: z.array(
//         z.object({
//             userId: z.string(),
//             product: z.string(),
//             amount: z.number(),
//         })
//     ),
// });

// export const profileHistoryGetSchema = z.object({
//     userId: z.string(),
// });

// export const profileImageDeleteSchema = z.object({
//     publicId: z.string(),
// });
