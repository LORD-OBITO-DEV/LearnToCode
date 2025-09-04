import { exec } from "child_process";

export async function installWireguard(vps) {
  const cmd = `
    docker exec -it ${vps.containerName} bash -c "
    curl -Lo wireguard.sh https://raw.githubusercontent.com/<ton_user>/blackhatvps-scripts/main/wireguard-install.sh &&
    bash wireguard.sh
    "
  `;
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) return reject(err);
      resolve(stdout);
    });
  });
}
