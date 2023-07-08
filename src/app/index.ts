// Module imports
import express from 'express';

// Web server configuration
const web = {
    port: 4242,
    server: express()
};

// Directory to serve static content from
web.server.use(express.static("./dist/public"));

// Start the web server
web.server.listen(web.port, () => {
    console.log(`Your website is listening on port ${web.port}...`);
});