const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
    optimization: {
        runtimeChunk: false,
    },
    experiments: {
        outputModule: true,
    },
    plugins: [
        new ModuleFederationPlugin({
            library: { type: "module" },
            shared: {
                "@angular/core": { singleton: true, strictVersion: false, requiredVersion: "auto" },
                "@angular/common": { singleton: true, strictVersion: false, requiredVersion: "auto" },
                "@angular/common/http": { singleton: true, strictVersion: false, requiredVersion: "auto" },
                "@angular/router": { singleton: true, strictVersion: false, requiredVersion: "auto" },
                "@ngrx/store": { singleton: true, strictVersion: false, requiredVersion: "auto" },
                "@ngrx/effects": { singleton: true, strictVersion: false, requiredVersion: "auto" },
                "@jsverse/transloco": { singleton: true },
            },
        }),
    ],
};
