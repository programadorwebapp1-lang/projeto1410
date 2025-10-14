'use client';

import React, { useState, useMemo } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, TextField, Typography, Card, CardContent, AppBar, Toolbar, Avatar, useMediaQuery } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import InfoIcon from '@mui/icons-material/Info';
import EventIcon from '@mui/icons-material/Event';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#FFA500', '#008000', '#000000', '#A52A2A', '#FFFFFF']; // laranja, verde, preto, marrom, branco

// Dados iniciais mock
const mockPets = [
  { id: 1, name: 'Rex', type: 'Cachorro', birthDate: '2018-05-20' },
  { id: 2, name: 'Mimi', type: 'Gato', birthDate: '2020-11-15' },
];

const PetPage = () => {
  const [pets, setPets] = useState(mockPets);
  const [newPet, setNewPet] = useState({ name: '', type: '', birthDate: '' });

  const handleAddPet = () => {
    if (
      newPet.name.trim() === '' ||
      newPet.type.trim() === '' ||
      newPet.birthDate.trim() === ''
    ) return;

    setPets([...pets, { ...newPet, id: pets.length + 1 }]);
    setNewPet({ name: '', type: '', birthDate: '' });
  };

  // Colunas da tabela
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
      field: 'type',
      headerName: 'Tipo',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#008000' }}>
          <InfoIcon />
          {params.value}
        </Box>
      ),
    },
    {
      field: 'birthDate',
      headerName: 'Data de Nascimento',
      flex: 1.5,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#A52A2A' }}>
          <EventIcon />
          {new Date(params.value).toLocaleDateString()}
        </Box>
      ),
    },
  ];

  // Gráfico: quantos pets por tipo
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    pets.forEach(({ type }) => {
      counts[type] = (counts[type] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [pets]);

  const isMobile = useMediaQuery('(max-width:600px)');
  return (
    <Box sx={{ bgcolor: '#f6f8fa', minHeight: '100vh', fontFamily: 'Poppins, Roboto, sans-serif' }}>
      {/* AppBar fixo */}
      <AppBar position="static" elevation={2} sx={{ bgcolor: '#A52A2A', mb: 5 }}>
        <Toolbar>
          <Avatar sx={{ bgcolor: '#FFA500', mr: 2 }}>
            <PetsIcon sx={{ color: '#A52A2A' }} />
          </Avatar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: 1 }}>
            Gerenciar Pets
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ maxWidth: 900, mx: 'auto', p: { xs: 2, md: 4 }, display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 4 }}>
        {/* Formulário e gráfico */}
        <Box sx={{ flex: 1, minWidth: 320, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: '#fff' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#008000', fontWeight: 'bold', mb: 2 }}>
                Cadastrar Pet
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Nome"
                  variant="outlined"
                  size="small"
                  value={newPet.name}
                  onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                  sx={{ bgcolor: '#FFF' }}
                />
                <TextField
                  label="Tipo"
                  variant="outlined"
                  size="small"
                  value={newPet.type}
                  onChange={(e) => setNewPet({ ...newPet, type: e.target.value })}
                  sx={{ bgcolor: '#FFF' }}
                />
                <TextField
                  label="Data de Nascimento"
                  variant="outlined"
                  size="small"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={newPet.birthDate}
                  onChange={(e) => setNewPet({ ...newPet, birthDate: e.target.value })}
                  sx={{ bgcolor: '#FFF' }}
                />
                <Button variant="contained" onClick={handleAddPet} sx={{ bgcolor: '#FFA500', color: '#000', fontWeight: 'bold', borderRadius: 2, mt: 1, fontSize: 16, py: 1.2, boxShadow: 2 }}>
                  Adicionar
                </Button>
              </Box>
            </CardContent>
          </Card>
          <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: '#fff' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#008000', fontWeight: 'bold', mb: 2 }}>
                Distribuição de Pets por Tipo
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <PieChart width={isMobile ? 250 : 350} height={isMobile ? 200 : 250}>
                  <Pie
                    data={typeCounts}
                    cx={isMobile ? 125 : 175}
                    cy={isMobile ? 100 : 125}
                    innerRadius={isMobile ? 40 : 60}
                    outerRadius={isMobile ? 80 : 100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {typeCounts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </Box>
            </CardContent>
          </Card>
        </Box>
        {/* Tabela de pets */}
        <Box sx={{ flex: 2, minWidth: 320 }}>
          <Card sx={{ borderRadius: 3, boxShadow: 3, bgcolor: '#fff', height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#A52A2A', fontWeight: 'bold', mb: 2 }}>
                Lista de Pets
              </Typography>
              <Box sx={{ height: 350 }}>
                <DataGrid
                  rows={pets}
                  columns={columns}
                  pageSizeOptions={[5]}
                  initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                  }}
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

export default PetPage;
