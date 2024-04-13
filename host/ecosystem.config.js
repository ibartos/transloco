module.exports = {
  apps : [{
    name   : "STB SSR Stage",
    script : "dist/stanleybet/proxy-server.js",
    watch  : true,
    instances: 4,
    exec_mode: "cluster",
  }]
}
