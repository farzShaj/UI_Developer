export class Request {
  static post = function (url, data, callback) {
    const options = {
      method: "POST",
      headers: Request.getHeaders(),
      body: JSON.stringify(data),
    };
    Request.callApi(url, options, callback);
  };

  static get = function (url, callback) {
    const options = {
      method: "GET",
      headers: Request.getHeaders(),
    };
    Request.callApi(url, options, callback);
  };

  static callApi = function (url, requestOptions, cb) {
    window.loader(true);
    let status;
    fetch(url, requestOptions)
      .then((response) => {
        status = response.status;
        return response.text();
      })
      .then((result) => cb(result, null, status))
      .catch((error) => cb(null, error, status))
      .finally(() => {
        window.loader();
      });
  };

  static getHeaders = function () {
    const headers = new Headers();
    headers.append("sec-ch-ua", "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"");
    headers.append("accept", "*/*");
    headers.append("Referer", "http://localhost:3000/");
    headers.append("content-type", "application/json");
    headers.append("sec-ch-ua-mobile", "?0");
    headers.append("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36");
    headers.append("sec-ch-ua-platform", "\"macOS\"");
    return headers;
  };
}
