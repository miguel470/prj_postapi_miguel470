export function getPostApi(url, callback) {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("No se pudo cargar la pagina");
      }
    })
    .then((data) => callback(data))
    .catch((err) => console.error(err));
}
