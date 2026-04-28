import { useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { createDocument } from "../api/documentApi";

export default function DocumentForm({ onSuccess, onError }: any) {
  const [form, setForm] = useState({
    reference: "",
    description: "",
    document_type: "invoice",
    line_item_limit: 5,
  });

  const handleSubmit = async () => {
    try {
      await createDocument(form);
      onSuccess();

      // ✅ Reset form after success
      setForm({
        reference: "",
        description: "",
        document_type: "invoice",
        line_item_limit: 5,
      });
    } catch (err: any) {
      onError(err.response?.data || "Failed to create document");
    }
  };

  return (
    <Box display="flex" gap={2} mb={2}>
      <TextField
        label="Reference"
        value={form.reference}
        onChange={(e) =>
          setForm({ ...form, reference: e.target.value })
        }
      />

      <TextField
        label="Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <Select
        value={form.document_type}
        onChange={(e) =>
          setForm({ ...form, document_type: e.target.value })
        }
      >
        <MenuItem value="invoice">Invoice</MenuItem>
        <MenuItem value="receipt">Receipt</MenuItem>
      </Select>

      <TextField
        type="number"
        label="Limit"
        value={form.line_item_limit}
        onChange={(e) =>
          setForm({
            ...form,
            line_item_limit: Number(e.target.value),
          })
        }
      />

      <Button variant="contained" onClick={handleSubmit}>
        Create
      </Button>
    </Box>
  );
}