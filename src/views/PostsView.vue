<template>
  <div class="posts-wrapper">
    <header>
      <h1>Post overview</h1>
    </header>
    <div class="posts">
      <VirtualScroller :items="postsStore.posts" :itemSize="50">
        <template v-slot:item="{ item, options }">
          <card-component :style="'color: #64748b'">
            <template #title>{{ item.title }}</template>
            <template #content>{{ item.body }}</template>
            <template #footer>
              <span>
                <i class="pi pi-user"></i>
                {{ item.userId }}
              </span>

              <span class="actions">
                <router-link
                  :to="{
                    name: 'detail',
                    params: {
                      id: item.id,
                      userId: options.index,
                    },
                  }"
                >
                  <ButtonComponent label="Edit" icon="pi pi-pencil" />
                </router-link>
              </span>
            </template>
          </card-component>
        </template>
      </VirtualScroller>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { usePostStore } from "@/store/poststore";

export default defineComponent({
  setup() {
    const postsStore = usePostStore();
    const posts = postsStore.posts;
    onMounted(() => postsStore.getAllPosts());
    return {
      posts,
      postsStore,
    };
  },
});
</script>

<style>
div.posts-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1em 0;
  border-radius: 7px;
  background-color: #73b6d13b;
}
header {
  width: 660px;
  padding: 0;
  border-radius: 7px;
  font-size: 1.3em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.p-button {
  display: flex;
  justify-content: center;
}
.p-virtualscroller {
  color: aliceblue;
}
.posts {
  display: flex;
  flex-direction: column;
  margin-top: 1em;
  margin-right: 1em;
  width: 660px;
  border-radius: 1em;
  gap: 1em;
}
.p-virtualscroller {
  height: 80vh;
  width: 100%;
}
.p-virtualscroller::-webkit-scrollbar {
  display: none;
}
.p-virtualscroller {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
}
div.post {
  margin-bottom: 0.8em;
}
.p-card-body {
  margin-bottom: 0.7em;
}
.p-card .p-card-footer {
  padding: 0.4em;
}
.p-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 3px;
  font-weight: 800;
  padding: 0 0.4em;
  background-color: #73b6d13b;
}
.p-card-footer > span i {
  margin-right: 7px;
}

.actions {
  display: flex;
  gap: 7px;
}

a {
  text-decoration: none;
}
</style>
