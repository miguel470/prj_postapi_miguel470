export function deletePostApi(url, id, callback) {
  fetch(`${url}/${id}`, { method: "DELETE" })
    .then((response) => {
      if (response.ok) {
        callback();
      } else {
        throw new Error("Couldn't delete post");
      }
    })
    .catch((error) => console.log("Error deleting post"));
}
