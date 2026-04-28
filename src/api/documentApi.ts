import axios from "axios";
import { Document } from "../types/document";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getDocuments = () => API.get<Document[]>("/documents/");

export const getDocument = (reference: string) =>
  API.get<Document>(`/documents/${reference}/`);

export const createDocument = (data: Partial<Document>) =>
  API.post("/documents/", data);

export const updateDocument = (reference: string, data: Partial<Document>) =>
  API.put(`/documents/${reference}/`, data);

export const deleteDocument = (reference: string, force_delete = false) =>
  API.delete(`/documents/${reference}/`, {
    data: { force_delete },
  });

export const addLineItems = (reference: string, amount: number) =>
  API.put(`/documents/${reference}/line-items/`, { amount });

export const removeLineItems = (reference: string, amount: number) =>
  API.delete(`/documents/${reference}/line-items/`, {
    data: { amount },
  });