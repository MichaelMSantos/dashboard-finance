import { isMatch } from "date-fns";
import { z } from "zod";

export const generateAiReportSchema = z.object({
  month: z.string().refine(
    (value) => {
      return value === "all" || isMatch(value, "MM");
    },
    {
      message:
        "Mês inválido. O mês deve ser no formato 'MM' (01 a 12) ou 'all'.",
    },
  ),
});

export type GenerateAiReportSchema = z.infer<typeof generateAiReportSchema>;
