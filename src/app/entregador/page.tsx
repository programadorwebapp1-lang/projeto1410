'use client';

import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardContent, Stack, Alert, AppBar, Toolbar, Avatar, Chip } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MapIcon from '@mui/icons-material/Map';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Order {
  id: number;
  clientName: string;
  product: string;
  status: 'pending' | 'accepted' | 'delivered';
  clientAddress: string;
  clientCoords?: { latitude: number; longitude: number };
}

const mockOrders: Order[] = [
  {
    id: 1,
    clientName: 'João Silva',
    product: 'Vacina Antirrábica',
    status: 'pending',
    clientAddress: 'Rua das Flores, 123, São Paulo - SP',
    clientCoords: { latitude: -23.55052, longitude: -46.633308 },
  },
  {
    id: 2,
    clientName: 'Maria Souza',
    product: 'Vermífugo Canino',
    status: 'pending',
    clientAddress: 'Av. Brasil, 456, Rio de Janeiro - RJ',
    clientCoords: { latitude: -22.906847, longitude: -43.172896 },
  },
];

const DeliveryPage = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [acceptedOrder, setAcceptedOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  const acceptDeliveryWithGeo = (orderId: number) => {
    if (!navigator.geolocation) {
      setError('Geolocalização não suportada pelo navegador.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, status: 'accepted' } : order
          )
        );
        const order = orders.find((o) => o.id === orderId) ?? null;
        setAcceptedOrder(order);
        setError(null);
      },
      (err) => {
        setError('Erro ao obter localização: ' + err.message);
      },
      { enableHighAccuracy: true }
    );
  };

  const acceptDelivery = (orderId: number) => {
    acceptDeliveryWithGeo(orderId);
  };

  const pendingOrders = orders.filter((order) => order.status === 'pending');

  // Centralizar mapa entre entregador e cliente
  const getMapCenter = () => {
    if (!location || !acceptedOrder?.clientCoords) {
      return [-14.235004, -51.92528]; // Brasil centro default
    }
    const lat = (location.coords.latitude + acceptedOrder.clientCoords.latitude) / 2;
    const lng = (location.coords.longitude + acceptedOrder.clientCoords.longitude) / 2;
    return [lat, lng];
  };


  return (
    <Box sx={{ bgcolor: '#f6f8fa', minHeight: '100vh', fontFamily: 'Poppins, Roboto, sans-serif' }}>
      {/* Cabeçalho fixo */}
      <AppBar position="static" elevation={2} sx={{ bgcolor: '#A52A2A', mb: 5 }}>
        <Toolbar>
          <Avatar sx={{ bgcolor: '#FFA500', mr: 2 }}>
            <LocalShippingIcon sx={{ color: '#A52A2A' }} />
          </Avatar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold', letterSpacing: 1 }}>
            Painel do Entregador
          </Typography>
          <Chip icon={<MapIcon />} label="Online" color="success" sx={{ fontWeight: 'bold' }} />
        </Toolbar>
      </AppBar>

      <Box sx={{ maxWidth: 900, mx: 'auto', p: { xs: 2, md: 4 } }}>
        {pendingOrders.length === 0 && (
          <Alert severity="info" sx={{ mb: 3, fontSize: '1.1rem', borderRadius: 2 }}>
            Não há entregas pendentes no momento.
          </Alert>
        )}

        <Stack spacing={3}>
          {pendingOrders.map(({ id, clientName, product }) => (
            <Card key={id} sx={{ borderLeft: '8px solid #FFA500', boxShadow: 4, borderRadius: 3, bgcolor: '#fff' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#A52A2A', mb: 1, letterSpacing: 1 }}>
                  Pedido #{id} - {product}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: '#000' }}>
                  <PersonIcon sx={{ mr: 1, color: '#FFA500' }} />
                  <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                    {clientName}
                  </Typography>
                </Box>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<CheckCircleIcon />}
                    onClick={() => acceptDelivery(id)}
                    sx={{
                      bgcolor: '#008000',
                      '&:hover': { bgcolor: '#006400' },
                      minWidth: 180,
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      borderRadius: 2,
                      boxShadow: 2,
                    }}
                  >
                    Aceitar Entrega
                  </Button>

                  <Button
                    variant="contained"
                    startIcon={<LocationOnIcon />}
                    onClick={() => acceptDeliveryWithGeo(id)}
                    sx={{
                      bgcolor: '#FFA500',
                      color: '#000',
                      '&:hover': { bgcolor: '#cc8400' },
                      minWidth: 230,
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      borderRadius: 2,
                      boxShadow: 2,
                    }}
                  >
                    Aceitar com Geolocalização
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>

      {acceptedOrder && (
        <Box
          sx={{
            mt: 6,
            p: { xs: 2, md: 4 },
            border: '2px solid #FFA500',
            borderRadius: 4,
            bgcolor: '#fff',
            maxWidth: 700,
            mx: 'auto',
            boxShadow: 4,
          }}
        >
          <Typography variant="h5" sx={{ color: '#A52A2A', mb: 2, fontWeight: 'bold', letterSpacing: 1 }}>
            Entrega Aceita <CheckCircleIcon sx={{ color: '#008000', ml: 1, fontSize: 32, verticalAlign: 'middle' }} />
          </Typography>
          <Typography sx={{ mb: 1, fontSize: '1.1rem' }}>
            <strong>Pedido:</strong> #{acceptedOrder.id} - {acceptedOrder.product}
          </Typography>
          <Typography sx={{ mb: 1, fontSize: '1.1rem' }}>
            <strong>Cliente:</strong> {acceptedOrder.clientName}
          </Typography>
          <Typography sx={{ mb: 1, fontSize: '1.1rem' }}>
            <strong>Endereço:</strong> {acceptedOrder.clientAddress}
          </Typography>

          {location ? (
            <>
              <Typography variant="subtitle1" sx={{ color: '#008000', mb: 1, fontWeight: 'bold' }}>
                Sua Localização Atual:
              </Typography>
              <Typography sx={{ mb: 2 }}>
                Latitude: {location.coords.latitude.toFixed(6)} <br />
                Longitude: {location.coords.longitude.toFixed(6)} <br />
                Precisão: {location.coords.accuracy} metros
              </Typography>
            </>
          ) : (
            <Typography sx={{ mt: 2, fontStyle: 'italic', color: '#555' }}>
              Obtendo sua localização...
            </Typography>
          )}

          {/* Mapa Leaflet */}
          {location && acceptedOrder.clientCoords && (
            <Box mt={3} sx={{ height: { xs: 250, md: 350 }, borderRadius: 3, overflow: 'hidden', boxShadow: 3 }}>
              <MapContainer center={getMapCenter()} zoom={12} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[location.coords.latitude, location.coords.longitude]}>
                  <Popup>Você está aqui</Popup>
                </Marker>
                <Marker position={[acceptedOrder.clientCoords.latitude, acceptedOrder.clientCoords.longitude]}>
                  <Popup>Cliente: {acceptedOrder.clientName}</Popup>
                </Marker>
              </MapContainer>
            </Box>
          )}
        </Box>
      )}


        {error && (
          <Alert severity="error" sx={{ mt: 3, fontSize: '1.1rem', borderRadius: 2 }}>
            {error}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default DeliveryPage;
