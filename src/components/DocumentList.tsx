import {
  Table, TableHead, TableRow, TableCell,
  TableBody, Button
} from "@mui/material";

import { addLineItems, removeLineItems } from "../api/documentApi";

export default function DocumentList({
  documents,
  refresh,
  showToast,
  loading
}: any) {

  const handleAdd = async (ref: string) => {
    const amount = Number(prompt("Enter amount to ADD"));
    if (!amount || amount <= 0) {
      showToast("Invalid amount", "error");
      return;
    }

    try {
      await addLineItems(ref, amount);
      showToast("Line items added");
      refresh();
    } catch (err) {
      showToast("Failed to add line items", "error");
    }
  };

  const handleRemove = async (ref: string) => {
    const amount = Number(prompt("Enter amount to REMOVE"));
    if (!amount || amount <= 0) {
      showToast("Invalid amount", "error");
      return;
    }

    try {
      await removeLineItems(ref, amount);
      showToast("Line items removed");
      refresh();
    } catch (err) {
      showToast("Failed to remove line items", "error");
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

            <TableCell style={{ display: "flex", gap: "8px" }}>
              <Button
                variant="contained"
                size="small"
                onClick={() => handleAdd(doc.reference)}
              >
                Add
              </Button>

              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => handleRemove(doc.reference)}
              >
                Remove
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}