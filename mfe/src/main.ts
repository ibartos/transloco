Promise.all([])
    .catch()
    .then(() => import("./bootstrap"))
    .catch();
