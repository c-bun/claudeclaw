import { backupSession } from "../sessions";
import { checkExistingDaemon } from "../pid";

export async function clear() {
  const backup = await backupSession();

  if (backup) {
    console.log(`Session backed up → ${backup}`);
  } else {
    console.log("No active session to back up.");
  }

  const pid = await checkExistingDaemon();
  if (pid) {
    process.kill(pid, "SIGUSR1");
    console.log("Session cleared. Daemon will bootstrap fresh context on next run.");
  } else {
    console.log("No daemon running. Next start will create a new session.");
  }

  process.exit(0);
}
