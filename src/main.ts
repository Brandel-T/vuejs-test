import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { createPinia } from "pinia";

// primevue
import PrimeVue from "primevue/config";
import Card from "primevue/card";
import VirtualScroller from "primevue/virtualscroller";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import TextArea from "primevue/textarea";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";

// css theme
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

// global style
import "./assets/global.css";

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(PrimeVue);
app.use(ToastService);

// adding primevue components to the projec
app.component("CardComponent", Card);
app.component("VirtualScroller", VirtualScroller);
app.component("ButtonComponent", Button);
app.component("InputText", InputText);
app.component("TextArea", TextArea);
app.component("InputNumber", InputNumber);
app.component("ToastComponent", Toast);

app.mount("#app");
