import { exec } from "child_process";

export async function installNextcloud(vps) {
  const cmd = `
    docker exec -it ${vps.containerName} bash -c "
    curl -Lo nextcloud.sh https://raw.githubusercontent.com/LORD-OBITO-DEV/blackhatvps-scripts/main/nextcloud-install.sh &&
    bash nextcloud.sh
    "
  `;
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) return reject(err);
      resolve(stdout);
    });
  });
}
