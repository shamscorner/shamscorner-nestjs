import { z } from 'zod';

export const createCatSchema = z
  .object({
    name: z.string(),
    age: z.number(),
    breed: z.string(),
    userId: z.number(),
  })
  .required();

export type CreateCatDto = z.infer<typeof createCatSchema>;

// export class CreateCatDto {
//   name: string;
//   age: number;
//   breed: string;
//   userId: number;
// }
//   userId: number;
// }
