const cron = require("node-cron");
const Task = require("../models/taskModel");
const sendReminder = require("../services/sendReminder");

cron.schedule("0 * * * *", async () => {
  // Every hour
  const now = new Date();
  const upcomingTasks = await Task.find({
    dueDate: {
      $gte: now,
      $lte: new Date(now.getTime() + 24 * 60 * 60 * 1000), // 24 hours window
    },
  });

  upcomingTasks.forEach((task) => {
    sendReminder(task);
  });
});
