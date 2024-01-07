*「𝗥𝗘𝗦𝗣𝗢𝗦𝗧𝗔!」- 😈*
// Primero, definamos el límite de búsqueda por usuario
var searchLimit = {
  "andres": 2,
  "escanor": 1
};

// Luego, podemos crear un registro de búsquedas de usuario
var userSearches = {
  "andres": 0,
  "escanor": 0
};

// Ahora, creamos una función para controlar la búsqueda
function search(user) {
  // Comprobamos si el usuario existe en el registro de límites
  if (searchLimit.hasOwnProperty(user)) {
      // Comprobamos si el usuario aún tiene búsquedas disponibles
      if (userSearches[user] < searchLimit[user]) {
          // Si tiene búsquedas disponibles, incrementamos su contador y permitimos la búsqueda
          userSearches[user]++;
          console.log('La búsqueda fue realizada, ahora tienes: ' + (searchLimit[user] - userSearches[user]) +' búsquedas restantes.');
      } else {
          // Si el usuario ha alcanzado su límite, rechazamos la búsqueda
          console.log('Lo siento, has sobrepasado tu límite de búsquedas.');
      }
  } else {
      console.log('No hay límites configurados para este usuario.');
  }
}
Claro, aquí tienes un ejemplo básico en JavaScript que puedes continuar modificando según tus necesidades 😊:

```js

```

Con este script, puedes registrar el número de búsquedas de cada usuario y verificar si el usuario ha alcanzado su límite antes de permitirle realizar más búsquedas. El script rechazará la búsqueda si el usuario ha alcanzado su límite. ⚠️🔝