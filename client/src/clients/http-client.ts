import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const sendAPIRequest = <T>(
  url: string,
  method: AxiosRequestConfig["method"] = "GET",
  data?: AxiosRequestConfig["data"],
  params?: AxiosRequestConfig["params"]
): Promise<AxiosResponse<T>> =>
  new Promise((resolve, reject) => {
    const configObj: AxiosRequestConfig = {
      url,
      method,
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    };

    if (data !== undefined) {
      configObj.data = data;
    }
    if (params !== undefined) {
      configObj.params = params;
    }

    axios(url, configObj)
      .catch((error) => {
        return reject(error);
      })
      .then((result) => resolve(result as AxiosResponse<T>));
  });
