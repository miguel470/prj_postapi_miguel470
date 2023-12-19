import { renderPost } from "./src/components/renderPost/renderPost.js";
import { createPostApi } from "./src/helper/createPostApi.js";
import { getPostApi } from "./src/helper/getPostApi.js";
import { deletePostApi } from "./src/helper/deletePostApi.js";
import { updatePostApi } from "./src/helper/updatePostApi.js";

//globales
const URL = `${import.meta.env.VITE_URL_API}/posts`;
const postList = document.querySelector(".posts-list");
const addPostForm = document.querySelector(".add-post-form");
let postData = {};
const titlePost = document.querySelector("#title-post");
const contentPost = document.querySelector("#content-post");
const deleteBtn = document.querySelectorAll("#delete-btn");

function init() {
  //Get the post
  getPostApi(URL, (data) => renderPost(postList, data));
}

addPostForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const boton = e.target.querySelector(".btn");
  if (!(titlePost.value && contentPost.value)) {
    alert("Debes llenar todos los campos");
    return;
  }

  if (boton.classList.contains("btn-secondary")) {
    //actualizar
    const updateData = {
      id: boton.dataset.id,
      title: titlePost.value,
      post: contentPost.value,
    };
    updatePostApi(URL, updateData, (post) => {
      const cardDataId = postList.querySelector(`[data-id="${post.id}"]`);

      const cardTitle = cardDataId.querySelector(".card-title");
      cardTitle.textContent = post.title;

      const cardText = cardDataId.querySelector(".card-text");
      cardText.textContent = post.post;

      const cardSubtitle = cardDataId.querySelector(".card-subtitle");
      cardSubtitle.textContent = `Id del post: ${post.id}`;

      cardDataId.reset();

      renderPost(postList, [post]);
    });

    boton.textContent = "Añadir Post";
    boton.classList.remove("btn-secondary");
    e.target.reset();
    return;
  }

  //estoy añadiendo
  postData = {
    title: titlePost.value,
    post: contentPost.value,
  };

  createPostApi(URL, postData, (data) => {
    // const arrayPost = [];
    // arrayPost.push(data);
    renderPost(postList, [data]);
  });
  e.target.reset();
});

postList.addEventListener("click", (e) => {
  e.preventDefault();
  let editBtnPress = e.target.id === "edit-post";
  let deleteBtnPress = e.target.id === "delete-post";
  const dataId = e.target.parentElement.dataset.id;

  const card = e.target.closest(".card");

  //eliminar
  if (deleteBtnPress) {
    deletePostApi(URL, dataId, () => card.remove());
    return;
  }
  //editar
  if (editBtnPress) {
    const boton = addPostForm.querySelector(".btn");
    boton.textContent = "Actualizar Post";
    boton.classList.add("btn-secondary");

    boton.dataset.id = dataId;

    const postEdit = card.querySelector(".card-text").textContent;
    const titleEdit = card.querySelector(".card-title").textContent;

    titlePost.value = titleEdit;
    contentPost.value = postEdit;
  }
});

//inicio de la app

document.addEventListener("DOMContentLoaded", init);
