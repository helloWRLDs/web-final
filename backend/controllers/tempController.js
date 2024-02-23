import serverErrorHandler from "../middleware/serverErrorHandler.js";

export const getTempData = serverErrorHandler(async(req, res) => {
    res.send("some stuff")
})