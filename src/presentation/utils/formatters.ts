export const formatTalla = (value: string): string => {
  const cleanValue = value.replace(/\D/g, "");
  if (cleanValue.length === 0) return "";
  if (cleanValue.length === 1) return cleanValue;
  return `${cleanValue.slice(0, 1)}.${cleanValue.slice(1, 3)}`;
};

export const formatIMC = (value: string): string => {
  const cleanValue = value.replace(/\D/g, "");
  if (cleanValue.length === 0) return "";
  if (cleanValue.length <= 2) return cleanValue;
  return `${cleanValue.slice(0, 2)}.${cleanValue.slice(2, 4)}`;
};

export const formatTA = (value: string): string => {
  const cleanValue = value.replace(/\D/g, "");
  if (cleanValue.length === 0) return "";
  if (cleanValue.length <= 3) return cleanValue;
  return `${cleanValue.slice(0, 3)}/${cleanValue.slice(3, 6)}`;
};

export const formatTemp = (value: string): string => {
  const cleanValue = value.replace(/\D/g, "");
  if (cleanValue.length === 0) return "";
  if (cleanValue.length <= 2) return cleanValue;
  return `${cleanValue.slice(0, 2)}.${cleanValue.slice(2, 3)}`;
};

export const formatSpO2 = (value: string): string => {
  const cleanValue = value.replace(/\D/g, "");
  if (cleanValue.length === 0) return "";
  const numericValue = parseInt(cleanValue, 10);
  if (numericValue > 100) return "100";
  return cleanValue.slice(0, 3); // Extra measure to cap length
};

export const formatNumber = (value: string): string => {
  return value.replace(/\D/g, "");
};

export const formatCurrencyInput = (value: string): string => {
  let val = value.replace(/[^0-9.]/g, "");
  const dotIndex = val.indexOf(".");
  if (dotIndex !== -1) {
    let intPart = val.substring(0, dotIndex).slice(0, 6);
    const decPart = val.substring(dotIndex + 1).replace(/\./g, "").slice(0, 2);
    intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    val = intPart + "." + decPart;
  } else {
    val = val.slice(0, 6);
    const isMaxDigits = val.length === 6;
    val = val.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (isMaxDigits) {
      val += ".";
    }
  }
  return val;
};

export const formatTextOnly = (value: string): string => {
  return value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
};

export const formatTextWithPunctuation = (value: string): string => {
  return value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s.,&;-]/g, "");
};

// Se usa localmente el prefijo +52
export const formatPhoneMx = (value: string): string => {
  const digits = value.replace(/\D/g, "");
  const code = "52";
  let realDigits = digits;
  if (digits.startsWith(code)) {
    realDigits = digits.substring(code.length);
  }
  const max10 = realDigits.slice(0, 10);
  return `+${code} ${max10}`;
};

export const formatPercentage = (value: string): string => {
  let percentageValue = parseInt(value.replace(/\D/g, "") || "0", 10);
  if (percentageValue > 100) percentageValue = 100;
  return percentageValue === 0 && value === "" ? "" : percentageValue.toString();
};

export const formatMaxDays = (value: string, maxDays: number): string => {
  let daysValue = parseInt(value.replace(/\D/g, "") || "0", 10);
  if (daysValue > maxDays) daysValue = maxDays;
  return daysValue === 0 && value === "" ? "" : daysValue.toString();
};
