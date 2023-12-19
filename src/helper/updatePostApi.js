export function updatePostApi(url, updateData, callback) {
  fetch(`${url}/${updateData.id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(updateData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => callback(data))
    .catch((err) => console.log("Error ", err));
}
