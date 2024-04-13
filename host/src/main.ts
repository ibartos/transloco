import { loadRemoteEntry } from "@angular-architects/module-federation";
import { environment } from "./environments/environment";

// Promise.all([loadRemoteEntry({ type: "module", remoteEntry: "http://localhost:5101/remoteEntry.js" })])
//
//     .catch((err) => console.error("Error loading remote entries", err))
//     .then(() => import("./bootstrap"))
//     .catch((err) => console.error(err));

loadRemoteEntry({ type: "module", remoteEntry: environment.sportsbookUrl })
    .catch((err) => {
        console.error("Error loading remote entry", err);
        throw err; // Rethrow the error to prevent further execution
    })
    .then(() => {
        console.log("Remote entry loaded successfully");
        return import("./bootstrap");
    })
    .catch((err) => {
        console.error("Error importing module", err);
    });
