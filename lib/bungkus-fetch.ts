"use server";
import { dataService } from "@/lib/data-fetch";

export const fetchData = async () => {
  return dataService.getData();
};

export const fetchDataById = async (id: string) => {
  return dataService.getDataById(id);
};
