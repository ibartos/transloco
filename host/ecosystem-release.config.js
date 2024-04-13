module.exports = {
  apps : [{
    name   : "STB SSR Release",
    script : "dist/stanleybet/proxy-server.js",
    watch  : true,
    instances: 8,
    exec_mode: "cluster",
  }]
}
