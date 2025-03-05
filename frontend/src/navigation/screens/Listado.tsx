import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { ButtonText } from "@/components/ui/button-text";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { useEffect, useState } from "react";
import { ScrollView, RefreshControl, StyleSheet, View } from "react-native";
import React from "react";
import { RootStackParamList } from '../types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type ListadoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Listado'>;

export function ListadoScreen() {
  interface Cliente {
    idcliente: number;
    nombre: string;
    email: string;
    telefono: number;
  }

  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchClientes = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/cliente", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setClientes(data.datos);
      }
    } catch (error) {
      console.error('Error al cargar clientes:', error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/cliente/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setClientes(clientes.filter(cliente => cliente.idcliente !== id));
      }
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchClientes().finally(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={styles.scrollView}
    >
      <Box style={styles.container}>
        <Heading size="2xl" style={styles.pageTitle}>Listado de Clientes</Heading>
        <VStack style={styles.list}>
          {clientes.map((cliente) => (
            <Card key={cliente.idcliente} style={styles.card}>
              <VStack style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Heading size="lg" style={styles.title}>
                    {cliente.nombre}
                  </Heading>
                  <Button
                    onPress={() => handleDelete(cliente.idcliente)}
                    style={styles.deleteButton}
                  >
                    <ButtonText style={styles.deleteButtonText}>Eliminar</ButtonText>
                  </Button>
                </View>
                <View style={styles.cardInfo}>
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>{cliente.email}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Teléfono:</Text>
                    <Text style={styles.value}>{cliente.telefono}</Text>
                  </View>
                </View>
              </VStack>
            </Card>
          ))}
        </VStack>
      </Box>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f8f9fa'
  },
  container: {
    padding: 16,
    paddingBottom: 32,
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%'
  },
  pageTitle: {
    marginBottom: 28,
    marginTop: 20,
    textAlign: 'center',
    color: '#1a1a1a',
    fontSize: 32,
    fontWeight: '700'
  },
  list: {
    width: '100%',
    gap: 20
  },
  card: {
    padding: 24,
    borderRadius: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0'
  },
  cardContent: {
    gap: 20
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 16
  },
  title: {
    color: '#1a1a1a',
    flex: 1,
    fontSize: 22,
    fontWeight: '600'
  },
  cardInfo: {
    gap: 12
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4
  },
  label: {
    width: 90,
    color: '#6c757d',
    fontSize: 16,
    fontWeight: '500'
  },
  value: {
    flex: 1,
    color: '#212529',
    fontSize: 16
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginLeft: 12
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600'
  }
});