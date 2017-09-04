// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  /*apiUrl: 'http://localhost:8080/',
   oauthTokenUrl: 'http://localhost:8080/oauth/token',
   oauthCheckTokenUrl: 'http://localhost:8080/oauth/check_token',*/
  apiUrl: 'https://starter-itbootcamp.herokuapp.com/',
  oauthTokenUrl: 'https://starter-itbootcamp.herokuapp.com/oauth/token',
  oauthCheckTokenUrl: 'https://starter-itbootcamp.herokuapp.com/oauth/check_token',
  clientId: 'restClient',
  clientSecret: 'pass'
};
