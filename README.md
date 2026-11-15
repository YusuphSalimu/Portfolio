# Yusuph Salimu Portfolio

Multilingual portfolio for Yusuph Salimu, a software engineer building web platforms, business websites, and backend systems.

Live site: [https://yusuph-portfolio.vercel.app](https://yusuph-portfolio.vercel.app)

<!-- TODO: Replace this social preview with a final approved screenshot when available. -->
![Portfolio preview](./public/images/social-preview.png)

## Tech stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Localization:** next-intl (English, Swahili, French)
- **Motion:** Motion
- **Testing:** Vitest
- **Icons:** [Lucide](https://lucide.dev/license) (ISC) and GitHub/LinkedIn brand marks from [Font Awesome Free](https://fontawesome.com/license/free) (CC BY 4.0). Icons are presented with theme colors and CSS depth; brand marks belong to their respective owners.
- **Content:** MDX-powered project content
- **Analytics:** Vercel Analytics and Speed Insights

## Getting started

```bash
npm install
npm run dev
npm run build
```

For the contact form, copy `.env.example` to `.env.local` and configure `RESEND_API_KEY`. The recipient defaults to `yusuphsaalim@gmail.com`; use `CONTACT_TO` to override it. Set `CONTACT_FROM` to a sender on a domain verified in Resend for production delivery. The fallback `onboarding@resend.dev` can only send to the email address associated with your Resend account.

In Vercel, configure these variables for the **Production** environment of this project, then redeploy. Connecting the Resend integration or changing environment variables does not update an already deployed build. Never prefix the API key with `NEXT_PUBLIC_`.

If sending fails, check the `/api/contact` response and Vercel function logs. `EMAIL_NOT_CONFIGURED` means the key is missing or the recipient is invalid. `EMAIL_PROVIDER_REJECTED` means Resend rejected the request; server logs distinguish a restricted test sender, an unverified domain, and a rejected API key. `EMAIL_PROVIDER_UNAVAILABLE` indicates a failed provider request. For a successful API response with no inbox arrival, check the email's delivery status in Resend and the recipient's spam folder. See [Resend's test-sender restrictions](https://resend.com/docs/knowledge-base/403-error-resend-dev-domain).

## Adding a project

See [docs/ADDING-A-PROJECT.md](./docs/ADDING-A-PROJECT.md) for the guided workflow for adding a new case study.

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE).
