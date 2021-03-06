export const actions = {
  searchProducts(vuexContext, param) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`/view/product/search/tags/${param.searchString}`)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if (error.response.status == 404) {
            resolve(true);
          } else {
            var errorMessage = "";
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              if (
                error.response.status == 401 ||
                error.response.status == 500
              ) {
                errorMessage = error.response.data;
              }
              console.log("Response data: " + error.response.data);
              console.log("Response status: " + error.response.status);
              console.log("Response headers: " + error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              errorMessage = "Something went wrong. Try again.";
              console.log("Request: " + error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              errorMessage = "Something went wrong. Try again.";
              console.log("Error message: ", error.message);
            }
            console.log("Error config: " + error.config);
            reject(errorMessage);
          }
        });
    });
  },
};
