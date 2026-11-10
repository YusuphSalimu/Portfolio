# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: responsive.spec.ts >> 768px viewport >> /fr has no horizontal overflow and shows its heading
- Location: tests\e2e\responsive.spec.ts:17:7

# Error details

```
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 768
Received:    774
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - link "Aller au contenu principal" [ref=e3] [cursor=pointer]:
      - /url: "#main-content"
    - banner [ref=e4]:
      - generic [ref=e5]:
        - link "Yusuph Salimu home" [ref=e6] [cursor=pointer]:
          - /url: /fr
          - generic [aria-hidden] [ref=e7]: ">_"
          - generic [ref=e8]: yusuph.dev
        - navigation "Main navigation" [ref=e9]:
          - link "À propos" [ref=e10] [cursor=pointer]:
            - /url: "#about"
          - link "Compétences" [ref=e11] [cursor=pointer]:
            - /url: "#skills"
          - link "Projets" [ref=e12] [cursor=pointer]:
            - /url: "#projects"
          - link "Expérience" [ref=e13] [cursor=pointer]:
            - /url: "#experience"
          - link "Contact" [ref=e14] [cursor=pointer]:
            - /url: "#contact"
        - generic [ref=e15]:
          - generic [ref=e16]:
            - generic [ref=e17]: Langue
            - combobox "Langue" [ref=e18]:
              - option "EN"
              - option "SW"
              - option "FR" [selected]
          - button "Basculer entre les thèmes clair et sombre" [ref=e19] [cursor=pointer]: ☼
          - link "Me contacter" [ref=e20] [cursor=pointer]:
            - /url: "#contact"
    - button "Navigation rapide" [ref=e21] [cursor=pointer]:
      - generic [aria-hidden] [ref=e22]: ⌘K
    - main [ref=e24]:
      - region "Bonjour, je suis Yusuph Salimu." [ref=e25]:
        - generic [ref=e26]:
          - generic [ref=e27]:
            - paragraph [ref=e28]: Disponible pour du travail freelance et à distance
            - heading "Bonjour, je suis Yusuph Salimu." [level=1] [ref=e30]
            - paragraph [ref=e31]: Ingénieur logiciel créant des plateformes web, des sites d'entreprise et des systèmes backend, avec de la data et du machine learning si nécessaire, pour des clients en Tanzanie et dans le monde entier.
            - generic [ref=e32]:
              - link "Voir mes projets" [ref=e33] [cursor=pointer]:
                - /url: "#projects"
                - text: Voir mes projets
                - generic [aria-hidden] [ref=e34]: →
              - link "Travaillons ensemble" [ref=e35] [cursor=pointer]:
                - /url: "#contact"
              - link "Télécharger le CV" [ref=e36] [cursor=pointer]:
                - /url: /cv/Yusuph_Salimu_CV.pdf
                - text: Télécharger le CV
                - generic [aria-hidden] [ref=e37]: ↓
          - generic [ref=e38]:
            - generic [ref=e43]: yusuph@portfolio
            - generic [ref=e44]:
              - generic [ref=e45]:
                - term [ref=e46]: $ whoami
                - definition [ref=e47]: Yusuph Salimu
              - generic [ref=e48]:
                - term [ref=e49]: $ location
                - definition [ref=e50]: Dodoma, Tanzanie
              - generic [ref=e51]:
                - term [ref=e52]: $ status
                - definition [ref=e53]: ouvert aux opportunités freelance et à distance
              - generic [ref=e54]:
                - term [ref=e55]: $ stack
                - definition [ref=e56]: TypeScript · Next.js · Django
      - generic "At a glance" [ref=e57]:
        - generic [ref=e58]: 3 sites clients en ligne
        - generic [ref=e60]: 3 langues de site (EN · SW · FR)
        - generic [ref=e62]: Dodoma, Tanzanie
        - generic [ref=e64]: Prêt pour le travail à distance
      - region "À propos de moi" [ref=e66]:
        - generic [ref=e67]:
          - img "Portrait of Yusuph Salimu" [ref=e69]
          - generic [ref=e70]:
            - paragraph [ref=e71]: 01 / À propos
            - heading "À propos de moi" [level=2] [ref=e72]
            - paragraph [ref=e73]: Je suis étudiant en génie logiciel à l'Université de Dodoma et je vis à Dodoma, en Tanzanie. Je crée des sites web et des plateformes pour des clients, en prenant en charge les besoins, la planification, la mise en œuvre, les tests, le lancement et la configuration du déploiement. Je travaille également sur le nettoyage des données et la modélisation prédictive.
            - paragraph [ref=e74]: ⌖ Dodoma, Tanzania
      - region [ref=e75]:
        - generic [ref=e76]:
          - generic [ref=e77]:
            - paragraph [ref=e78]: 02 / Services
            - heading "Services" [level=2] [ref=e79]
          - generic [ref=e80]:
            - article [ref=e82]:
              - generic [aria-hidden] [ref=e83]: ◫
              - heading "Sites Web d'Entreprise & Catalogues" [level=3] [ref=e84]
              - paragraph [ref=e85]: Sites web et catalogues d'entreprise adaptatifs, y compris des sites qui tiennent compte du SEO.
            - article [ref=e87]:
              - generic [aria-hidden] [ref=e88]: ◈
              - heading "Plateformes Web & Authentification" [level=3] [ref=e89]
              - paragraph [ref=e90]: Plateformes web avec authentification, conçues selon les besoins de chaque projet.
            - article [ref=e92]:
              - generic [aria-hidden] [ref=e93]: ⌘
              - heading "APIs Backend & SaaS" [level=3] [ref=e94]
              - paragraph [ref=e95]: Développement d'API backend et SaaS avec les outils adaptés à chaque projet.
            - article [ref=e97]:
              - generic [aria-hidden] [ref=e98]: ⌁
              - heading "Data & Machine Learning" [level=3] [ref=e99]
              - paragraph [ref=e100]: Nettoyage des données et modèles de machine learning avec les outils de données Python.
          - paragraph [ref=e101]: Hébergement, déploiement, DNS et configuration SSL inclus.
      - region [ref=e102]:
        - generic [ref=e103]:
          - generic [ref=e104]:
            - paragraph [ref=e105]: 03 / Processus
            - heading "Processus" [level=2] [ref=e106]
          - generic [ref=e107]:
            - article [ref=e108]:
              - generic [ref=e109]: "01"
              - heading "Découverte" [level=3] [ref=e110]
              - paragraph [ref=e111]: Nous discutons des besoins et planifions le travail selon les objectifs du projet.
            - article [ref=e112]:
              - generic [ref=e113]: "02"
              - heading "Développement" [level=3] [ref=e114]
              - paragraph [ref=e115]: Je mets en œuvre la solution convenue et teste ses principaux parcours.
            - article [ref=e116]:
              - generic [ref=e117]: "03"
              - heading "Lancement" [level=3] [ref=e118]
              - paragraph [ref=e119]: Je lance le projet et aide à configurer l'hébergement, le domaine, le DNS et SSL.
            - article [ref=e120]:
              - generic [ref=e121]: "04"
              - heading "Support" [level=3] [ref=e122]
              - paragraph [ref=e123]: Nous discutons des changements après le lancement ou des prochaines étapes.
      - region [ref=e124]:
        - generic [ref=e125]:
          - generic [ref=e126]:
            - paragraph [ref=e127]: 04 / Projets
            - heading "Projets" [level=2] [ref=e128]
            - paragraph [ref=e129]: Des projets de produit, d'ingénierie et de données conçus pour résoudre des problèmes concrets.
          - generic [ref=e131]:
            - article [ref=e133]:
              - generic [ref=e134]:
                - img "Zantan Company website homepage" [ref=e135]
                - generic [ref=e137]: Live
                - generic [ref=e140]: Zantan
              - generic [ref=e141]:
                - generic [ref=e142]: Web
                - heading [level=2] [ref=e143]:
                  - link "Zantan Company Website" [ref=e144] [cursor=pointer]:
                    - /url: /fr/projects/zantan-company
                - paragraph [ref=e145]: Client project
                - paragraph [ref=e146]: Laboratory and scientific-equipment website with structured product categories, search-friendly content, and assistant-guided product enquiries with quotation drafting.
                - paragraph [ref=e147]: "Software Engineer: requirements to launch"
                - list "Technology stack" [ref=e148]:
                  - listitem [ref=e149]: Next.js
                  - listitem [ref=e150]: Headless WordPress
                  - listitem [ref=e151]: WooCommerce
                  - listitem [ref=e152]: "+2"
                - generic [ref=e153]:
                  - link "View case study" [ref=e154] [cursor=pointer]:
                    - /url: /fr/projects/zantan-company
                    - text: View case study
                    - generic [aria-hidden] [ref=e155]: →
                  - link "Visit site" [ref=e156] [cursor=pointer]:
                    - /url: https://zantan.co.tz
                    - text: Visit site
                    - generic [aria-hidden] [ref=e157]: ↗
            - article [ref=e159]:
              - generic [ref=e160]:
                - img "Zantan Mining Platform homepage" [ref=e161]
                - generic [ref=e163]: Live
                - generic [ref=e166]: Zantan
              - generic [ref=e167]:
                - generic [ref=e168]: Web
                - heading [level=2] [ref=e169]:
                  - link "Zantan Mining Platform" [ref=e170] [cursor=pointer]:
                    - /url: /fr/projects/zantan-mining
                - paragraph [ref=e171]: Client project
                - paragraph [ref=e172]: Web platform for Tanzanian mining opportunities, mineral sourcing, and investment enquiries, with English, Kiswahili, French, and Chinese interfaces.
                - paragraph [ref=e173]: "Software Engineer: web platform and authentication"
                - list "Technology stack" [ref=e174]:
                  - listitem [ref=e175]: Next.js
                  - listitem [ref=e176]: TypeScript
                  - listitem [ref=e177]: Authentication
                  - listitem [ref=e178]: "+1"
                - generic [ref=e179]:
                  - link "View case study" [ref=e180] [cursor=pointer]:
                    - /url: /fr/projects/zantan-mining
                    - text: View case study
                    - generic [aria-hidden] [ref=e181]: →
                  - link "Visit site" [ref=e182] [cursor=pointer]:
                    - /url: https://zantanmining.co.tz
                    - text: Visit site
                    - generic [aria-hidden] [ref=e183]: ↗
            - article [ref=e185]:
              - generic [ref=e186]:
                - img "Ayaven Kids Events Hub homepage" [ref=e187]
                - generic [ref=e189]: Live
                - generic [ref=e192]: Ayaven Kids
              - generic [ref=e193]:
                - generic [ref=e194]: Web
                - heading [level=2] [ref=e195]:
                  - link "Ayaven Kids Events Hub" [ref=e196] [cursor=pointer]:
                    - /url: /fr/projects/ayaven-kids
                - paragraph [ref=e197]: Client project
                - paragraph [ref=e198]: Bilingual toy-rental and event-equipment website with product listings, age and category filters, and rental prices.
                - paragraph [ref=e199]: "Software Engineer: bilingual website and product pages"
                - list "Technology stack" [ref=e200]:
                  - listitem [ref=e201]: Django
                  - listitem [ref=e202]: Python
                  - listitem [ref=e203]: HTML
                  - listitem [ref=e204]: "+1"
                - generic [ref=e205]:
                  - link "View case study" [ref=e206] [cursor=pointer]:
                    - /url: /fr/projects/ayaven-kids
                    - text: View case study
                    - generic [aria-hidden] [ref=e207]: →
                  - link "Visit site" [ref=e208] [cursor=pointer]:
                    - /url: https://ayavenkids.co.tz
                    - text: Visit site
                    - generic [aria-hidden] [ref=e209]: ↗
            - article [ref=e211]:
              - generic [ref=e212]:
                - img "Hardware Stores project cover image" [ref=e213]
                - generic [ref=e215]: Live
              - generic [ref=e218]:
                - generic [ref=e219]: Web
                - heading [level=2] [ref=e220]:
                  - link "Hardware Stores" [ref=e221] [cursor=pointer]:
                    - /url: /fr/projects/hardware-stores
                - paragraph [ref=e222]: Own project
                - paragraph [ref=e223]: Industrial hardware e-commerce and catalog platform for Tanzania's infrastructure sector, with mobile-first design and fast loading on mobile networks.
                - paragraph [ref=e224]: Project developer
                - list "Technology stack" [ref=e225]:
                  - listitem [ref=e226]: React
                  - listitem [ref=e227]: Tailwind CSS
                  - listitem [ref=e228]: Vercel
                - generic [ref=e229]:
                  - link "View case study" [ref=e230] [cursor=pointer]:
                    - /url: /fr/projects/hardware-stores
                    - text: View case study
                    - generic [aria-hidden] [ref=e231]: →
                  - link "Visit site" [ref=e232] [cursor=pointer]:
                    - /url: https://mariwahardwaredodoma.vercel.app/
                    - text: Visit site
                    - generic [aria-hidden] [ref=e233]: ↗
          - link "Voir tous les projets" [ref=e235] [cursor=pointer]:
            - /url: /fr/projects
            - text: Voir tous les projets
            - generic [aria-hidden] [ref=e236]: →
      - region [ref=e237]:
        - generic [ref=e238]:
          - generic [ref=e239]:
            - paragraph [ref=e240]: 05 / Expérience & Éducation
            - heading "Expérience & Éducation" [level=2] [ref=e241]
          - generic [ref=e242]:
            - article [ref=e243]:
              - generic [ref=e245]:
                - generic [ref=e246]: Sep 2026 – Présent
                - generic [ref=e247]: À distance / Tanzanie
              - heading "Ingénieur Logiciel" [level=3] [ref=e248]
              - heading "Projets Clients Indépendants" [level=4] [ref=e249]
              - paragraph [ref=e250]: Livraison de trois sites web d'entreprise en production pour des clients. Gestion des discussions sur les exigences, de la planification, de la mise en œuvre, des tests et du lancement. Gestion des dépôts GitHub et des déploiements en ligne, y compris la configuration de l'hébergement et le dépannage.
            - article [ref=e251]:
              - generic [ref=e253]:
                - generic [ref=e254]: Oct 2023 – Jul 2027 (prévu)
                - generic [ref=e255]: Dodoma, Tanzanie
              - heading "BSc Inginierie Logicielle" [level=3] [ref=e256]
              - heading "Université de Dodoma" [level=4] [ref=e257]
              - paragraph [ref=e258]: Sélectionné pour la formation Huawei ICT Academy en cloud computing et IA.
      - region [ref=e259]:
        - generic [ref=e260]:
          - generic [ref=e261]:
            - paragraph [ref=e262]: 06 / Compétences & Technologies
            - heading "Compétences & Technologies" [level=2] [ref=e263]
          - generic [ref=e264]:
            - article [ref=e265]:
              - heading "Frontend" [level=3] [ref=e266]
              - list [ref=e267]:
                - listitem [ref=e268]: TypeScript
                - listitem [ref=e269]: JavaScript
                - listitem [ref=e270]: HTML5
                - listitem [ref=e271]: CSS3
                - listitem [ref=e272]: Next.js
                - listitem [ref=e273]: React
                - listitem [ref=e274]: Angular
            - article [ref=e275]:
              - heading "Backend" [level=3] [ref=e276]
              - list [ref=e277]:
                - listitem [ref=e278]: Python
                - listitem [ref=e279]: Java
                - listitem [ref=e280]: C++
                - listitem [ref=e281]: SQL
                - listitem [ref=e282]: Django
                - listitem [ref=e283]: Node.js
                - listitem [ref=e284]: Express.js
                - listitem [ref=e285]: Spring Boot
                - listitem [ref=e286]: REST APIs
                - listitem [ref=e287]: Celery
            - article [ref=e288]:
              - heading "Data & ML" [level=3] [ref=e289]
              - list [ref=e290]:
                - listitem [ref=e291]: Pandas
                - listitem [ref=e292]: NumPy
                - listitem [ref=e293]: scikit-learn
                - listitem [ref=e294]: Jupyter Notebook
                - listitem [ref=e295]: Data cleaning
                - listitem [ref=e296]: Predictive modeling
            - article [ref=e297]:
              - heading "Bases de données" [level=3] [ref=e298]
              - list [ref=e299]:
                - listitem [ref=e300]: PostgreSQL
                - listitem [ref=e301]: MySQL
                - listitem [ref=e302]: MongoDB
                - listitem [ref=e303]: Supabase
                - listitem [ref=e304]: Redis
            - article [ref=e305]:
              - heading "DevOps & Outils" [level=3] [ref=e306]
              - list [ref=e307]:
                - listitem [ref=e308]: Git
                - listitem [ref=e309]: GitHub
                - listitem [ref=e310]: GitHub Actions
                - listitem [ref=e311]: CI/CD workflows
                - listitem [ref=e312]: DNS/SSL configuration
                - listitem [ref=e313]: VS Code
            - article [ref=e314]:
              - heading "Web & Commerce" [level=3] [ref=e315]
              - list [ref=e316]:
                - listitem [ref=e317]: Headless WordPress
                - listitem [ref=e318]: WooCommerce integrations
                - listitem [ref=e319]: SEO-conscious websites
      - region [ref=e320]:
        - generic [ref=e321]:
          - generic [ref=e322]:
            - paragraph [ref=e323]: 07 / Certificats & Langues
            - heading "Certificats & Langues" [level=2] [ref=e324]
          - generic [ref=e325]:
            - generic [ref=e326]:
              - heading "Certificats" [level=3] [ref=e327]
              - list [ref=e328]:
                - listitem [ref=e329]: Python Django 101 (Simplilearn SkillUp, Aug 2026)
                - listitem [ref=e330]: Fundamentals of AI (Coursera, 2026)
                - listitem [ref=e331]: AI Brainstorming Ideas (Coursera, 2026)
            - generic [ref=e332]:
              - heading "Langues" [level=3] [ref=e333]
              - list [ref=e334]:
                - listitem [ref=e335]:
                  - strong [ref=e336]: Swahili
                  - generic [ref=e337]: Bilingue
                - listitem [ref=e338]:
                  - strong [ref=e339]: Anglais
                  - generic [ref=e340]: Professionnel
                - listitem [ref=e341]:
                  - strong [ref=e342]: Arabe
                  - generic [ref=e343]: Conversationnel
      - region [ref=e344]:
        - generic [ref=e345]:
          - generic [ref=e346]:
            - paragraph [ref=e347]: 08 / Contact
            - heading "Travaillons ensemble." [level=2] [ref=e348]
            - paragraph [ref=e349]: Vous avez un projet en tête ou souhaitez discuter d'une opportunité ? N'hésitez pas à me contacter.
          - generic [ref=e350]:
            - generic [ref=e351]:
              - link "Email yusuphsaalim@gmail.com" [ref=e352] [cursor=pointer]:
                - /url: mailto:yusuphsaalim@gmail.com
                - generic [aria-hidden] [ref=e353]: ✉
                - generic [ref=e354]:
                  - generic [ref=e355]: Email
                  - strong [ref=e356]: yusuphsaalim@gmail.com
                - generic [aria-hidden] [ref=e357]: ↗
              - link "Phone +255 716 474 311" [ref=e358] [cursor=pointer]:
                - /url: tel:+255716474311
                - generic [aria-hidden] [ref=e359]: ↗
                - generic [ref=e360]:
                  - generic [ref=e361]: Phone
                  - strong [ref=e362]: +255 716 474 311
                - generic [aria-hidden] [ref=e363]: ↗
              - link "LinkedIn Connect on LinkedIn" [ref=e364] [cursor=pointer]:
                - /url: https://www.linkedin.com/in/yusuph-salimu-7818333aa/
                - generic [aria-hidden] [ref=e365]: in
                - generic [ref=e366]:
                  - generic [ref=e367]: LinkedIn
                  - strong [ref=e368]: Connect on LinkedIn
                - generic [aria-hidden] [ref=e369]: ↗
              - link "GitHub YusuphSalimu" [ref=e370] [cursor=pointer]:
                - /url: https://github.com/YusuphSalimu
                - generic [aria-hidden] [ref=e371]: ⌘
                - generic [ref=e372]:
                  - generic [ref=e373]: GitHub
                  - strong [ref=e374]: YusuphSalimu
                - generic [aria-hidden] [ref=e375]: ↗
            - generic [ref=e376]:
              - generic [ref=e377]:
                - generic [ref=e378]:
                  - text: Votre nom
                  - textbox "Votre nom" [ref=e379]
                - generic [ref=e380]:
                  - text: Votre e-mail
                  - textbox "Votre e-mail" [ref=e381]
                - generic [ref=e382]:
                  - text: Type de projet
                  - combobox "Type de projet" [ref=e383]:
                    - option "Choisissez un type de projet" [disabled] [selected]
                    - option "Site web"
                    - option "Plateforme web"
                    - option "Backend / SaaS"
                    - option "Data / ML"
                    - option "Autre"
                - generic [ref=e384]:
                  - text: Budget (optionnel)
                  - textbox "Budget (optionnel)" [ref=e385]
              - generic [ref=e386]:
                - text: Message
                - textbox "Message" [ref=e387]
              - generic [aria-hidden] [ref=e388]:
                - text: Leave this field empty
                - textbox [ref=e389]
              - button "Envoyer le message" [ref=e390]
    - contentinfo [ref=e391]:
      - generic [ref=e392]:
        - generic [ref=e393]:
          - link "Yusuph Salimu home" [ref=e394] [cursor=pointer]:
            - /url: /
            - generic [aria-hidden] [ref=e395]: ">_"
            - generic [ref=e396]: yusuph.dev
          - paragraph [ref=e397]: Ingénieur logiciel créant des plateformes web, des sites d'entreprise et des systèmes backend.
        - navigation "Social links" [ref=e398]:
          - link "LinkedIn profile" [ref=e399] [cursor=pointer]:
            - /url: https://www.linkedin.com/in/yusuph-salimu-7818333aa/
          - link "GitHub profile" [ref=e402] [cursor=pointer]:
            - /url: https://github.com/YusuphSalimu
          - link "Send email" [ref=e405] [cursor=pointer]:
            - /url: mailto:yusuphsaalim@gmail.com
        - generic [ref=e408]: © 2026 Yusuph Salimu. Tous droits réservés.
  - alert [ref=e409]
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | const routes = [
  4  |   "/en",
  5  |   "/sw",
  6  |   "/fr",
  7  |   "/en/projects",
  8  |   "/en/projects/hardware-stores",
  9  | ];
  10 | const widths = [375, 390, 768, 1280];
  11 | 
  12 | for (const width of widths) {
  13 |   test.describe(`${width}px viewport`, () => {
  14 |     test.use({ viewport: { width, height: 900 } });
  15 | 
  16 |     for (const route of routes) {
  17 |       test(`${route} has no horizontal overflow and shows its heading`, async ({ page }) => {
  18 |         const response = await page.goto(route);
  19 |         expect(response?.status()).toBe(200);
  20 |         await expect(page.locator("h1").first()).toBeVisible();
  21 |         const dimensions = await page.evaluate(() => ({
  22 |           documentWidth: document.documentElement.scrollWidth,
  23 |           viewportWidth: window.innerWidth,
  24 |         }));
> 25 |         expect(dimensions.documentWidth).toBeLessThanOrEqual(dimensions.viewportWidth);
     |                                          ^ Error: expect(received).toBeLessThanOrEqual(expected)
  26 |       });
  27 |     }
  28 |   });
  29 | }
  30 | 
```