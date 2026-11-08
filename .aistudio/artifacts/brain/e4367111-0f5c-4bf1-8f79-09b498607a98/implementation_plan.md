# Modal de Descarga e Instalación de App ("Amor a primera mordida D'Yaliz")

Plan de diseño e implementación del aviso y modal interactivo de descarga/instalación de la app al iniciar, brindando tanto instalación PWA directa como guía paso a paso para dispositivos móviles y botón de cierre ("X") para omitir.

## Decisiones de Usuario y Puntos Críticos

> [!IMPORTANT]
> - **Modal de inicio no intrusivo con botón "X"**: Se mostrará una ventana emergente (modal) estética al iniciar la app que invita a descargar/instalar la aplicación con un botón destacado, pero que incluye una "X" clara en la esquina superior y un botón "Continuar en navegador" para no bloquear la experiencia de quien prefiera omitir.
> - **Doble soporte de instalación**: Incluye el disparador nativo de instalación (`beforeinstallprompt` para Android/Chrome) junto con una guía visual paso a paso para dispositivos Android y iPhone (iOS Safari) para asegurar que cualquier cliente pueda tener el acceso directo en su pantalla de inicio 100% offline.
> - **Persistencia de preferencia**: Si el usuario pulsa "X" o instala la app, la preferencia se recuerda localmente en `localStorage` para no ser molesto en cada navegación, pero permitiendo reabrir el instalador desde un botón discreto en la barra superior cuando lo desee.

---

## 1. Visión General & Flujo de Usuario

### Flujo al iniciar la aplicación:
1. Al cargar la app por primera vez (o tras el inicio de sesión/bienvenida), se despliega de forma elegante el modal **"Instala nuestra App en tu Celular"**.
2. El modal destaca los beneficios clave:
   - Acceso instantáneo desde la pantalla de inicio.
   - Funcionamiento 100% offline (sin consumir datos ni requerir internet).
   - Catálogo rápido de tortas, alfajores y bocaditos para eventos con fotos locales.
3. El usuario puede:
   - **Tocar "Descargar / Instalar App"**: Si el navegador soporta instalación web directa (Chrome/Android), se lanza la ventana de instalación del sistema operativo.
   - **Ver "Guía Paso a Paso"**: Muestra instrucciones claras e ilustradas para Android ("Instalar aplicación" o "Agregar a pantalla principal") y para iPhone/iPad ("Compartir" ⎋ $\rightarrow$ "Agregar al inicio" ⊞).
   - **Tocar la "X" (o "Continuar en la web")**: Cierra el modal de inmediato y le da acceso completo al catálogo sin restricciones.

---

## 2. Experiencia de Usuario & Diseño Visual

### Identidad Visual y Paleta:
- **Colores oficiales**: Fondo Alabaster suave (`#EEEFE8`), acentos Cherry Blossom Pink (`#E9ACBB`), verde menta suave (`#8FBC93`) y crema durazno (`#FCEBBF`).
- **Emblema de Marca**: Corona superior con el logo circular oficial de *"Amor a primera mordida D'Yaliz"*.
- **Tipografía**: Títulos con *Playfair Display* y cuerpo con *Plus Jakarta Sans*.

### Componentes Visuales:
- **Tarjeta Modal Central**: Bordes redondeados (`rounded-3xl`), sombra profunda, backdrop difuminado (`backdrop-blur-sm`).
- **Botón "X" de Cierre**: Botón circular en la esquina superior derecha, accesible tanto en táctil ($\ge 44\text{px}$) como en escritorio, con respuesta háptica y hover suave.
- **Pestañas de Guía**: Pestañas sencillas para alternar entre *"Instalación Rápida"*, *"Android"* y *"iPhone / iPad"*.

---

## 3. Decisiones de Producto y Arquitectura

```
┌────────────────────────────────────────────────────────┐
│               App Launch / Lifecycle                   │
│   (Login -> Welcome -> Catalog Shell / Main App)       │
└──────────────────────────┬─────────────────────────────┘
                           │
             ┌─────────────┴─────────────┐
             ▼                           ▼
    ¿Ya está instalada?         ¿Ya omitió recientemente?
    (display-mode: standalone)  (dyaliz_install_dismissed)
             │                           │
    [Si] Ocultar modal          [No] Mostrar Modal de Descarga
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 ▼                                               ▼
     [Instalar / Descargar]                                  [Tocar "X"]
   - Lanza beforeinstallprompt                           - Cierra modal
   - Si no disponible, muestra guía                      - Guarda descarte
   - Acceso directo offline                              - Accede al catálogo
```

### Arquitectura Técnica:
1. **Hook `usePWAInstall`**:
   - Escucha los eventos del navegador `beforeinstallprompt` y `appinstalled`.
   - Detecta si la app ya está corriendo en modo `standalone` (instalada).
   - Detecta si el dispositivo es iOS (Safari) o Android/Chromium.
2. **Componente `AppDownloadModal.tsx`**:
   - Modal accesible y animado que muestra el logo oficial, los beneficios de tener la app descargada, el botón de acción principal y el botón "X" de escape.
   - Pestaña con instrucciones ilustradas paso a paso.
3. **Web App Manifest (`public/manifest.webmanifest` o `index.html`)**:
   - Configuración completa con `name`, `short_name: "D'Yaliz"`, `start_url: "/"`, `display: "standalone"`, `theme_color: "#E9ACBB"`, `background_color: "#EEEFE8"`, y referencias a los iconos oficiales.
4. **Disparador en TopAppBar**:
   - Botón discreto con icono de descarga ("Instalar App") en el menú superior para que el usuario pueda volver a abrir el instalador en cualquier momento si cerró con "X".
