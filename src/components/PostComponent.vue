import Post from '@/model/Post';
<template>
  <card-component :style="'color: #64748b'">
    <template #title>{{ post?.title }}</template>
    <template #content>{{ post?.body }}</template>
    <template #footer>
      <span>
        <i class="pi pi-user"></i>
        {{ post?.userId }}
      </span>

      <span class="actions">
        <router-link :to="{ name: 'detail', params: { id: post?.id } }">
          <ButtonComponent label="Edit" icon="pi pi-pencil" />
        </router-link>
        <!-- <ButtonComponent
          label="Delete"
          icon="pi pi-trash"
          class="p-button-danger"
        /> -->
      </span>
    </template>
  </card-component>
</template>

<script lang="ts">
import Post from "@/model/Post";
import { PropType } from "vue";

export default {
  name: "PostComponent",
  props: {
    post: Object as PropType<Post>,
    class: String,
  },
};
</script>

<style>
.p-card-footer {
  display: flex;
  padding: 2em;
  justify-content: space-between;
  align-items: center;
  border-radius: 3px;
  font-weight: 800;
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
