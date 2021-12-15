import Api from "./AxiosCreate";
import axios, {
    AxiosInstance,
    AxiosPromise,
    CancelTokenSource,
    AxiosRequestConfig,
    CancelToken
} from "axios";
import { RequestCategories } from "./Request";

type Iparams = {
    params: {
        method: string;
        url: string;
        data?: Record<string, unknown>;
        cancelToken?: CancelToken;
    };
};
/**
 * @abstract
 * @protected {api} получение axios.create из сингтона
 * @protected {params} методы запроса 
 * {
   * @type method: string - методы запроса GET | POST | PUT | DELET
     @type url: string - адресс запроса
     @type data?: Record<string,unknown> - данные к запросу
     @type cancelToken?:CancelToken
 * }
 * @method request AxiosRequest(api) с методами запроса
 * @returns AxiosRequest
 */
export abstract class ApiSuper {
    protected readonly api: AxiosInstance = Api.getInstance.api;
    protected params = {};
    protected request<T>(url: string): AxiosPromise<T> {
        return this.api({
            ...this.params,
            url
        });
    }
}

/**
 * Decorators
 */
/**
 * @decorator
 * @param target
 * @param propertyKey
 * @param descriptor
 * @description добавляет токен в параметры
 */
export function token(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const childFunction = descriptor.value;
    descriptor.value = function (this: Iparams, ...arg: []) {
        const productsRequestSource = axios.CancelToken.source();
        this.params = {
            ...this.params,
            cancelToken: productsRequestSource.token
        };
        return childFunction.call(this, ...arg);
    };
}

/**
 * @decorator
 * @param method методы запроса 'post' | 'get' | 'put' | 'delete'
 * @description в зависимости от метода, добавляет в params, method и data из аргументов управляющей функции
 * @returns вызывает управляющиею функцию
 */
export function methods(method: "post" | "get" | "put" | "delete" | "patch") {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const childFunction = descriptor.value;
        const get_args = (fn: any) =>
            fn
                .toString()
                .match(/\((.*?)\)/)[1]
                .split(", ");

        descriptor.value = function (this: Iparams, ...arg: []) {
            // eslint-disable-next-line no-case-declarations

            const data = arg.reduce((acc, n, i) => {
                if (typeof n === "object") {
                    return Object.assign(acc, n);
                } else {
                    return acc;
                    /*
                    return Object.assign(acc, {
                        [get_args(childFunction)[i]]: n
                    });
                    */
                }
            }, {});
            if (method === "get") {
                this.params = {
                    ...this.params,
                    method
                };
            } else if (
                method === "post" ||
                method === "put" ||
                method === "delete" ||
                method === "patch"
            ) {
                this.params = {
                    ...this.params,
                    method,
                    data
                };
            }

            return childFunction.call(this, ...arg);
        };
    };
}
