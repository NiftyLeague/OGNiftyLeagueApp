const watch = require("node-watch");
const { exec } = require("child_process");
const { config } = require("hardhat");

const run = () => {
  console.log("🛠  Compiling & Deploying...");
  exec("yarn deploy", function (error, stdout, stderr) {
    console.log(stdout);
    if (error) console.log(error);
    if (stderr) console.log(stderr);
  });
};

console.log("🔬 Watching Contracts...");
const targetNetwork = process.env.HARDHAT_NETWORK || config.defaultNetwork;
watch(`./contracts/${targetNetwork}`, { recursive: true }, function (evt, name) {
  console.log("%s changed.", name);
  run();
});
run();
