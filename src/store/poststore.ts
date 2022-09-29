import reactive, { computed, ref } from "vue";
import { defineStore } from "pinia";
import Post from "@/model/Post";
import axios from "axios";
import { useRouter } from "vue-router";

/**
 * state <--> data
 * getters <--> computed
 * actions <--> methods
 */
export const usePostStore = defineStore("posts", () => {
  const posts = ref<Post[]>([]); // state
  const post = ref<Post>({
    id: "",
    title: "",
    body: "",
    userId: "",
  });
  const BASE_URL = "https://jsonplaceholder.typicode.com";
  const index = computed(() =>
    posts.value.findIndex((p) => p.id == post.value.id)
  );
  const wasEdited = computed(() => {
    return posts.value[index.value] !== post.value;
  });

  function getAllPosts() {
    axios
      .get(BASE_URL + "/posts?_page=1")
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        return (posts.value = data);
      })
      .catch((reason) => console.log(reason));
  }

  function getPostById(id: string | string[]) {
    axios
      .get(`${BASE_URL}/posts/${id}`)
      .then((response) => (post.value = response.data))
      .catch((reason) => {
        // alert("can not get Post by ID, see reason in console");
        console.log(reason);
      });
  }

  function updatePost() {
    axios
      .put(`${BASE_URL}/posts/${post.value.id}`, {
        id: post.value.id,
        title: post.value.title,
        body: post.value.body,
        userId: post.value.userId,
      })
      .then((response) => {
        if (response.status === 200) {
          // window.alert("succesfully saved");
          // router.push({ name: "posts" });
        }
      });
  }

  function deletePost(id: string | undefined) {
    fetch(`${BASE_URL}/posts/${id}`, {
      method: "DELETE",
    }).then((res) => console.log(res));
  }

  function createPost() {
    axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        id: post.value.id,
        title: post.value.title,
        body: post.value.body,
        userId: post.value.userId,
      })
      .then((res) => {
        // index.value = 1;
      })
      .catch((reason) => {
        alert("POST request rejected. See reason in the console");
        console.log(reason);
      });
  }

  return {
    posts,
    post,
    index,
    wasEdited,
    getPostById,
    getAllPosts,
    updatePost,
    deletePost,
    createPost,
  };
});
