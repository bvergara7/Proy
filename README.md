## INF4560 - Proyecto de Titulo - Entrega Software 


## **Tema de Proyecto: Diseño de Experiencia de Usuario Centrado en Personas con Trastorno del Espectro Autista (TEA)**

## **Integrante: Benjamín Antonio Vergara Urtubia**

## **Descripción del Proyecto**

Este proyecto corresponde al desarrollo del frontend de una plataforma educativa diseñada para estudiantes universitarios con Trastorno del Espectro Autista (TEA).
El objetivo principal es construir una interfaz accesible, estructurada y personalizable, fundamentada en principios de usabilidad, accesibilidad cognitiva y Diseño Centrado en el Usuario (DCU).

La plataforma incorpora características que responden a dificultades comunes de usuarios TEA, tales como sensibilidad sensorial, necesidad de estructura, claridad lingüística y consistencia visual.
El sistema desarrollado consiste en un prototipo funcional que incluye pantallas de navegación, personalización, visualización de cursos, contenido académico, comunicación y  módulo de ayuda, todas construidas a partir de principios obtenidos dentro de la literatura científica para su posterior evaluacion participativa a traves de pruebas con usuarios.

## Requerimientos Funcionales
Los requerimientos funcionales del sistema se materializan a nivel de interfaz implementadas en el frontend. La persistencia de los datos (como guardar una configuración o cargar un curso) se simula utilizando datos locales/contenido estático definido en el propio código. El prototipo no se conecta a un servidor o base de datos real (Unicamente FRONTEND).

<img width="666" height="498" alt="image" src="https://github.com/user-attachments/assets/fa15bc8c-76d1-49f2-8e00-d962b18f57cf" />


## Requerimientos No Funcionales
Lo referente a los requerimientos no funcionales del sistema van asociados a la usabilidad, accesibilidad del mismo, se abordan directamente a través del diseño de la interfaz y la arquitectura del código frontend (React con Ionic), que es el foco de la evaluación participativa.

<img width="665" height="470" alt="image" src="https://github.com/user-attachments/assets/c8d771ce-169b-4e5c-b6c3-f079ada65ea6" />

-----------------------------------------------------------------------------------------------------------------------------------------

## **Principales Funcionalidades - (Frontend) - (proytea/src/pages)**

- Inicio: La pantalla inicial presenta tarjetas claras con información del curso, como nombre, sigla y descripción. Incluye un indicador visual del progreso académico. La navegación es directa y evita elementos innecesarios para no generar sobrecarga cognitiva. Su estructura favorece que el estudiante identifique rápidamente su avance y pueda acceder a los contenidos sin confusión.

<img width="1871" height="941" alt="image" src="https://github.com/user-attachments/assets/4d8fdd17-23de-435d-9491-5394f412ddd3" />

-----------------------------------------------------------------------------------------------------------------------------------------


- Personalización de Interfaz: Incluye un módulo que permite modificar tamaño de fuente, colores, contraste, selección de temas (incluyendo modo oscuro) y control de notificaciones. Además, incorpora una vista previa para revisar los cambios antes de aplicarlos. Esta sección es esencial para usuarios TEA que requieren ajustar el entorno visual según su tolerancia sensorial.

<img width="1465" height="928" alt="image" src="https://github.com/user-attachments/assets/ec5604fd-b4bb-4f05-b96e-685fc41e36cf" />

-----------------------------------------------------------------------------------------------------------------------------------------

- Contenido del Curso: Ofrece contenido segmentado en formato texto, audio y video. Incluye imágenes y representaciones visuales claras que refuerzan la comprensión. La navegación es lineal y evita estructuras complejas. La información se presenta de forma gradual para disminuir la carga cognitiva.


<img width="1463" height="732" alt="image" src="https://github.com/user-attachments/assets/701f610b-64ab-4e1a-b23a-8591d6b0b209" />

<img width="1466" height="728" alt="image" src="https://github.com/user-attachments/assets/03ab36cf-4fa7-4b24-af0f-c22043a1490c" />

                                                                                                  
<img width="1455" height="727" alt="image" src="https://github.com/user-attachments/assets/9807043b-3c28-4d1d-8336-4ae301af20ae" />



<img width="1446" height="723" alt="image" src="https://github.com/user-attachments/assets/55c8735c-7ae7-4aef-af1f-367c3661cb4d" />


- Comunicación: Incluye botones de acción rápida que permiten expresar necesidades como solicitar ayuda, tomar una pausa u otras acciones básicas sin necesidad de escribir. También incluye un cuadro para redactar mensajes con opciones. Esta función apoya la expresión directa del usuario en situaciones de duda o ansiedad.

<img width="1446" height="595" alt="image" src="https://github.com/user-attachments/assets/848d373f-26b1-4923-a029-5dec1586c606" />

--------------------------------------------------------------------------------------------------------------------------------------------
- Módulo de Ayuda: Presenta instrucciones paso a paso sobre el uso del sistema, acompañadas de recursos visuales y explicaciones repetibles. El lenguaje utilizado es completamente literal para evitar ambigüedades. Su propósito es ofrecer soporte constante y accesible durante la navegación.

<img width="1868" height="931" alt="image" src="https://github.com/user-attachments/assets/fa9d25c4-4847-47da-aa12-7c018e064ff9" />

<img width="1860" height="935" alt="image" src="https://github.com/user-attachments/assets/5be2560c-4778-4032-beea-7e5a643b6601" />


----------------------------------------------------------------------------------------------------------------------------------------
- Menú de Navegación: El menú mantiene una estructura fija y consistente en todas las pantallas, lo cual permite acceder a las funcionalidades. Su organización evita la desorientación y facilita el movimiento por la plataforma.

<img width="1415" height="929" alt="image" src="https://github.com/user-attachments/assets/37dab599-392d-4c05-86fd-1a4af5c31d25" />



El enfoque de estas funcionalidades es el de mantener predictibilidad y continuidad dentro de la experiencia del estudiante TEA.

# **Fundamentos del Diseño**

El desarrollo del frontend se basó en principios derivados de:

- Experencia del Usuario
  
- UX Honeycomb (Peter Morville)

- Usabilidad según ISO 9241-210

- Heurísticas de Nielsen

- Recomendaciones de diseño para usuarios TEA


Estos fundamentos aseguran:

- Lenguaje claro y literal

- Baja estimulación sensorial

- Estructura visual consistente

- Retroalimentación inmediata

- Navegación simple y predecible

- Opciones de personalización adaptables

# Tecnologías Utilizadas

![TypeScript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)

![Nodejs](https://img.shields.io/npm/v/npm.svg?logo=nodedotjs) 

# Frameworks / Librerías

![React](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=flat-square)

[Ionic Framework]

# Entorno de desarrollo

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?logo=visualstudiocode&logoColor=fff&style=plastic)


Estas herramientas permiten crear un frontend modular, accesible y adaptable, adecuado para ser evaluado por usuarios TEA.



# **Propósito del Software**

Este frontend sirve como base para las evaluaciones participativas con estudiantes universitarios con TEA.
Durante las pruebas se evaluarán:

- Accesibilidad

- Usabilidad

- Carga cognitiva

- Claridad de navegación

- Percepción general del sistema

Los resultados permitirán refinar los principios utilizados y construir una guía final de diseño UX inclusivo orientada a este perfil de usuario.

## Rutas Especificas 

El archivo App.tsx actúa como el enrutador principal de la aplicación, definiendo la navegación entre las distintas vistas (páginas) a traves del link local como se especifica a continuacion --> (http://localhost:xxxx/Ruta):

/Inicio (InicioEstudiante.tsx): Es la pantalla de bienvenida. Presenta al estudiante un resumen de su estado, posiblemente con accesos directos y un indicador de progreso general.

/Cursos (CursosPag.tsx): Muestra el catálogo de cursos en los que el estudiante está inscrito (Física, Cálculo, Programación). Actúa como el hub central para acceder al material académico.

/CalculoCurso, /FisicaCurso, /ProgramacionCurso: Son las páginas de contenido específico para cada asignatura. Aquí es donde el estudiante interactúa con el material segmentado (texto, audio, video) y las lecciones.

/Configuracion (ConfiguracionEstudiante.tsx): Corresponde al módulo de personalización. Permite al usuario ajustar la interfaz (tamaño de fuente, contraste, temas) para adaptarla a sus necesidades sensoriales.

/Comunicacion (ComunicacionPag.tsx): Implementa la funcionalidad de comunicación aumentativa. Provee botones de acción rápida y un cuadro de texto para facilitar la expresión de necesidades.

/Ayuda (AyudaEstudiante.tsx): Ofrece soporte al usuario mediante instrucciones literales y visuales sobre cómo navegar y utilizar la plataforma.

## Instrucciones para ejecutar

1- Descargar Node.js

2- En Visual Studio Code, descargar la extension de WebNative para poder utilizar Framework de Ionic junto con React.

3- Ejecutar el proyecto en el cmd (Command Propmt) con el siguiente comando: npm run dev (asegurarse que este en la carpeta del proyecto denominada proytea)

- Como se especifica en la imagen adjunta:

<img width="640" height="225" alt="image" src="https://github.com/user-attachments/assets/32215b70-3ab9-40d8-9dbe-cb2dfe690eeb" />


4- Acceder al link del localhost.




