import { App, Ref, ref } from 'vue';

interface Locales {
    [index: string]: string | Locales;
}

interface Options {
    [index: string]: string | Locales;

    lang: string,
    Translations: Locales
}

let translations: Locales = {};
const findTranslation = (key: string, language: Ref<string>) => {
    return [language.value].concat(key.split('.')).reduce((o: Locales, i: string) => {
        return o[i] as Locales;
    }, translations as Locales);
};

// noinspection JSUnusedGlobalSymbols
export default {
    install(app: App, options: Options) {
        translations = options.Translations;
        app.config.globalProperties.$language = ref(options.lang);
        app.config.globalProperties.$t = (key: string) => findTranslation(key, app.config.globalProperties.$language);
    },
};

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $t: (key: string) => object;
    }
}