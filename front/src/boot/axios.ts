import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $axios: AxiosInstance;
    }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const getTrainingApi = axios.create({
    baseURL: 'http://localhost:9000/api/get-training',
});

export default boot(({ app }) => {

    Object.assign(app.config.globalProperties, {
        $axios: axios,
        $getTrainingApi: getTrainingApi,
    });

});

export { axios, getTrainingApi };
