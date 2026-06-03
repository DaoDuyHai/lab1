function fetchModel(url, options = { method: "GET", body: null }) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(options.method, url);

    if (options.body && !(options.body instanceof FormData)) {
      xhr.setRequestHeader("Content-Type", "application/json");
    }

    const token = localStorage.getItem("token");
    if (token) {
      xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    }

    const sendData =
      options.body instanceof FormData
        ? options.body
        : options.body
        ? JSON.stringify(options.body)
        : null;

    xhr.send(sendData);

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;

      if (xhr.status === 200) {
        try {
          const response = xhr.responseText ? JSON.parse(xhr.responseText) : {};

          resolve({ data: response });
        } catch (e) {
          resolve({ data: { message: xhr.responseText } });
        }
      } else {
        reject({ status: xhr.status, message: xhr.responseText });
      }
    };
  });
}

export default fetchModel;
