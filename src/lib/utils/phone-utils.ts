import z from "zod";

/**
 * Valida se um número de telefone móvel brasileiro é válido
 */
export function isValidBrazilMobile(input: string): boolean {
  const val = input.trim();
  const re = /^(?:\+55\s*)?(?:\(?[1-9][0-9]\)?\s*)9\d{4}\-?\s?\d{4}$/;
  return re.test(val);
}

/**
 * Normaliza um valor para apenas dígitos
 */
export const normalizeToDigits = (val: unknown): string | null => {
  if (typeof val === "number") val = String(val);
  if (typeof val !== "string") return null;
  const digits = val.replace(/\D+/g, "");
  if (digits.length === 13 && digits.startsWith("55")) return digits.slice(2);
  return digits;
};

/**
 * Schema Zod para validação de telefone móvel brasileiro
 */
export const BrazilMobileSchema = z
  .string()
  .transform((v) => normalizeToDigits(v) || "")
  .refine((d) => d && d.length === 11, {
    message: "Campo em formato inválido.",
  })
  .refine((d) => d && isValidBrazilMobile(d), {
    message:
      "Formato inválido: espere DDD(2) + 9 + 8 dígitos (ex.: 78984111213).",
  });

/**
 * Formata um número de telefone para o padrão brasileiro
 */
export const formatPhone = (value: string) => {
  // Remove tudo que não for número
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  let result = "(";
  if (digits.length > 0) result += digits.substring(0, 2);
  if (digits.length >= 3) result += ") ";
  if (digits.length >= 3) result += digits.substring(2, 7);
  if (digits.length >= 7) result += "-" + digits.substring(7, 11);
  return result;
};
