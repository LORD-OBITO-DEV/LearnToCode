import { exec } from "child_process";

export async function installPterodactyl(vps) {
  const cmd = `
    docker exec -it ${vps.containerName} bash -c "
    curl -Lo panel.sh https://raw.githubusercontent.com/<ton_user>/blackhatvps-scripts/main/pterodactyl-install.sh &&
    bash panel.sh
    "
  `;
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) return reject(err);
      resolve(stdout);
    });
  });
}
