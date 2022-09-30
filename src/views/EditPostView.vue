<template>
  <Toast />
  <main>
    <form @submit.prevent="handleSubmit($event)">
      <h1>New Post</h1>
      <div class="inputs">
        <span>
          <label for="user ID">User ID</label>
          <InputText
            ref="inputnumber"
            id="userID"
            type="number"
            placeholder="User ID"
            v-model="postsStore.post.userId"
          />
        </span>
        <span>
          <label for="title">Title</label>
          <InputText
            ref="inputtext"
            id="title"
            type="text"
            placeholder="Title"
            v-model="postsStore.post.title"
          />
        </span>
        <span>
          <label for="body">Body</label>
          <TextArea
            ref="textarea"
            id="body"
            :autoResize="true"
            rows="5"
            cols="30"
            placeholder="Body"
            v-model="postsStore.post.body"
          />
        </span>
      </div>
      <span class="actions">
        <ButtonComponent
          label="Cancel"
          icon="pi pi-times-circle"
          class="p-button-secondary"
          @click="backToPostsView"
        />
        <ButtonComponent
          id="submit"
          label="Save"
          icon="pi pi-save"
          @click="savePost()"
        />
      </span>
    </form>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePostStore } from "@/store/poststore";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import TextArea from "primevue/textarea";

export default defineComponent({
  components: { Toast },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const postsStore = usePostStore();
    const toast = useToast();
    const wasEdited = postsStore.posts[postsStore.index] === postsStore.post;

    const inputnumber = ref<InputNumber>();
    const inputtext = ref<InputText>();
    const textarea = ref<TextArea>();

    const msgDelay = 3000;
    const showSuccess = function (summary: string) {
      toast.add({
        severity: "success",
        summary: summary,
        life: msgDelay,
      });
    };

    const showError = (summary: string) => {
      toast.add({
        severity: "error",
        summary: summary,
        detail: "Message Content",
        life: msgDelay,
      });
    };

    const validUserId = computed(() => postsStore.post.userId != "");
    const validTitle = computed(() => postsStore.post.title != "");
    const validBody = computed(() => postsStore.post.body != "");

    const isValid = () => {
      return validUserId.value && validTitle.value && validBody.value;
    };

    const message = (field: string) => field.concat(" is incorrect");

    function savePost() {
      if (postsStore.posts.includes(postsStore.post)) {
        alert("deja");
      } else {
        if (postsStore.index == -1) {
          // create
          postsStore.post.id = postsStore.posts.length.toString();
          postsStore.createPost();
          showSuccess("New post created");
        } else {
          // update
          postsStore.updatePost();
          showSuccess("Post updated");
          postsStore.posts[postsStore.index] = postsStore.post; // refresh in the array of posts
        }
        window.setTimeout(() => {
          backToPostsView(); // back to posts overview
        }, msgDelay);
      }
    }

    function handleSubmit(event: any) {
      console.log(event);
    }

    function backToPostsView() {
      router.push({ name: "posts" });
    }

    onMounted(() => {
      postsStore.getPostById(route.params.id);
      console.log("ca a ete" + (wasEdited ? " edité" : ""));
      console.log("> index ====== " + postsStore.index);
    });

    return {
      postsStore,
      inputnumber,
      inputtext,
      textarea,
      validUserId,
      validTitle,
      validBody,
      isValid,
      savePost,
      showSuccess,
      showError,
      handleSubmit,
      backToPostsView,
    };
  },
});
</script>

<style>
main {
  width: 100vw;
  height: 100vh;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #166feb27;
}
form {
  width: 600px;
  padding: 10px 3em;
  background-color: white;
  border-radius: 7px;
}
h1 {
  color: #166feba4;
  text-align: start;
}
.inputs {
  display: flex;
  gap: 7px;
  flex-direction: column;
  align-items: center;
  align-content: center;
  gap: 1.5em;
}
.inputs > span {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  font-weight: 700;
}
.inputs > span label {
  text-align: start;
}
form span.actions {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 2em;
  margin-bottom: 1em;
}
</style>
