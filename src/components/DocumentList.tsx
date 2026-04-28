import {
  Table, TableHead, TableRow, TableCell,
  TableBody, Button
} from "@mui/material";
import { getApiErrorMessage } from "../utils/apiError";

import { addLineItems, removeLineItems } from "../api/documentApi";

export default function DocumentList({
  documents,
  refresh,
  showToast,
  loading
}: any) {

 const handleAdd = async (ref: string) => {
  const amountStr = prompt("Enter amount to ADD");

  const amount = Number(amountStr);

  if (!amountStr || isNaN(amount) || amount <= 0) {
    showToast("Enter a valid positive number", "error");
    return;
  }

  try {
    await addLineItems(ref, amount);
    showToast("Line items added", "success");
    refresh();
  } catch (err: any) {
    showToast(getApiErrorMessage(err), "error");
  }
};

  const handleRemove = async (ref: string) => {
  const amountStr = prompt("Enter amount to REMOVE");

  const amount = Number(amountStr);

  if (!amountStr || isNaN(amount) || amount <= 0) {
    showToast("Enter a valid positive number", "error");
    return;
  }

  try {
    await removeLineItems(ref, amount);
    showToast("Line items removed", "success");
    refresh();
  } catch (err: any) {
    showToast(getApiErrorMessage(err), "error");
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