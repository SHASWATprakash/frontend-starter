import {
  Box,
  TextField,
  Select,
  MenuItem,
  Typography,
  Snackbar,
  Alert,
  Pagination,
} from "@mui/material";
import { useState } from "react";
import { useDocuments } from "../hooks/useDocuments";
import DocumentForm from "../components/DocumentForm";
import DocumentList from "../components/DocumentList";

export default function DocumentPage() {
  const { documents, refresh, loading } = useDocuments();

  // 🔔 Toast state
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const showToast = (message: string, severity: "success" | "error" = "success") => {
    setToast({ open: true, message, severity });
  };

  // 🔍 Search + Filter
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const filteredDocs = documents.filter((doc) => {
    return (
      doc.reference.toLowerCase().includes(search.toLowerCase()) &&
      (filter ? doc.document_type === filter : true)
    );
  });

  // 📄 Pagination
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const paginatedDocs = filteredDocs.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <Box p={3}>
      {/* 🔥 Title */}
      <Typography variant="h5" gutterBottom>
        Document Management
      </Typography>

      {/* ✅ Create Form */}
      <DocumentForm
        onSuccess={() => {
          showToast("Document created successfully");
          refresh();
        }}
        onError={(msg: string) => showToast(msg, "error")}
      />

      {/* 🔍 Search + Filter UI */}
      <Box display="flex" gap={2} my={2}>
        <TextField
          label="Search by reference"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />

        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          displayEmpty
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="invoice">Invoice</MenuItem>
          <MenuItem value="receipt">Receipt</MenuItem>
        </Select>
      </Box>

      {/* 📊 Count */}
      <Typography variant="body2" mb={1}>
        Total Documents: {filteredDocs.length}
      </Typography>

      {/* 📄 List */}
      <DocumentList
        documents={paginatedDocs}
        refresh={refresh}
        showToast={showToast}
        loading={loading}
      />

      {/* 📌 Pagination */}
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(filteredDocs.length / rowsPerPage)}
          page={page}
          onChange={(_, value) => setPage(value)}
        />
      </Box>

      {/* 🔔 Snackbar */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <Alert severity={toast.severity} variant="filled">
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}