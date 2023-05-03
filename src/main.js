/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Estilo Global
import './assets/main.css'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

import Navbar from './components/NavBar.vue';
// Named export
export {
	Navbar,
}

// Default export
export default Navbar

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
