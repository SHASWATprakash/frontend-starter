import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  TextField,
  Box,
} from "@mui/material";
import { useState } from "react";
import { Document } from "../types/document";

interface Props {
  doc: Document;
  onAdd: (ref: string, amount: number) => Promise<void>;
  onRemove: (ref: string, amount: number) => Promise<void>;
  onDelete: (ref: string, force: boolean) => Promise<void>;
  showToast?: (msg: string, type?: "success" | "error") => void;
}

export default function DocumentItem({
  doc,
  onAdd,
  onRemove,
  onDelete,
  showToast,
}: Props) {
  const [amount, setAmount] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const validateAmount = (value: number) => {
    if (!value || isNaN(value)) return "Invalid number";
    if (value <= 0) return "Must be greater than 0";
    if (value > 100) return "Too large (max 100)";
    return null;
  };

  const handleAction = async (
    action: (ref: string, amount: number) => Promise<void>,
    ref: string
  ) => {
    const error = validateAmount(amount);
    if (error) {
      showToast?.(error, "error");
      return;
    }

    try {
      setLoading(true);
      await action(ref, amount);
      showToast?.("Success", "success");
    } catch (err: any) {
      showToast?.(
        err?.response?.data?.error || "Action failed",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this document?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);
      await onDelete(doc.reference, true);
      showToast?.("Document deleted", "success");
    } catch (err: any) {
      showToast?.(
        err?.response?.data?.error || "Delete failed",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 3,
        boxShadow: 2,
        transition: "0.2s",
        "&:hover": { boxShadow: 4 },
      }}
    >
      <CardContent>
        {/* Header */}
        <Box mb={1}>
          <Typography variant="h6" fontWeight={600}>
            {doc.reference}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {doc.description}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Type: {doc.document_type}
          </Typography>
        </Box>

        {/* Stats */}
        <Typography sx={{ mb: 2 }}>
          Items:{" "}
          <b>
            {doc.line_item_count} / {doc.line_item_limit}
          </b>
        </Typography>

        {/* Actions */}
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            type="number"
            size="small"
            value={amount}
            inputProps={{ min: 1, max: 100 }}
            onChange={(e) => setAmount(Number(e.target.value))}
            sx={{ width: 90 }}
          />

          <Button
            variant="contained"
            onClick={() => handleAction(onAdd, doc.reference)}
            disabled={loading}
          >
            Add
          </Button>

          <Button
            variant="outlined"
            color="warning"
            onClick={() => handleAction(onRemove, doc.reference)}
            disabled={loading}
          >
            Remove
          </Button>

          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={loading}
          >
            Delete
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}