const fs = require('fs');

let data = {};

const databaseFile = './database/database.json';

// Función para cargar la base de datos desde el archivo JSON
function loadDatabase() {
  try {
    // Verificar si el archivo existe
    if (fs.existsSync(databaseFile)) {
      const jsonContent = fs.readFileSync(databaseFile, 'utf8');
      data = JSON.parse(jsonContent);
    } else {
      // Si el archivo no existe, crearlo con el contenido predeterminado
      createDefaultDatabase();
    }
  } catch (error) {
    console.error('Error loading database:', error);
  }
}

// Función para crear la base de datos por defecto
function createDefaultDatabase() {
  const defaultData = {
    "total": 10000,
    "user": {
      "andres": {
        "gold": 5000,
        "total": 1000
      }
    }
  };

  try {
    fs.writeFileSync(databaseFile, JSON.stringify(defaultData, null, 2), 'utf8');
    data = defaultData;
    console.log('Database file created with default content.');
  } catch (error) {
    console.error('Error creating database file:', error);
  }
}

// Llamar a la función para cargar la base de datos al iniciar
loadDatabase();


function saveDatabase() {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(databaseFile, jsonData, 'utf8');
  } catch (error) {
    console.error('Error saving database:', error);
  }
}

// Función para agregar un nuevo usuario
function newuser(username) {
  if (!data.user[username]) {
    data.user[username] = { gold: 0, total: 0};
    saveDatabase();
    console.log(`Nuevo usuario '${username}' agregado.`);
    return `Nuevo usuario '${username}' agregado.`;
  } else {
    console.log(`El usuario '${username}' ya existe.`);
    return `El usuario '${username}' ya existe.`;
  }
}

// Función para actualizar el saldo de un usuario
function newgold(username, amount) {
  if (data.user[username]) {
    data.user[username].gold += amount;
    saveDatabase();
    console.log(`Saldo de '${username}' actualizado: ${data.user[username].gold}`);
    return `Saldo de '${username}' actualizado: ${data.user[username].gold}`;
  } else {
    console.log(`El usuario '${username}' no existe.`);
    return `El usuario '${username}' no existe.`;
  }
}

function menosgold(username, amount) {
  if (data.user[username]) {
    data.total += 1
    data.user[username].gold -= amount;
    data.user[username].total += 1;
    saveDatabase();
    console.log(`Saldo de '${username}' actualizado: ${data.user[username].gold}`);
    return `Saldo de '${username}' actualizado: ${data.user[username].gold}`;
  } else {
    console.log(`El usuario '${username}' no existe.`);
    return `El usuario '${username}' no existe.`;
  }
}

// Función para mostrar el valor de la moneda virtual para un usuario específico
function saldo(username) {
  if (data.user[username]) {
    return data.user[username].gold;
  } else {
    console.log(`El usuario '${username}' no existe.`);
    return `El usuario '${username}' no existe.`;
  }
}

function totalapis(username) {
  if (data.user[username]) {
    return data.user[username].total;
  } else {
    return `El usuario '${username}' no existe.`;
  }
}

function totaluser() {
  return data.total
}

function userExists(username) {
  return data.user.hasOwnProperty(username);
}


// Cargar la base de datos al iniciar la aplicación
module.exports = {
  newuser,
  newgold,
  saldo,
  loadDatabase,
  menosgold,
  saveDatabase,
  userExists,
  totalapis,
  totaluser
};
