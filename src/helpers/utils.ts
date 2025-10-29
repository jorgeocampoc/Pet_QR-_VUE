import { validFormatImg } from "@/data/data";

export function getMsg(data: any) {
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  }
  if (typeof data == "string") {
    return data;
  }
  return "Error al procesar la operación";
}

export const getExtentionImg = (data: File) => {
  const extention: any = data.name.split(".").pop();
  if (!validFormatImg.includes(extention)) {
    return false;
  }
  return true;
};

export const validSizeImg = (data: File, sizeImg: number) => {
  const size = data.size;
  if (size > sizeImg) {
    return false;
  }
  return true;
};

export const cleanWord = (value: string): string => {
  return value.trim().replace(/\s+/g, " ");
};
