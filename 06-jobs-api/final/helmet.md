### How Helmet Works

Helmet sets headers such as:

- **Content Security Policy (CSP)** : Helps prevent cross-site scripting (XSS), clickjacking, and other code injection attacks resulting from execution of malicious content in the trusted web page context.
- **X-Download-Options** : Prevents Internet Explorer from executing downloads in your site’s context.
- **X-Content-Type-Options** : Prevents browsers from trying to guess (“sniff”) the MIME types, which can have security implications.
- **X-Frame-Options** : Provides clickjacking protection by ensuring that the content is not embedded into other sites.
- **X-XSS-Protection** : Enables the Cross-site scripting (XSS) filter built into most recent web browsers.
- **Strict-Transport-Security** : Enforces secure (HTTP over SSL/TLS) connections to the server.
- **Referrer-Policy** : Governs which referrer information, sent in the Referer header, should be included with requests made.

app.use(helmet({
contentSecurityPolicy: {
directives: {
defaultSrc: ["'self'"], // Only allow scripts from the current domain
scriptSrc: ["'self'", 'https://trustedscripts.example.com'], // Allow scripts from these origins
objectSrc: ["'none'"], // Don't allow plugins (like Flash)
upgradeInsecureRequests: [], // Upgrade insecure requests to HTTPS
},
},
frameguard: {
action: 'deny'// Do not allow this site to be framed
}
}));

- `defaultSrc` restricts the sources for all content not covered by other directives.
- `scriptSrc` specifies where scripts can be loaded from, including a trusted external domain.
- `objectSrc` disallows all plugins.
- `frameguard` is set to deny to prevent clickjacking by ensuring the site cannot be put in a `<frame>`, `<iframe>`, `<embed>`, or `<object>`.
