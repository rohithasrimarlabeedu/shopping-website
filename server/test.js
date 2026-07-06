const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

console.log("Servers:", dns.getServers());

dns.resolve4("google.com", (err, addresses) => {
  console.log("Error:", err);
  console.log("Addresses:", addresses);
});