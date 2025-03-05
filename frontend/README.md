# Aplicación de Gestión de Cine con React Native

Esta es una aplicación móvil desarrollada con React Native y Expo Go como práctica para el módulo de HLC en 2º DAM. La aplicación consume una API REST existente de un proyecto previo en React+Node.js para la gestión de datos de un cine.

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue.svg)](https://github.com/AdrianJMACHADO/reactnativeCine.git)

## Características

- Pantalla de inicio con imagen y mensaje de bienvenida
- Listado de clientes con tarjetas interactivas usando GlueStack UI
- Formulario de alta con validación
- Navegación mediante drawer usando React Navigation
- Integración con API REST existente
- Soporte para pull-to-refresh en listados

## Tecnologías Utilizadas

- React Native con Expo Go
- TypeScript
- GlueStack UI para componentes
- React Navigation para la navegación
- Fetch API para las peticiones HTTP

## Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn
- Expo Go en tu dispositivo móvil
- Android Studio (para desarrollo en Android)
- Xcode (para desarrollo en iOS, solo macOS)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/AdrianJMACHADO/reactnativeCine.git
   cd reactnativeCine
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm start
   ```

4. Escanea el código QR:
   - Con la cámara de iOS
   - Con la app Expo Go en Android

## Estructura del Proyecto

```
src/
  ├── navigation/     # Configuración de navegación
  │   ├── screens/    # Pantallas de la aplicación (Home, Alta, Listado)
  │   └── types.ts    # Tipos de TypeScript para la navegación
  └── components/     # Componentes reutilizables
```

## API Backend

La aplicación se conecta a un servidor local en `http://localhost:3000` que proporciona los siguientes endpoints:

- `GET /api/cliente` - Obtener todos los clientes
- `POST /api/cliente` - Crear nuevo cliente
- `DELETE /api/cliente/:id` - Eliminar un cliente

## Desarrollo

Este proyecto fue desarrollado como parte del módulo de HLC en 2º DAM, siguiendo estos principios:

- Uso de componentes de GlueStack UI para la interfaz
- Implementación de navegación con React Navigation
- Manejo correcto de estados y efectos en React Native
- Integración con API REST existente
- Validación de formularios
- Diseño responsive y moderno

## Contribuir

1. Haz un fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## Enlaces

- [Repositorio del Proyecto](https://github.com/AdrianJMACHADO/reactnativeCine.git)
- [Documentación de React Native](https://reactnative.dev/)
- [Documentación de GlueStack UI](https://ui.gluestack.io/)
- [Documentación de React Navigation](https://reactnavigation.org/)
- [Documentación de Expo](https://docs.expo.dev/)
