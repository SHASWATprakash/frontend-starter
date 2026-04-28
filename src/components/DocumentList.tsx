import {
  Table, TableHead, TableRow, TableCell,
  TableBody, Button
} from "@mui/material";
import { addLineItems } from "src/api/documentApi";

export default function DocumentList({ documents, refresh, showToast }: any) {
  const handleAdd = async (ref: string) => {
    const amount = Number(prompt("Add amount"));
    try {
      await addLineItems(ref, amount);
      showToast("Line items added");
      refresh();
    } catch {
      showToast("Failed to add", "error");
    }
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Reference</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Items</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {documents.map((doc: any) => (
          <TableRow key={doc.reference}>
            <TableCell>{doc.reference}</TableCell>
            <TableCell>{doc.description}</TableCell>
            <TableCell>{doc.document_type}</TableCell>
            <TableCell>
              {doc.line_item_count}/{doc.line_item_limit}
            </TableCell>

            <TableCell>
              <Button onClick={() => handleAdd(doc.reference)}>Add</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}