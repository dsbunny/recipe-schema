import * as z from 'zod';
export declare const BaseParamsSchema: z.ZodRecord<z.ZodString, z.ZodAny>;
export type BaseParams = z.infer<typeof BaseParamsSchema>;
