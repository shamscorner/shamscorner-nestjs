import { z } from 'zod';
import { createCatSchema } from './create-cat.dto';

export const updateCatSchema = createCatSchema.partial();

export type UpdateCatDto = z.infer<typeof updateCatSchema>;
