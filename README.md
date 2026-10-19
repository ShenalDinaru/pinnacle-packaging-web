# Pinnacle Packaging website

Static website for Pinnacle Packaging (Pvt) Ltd. It uses plain HTML, CSS, and JavaScript; no framework, package installation, or build command is required.

## Deploy to Cloudflare Pages

1. Push this repository to GitHub or GitLab.
2. In the Cloudflare dashboard, go to **Workers & Pages → Create application → Pages → Connect to Git** and select the repository.
3. Configure the deployment with **Framework preset: None**, no build command, and **Build output directory: `.`** (the repository root).
4. Deploy. Cloudflare Pages will serve `index.html` at the site root and provide a `pages.dev` address.
5. To use a custom domain, open the Pages project and add it under **Custom domains**.

The product catalogue loads from the root-level `products.json`. Keep that file and the `Assets/` directory in the repository when deploying. The contact form uses EmailJS, which must be configured separately in `Contact_Script.js` and with the EmailJS service/template settings.

## Main pages

- `index.html` — home page and default Pages entry point
- `About.html` — company information and certificates
- `Product.html` — product catalogue
- `Contact.html` — contact form and contact details