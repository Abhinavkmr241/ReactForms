export const makeGetRequest = async (
    url
  ) => {
    let authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlY2U0MjA0ZmZkOTliMGRkMTNhNDNjMSIsIl9pZCI6IjVlY2U0MjA0ZmZkOTliMGRkMTNhNDNjMSIsImZ1bGxOYW1lIjoiS2lyYW4gRGVibmF0aCIsImVtYWlsIjoidG90YW4wMDEwQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoiQWRtaW4iLCJpc1N1cGVyQWRtaW4iOnRydWUsImlhdCI6MTYwMjA5NjgxMCwiZXhwIjoxNjA0Njg4ODEwfQ.pM57KUwZutkyQWtNvodadAAKPIxKljSd_QJkt1c2vLs"
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    headers["Authorization"] = "Bearer " + authToken;
    return new Promise((resolve, reject) => {
      try {
        fetch(url, {
          method: "GET",
          headers: headers
        })
          .then(res => {
              return res.json()
          })
          .then(jsonResponse => {
            if (jsonResponse.error === false) { 
              resolve(jsonResponse);
            } else {
              console.log(jsonResponse);
              reject(jsonResponse);
            }
          })
          .catch(e => {
            console.log("XHR GET Error: ", e);
            reject(e);
          });
      } catch (e) {
        console.log(e);
        reject();
      }
    });
  };