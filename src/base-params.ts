// vim: tabstop=8 softtabstop=0 noexpandtab shiftwidth=8 nosmarttab

import * as z from "zod/v4";

export const BaseParams = z.record(z.string(), z.any())
        .describe('Runtime parameters for an asset');
export type BaseParams = z.infer<typeof BaseParams>;
