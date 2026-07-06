const dns = require("node:dns");

dns.resolveSrv("_mongodb._tcp.cluster0.btfmuur.mongodb.net", (err, records) => {
  console.log("Error:");
  console.log(err);

  console.log("Records:");
  console.log(records);
});