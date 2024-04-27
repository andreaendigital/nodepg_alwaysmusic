//npm init --yes
//npm i pg
//importo del modulo handleErrors la funcion que maneja los errores
const errors = require("./handleErrors.js");

//del pagquete pg requerimos solo clase pool, permite múltiples conexiones:
const { Pool } = require("pg");

//configuración de la base de datos
const pool = new Pool({
  //Instancio la clase pool que pertenece a pg,
  //Objeto de conexión: argumento de la clase pool, objeto co 5 propiedades.
  //Lo deposita en variable pool.
  user: "postgres",
  host: "localhost",
  database: "alwaysmusic",
  password: "3434",
  port: 5432,
});

// console.log("Valor de pool , objeto que conecta a bd: ", pool);
// console.log("Valor de errors: " + errors); //muestra el contenido de handleErrors.js

//variables globales de index.js
const tabla = "estudiantes";
let status = "";
let message = "";

// manejo del process.argv: captura todo lo que tiene la linea de comando y crea un arreglo
// al aplicar slice, quita los primeros dos index que corresponden a node.exe y al programa que ejecuta en este caso index.js
//quedando en el arreglo sólo el resto de parámetros a ingresar en la consulta de comandos

const argumentos = process.argv.slice(2);
// console.log("argumentos: process.argv : ",  argumentos);

// posicion 0, funcion a usar:
const funcion = argumentos[0];

// resto de posiciones, corresponde a los otros campos:
const rut = argumentos[1];
const nombre = argumentos[2];
const curso = argumentos[3];
const nivel = argumentos[4];

console.log("****************************");
console.log("Función a usar: " + funcion);
console.log("Rut: " + rut);
console.log("Nombre: " + nombre);
console.log("Curso: " + curso);
console.log("Nivel: " + nivel);
console.log("****************************");

//----------------------------------------------------------------------
//Funcion para consultar todos los estudiantes
const listaEstudiantes = async () => {

  try {
    //Objeto JSON como argumento de consulta
    // propiedad para que lo que devuelva como respuesta el query sea un array solo
    const result = await pool.query({
      rowMode: "array",
      text: `SELECT * FROM ${tabla}`,
    });

    if (result.rows != 0) {
      //si el número de filas es distinto a cero, mostrar el mensaje:
      console.log("Número de Estudiantes registrados:", result.rowCount);
      console.log("Registro actual de Estudiantes:", result.rows);
    } else {
      //si hay 0 filas mostrar mensaje:
      console.log("No hay registros de estudiantes");
    }
  } catch (err) {
    console.log("Error General: ", err);
    const final = errors(err.code, message);
    console.log("Codigo de Error: ", final.code);
    console.log("Status de Error: ", final.status);
    console.log("Mensaje de Error: ", final.message);
    console.log("Error Original: ", err.message);
  }
};

//----------------------------------------------------------------------
//Funcion para agregar un nuevo estudiante
const nuevoEstudiante = async ({ rut, nombre, curso, nivel }) => {
  try {
    //validación al ingresar rut
    if (rut == undefined || nombre == undefined || curso == undefined || nivel == undefined) {
        return console.log(`El parámetro no puede estar vacío`);
    }

    //Objeto JSON que será argumento de consulta con propiedad text que contiene sentencia SQL y propiedad values donde se definen los parámetros que recibirá la consulta.
    const objetoQuery = {
      text: `INSERT INTO ${tabla} (rut, nombre, curso, nivel ) values ($1, $2, $3, $4)  RETURNING *`, //consulta parametrizada
      values: [rut, nombre, curso, nivel],
    };

    const result = await pool.query(objetoQuery); //objeto JSON como argumento de consulta

    //validación con operador ternario, si devuelve cero filas/registros envía mensaje que ya existe estudiante, de lo contrario, entrega mensaje de agregado con éxito
    result.rowCount == 0
      ? console.log("** Ya existe el estudiante con rut " + rut)
      : console.log(
          `Estudiante con rut ${rut} y nombre ${nombre} agregado con éxito`
        );

    //otras verificaciones
    console.log("Registro Agregado: ", result.rows[0]);
    // console.log("Valor de res.rows:", result.rows);
    // console.log("Valor de res.rowCount:", result.rowCount);
  } catch (err) {
    // console.log("Error General: ", err)
    const final = errors(err.code, status, message);
    console.log("Codigo de Error: ", final.code);
    console.log("Status de Error: ", final.status);
    console.log("Mensaje de Error: ", final.message);
    console.log("Error Original: ", err.message);
  }
};

//----------------------------------------------------------------------
//Funcion para consultar por rut un estudiante

const consultaRut = async ({ rut }) => {
  try {

    //validación al ingresar rut
    if (rut == undefined) {
        return console.log(`El parámetro no puede estar vacío`);
    }

    //Objeto JSON que será argumento de consulta
    const objetoQuery = {
      text: `SELECT * FROM ${tabla} WHERE rut = $1`, //consulta parametrizada
      values: [rut],
    };

    const result = await pool.query(objetoQuery); //objeto JSON como argumento de consulta

    //agregar manejo de errores para rut que no existe, si el registro no existe es un error lógico, se debe programar
    if (result.rowCount == 0) {
      console.log(`El Estudiante con Rut ${rut} no existe`);
    } else {
      console.log(`Estudiante con Rut ${rut} consultado:`);
      console.log("Detalle de estudiante: ", result.rows[0]);
    }
  } catch (err) {
    // console.log("Error General: ", err)
    const final = errors(err.code, status, message);
    console.log("Codigo de Error: ", final.code);
    console.log("Status de Error: ", final.status);
    console.log("Mensaje de Error: ", final.message);
    console.log("Error Original: ", err.message);
  }
};

//----------------------------------------------------------------------
//Funcion para editar un estudiantes - actualizarlo

const editarEstudiante = async ({ rut, nombre, curso, nivel }) => {
  try {

    //validación al ingresar rut
    if (rut == undefined || nombre == undefined || curso == undefined || nivel == undefined) {
        return console.log(`El parámetro no puede estar vacío`);
    }

    //Objeto JSON que será argumento de consulta
    const objetoQuery = {
      text: `UPDATE ${tabla} SET nombre = $2, curso = $3, nivel = $4 WHERE rut = $1  RETURNING *`, //consulta parametrizada
      values: [rut, nombre, curso, nivel],
    };

    const result = await pool.query(objetoQuery); //objeto JSON como argumento de consulta

    if (result.rowCount == 0) {
      console.log(`No se encontró ningún estudiante con rut ${rut}`);
    } else {
      console.log(`Estudiante con rut ${rut} editado con éxito`);
      console.log("Registro Editado: ", result.rows[0]);
      // console.log("Detalle de estudiante editado: ", result.rows[0]);
      // console.log(result)
    }
  } catch (err) {
    // console.log("Error General: ", err)
    const final = errors(err.code, status, message);
    console.log("Codigo de Error: ", final.code);
    console.log("Status de Error: ", final.status);
    console.log("Mensaje de Error: ", final.message);
    console.log("Error Original: ", err.message);
  }
};

//----------------------------------------------------------------------
//Funcion para eliminar un estudiante

const eliminarEstudiante = async ({ rut }) => {
  try {
    //validación al ingresar rut
    if (rut == undefined) {
        return console.log(`El parámetro no puede estar vacío`);
    }

    //Objeto JSON que será argumento de consulta
    const objetoQuery = {
      text: `DELETE FROM ${tabla} WHERE rut = $1 RETURNING *`, //consulta parametrizada
      values: [rut],
    };

    const res = await pool.query(objetoQuery); //objeto JSON como argumento de consulta

    //agregar manejo de errores para rut que no existe, si el registro no existe es un error lógico, se debe programar
    if (res.rowCount == 0) {
      console.log("** No existe el estudiante con rut " + rut);
    } else {
      console.log(`Estudiante con rut: ${rut} eliminado`);
      console.log("Registro respectivo Eliminado: ", res.rows[0]);
    }

    // console.log("Valor de res.rows:", res.rows);
    // console.log("Valor de res.rowCount:", res.rowCount);
  } catch (err) {
    // console.log("Error General: ", err)
    const final = errors(err.code, status, message);
    console.log("Codigo de Error: ", final.code);
    console.log("Status de Error: ", final.status);
    console.log("Mensaje de Error: ", final.message);
    console.log("Error Original: ", err.message);
  }
};

// Funcion IIFE que recibe de la linea de comando y llama funciones asincronas internas
(() => {
  // recibir funciones y campos de la linea de comando respectivos según función
  switch (funcion) {
    case "nuevo":
      nuevoEstudiante({ rut, nombre, curso, nivel });
      break;
    case "rut":
      consultaRut({ rut });
      break;
    case "consulta":
      listaEstudiantes();
      break;
    case "editar":
      editarEstudiante({ rut, nombre, curso, nivel });
      break;
    case "eliminar":
      eliminarEstudiante({ rut });
      break;
    default: //manejo de error en caso de no ser ninguna función programada:
      console.log("Funcion: " + funcion + " no es valida");
      break;
  }

  pool.end(); //me desconecto de la base de datos, finalizo conexión.
})();

// instrucciones de uso:
// ingresar nuevo estudiante: node index nuevo 1 andrea programacion 1
// ingresar nuevo estudiante: node index nuevo 2 daniela html 1
// enlistar o consultar todos los estudiantes: node index consulta
// consultar por rut: node index rut 1
// editar estudiante por rut: node index editar 1 andrea sql 2
// eliminar estudiante por rut: node index eliminar 1
