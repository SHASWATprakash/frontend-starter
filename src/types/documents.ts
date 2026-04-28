export type DocumentType = "invoice" | "receipt";

export interface Document {
  reference: string;
  description: string;
  document_type: DocumentType;
  line_item_limit: number;
  line_item_count: number;
}