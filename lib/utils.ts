import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// INI ADALAHA FUNGSI UNTUK MEMBUAT HURUF DEPAN JADI CAPITAL
export function formatCapitalize(str: string) {
  if (str.includes("@")) {
    return str;
  }

  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// INI ADALAHA FUNGSI UNTUK MEMBUAT MENAMPILKAN TITLE DI VIEW OPTION TABLE
export const renderTitle = (columnName: string) => {
  switch (columnName) {
    case "name":
      return "Nama";
    case "address":
      return "Alamat";
    case "typeSupplier":
      return "Jenis Supplier";
    case "phone":
      return "No. Telepon";
    case "id_barang":
      return "ID Barang";
    case "categoryName":
      return "Jenis Barang";
    case "unitName":
      return "Satuan";
    case "price":
      return "Total Harga";
    case "dateIn":
      return "Tanggal Masuk";
    case "dateOut":
      return "Tanggal Keluar";
    case "supplierName":
      return "Supplier";
    case "totalAmount":
      return "Total Amount";
    case "userName":
      return "User";
    case "idCode":
      return "Kode Barang";
    case "serviceDate":
      return "Tanggal Jasa";
    case "poNumber":
      return "No. PO";
    case "itemCode":
      return "Kode Barang";
    case "poStock":
      return "Total PO";
    case "urlFile":
      return "File PO";
    case "itemName":
      return "Nama Barang";

    default:
      return columnName;
  }
};
