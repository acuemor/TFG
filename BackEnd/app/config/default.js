exports = module.exports = data = {
  "server" : {
    "port" : "8080"
  },
  "database": {
    "host": "localhost",
    "name": "physiappDb"
  },
  logs: {
    "file": __dirname + "../../../logs/app.log",
    "level": "debug",
    "http": __dirname + "../../../logs/http.log",
    "socketLevel": "silly"
  },
  services: {
    "dir": __dirname + "/../services"
  }
};