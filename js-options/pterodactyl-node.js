import { exec } from "child_process";

export async function installPterodactylNode(vps) {
  const cmd = `
    docker exec -it ${vps.containerName} bash -c "
    curl -Lo node.sh https://raw.githubusercontent.com/LORD-OBITO-DEV/blackhatvps-scripts/main/pterodactyl-node.sh &&
    bash node.sh
    "
  `;
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) return reject(err);
      resolve(stdout);
    });
  });
}
