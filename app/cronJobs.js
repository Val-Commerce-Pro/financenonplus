import fetch from "node-fetch";
import schedule from "node-schedule";

const scheduledJobs = new Map();

export function scheduleCleanUp(consorsOrderId) {
  let job = null;

  async function performCheck() {
    console.log(`Checking details for consorsOrderId ${consorsOrderId}`);
    try {
      const response = await fetch(
        `https://financenonplus.cpro-server.de/api/cleanUp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ consorsOrderId }),
        },
      );
      const data = await response.json();

      if (data.complete) {
        if (job) job.cancel();
        scheduledJobs.delete(consorsOrderId);
        console.log(`Job completed ConsorsOrderId ${consorsOrderId}`);
      }
    } catch (error) {
      console.error("Failed to call API:", error);
    }
  }

  // Schedule the function to run after 2 hours and 30 minutes
  const delay = 2.5 * 60 * 60 * 1000; // 2 hours and 30 minutes in milliseconds
  // const delay = 5 * 60 * 1000; // 5 minutos

  const startJob = () => {
    job = schedule.scheduleJob(new Date(Date.now() + delay), performCheck);
    scheduledJobs.set(consorsOrderId, job);
  };

  startJob();

  return {
    cancel: () => {
      if (job) {
        job.cancel();
        scheduledJobs.delete(consorsOrderId);
        console.log(
          `Scheduled task for consorsOrderId ${consorsOrderId} has been canceled.`,
        );
      }
    },
  };
}

export function getScheduledJob(consorsOrderId) {
  return scheduledJobs.get(consorsOrderId);
}
