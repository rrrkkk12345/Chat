import axios, { AxiosResponse } from 'axios';
import { logger } from "./logger";

type HttpResponse = {
    response: AxiosResponse,
    errorMessageList?: string[]
  }

let backendBaseUrl = "";
if (process.env.REACT_APP_ENV === "production" ){
  backendBaseUrl = "https://travel-two-choices.jp/app/api"
}
else if (process.env.REACT_APP_ENV === "staging" ){
  backendBaseUrl = "https://travel-stg.pca-ds.com/app/api"
}
else {
  backendBaseUrl = "http://localhost:8081/app/api"
}
const fetchErrorMessageList = (errorResponse: AxiosResponse): string[] => {
    const errorMessageList: string[] = []
    const { field, global, message } = errorResponse && errorResponse.data || {}
    if (field !== undefined) errorMessageList.push(...field.map((e: { name: string, message: string }) => e.message))
    if (global !== undefined) errorMessageList.push(...global.map((e: { message: string }) => e.message))
    if (message !== undefined) errorMessageList.push(message)
    return errorMessageList
  }
const apiLogger = (response: AxiosResponse, event: string, message: string) => {
    const logInfo = { userId: 'user001', event, message } 
    const { status } = response || {}
    if (status === 200) {
      logger().info(JSON.stringify(logInfo));
      return;
    } else if (status >= 500) {
      logger().error(JSON.stringify(logInfo));
      return;
    } else if (status >= 400) {
      logger().warn(JSON.stringify(logInfo));
      return;
    }
  }

const travelApi = axios.create({
    baseURL: backendBaseUrl,
    timeout: 30000,
    headers: { 'Content-Type': 'application/json' },
  });

export const login = async (email: string, password: string, securityCode: string): Promise<HttpResponse> => {
    const event = 'ログイン'
    return await travelApi.post('/account/login', { email, password, "code": securityCode})
      .then(response => {
        const message = 'ログイン完了'
        apiLogger(response, event, message)
        return { response }
      })
      .catch(error => {
        const errorMessageList = fetchErrorMessageList(error.response)
        apiLogger(error.response, event, errorMessageList.join(','))
        return { response: error.response, errorMessageList }
      });
  };