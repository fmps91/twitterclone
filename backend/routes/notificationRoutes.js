
const { getNotifications, deleteNotification, deleteNotifications } = require("../controllers/notificationcontroller.js");
const { protectRoute } = require("../middleware/protectRoute.js");
const router = require("express").Router();

router.get("/",protectRoute,getNotifications)
router.delete("/",protectRoute,deleteNotifications)
router.delete("/:id",protectRoute,deleteNotification)

module.exports = router;