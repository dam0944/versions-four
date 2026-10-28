import { defineStore } from 'pinia'
import { i18n } from '../i18n'

export const useLangStore = defineStore('lang', {
    state: () => ({
        current: i18n.global.locale.value,
    }),
    actions: {
        setLang(lang) {
            this.current = lang
            i18n.global.locale.value = lang
            localStorage.setItem('lang', lang)
            document.documentElement.lang = lang
        },
        toggle() {
            this.setLang(this.current === 'km' ? 'en' : 'km')
        },
    },
})