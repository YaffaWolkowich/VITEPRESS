import DefaultTheme from 'vitepress/theme'
import Lead         from './components/Lead.vue'
import Redirect     from './components/Redirect.vue'
import './custom.css'


export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('Lead', Lead)
        app.component('Redirect', Redirect)
    }
}
