# 📊 Calculadora de Finiquitos y Liquidaciones Laborales

Una aplicación web para calcular finiquitos y liquidaciones laborales según la **Ley Federal del Trabajo de México**.

## 🚀 Características

- ✅ **Cálculo preciso** de finiquitos y liquidaciones
- ✅ **Interfaz moderna** y responsive
- ✅ **Validación de datos** en tiempo real
- ✅ **Detalles expandibles** del cálculo
- ✅ **Cumple con la normativa mexicana**
- ✅ **Cálculo automático** de vacaciones proporcionales

## 📁 Estructura del Proyecto

```
CalculadoraFiniqLiq/
├── CalculadoraFYL.html    # Archivo HTML principal
├── styles.css             # Estilos CSS
├── script.js              # Lógica JavaScript
└── README.md              # Documentación
```

## 💰 Conceptos Calculados

### Finiquito (Renuncia Voluntaria)
- Salarios pendientes
- Vacaciones no disfrutadas + Prima vacacional (25%)
- Aguinaldo proporcional
- Prima de antigüedad (12 días por año - **solo aplica con más de 15 años de servicio**)

### Liquidación (Despido)
- Todos los conceptos del finiquito +
- **Indemnización constitucional** (3 meses + 20 días por cada año completado + proporcional)

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con variables CSS y Flexbox
- **JavaScript ES6+** - Lógica de cálculos y validaciones
- **Font Awesome** - Iconos

## 📋 Uso

1. **Abrir** el archivo `CalculadoraFYL.html` en un navegador web
2. **Completar** los datos del empleado:
   - Nombre completo
   - Fechas de ingreso y salida
   - Salario diario
   - Días pendientes (salario y vacaciones)
   - Motivo de terminación
   - Días de aguinaldo
3. **Hacer clic** en "Calcular Finiquito/Liquidación"
4. **Revisar** los resultados y detalles del cálculo

## 📊 Validaciones Implementadas

- ✅ Nombre del empleado obligatorio
- ✅ Fechas válidas (ingreso < salida)
- ✅ Salario diario positivo
- ✅ Días no negativos
- ✅ Cálculo automático del tiempo trabajado
- ✅ **Cálculo automático de vacaciones proporcionales** (empleados con menos de 1 año)

## 🔧 Características Técnicas

### CSS Features
- Variables CSS personalizadas
- Diseño responsive con Flexbox
- Transiciones y efectos hover
- Media queries para dispositivos móviles

### JavaScript Features
- Event listeners para interactividad
- Validación de formularios
- Cálculos matemáticos precisos
- Manipulación del DOM
- Formateo de números y fechas

## 📱 Compatibilidad

- ✅ **Navegadores modernos** (Chrome, Firefox, Safari, Edge)
- ✅ **Dispositivos móviles** y tablets
- ✅ **Responsive design** adaptativo

## ⚖️ Marco Legal

Basado en la **Ley Federal del Trabajo de México**, incluye:

- **Artículo 50** - Prima de antigüedad
- **Artículo 87** - Aguinaldo
- **Artículo 76-80** - Vacaciones y prima vacacional
- **Artículo 48-50** - Indemnización constitucional

## ⚠️ Disclaimer

Esta calculadora proporciona estimaciones basadas en la normativa laboral mexicana. Para casos específicos y asesoría legal personalizada, consulte con un profesional en derecho laboral.

## 🎯 Valores Base 2025

- **Salario mínimo general**: $248.93 MXN
- **Prima vacacional**: 25% mínimo legal
- **Aguinaldo**: 15 días mínimo legal
- **Prima de antigüedad**: 12 días por año (tope 2 salarios mínimos) - **Aplica solo con más de 15 años de servicio**

## 📝 Correcciones Importantes

### Prima de Antigüedad ✅
- **Fecha**: Enero 2025
- **Corrección**: Se modificó el cálculo para que la prima de antigüedad **solo se aplique cuando el trabajador tenga más de 15 años de servicio**, cumpliendo con el **Artículo 162 de la Ley Federal del Trabajo**.
- **Impacto**: Cálculos más precisos conforme a la legislación mexicana.

### Indemnización Constitucional ✅
- **Fecha**: Junio 2025
- **Corrección**: Se corrigió el cálculo de la indemnización para que los **20 días se paguen al completar cada año de servicio** más la parte proporcional del año en curso, cumpliendo con el **Artículo 50 de la Ley Federal del Trabajo**.
- **Antes**: 3 meses + (20 días × años totales)
- **Después**: 3 meses + (20 días × años completados) + (20 días × fracción del año actual)
- **Ejemplos**: 
  - 1 año exacto: 90 + 20 = 110 días
  - 1.5 años: 90 + 20 + 10 = 120 días
  - 2.25 años: 90 + 40 + 5 = 135 días
- **Impacto**: Cálculo correcto desde el primer año completado.

### Cálculo Automático de Vacaciones ✅
- **Fecha**: Junio 2025
- **Funcionalidad**: Se implementó el cálculo automático de días de vacaciones proporcionales para empleados con **menos de un año de servicio**.
- **Lógica**: 1 día de vacaciones por cada mes trabajado (aproximadamente)
- **Ejemplos**: 
  - 6 meses: 6 días de vacaciones automáticos
  - 10 meses: 10 días de vacaciones automáticos
- **Justificación**: Al no completar el año, el empleado no pudo disfrutar sus vacaciones anuales
- **Impacto**: Elimina errores de cálculo y asegura que se paguen las vacaciones proporcionales correctas.

---

💼 **Herramienta profesional para cálculos laborales precisos**