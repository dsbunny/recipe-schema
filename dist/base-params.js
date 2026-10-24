// vim: tabstop=8 softtabstop=0 noexpandtab shiftwidth=8 nosmarttab
import * as z from 'zod';
import { dsbunnyRegistry } from '@dsbunny/zod-registry';
export const BaseParamsSchema = z.record(z.string(), z.any()).register(dsbunnyRegistry, {
    id: 'BaseParamsSchema',
    description: 'Schema for runtime parameters of an asset.',
});
//# sourceMappingURL=base-params.js.map