import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Document } from "../types/document";

interface Props {
  doc: Document;
  onAdd: (ref: string, amount: number) => Promise<void>;
  onRemove: (ref: string, amount: number) => Promise<void>;
  onDelete: (ref: string, force: boolean) => Promise<void>;
}

export default function DocumentItem({
  doc,
  onAdd,
  onRemove,
  onDelete,
}: Props) {
  const [amount, setAmount] = useState(1);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{doc.reference}</Typography>
        <Typography>{doc.description}</Typography>
        <Typography color="text.secondary">
          {doc.document_type}
        </Typography>

        <Typography>
          Items: {doc.line_item_count} / {doc.line_item_limit}
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <TextField
            type="number"
            size="small"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />

          <Button
            variant="outlined"
            onClick={() => onAdd(doc.reference, amount)}
          >
            Add
          </Button>

          <Button
            variant="outlined"
            color="warning"
            onClick={() => onRemove(doc.reference, amount)}
          >
            Remove
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={() =>
              onDelete(doc.reference, window.confirm("Force delete?"))
            }
          >
            Delete
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}