THE CONSTRUCTION ADVICE CO. — NETLIFY READY SITE

FASTEST WAY TO PUBLISH
1. Unzip construction-advice-netlify.zip.
2. Create/sign in to Netlify.
3. Open Netlify Drop / manual deploy.
4. Drag the ENTIRE folder named construction-advice-netlify into Netlify.
5. Netlify will give you a temporary .netlify.app address.
6. Test the site and forms.
7. Connect ConstructionAdviceCo.com from Porkbun after you approve the site.

FORMS
The free Ask the Builder, Quick Second Opinion upload, and contact request are already marked up for Netlify Forms.
After deployment, make sure form detection is enabled in your Netlify project.
The Quick Review intake includes 3 separate file upload fields because Netlify supports one file per upload field. Netlify currently limits the total form request to 8 MB, so test your client workflow before launch.

PAYMENTS / SCHEDULING
Open assets/site-config.js and paste your live URLs into:
- stripeQuickReview
- stripeConstructionSecondOpinion
- stripeBidScopeReview
- scheduleStrategySession
- scheduleSiteWalk
- ownerAdvisorApply

Until those URLs are added, buttons fall back to the relevant on-site intake/contact page.

BUSINESS EMAIL
Current site email: help@constructionadviceco.com
Change it in the HTML files if you prefer a different address.

IMPORTANT
Before accepting paid customers, have your service terms, disclaimers, privacy policy, refund/cancellation policy, and consulting agreement reviewed for your business and jurisdiction.

ADMIN CONTENT MANAGER
---------------------
This version includes /admin/ using Decap CMS plus editable content in content/site.json.
Read ADMIN-SETUP.txt for the one-time GitHub + Netlify OAuth setup. After setup, content and pricing changes can be published from a browser without editing HTML.
