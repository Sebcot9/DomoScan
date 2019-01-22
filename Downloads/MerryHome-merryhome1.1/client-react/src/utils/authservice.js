const SERVER = 'SERVER';
const USERNAME = 'USERNAME';
const PASSWORD = 'PASSWORD';

export function getServerAuthInfo() {
   return {
        server   : localStorage.getItem(SERVER),
        username : localStorage.getItem(USERNAME),
        password : localStorage.getItem(PASSWORD)
    };
}

export function setServerAuthInfo(serv, user, pass) {
    localStorage.setItem(SERVER, serv);
    localStorage.setItem(USERNAME, user);
    localStorage.setItem(PASSWORD, pass);
    window.location.href = "/";
}

export function isConfigured() {
  const server = localStorage.getItem(SERVER);
  return !!server;
}
