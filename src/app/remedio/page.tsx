'use client';

import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, TextField, Typography, Card, CardContent, AppBar, Toolbar, Avatar, useMediaQuery } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import CategoryIcon from '@mui/icons-material/Category';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InventoryIcon from '@mui/icons-material/Inventory';

const COLORS = ['#FFA500', '#008000', '#000000', '#A52A2A', '#FFFFFF'];

const mockProducts = [
  { id: 1, name: 'Vermífugo Canino', category: 'Vermífugo', price: 59.90, stock: 20 },
  { id: 2, name: 'Vacina Antirrábica', category: 'Vacina', price: 120.00, stock: 15 },
];

const ProdutoPage = () => {
  const [products, setProducts] = useState(mockProducts);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
  });

  const handleAddProduct = () => {
    if (
      !newProduct.name.trim() ||
      !newProduct.category.trim() ||
      !newProduct.price.trim() ||
      !newProduct.stock.trim()
    ) return;

    const priceNum = parseFloat(newProduct.price);
    const stockNum = parseInt(newProduct.stock);

    if (isNaN(priceNum) || isNaN(stockNum)) return;

    setProducts([
      ...products,
      {
        id: products.length + 1,
        name: newProduct.name,
        category: newProduct.category,
        price: priceNum,
        stock: stockNum,
      },
    ]);
    setNewProduct({ name: '', category: '', price: '', stock: '' });
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nome',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#FFA500' }}>
          <PetsIcon />
          {params.value}
        </Box>
      ),
    },
    {
      field: 'category',
      headerName: 'Categoria',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#008000' }}>
          <CategoryIcon />
          {params.value}
        </Box>
      ),
    },
    {
      field: 'price',
      headerName: 'Preço (R$)',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#000000' }}>
          <AttachMoneyIcon />
          {params.value.toFixed(2)}
        </Box>
      ),
    },
    {
      field: 'stock',
      headerName: 'Estoque',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#A52A2A' }}>
          <InventoryIcon />
          {params.value}
        </Box>
      ),
    },
  ];

  const isMobile = useMediaQuery('(max-width:600px)');
  return (
    <Box sx={{ bgcolor: '#f6f8fa', minHeight: '100vh', fontFamily: 'Poppins, Roboto, sans-serif' }}>
      {/* AppBar fixo */}
      <AppBar position="static" elevation={2} sx={{ bgcolor: '#A52A2A', mb: 5 }}>
        <Toolbar>
          <Avatar sx={{ bgcolor: '#FFA500', mr: 2 }}>
            <InventoryIcon sx={{ color: '#A52A2A' }} />
          </Avatar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: 1 }}>
            Gerenciar Produtos PetFarma
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ maxWidth: 900, mx: 'auto', p: { xs: 2, md: 4 }, display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 4 }}>
        {/* Formulário de cadastro */}
        <Box sx={{ flex: 1, minWidth: 320, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: '#fff' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#008000', fontWeight: 'bold', mb: 2 }}>
                Cadastrar Produto
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Nome"
                  variant="outlined"
                  size="small"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  sx={{ bgcolor: '#FFF' }}
                />
                <TextField
                  label="Categoria"
                  variant="outlined"
                  size="small"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  sx={{ bgcolor: '#FFF' }}
                />
                <TextField
                  label="Preço"
                  variant="outlined"
                  size="small"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  sx={{ bgcolor: '#FFF' }}
                  type="number"
                  inputProps={{ step: '0.01' }}
                />
                <TextField
                  label="Estoque"
                  variant="outlined"
                  size="small"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                  sx={{ bgcolor: '#FFF' }}
                  type="number"
                />
                <Button variant="contained" onClick={handleAddProduct} sx={{ bgcolor: '#FFA500', color: '#000', fontWeight: 'bold', borderRadius: 2, mt: 1, fontSize: 16, py: 1.2, boxShadow: 2 }}>
                  Adicionar
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
        {/* Tabela de produtos */}
        <Box sx={{ flex: 2, minWidth: 320 }}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: '#fff', height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#A52A2A', fontWeight: 'bold', mb: 2 }}>
                Lista de Produtos
              </Typography>
              <Box sx={{ height: 350 }}>
                <DataGrid
                  rows={products}
                  columns={columns}
                  pageSizeOptions={[5]}
                  initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                  sx={{
                    '& .MuiDataGrid-columnHeaders': {
                      backgroundColor: '#FFA500',
                      color: '#FFF',
                      fontWeight: 'bold',
                    },
                    '& .MuiDataGrid-cell': {
                      color: '#000',
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default ProdutoPage;
