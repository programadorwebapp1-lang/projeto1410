// Página de Gerenciamento de Clientes
// Requisitos: CRUD completo, MUI, SWR, mock, modais, boas práticas, tudo em um arquivo
"use client";
import React, { useState, useMemo } from "react";
import useSWR from "swr";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
	CircularProgress,
	Snackbar,
	Alert,
	Tooltip,
	useMediaQuery,
	Paper,
} from "@mui/material";
import { Add, Edit, Delete, Visibility } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Tipos e interfaces
interface Cliente {
	id: number;
	nome: string;
	email: string;
	telefone: string;
}

// Mock de dados (simula uma API)
const mockClientes: Cliente[] = [
	{ id: 1, nome: "João Silva", email: "joao@email.com", telefone: "(11) 99999-1111" },
	{ id: 2, nome: "Maria Souza", email: "maria@email.com", telefone: "(21) 98888-2222" },
	{ id: 3, nome: "Carlos Lima", email: "carlos@email.com", telefone: "(31) 97777-3333" },
];

// Função mock para simular fetch de clientes
const fetchClientes = async (): Promise<Cliente[]> => {
	// Simula delay de rede
	await new Promise((res) => setTimeout(res, 600));
	// Retorna uma cópia dos dados
	return JSON.parse(JSON.stringify(mockClientes));
};

// Hook customizado para clientes usando SWR
function useClientes() {
	// Chave 'clientes' para cache SWR
	const { data, error, isLoading, mutate } = useSWR("clientes", fetchClientes, {
		revalidateOnFocus: false,
	});

	// CRUD local (mock):
	const addCliente = async (novo: Omit<Cliente, "id">) => {
		const id = Math.floor(Math.random() * 100000) + 10;
		const novoCliente = { ...novo, id };
		mutate([...(data || []), novoCliente], false);
		return novoCliente;
	};

	const updateCliente = async (id: number, atual: Omit<Cliente, "id">) => {
		mutate(
			(clientes?: Cliente[]) =>
				clientes?.map((c) => (c.id === id ? { ...c, ...atual } : c)) || [],
			false
		);
	};

	const deleteCliente = async (id: number) => {
		mutate((clientes?: Cliente[]) => clientes?.filter((c) => c.id !== id) || [], false);
	};

	return { data, error, isLoading, addCliente, updateCliente, deleteCliente, mutate };
}

// Componente principal
export default function GerenciamentoClientePage() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const { data: clientes, error, isLoading, addCliente, updateCliente, deleteCliente } = useClientes();

	// Estados para modais/dialogs
	const [openForm, setOpenForm] = useState(false);
	const [editando, setEditando] = useState<Cliente | null>(null);
	const [openDelete, setOpenDelete] = useState<null | Cliente>(null);
	const [openView, setOpenView] = useState<null | Cliente>(null);
	const [snackbar, setSnackbar] = useState<{ open: boolean; msg: string; type: "success" | "error" }>({ open: false, msg: "", type: "success" });

	// Formulário controlado
	const [form, setForm] = useState<Omit<Cliente, "id">>({ nome: "", email: "", telefone: "" });
	const [formError, setFormError] = useState<{ nome?: string; email?: string; telefone?: string }>({});
	const [formLoading, setFormLoading] = useState(false);

	// Validação básica
	function validarForm(): boolean {
		const err: typeof formError = {};
		if (!form.nome.trim()) err.nome = "Nome obrigatório";
		if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) err.email = "Email válido obrigatório";
		if (!form.telefone.trim() || !/^\(?\d{2}\)? ?9?\d{4}-?\d{4}$/.test(form.telefone)) err.telefone = "Telefone válido obrigatório";
		setFormError(err);
		return Object.keys(err).length === 0;
	}

	// Abrir modal de novo cliente
	function handleNovoCliente() {
		setEditando(null);
		setForm({ nome: "", email: "", telefone: "" });
		setFormError({});
		setOpenForm(true);
	}

	// Abrir modal de edição
	function handleEditar(cliente: Cliente) {
		setEditando(cliente);
		setForm({ nome: cliente.nome, email: cliente.email, telefone: cliente.telefone });
		setFormError({});
		setOpenForm(true);
	}

	// Salvar (criar ou editar)
	async function handleSalvar() {
		if (!validarForm()) return;
		setFormLoading(true);
		try {
			if (editando) {
				await updateCliente(editando.id, form);
				setSnackbar({ open: true, msg: "Cliente atualizado!", type: "success" });
			} else {
				await addCliente(form);
				setSnackbar({ open: true, msg: "Cliente adicionado!", type: "success" });
			}
			setOpenForm(false);
		} catch {
			setSnackbar({ open: true, msg: "Erro ao salvar cliente", type: "error" });
		} finally {
			setFormLoading(false);
		}
	}

	// Confirmar exclusão
	async function handleConfirmarDelete() {
		if (!openDelete) return;
		try {
			await deleteCliente(openDelete.id);
			setSnackbar({ open: true, msg: "Cliente deletado!", type: "success" });
		} catch {
			setSnackbar({ open: true, msg: "Erro ao deletar cliente", type: "error" });
		} finally {
			setOpenDelete(null);
		}
	}

	// Renderização
	return (
		<Box sx={{ p: isMobile ? 1 : 4 }}>
			{/* Título e botão fixo */}
			<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3, position: "sticky", top: 0, zIndex: 2, bgcolor: "background.paper", py: 2 }}>
				<Typography variant={isMobile ? "h6" : "h4"} fontWeight={600}>
					Gerenciamento de Clientes
				</Typography>
				<Button
					variant="contained"
					color="primary"
					startIcon={<Add />}
					onClick={handleNovoCliente}
					sx={{ minWidth: 180, fontWeight: 600 }}
				>
					Adicionar Cliente
				</Button>
			</Box>

			{/* Loading e erro */}
			{isLoading ? (
				<Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
					<CircularProgress />
				</Box>
			) : error ? (
				<Alert severity="error">Erro ao carregar clientes.</Alert>
			) : (
				<TableContainer component={Paper} sx={{ maxHeight: 600 }}>
					<Table size={isMobile ? "small" : "medium"} stickyHeader>
						<TableHead>
							<TableRow>
								<TableCell>Nome</TableCell>
								<TableCell>Email</TableCell>
								<TableCell>Telefone</TableCell>
								<TableCell align="center">Ações</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{clientes && clientes.length > 0 ? (
								clientes.map((cliente) => (
									<TableRow key={cliente.id} hover>
										<TableCell>{cliente.nome}</TableCell>
										<TableCell>{cliente.email}</TableCell>
										<TableCell>{cliente.telefone}</TableCell>
										<TableCell align="center">
											<Tooltip title="Visualizar">
												<IconButton color="info" onClick={() => setOpenView(cliente)}>
													<Visibility />
												</IconButton>
											</Tooltip>
											<Tooltip title="Editar">
												<IconButton color="primary" onClick={() => handleEditar(cliente)}>
													<Edit />
												</IconButton>
											</Tooltip>
											<Tooltip title="Deletar">
												<IconButton color="error" onClick={() => setOpenDelete(cliente)}>
													<Delete />
												</IconButton>
											</Tooltip>
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan={4} align="center">
										Nenhum cliente cadastrado.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
			)}

			{/* Modal de criar/editar cliente */}
			<Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="xs">
				<DialogTitle>{editando ? "Editar Cliente" : "Novo Cliente"}</DialogTitle>
				<DialogContent>
					<Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
						<TextField
							label="Nome"
							value={form.nome}
							onChange={(e) => setForm((f) => ({ ...f, nome: e.target.value }))}
							error={!!formError.nome}
							helperText={formError.nome}
							autoFocus
							required
						/>
						<TextField
							label="Email"
							value={form.email}
							onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
							error={!!formError.email}
							helperText={formError.email}
							required
							type="email"
						/>
						<TextField
							label="Telefone"
							value={form.telefone}
							onChange={(e) => setForm((f) => ({ ...f, telefone: e.target.value }))}
							error={!!formError.telefone}
							helperText={formError.telefone}
							required
							placeholder="(11) 99999-9999"
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenForm(false)} disabled={formLoading}>Cancelar</Button>
					<Button onClick={handleSalvar} variant="contained" color="primary" disabled={formLoading}>
						{formLoading ? <CircularProgress size={22} /> : editando ? "Salvar" : "Adicionar"}
					</Button>
				</DialogActions>
			</Dialog>

			{/* Modal de visualizar cliente */}
			<Dialog open={!!openView} onClose={() => setOpenView(null)} fullWidth maxWidth="xs">
				<DialogTitle>Detalhes do Cliente</DialogTitle>
				<DialogContent>
					{openView && (
						<Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
							<Typography><b>Nome:</b> {openView.nome}</Typography>
							<Typography><b>Email:</b> {openView.email}</Typography>
							<Typography><b>Telefone:</b> {openView.telefone}</Typography>
						</Box>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenView(null)}>Fechar</Button>
				</DialogActions>
			</Dialog>

			{/* Modal de confirmação de exclusão */}
			<Dialog open={!!openDelete} onClose={() => setOpenDelete(null)} fullWidth maxWidth="xs">
				<DialogTitle>Confirmar Exclusão</DialogTitle>
				<DialogContent>
					<Typography>Tem certeza que deseja deletar o cliente <b>{openDelete?.nome}</b>?</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenDelete(null)}>Cancelar</Button>
					<Button onClick={handleConfirmarDelete} color="error" variant="contained">Deletar</Button>
				</DialogActions>
			</Dialog>

			{/* Snackbar de feedback */}
			<Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
				<Alert severity={snackbar.type} onClose={() => setSnackbar((s) => ({ ...s, open: false }))} sx={{ width: "100%" }}>
					{snackbar.msg}
				</Alert>
			</Snackbar>
		</Box>
	);
}
