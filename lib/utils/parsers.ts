import { z, type ZodNumber } from "zod";

const UInt16: ZodNumber = z
  .number()
  .int()
  .min(0)
  .max(Math.pow(2, 16) - 1);

export const Port: z.ZodPipeline<z.ZodNumber, z.ZodNumber> = z.coerce.number()
  .pipe(UInt16);
