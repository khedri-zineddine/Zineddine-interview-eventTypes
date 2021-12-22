import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios';

type ResponseType = AxiosResponse;
type RequestHeaders = AxiosRequestHeaders;
class HttpClient {
  protected client = axios;

  getRequest(path: string, headers: RequestHeaders = {}): Promise<ResponseType> {
    return this.client.get(path, {
      headers,
    });
  }

  postRequest(path: string, data: any, headers: RequestHeaders = {}): Promise<ResponseType> {
    return this.client.post(path, data, {
      headers,
    });
  }
}

const httpCLient = new HttpClient();
export default httpCLient;
