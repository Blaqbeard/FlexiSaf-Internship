import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Button, { injectButtonStyles } from "./components/Button";
import TextInput, { injectFieldStyles } from "./components/TextInput";
import Checkbox, { injectCheckboxStyles } from "./components/Checkbox";
import Select from "./components/Select";
import Badge, { injectBadgeStyles } from "./components/Badge";
import Modal, { injectModalStyles } from "./components/Modal";
import Table, { injectTableStyles } from "./components/Table";
import Form from "./components/Form";

const ROLES = ["Admin", "Manager", "Editor", "Viewer"];
const STATUSES = ["Active", "Suspended", "Invited"];

const SEED = [
  {
    id: "u1",
    name: "Aisha Bello",
    email: "aisha@flexisafedu.com",
    role: "Admin",
    status: "Active",
    joinedAt: "2024-04-11",
  },
  {
    id: "u2",
    name: "Tariq Musa",
    email: "tariq@flexisafedu.com",
    role: "Manager",
    status: "Active",
    joinedAt: "2024-07-02",
  },
  {
    id: "u3",
    name: "Grace Ibe",
    email: "grace@lexisafedu.com",
    role: "Editor",
    status: "Invited",
    joinedAt: "2025-01-22",
  },
  {
    id: "u4",
    name: "Yusuf Danladi",
    email: "yusuf@flexisafedu.com",
    role: "Viewer",
    status: "Suspended",
    joinedAt: "2023-12-18",
  },
];

const STORAGE_KEY = "peopleops.users";

function useUsers() {
  const [users, setUsers] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : SEED;
  });
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }, [users]);
  return [users, setUsers];
}

function App() {
  // inject component styles once
  useEffect(() => {
    injectButtonStyles();
    injectFieldStyles();
    injectCheckboxStyles();
    injectBadgeStyles();
    injectModalStyles();
    injectTableStyles();
  }, []);

  const [users, setUsers] = useUsers();
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const filtered = useMemo(() => {
    let rows = [...users];
    if (query) {
      const q = query.toLowerCase();
      rows = rows.filter(
        (u) =>
          u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      );
    }
    if (roleFilter) rows = rows.filter((u) => u.role === roleFilter);
    if (statusFilter) rows = rows.filter((u) => u.status === statusFilter);
    rows.sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return rows;
  }, [users, query, roleFilter, statusFilter, sortKey, sortDir]);

  const allSelected =
    selected.length > 0 && selected.length === filtered.length;
  const indeterminate = selected.length > 0 && !allSelected;

  function toggleAll(checked) {
    setSelected(checked ? filtered.map((u) => u.id) : []);
  }
  function toggleOne(id) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }
  function handleSort(key) {
    if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  }
  function openCreate() {
    setEditUser(null);
    setModalOpen(true);
  }
  function openEdit(u) {
    setEditUser(u);
    setModalOpen(true);
  }
  function upsertUser(data) {
    if (editUser) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editUser.id ? { ...editUser, ...data } : u))
      );
    } else {
      const id = "u" + Math.random().toString(36).slice(2, 8);
      setUsers((prev) => [
        { id, joinedAt: new Date().toISOString().slice(0, 10), ...data },
        ...prev,
      ]);
    }
    setModalOpen(false);
  }
  function removeSelected() {
    setUsers((prev) => prev.filter((u) => !selected.includes(u.id)));
    setSelected([]);
  }
  function setStatusForSelected(status) {
    setUsers((prev) =>
      prev.map((u) => (selected.includes(u.id) ? { ...u, status } : u))
    );
    setSelected([]);
  }
  function resetSeed() {
    localStorage.removeItem(STORAGE_KEY);
    setUsers(SEED);
  }

  const columns = [
    {
      key: "sel",
      header: (
        <Checkbox
          indeterminate={indeterminate}
          checked={allSelected}
          onChange={(e) => toggleAll(e.target.checked)}
        />
      ),
      render: (r) => (
        <Checkbox
          checked={selected.includes(r.id)}
          onChange={() => toggleOne(r.id)}
        />
      ),
    },
    { key: "name", header: "Name", sortable: true },
    { key: "email", header: "Email" },
    { key: "role", header: "Role", sortable: true },
    {
      key: "status",
      header: "Status",
      render: (r) => (
        <Badge
          tone={
            r.status === "Active"
              ? "success"
              : r.status === "Suspended"
              ? "danger"
              : "info"
          }
        >
          {r.status}
        </Badge>
      ),
    },
    { key: "joinedAt", header: "Joined", sortable: true },
    {
      key: "actions",
      header: "",
      render: (r) => (
        <Button variant="ghost" size="sm" onClick={() => openEdit(r)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div>
      <header className="container" style={{ padding: "24px 0" }}>
        <div className="row wrap">
          <h2 style={{ margin: 0 }}>PeopleOps</h2>
          <span className="spacer"></span>
          <Button onClick={openCreate}>Add User</Button>
          <Button variant="secondary" onClick={resetSeed}>
            Reset Seed
          </Button>
        </div>
      </header>

      <main className="container">
        <section className="card" style={{ padding: 16 }}>
          <div className="row wrap mb-3">
            <TextInput
              id="q"
              placeholder="Search name or email"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              prefix="🔎"
            />
            <Select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              options={[
                { value: "", label: "All roles" },
                ...ROLES.map((r) => ({ value: r, label: r })),
              ]}
            />
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: "", label: "All statuses" },
                ...STATUSES.map((s) => ({ value: s, label: s })),
              ]}
            />
            <span className="spacer" />
            <Button
              variant="ghost"
              disabled={selected.length === 0}
              onClick={() => setStatusForSelected("Active")}
            >
              Activate
            </Button>
            <Button
              variant="ghost"
              disabled={selected.length === 0}
              onClick={() => setStatusForSelected("Suspended")}
            >
              Suspend
            </Button>
            <Button
              variant="ghost"
              disabled={selected.length === 0}
              onClick={removeSelected}
            >
              Delete
            </Button>
          </div>
          <Table
            columns={columns.map((c) => ({
              ...c,
              header: c.sortable ? <span>{c.header}</span> : c.header,
            }))}
            rows={filtered}
            onSort={handleSort}
            sortKey={sortKey}
            sortDir={sortDir}
          />
        </section>
      </main>

      <Modal
        open={modalOpen}
        title={editUser ? "Edit User" : "Add User"}
        onClose={() => setModalOpen(false)}
        footer={null}
      >
        <Form onSubmit={(data) => upsertUser(data)} gap={14}>
          <TextInput
            id="name"
            name="name"
            label="Full name"
            required
            defaultValue={editUser?.name || ""}
          />
          <TextInput
            id="email"
            name="email"
            type="email"
            label="Email"
            required
            defaultValue={editUser?.email || ""}
          />
          <Select
            id="role"
            name="role"
            label="Role"
            defaultValue={editUser?.role || ROLES[3]}
            options={ROLES.map((r) => ({ value: r, label: r }))}
          />
          <Select
            id="status"
            name="status"
            label="Status"
            defaultValue={editUser?.status || STATUSES[2]}
            options={STATUSES.map((s) => ({ value: s, label: s }))}
          />
          <div className="row">
            <span className="spacer" />
            <Button
              variant="secondary"
              onClick={() => setModalOpen(false)}
              type="button"
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default App;
