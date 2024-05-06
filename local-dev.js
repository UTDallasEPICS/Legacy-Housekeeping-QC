// Run next dev with custom port and hostname
// Usage: npm run local-dev

// Get port and hostname from url
const url = new URL(process.env.NEXTAUTH_URL || "http://localhost:3000");
const port = url.port;
const hostname = url.hostname;

const cli = require("next/dist/cli/next-dev").nextDev;
cli({ "--port": port, "--hostname": hostname, _: [] });
