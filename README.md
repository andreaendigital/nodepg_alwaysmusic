# Always Music

## Descripción del Proyecto

Proyecto donde se valida conocimientos de Paquete PG, Consultas con texto parametrizado, JSON como argumentos de consulta y captura de errores.

### :scroll: Contexto :scroll:
La escuela de música Always Music nunca dejó de utilizar excel como base de datos y ha decidido cambiar esto por un desarrollo personalizado.

En este desafío deberás desarrollar una aplicación en Node que realice consultas a PostgreSQL con el paquete “pg” para:

- Agregar un nuevo estudiante.
- Consultar los estudiantes registrados.
- Consultar estudiante por rut.
- Actualizar la información de un estudiante.
- Eliminar el registro de un estudiante.

Ya que el caso se trata de un proceso de desarrollo, la interacción la debes realizar con argumentos por la línea de comandos.
Se solicitó hacer pruebas con el sistema de gestión con base de datos PostgreSQL, se dieron cuenta que no se podían hacer varias consultas de forma simultánea y que al intentar hacer una consulta errónea, no recibían ningún error, dejando la posibilidad de creer que un estudiante fue registrado y que esto no sea así.

Se solicita ocupar la clase Pool definiendo sus diferentes propiedades, capturar los posibles errores en el proceso de conexión con la base de datos y realizar las siguientes consultas usando textos parametrizados.


## Sobre el proyecto 🚀


### ✨ Requerimientos ✨

👌 1. Crear funciones asincrónicas para cada acción solicitada.

👌 2. Hacer todas las consultas con un JSON como argumento del método query.

👌 3. Hacer las consultas con texto parametrizado.

👌 4. Capturar los posibles errores en todas las consultas e imprimirlos por consola.

👌 5. Obtener el registro de los estudiantes registrados en formato de arreglos.

👉 Nota: Agregar control de ruta No Existente, se deben manejar control de errores con bloques try/catch, y usar variedad de errores y respuestas del servidor según sean necesarias.

### Prerrequisitos 📋

Lista de software y herramientas, incluyendo versiones, que necesitas para instalar y ejecutar este proyecto:

 "dependencies": 
 - "pg": "^8.7.1"  

### Instalación 🔧

 Instalo en terminal:
- npm init --yes
- npm i pg

## Renders y Pruebas ⚙️

Ejecutar en terminal con líneas de comando.

Sugeridas:
- Ingresar nuevo estudiante: node index nuevo 1 andrea programacion 1
- Ingresar nuevo estudiante: node index nuevo 2 daniela html 1
- Enlistar o consultar todos los estudiantes: node index consulta
- Consultar por rut: node index rut 1
- Editar estudiante por rut: node index editar 1 andrea sql 2
- Eliminar estudiante por rut: node index eliminar 1

## Visuales 

Imágenes de referencia para cada acción solicitada:

- Consultar los estudiantes registrados:
  
![consulta_alwaysmusic](https://github.com/andreaendigital/nodepg_alwaysmusic/assets/154395788/165f6d21-e4ee-4b9e-adce-872db4f04c2e)



## Construido Con 🛠️

Explica qué tecnologías usaste para construir este proyecto. Aquí algunos ejemplos:

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - El lenguaje utilizado
- [PG](https://www.npmjs.com/package/pg)- Node paquete PG
  

## Autor ⚡ 

- **Andrea Rosero** ⚡  - [Andrea Rosero](https://github.com/andreaendigital)
