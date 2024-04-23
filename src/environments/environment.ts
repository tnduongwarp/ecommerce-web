// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  socket: {
    baseUrl: 'http://localhost:3000',
    opts: {}
  },
  api: {
    baseUrl: 'http://localhost:3000'
  },
  firebaseConfig : {
    apiKey: "AIzaSyDbJgnh_VEsQX_uaKWoLVkn9Txsv7l_1HY",
    authDomain: "ecommerce-bb5b7.firebaseapp.com",
    projectId: "ecommerce-bb5b7",
    storageBucket: "ecommerce-bb5b7.appspot.com",
    messagingSenderId: "283558553496",
    appId: "1:283558553496:web:1e021be3b3e885fd13aded",
    measurementId: "G-GG16B2EL7K"
  }
};
