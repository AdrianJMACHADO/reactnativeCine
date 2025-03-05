import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { 
  Box, 
  Button, 
  ButtonText, 
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
  VStack,
  Heading
} from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AltaScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Alta'>;

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
}

export function AltaScreen() {
  const navigation = useNavigation<AltaScreenNavigationProp>();
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.nombre) newErrors.nombre = 'El nombre es requerido';
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingrese un email válido';
    }
    if (!formData.telefono) {
      newErrors.telefono = 'El teléfono es requerido';
    } else if (!/^\d{9}$/.test(formData.telefono)) {
      newErrors.telefono = 'Ingrese un teléfono válido (9 dígitos)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await fetch('http://10.0.2.2:3000/api/cliente', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          navigation.navigate('Listado');
        } else {
          console.error('Error al guardar el cliente');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <ScrollView>
      <Box p="$4" bg="$backgroundLight0">
        <VStack space="md">
          <Heading size="xl" mb="$4">
            Nuevo Cliente
          </Heading>

          {/* Campo Nombre */}
          <FormControl isInvalid={!!errors.nombre}>
            <FormControlLabel>
              <FormControlLabelText>Nombre</FormControlLabelText>
            </FormControlLabel>
            <Input variant="outline" size="md">
              <InputField
                placeholder="Introduce el nombre"
                value={formData.nombre}
                onChangeText={(text) => setFormData({ ...formData, nombre: text })}
              />
            </Input>
            {errors.nombre && (
              <FormControlError>
                <FormControlErrorText>{errors.nombre}</FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          {/* Campo Email */}
          <FormControl isInvalid={!!errors.email}>
            <FormControlLabel>
              <FormControlLabelText>Email</FormControlLabelText>
            </FormControlLabel>
            <Input variant="outline" size="md">
              <InputField
                placeholder="ejemplo@email.com"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </Input>
            {errors.email && (
              <FormControlError>
                <FormControlErrorText>{errors.email}</FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          {/* Campo Teléfono */}
          <FormControl isInvalid={!!errors.telefono}>
            <FormControlLabel>
              <FormControlLabelText>Teléfono</FormControlLabelText>
            </FormControlLabel>
            <Input variant="outline" size="md">
              <InputField
                placeholder="123456789"
                value={formData.telefono}
                onChangeText={(text) => setFormData({ ...formData, telefono: text })}
                keyboardType="numeric"
                maxLength={9}
              />
            </Input>
            {errors.telefono && (
              <FormControlError>
                <FormControlErrorText>{errors.telefono}</FormControlErrorText>
              </FormControlError>
            )}
          </FormControl>

          {/* Botón de Guardar */}
          <Button
            onPress={handleSubmit}
            size="lg"
            variant="solid"
            action="primary"
            mt="$4"
          >
            <ButtonText>Guardar Cliente</ButtonText>
          </Button>
        </VStack>
      </Box>
    </ScrollView>
  );
}