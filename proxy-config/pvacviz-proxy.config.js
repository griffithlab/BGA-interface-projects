const PROXY_CONFIG = [
  {
    context: [
      "/api",
      "/swagger.json",
    ],
    target: "http://localhost:8080",
    secure: false
  }
];

module.exports = PROXY_CONFIG;
