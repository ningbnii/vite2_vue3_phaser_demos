import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { Button, Cell, List } from "vant"

createApp(App).use(router).use(Button).use(Cell).use(List).mount("#app")
