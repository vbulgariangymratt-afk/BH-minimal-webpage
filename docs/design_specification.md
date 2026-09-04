# Backbone Website — Design Specification

- 2.1 Hero / First Impression, first part of webpage
    
    ## 2.1 Hero / First Impression
    
    The website receives traffic primarily from my social media. Visitors already know that Backbone is for ADHD founders/entrepreneurs and are already familiar with the problems it is designed around.
    
    Do not spend the opening of the website educating visitors about ADHD or convincing them that ADHD causes difficulties. Continue the conversation established by the social media content.
    
    ### First thing the visitor sees
    
    The hero/header should be a 30-second video of me addressing the main objections people may have about using Backbone. include a little thing that shows the duration of the video file when I upload it, dont hard code a random duration
    
    The video is the primary hero element. It should not be surrounded by a large amount of marketing copy, it should have almost nothing behind it
    
    Below the video, display the simple tagline: **Prosthetic brain for ADHD founders & entrepreneurs.**
    
    The tone should feel casual, direct, personal, and unforced.
    
    Do not make the hero feel like a conventional SaaS landing page.
    
    ### Important tone constraint
    
    The website should never feel performative or artificially "authentic."
    
    The audience has high pattern recognition and is likely to notice marketing language that feels manufactured.
    
    The copy should sound like something I would actually say. I will personally review and refine all customer-facing wording.
    
    Avoid generic SaaS marketing language, exaggerated claims, corporate language, and artificial startup branding.
    
    The overall impression should be:
    
    **A dude built something for himself, found that it helped, and is letting other people use it.**
    
    **Downloads:**
    
    Provide one Windows download button and one macOS download button directly below the hero video and tagline. Do not repeat download buttons throughout the page.
    
    The app can be downloaded before purchasing. Payment happens inside the application.
    
    > **Existing download functionality:**
    > 
    > 
    > The current website already retrieves the latest application release from GitHub, so the new website should **reuse the existing implementation/logic rather than recreate it from scratch**.
    > 
    > When rebuilding the website, inspect the current implementation and preserve this behavior.
    > 
    

**Payment flow:**

The website does not handle the purchase flow. Users download the application first and complete their purchase from inside the Backbone application. Lemon Squeezy handles payment processing, and the user's email is used to determine whether they are authorized to use the application.

- 2.2 Stuff our brains can't do for us but Backbone solves
    
    ## 2.2 Stuff our brains can't do for us but Backbone solves
    
    Create a section titled:
    
    **Stuff our brains can't do for us but Backbone solves**
    
    The purpose of this section is to clearly communicate the **real-life experiences and situations that Backbone is designed to solve for the user.**
    
    Do not describe Backbone's features here.
    
    Do not explain the neuroscience behind the problems.
    
    Do not use generic ADHD symptom descriptions.
    
    Instead, describe recognizable situations from the user's actual life.
    
    ### Content formula
    
    Each item should follow this structure:
    
    **Situation → Internal consequence → Emotional consequence**
    
    1. **Situation:** Describe something that actually happens to the user in concrete, everyday terms.
    2. **Internal consequence:** Explain what happens as a result — what the person's brain does, what they lose track of, what stops working, etc.
    3. **Emotional consequence:** Show the recognizable feeling or consequence that follows.
    
    The goal is for the reader to think:
    
    **"Holy shit, I do that."**
    
    The writing should feel casual, specific, and observational rather than clinical or promotional.
    
    The section should communicate **what Backbone solves through the experiences themselves**, rather than through a list of features or benefits.
    
    The actual experiences will be provided separately. Do not invent or add experiences without being given them, this is just a note for the developer, when asked, explain this 
    
- 2.3 conceptual statement
    
    ## 2.3 Conceptual Statement
    
    After the section describing the real-life problems Backbone solves, transition into a minimal standalone visual section.
    
    Display the following sentence centered on the page:
    
    **Backbone does for our brains what they can't do for us.**
    
    This should be treated as a visual statement rather than a content section.
    
    Keep it extremely minimal:
    
    - No paragraph underneath.
    - No feature explanation.
    - No additional marketing copy.
    - No product screenshots.
    - No diagrams.
    - Generous whitespace.
    - The statement should feel calm and intentional as the user scrolls into it.
    
    This is the conceptual bridge between the problems Backbone solves and the pricing section.
    
- 2.4 pricing
    
    ## 2.4 Pricing
    
    Keep the pricing section extremely simple.
    
    There is only **one subscription**:
    
    **$30 / 30 days**
    
    The subscription provides unlimited access to Backbone for the 30-day period.
    
    ### Pricing principles
    
    - There is only one subscription/tier.
    - Do not create multiple pricing tiers.
    - Do not gate features behind higher prices.
    - Everything is included in the single subscription.
    - Do not use fake discounts, urgency, countdowns, or other artificial sales tactics.
    - Do not use testimonials or fabricated social proof.
    - Do not list features to justify the price.
    - Keep the section visually minimal.
    
    ### Renewal
    
    The subscription does **not** automatically renew.
    
    After the 30-day period ends, the user decides whether they want to purchase another 30 days.
    
    This is intentionally designed to avoid accidental recurring charges / "ADHD tax."
    
    ### Pricing card
    
    The pricing card should communicate only the information necessary to make the purchase decision:
    
    - Backbone
    - $30 / 30 days
    - Unlimited access
    - No automatic renewal
    - One subscription / everything included
    - Purchase CTA
    
    The section should feel like a straightforward transaction, not a sales pitch.
    
    ### What you get
    
    Clearly communicate what the customer is purchasing without revealing Backbone's internal mechanics or implementation.
    
    Use a high-level description focused on the purpose of the product:
    
    **Access to Backbone for 30 days, including the complete system designed to compensate for the things your brain can't reliably do for you.**
    
    Do not provide a technical feature list or explain how Backbone works internally.
    
    The description must accurately represent what the customer receives, while avoiding unnecessary information that could expose proprietary implementation details to competitors.
    
    ### Purchase Flow
    
    Users can download Backbone before purchasing.
    
    The website should also provide a **Get Backbone / Purchase** CTA that launches the Lemon Squeezy checkout.
    
    The intended flow is:
    
    **Website → Download Backbone → Open Backbone → Enter/use email → Purchase through Lemon Squeezy → Payment confirmed → Backbone unlocks**
    
    The email used for the Lemon Squeezy purchase must match the email associated with the Backbone installation/account so the backend can determine whether that user is authorized.
    
    After successful payment, Lemon Squeezy's payment event should trigger the backend authorization process.
    
    The website should explain this flow briefly and clearly without adding unnecessary instructions.
    
    > Users can either:
    > 
    > - Download Backbone first and purchase from inside the app.
    > - Purchase from the website through Lemon Squeezy and then download the app.
    > 
    > Both paths should lead to the same authorization system.
    > 
    
    And that's the end of that decision.
    
- 2.5 Important Stuff
    
    ## 2.5 Important Stuff
    
    After the pricing section, include a short section containing important practical information about using Backbone.
    
    Do not format this as an FAQ.
    
    Do not hide information behind expandable questions, accordions, tabs, or other interactions.
    
    The information should be presented as a small number of clear, casual statements that the visitor can understand immediately.
    
    The purpose of this section is to answer any remaining practical concerns before purchase without making the user search for information.
    
    ### Content guidelines
    
    - Keep this section short.
    - Use statements rather than questions.
    - Only include information that is genuinely useful or important.
    - Do not repeat information that was already clearly explained in the 30-second video unless necessary for clarity.
    - Do not add generic FAQ questions simply because they are common on SaaS websites.
    - Do not turn this into another sales section.
    - Keep the wording casual and consistent with my personal voice.
    
    The specific statements for this section will be written separately.
    
    Remind the user to add the fact that they have to download, then pay, and backbone unlocks 
    
- 2.6 Footer
    
    The footer must provide clearly accessible links to Terms & Conditions, Privacy Policy, and Refund Policy, plus buyer support contact information (email and phone number). It should also identify the creator/business behind Backbone. The footer should remain visually minimal.
    
- 3.1 Seller identity
    
    **Seller / Owner:** Maximiliano Sors Garza
    
    **Role:** Owner, developer, and person responsible for Backbone
    
    **Business structure:** Individual / sole proprietor for now
    
    **Product:** Backbone
    
    **Brand name:** TBD — Backbone / Neurodivergence
    
    The website and legal documents should identify Maximiliano Sors Garza as the seller/owner of the product.
    
    Do not identify my mother as the owner or seller. She is not involved in developing, operating, or owning Backbone.
    
- 3.2 terms and conditions
    
    **Legal pages:**
    
    The website must include dedicated pages for Terms & Conditions, Privacy Policy, and Refund Policy, accessible from the footer.
    
    Do not invent or generate the legal content during implementation. The legal text will be provided separately and inserted into these pages.
    
    The pages should be designed consistently with the rest of the website while remaining easy to read.
    
    ### Intellectual Property & Misuse
    
    The Terms should establish that Maximiliano Sors Garza retains ownership of Backbone and its intellectual property, including the software, source/object code, original content, branding, and other proprietary materials.
    
    Users receive a limited right to use Backbone for its intended purpose during their access period.
    
    The Terms should prohibit users from copying, redistributing, reselling, sublicensing, repackaging, or commercially exploiting Backbone or its proprietary materials without permission.
    
    The Terms should **not** attempt to prohibit users from independently developing software, systems, workflows, or ideas that are similar to concepts they encounter while using Backbone.
    
    The Terms should also avoid unnecessarily restricting legitimate software-development, research, security, interoperability, or other activities that users may lawfully perform.
    
    Legal language should be drafted to protect the actual intellectual property of Backbone without attempting to claim ownership over general ideas, methods, or concepts.
    
    ### Service Availability & Data
    
    Backbone should not guarantee uninterrupted or error-free operation.
    
    If a technical problem caused by Backbone makes the application unusable, the user should be eligible for a refund for the affected subscription period.
    
    The Terms should explain that Backbone relies on third-party infrastructure and services for some functionality and that data availability cannot be guaranteed absolutely.
    
    Do not promise that user data can never be lost.
    
    Do not state that Backbone's responsibility for user data is automatically transferred to Supabase or another third-party provider.
    
    The final legal language should accurately define reasonable limitations of liability while preserving the refund commitment above.
    
    ### User-Deleted Data
    
    Users are responsible for data they intentionally or accidentally delete themselves.
    
    Backbone does not guarantee that user-deleted data can be recovered.
    
    The Terms should distinguish between:
    
    - **Data loss caused by Backbone or its infrastructure** → Backbone's responsibility, subject to the applicable limitations and refund policy.
    - **Data deleted or modified by the user** → the user's responsibility.
- 3.3 privacy policy
    
    **Data collected**
    
    Backbone collects information necessary to provide and improve the application's functionality, including:
    
    - Account/email information.
    - Tasks and activities entered into Backbone.
    - User habits and behavioral patterns.
    - Predicted enjoyment/satisfaction of activities.
    - Actual reported enjoyment/satisfaction of activities.
    - Performance and usage patterns generated through interaction with Backbone.
    - Sleep and wake times provided by the user.
    - Medication information provided by the user.
    - Information associated with the user's use of the application.
    
    Backbone may use this information for its pattern-recognition and other application functionality, including identifying patterns in the user's behavior and helping the user understand recurring patterns.
    
    **Purpose limitation:** This information is collected and used to provide and improve Backbone's functionality. It is not intended to be sold or shared with third parties for advertising or unrelated commercial purposes.
    
    **Storage / services currently used:**
    
    - Supabase — application/database infrastructure and data storage.
    - Lemon Squeezy — payment processing / Merchant of Record.
    - PostHog — analytics.
    - OAuth — authentication.
    
    Potential future integrations may include AI services and Google integrations. The Privacy Policy must be updated before introducing new data processing that is materially different from what users were previously told.
    
    **Privacy philosophy:**
    
    Clearly communicate that user data is not treated as a separate source of revenue. Backbone collects and processes user data because it is necessary for Backbone's functionality and improvement. The purpose is to make Backbone more useful to its users, which also directly benefits the creator.
    
    Do not use user data for advertising, sell it, or share it for unrelated commercial purposes, unless the privacy policy is updated and the user is appropriately informed/consents where required.
    
    Personal statement from developer: I have no interest in selling your data, using it for advertising, or finding unrelated ways to monetize it. The reason Backbone collects this information is to make Backbone better at helping you. Improving the system benefits you as a user and directly benefits me as the person building it.
    
- 3.4 refund policy
    
    **Refund policy**
    
    Refunds are not provided simply because a user changes their mind or decides they no longer want to use Backbone.
    
    If a technical problem caused by Backbone renders the application unusable for the user during their paid access period, the user is eligible for a refund.
    
    Backbone does not automatically renew subscriptions, so users will never be charged for another 30-day period without intentionally purchasing access again.
    
    The final refund policy should explain how users can request a refund and how those requests will be handled.
    
- 3.5 Contact & support information
    
    Provide clear ways for users to contact Maximiliano directly.
    
    - Use social media as the primary support/contact channel for now.
    - Link to the relevant social media accounts in the footer.
    - The support experience should feel personal rather than like a corporate customer-service department.
    - A dedicated support email may be added in the future.
    - If an automated support system is introduced later, update the Privacy Policy if it processes user communications or personal information.
- 4.1 Visual direction, overall
    
    **Overall visual direction**
    
    The website should be minimalist and visually restrained.
    
    It should feel loosely related to the visual language of Backbone itself, but **should not attempt to replicate the application's UI or become a showcase of the product interface.**
    
    The website should feel like a personal project created and maintained by one person rather than a conventional SaaS company.
    
    Avoid:
    
    - Generic SaaS landing-page aesthetics.
    - Excessive cards, gradients, badges, feature grids, or decorative UI.
    - Corporate/enterprise visual language.
    - Excessive animations or visual effects.
    
    Prioritize:
    
    - Large amounts of whitespace.
    - Strong typography.
    - Simple layouts.
    - Subtle interactions and transitions.
    - A sense of intentionality without looking overly designed.
    
    The attached Backbone application screenshot should be treated as **loose visual reference only**, not as a design template to copy.
    
- 4.2 hero - full screen video
    
    **Hero concept**
    
    The hero should be built around a full-screen video of Maximiliano speaking directly to the viewer.
    
    The video should occupy the entire initial viewport and act as the visual background/hero element.
    
    The goal is for the first screen to feel like the visitor has immediately walked into a conversation with the person who built Backbone, rather than landing on a conventional SaaS landing page.
    
    **Initial state — before scrolling:**
    
    - The video fills the entire viewport.
    - The video should feel natural and real rather than heavily produced or commercial.
    - The video should be the dominant visual element.
    - In the bottom-left corner, display:
    
    **Prosthetic brain for ADHD founders & entrepreneurs.**
    
    - Keep the surrounding UI extremely minimal.
    - Do not place a large navigation bar, logo, feature list, or other marketing elements over the video.
    
    **First scroll:**
    
    When the user begins scrolling, reveal the Windows and macOS download buttons underneath the tagline.
    
    The buttons should feel like part of the page rather than floating promotional elements.
    
    **Continued scrolling:**
    
    As the user continues scrolling, the hero video should move upward with the page, naturally transitioning the visitor into the rest of the website.
    
    The video should not remain permanently fixed to the screen.
    
    The transition should feel smooth and intentional, without excessive animation.
    
    **Responsive behavior:**
    
    The hero must work on both desktop and mobile. The video should be composed/cropped responsively so that Maximiliano remains clearly visible and the important visual content is not unintentionally cropped.
    
    **Overall principle:**
    
    The hero should feel like **a person showing you something they built**, not a company presenting a product.
    
    **`4.2.1 Typography`**
    
    Use **Lexend** as the primary website font.
    
    Typography should be clean, highly readable, and minimalist. Avoid excessive font weights, text effects, or decorative typography.
    
- 4.3 brain problems section - horizontal scroll
    
    **Concept**
    
    This section presents the real-life experiences that Backbone is designed to compensate for.
    
    Title:
    
    **Stuff our brains can't do for us but Backbone solves**
    
    The section should use a **horizontal-scrolling interaction**. The user still physically scrolls vertically, but while inside this section, vertical scrolling moves the content horizontally.
    
    The horizontal section should feel like a long piece of paper moving across the screen.
    
    The top and bottom edges of the section should have a **subtle ripped-paper edge**, inspired by the provided visual references.
    
    Each individual experience should occupy a meaningful amount of horizontal space rather than being presented as a conventional card grid.
    
    The content itself will use the previously defined structure:
    
    **Situation → internal consequence → recognizable emotional consequence**
    
    The user should be able to quickly recognize themselves in each experience without having to read a long explanation.
    
    The section should eventually transition naturally back into normal vertical scrolling.
    
    > **Text animation / sound**
    > 
    > 
    > Important text within this section may appear progressively, creating the impression of being typed.
    > 
    > A single continuous typing sound should play while the text is appearing and stop when the animation finishes.
    > 
    > Do **not** trigger a separate sound effect for every character.
    > 
    > Sound should be subtle and should not become annoying through repeated scrolling. Respect browser autoplay restrictions and provide a graceful silent experience when audio cannot or should not play.
    > 
- 4.4 color transitions
    
    **Background color transitions**
    
    The website should not use one static background color throughout the entire page.
    
    As the user scrolls between major sections, the background should transition smoothly between a small predefined set of colors.
    
    The color changes should feel like a continuous visual progression through the website rather than separate colored sections.
    
    Colors should remain minimalist and cohesive with the overall design. Avoid gradients, excessive colors, or visually noisy transitions.
    
    Text and other elements should automatically maintain strong contrast against the current background.
    
    The color palette will be defined separately before implementation.
    
- 4.5 scroll progress indicator
    
    **Scroll progress indicator**
    
    A minimal scroll-progress indicator should remain fixed at the bottom of the viewport while the user navigates the website.
    
    It should span a significant portion of the page width, while leaving comfortable margins on both sides.
    
    **Visual style:**
    
    - Thin, lightweight typography.
    - Minimal and unobtrusive.
    - A thin white progress bar.
    - Typography should use the same overall font system as the rest of the website, but with a lightweight/thin appearance.
    - The indicator should adapt to the current background so that it remains visible without becoming visually dominant.
    
    The progress bar should continuously represent how far the visitor has progressed through the entire webpage.
    
    It should not feel like a conventional SaaS progress bar or dashboard element. It should feel more like a subtle navigational element integrated into the visual design.
    
- 4.6 target cursor
    
    **Target Cursor**
    
    Use the Target Cursor interaction only on desktop devices.
    
    The effect should activate when the cursor is over meaningful interactive elements, such as:
    
    - Download buttons
    - Purchase / checkout buttons
    - Links
    - Other intentionally interactive elements
    
    The cursor should remain a normal cursor over non-interactive content and during normal reading/scrolling.
    
    The effect should be subtle and should not interfere with clicking, text selection, scrolling, or accessibility.
    
    Use the existing Target Cursor implementation/reference provided later in the **Animation Assets / References** section rather than recreating the effect from scratch.
    
- 4.7 sound design
    
    **Sound design**
    
    Sound should be used sparingly as an enhancement to the website's interactions, not as continuous background audio.
    
    **No background music:**
    
    The website should not automatically play continuous background music.
    
    **Typing animation sound:**
    
    When text is intentionally animated as if it is being typed, a single typing sound should play for the duration of the text animation.
    
    Do **not** trigger a separate sound effect for every individual character.
    
    **Other interaction sounds:**
    
    Additional subtle interface/computer sounds may be used for selected interactions where they genuinely add to the experience. They should not be applied to every interaction.
    
    **Audio is optional:**
    
    Sound should never be required to understand or navigate the website. The website must remain fully functional when audio is unavailable, blocked, or disabled by the user.
    
    **Hero video:**
    
    The hero video is an important part of the initial experience and communicates the primary message of the hero. However, its essential message should still be accessible without audio.
    
    The hero video should therefore include captions/subtitles.
    
    **General principle:**
    
    Audio should make the website feel more immersive and alive without becoming distracting, repetitive, or necessary for understanding the product.
    
    Specific sound files and implementations will be provided separately in the **Animation & Asset References** section.
    
- 4.8 animation & asset references
    
    **Purpose**
    
    This section contains external references, existing implementations, libraries, code examples, animations, and sound assets that should be used or adapted during development.
    
    When an existing implementation is provided, prefer **reusing or adapting the existing implementation** rather than recreating the effect from scratch.
    
    Each reference should specify:
    
    - What part of the website it applies to.
    - What the reference is being used for.
    - Any modifications desired.
    - Any limitations or responsive/mobile requirements.
    
    Do not add animations simply because they are technically available. Every animation should support the intended visual experience and remain consistent with the minimalist design.
    
    **References will be added below as they are finalized.**
    
- 5 technical architecture
    
    > **Existing download system — preserve**
    > 
    > 
    > The current website already has working download logic that:
    > 
    > - Detects whether the visitor is using macOS or Windows.
    > - Retrieves the latest production download files directly from the Backbone GitHub repository.
    > - Allows the user to download the appropriate macOS or Windows version.
    > 
    > The new website should **reuse this existing download implementation rather than recreate it from scratch**.
    > 
    > The existing GitHub-based download behavior is the source of truth for obtaining the latest production builds.
    > 
    > **Technical architecture principle**
    > 
    > The website should be implemented using a modern, maintainable web stack suitable for a small solo-developed product.
    > 
    > The implementation should prioritize:
    > 
    > - Simplicity.
    > - Low operating cost.
    > - Fast page loading.
    > - Mobile and desktop responsiveness.
    > - Easy future maintenance by a non-technical owner working with AI coding tools.
    > - Reuse of existing working implementations instead of unnecessarily rebuilding them.
    > 
    > Avoid introducing infrastructure, libraries, databases, or services that are not necessary for the website's requirements.
    > 
- 5.1 front end stack
    
    **Frontend framework:** Next.js with React.
    
    **Styling:** Tailwind CSS.
    
    The website should be built as a modern Next.js application using React components and Tailwind CSS for styling.
    
    The implementation should prioritize simplicity and maintainability. Avoid unnecessary dependencies and abstractions.
    
    Interactive animations should be implemented using appropriate existing libraries/components where possible, especially the references provided in the **Animation & Asset References** section.
    
    The website must be fully responsive and optimized for both desktop and mobile.
    
    The developer should use the existing working implementations where specified rather than recreating functionality unnecessarily.
    
- 5.2 existing download system
    
    **The existing download implementation must be preserved rather than recreated from scratch.**
    
    The current website has a working client-side download system with:
    
    - Automatic detection of whether the visitor is using macOS or Windows.
    - A **Windows download** linking to the latest production release on GitHub.
    - A **macOS download** linking to the latest production release on GitHub.
    - The appropriate operating system is visually marked as **Recommended**.
    - OS-specific installation guidance is displayed for the detected platform.
    
    **Current production download URLs:**
    
    Windows:
    
    `https://github.com/vbulgariangymratt-afk/Backbone-s-minimal-webpage/releases/latest/download/Backbone-Setup.exe`
    
    macOS:
    
    `https://github.com/vbulgariangymratt-afk/Backbone-s-minimal-webpage/releases/latest/download/Backbone.zip`
    
    GitHub's `/releases/latest/download/` mechanism automatically serves the asset from the latest official release, so the website does not need to query the GitHub API.
    
    The existing implementation is entirely client-side and does not require a backend for downloading.
    
    **macOS Gatekeeper:**
    
    The current website provides the `xattr` workaround for the unsigned/unnotarized macOS application. Preserve this functionality/copy for now. Apple signing/notarization may be added in the future.
    
    **Tauri updater:**
    
    Preserve `updater.json` if the desktop application depends on the website hosting this file for automatic updates. Verify the final URL/path before deployment.
    
    **Important:** Do not replace the existing GitHub download mechanism with a new download system unless there is a specific technical reason to do so.
    
- 5.3 Payments — Lemon Squeezy
    
    > **Payment provider:** Lemon Squeezy
    > 
    > 
    > Lemon Squeezy will be used to process Backbone purchases and handle payment-related functionality.
    > 
    > **Product/pricing:**
    > 
    > - One subscription/product.
    > - Base price: **500 MXN** (or $30 USD).
    > - Access period: **30 days**.
    > - No automatic renewal.
    > - There are no additional pricing tiers or features locked behind higher prices.
    > 
    > **Currency localization:**
    > 
    > Backbone's base price is 500 MXN / $30 USD.
    > 
    > Lemon Squeezy should handle currency localization for international customers where supported, rather than the website implementing its own exchange-rate calculations.
    > 
    > The website should not maintain or calculate exchange rates itself.
    > 
    > **Checkout:**
    > 
    > The pricing section should contain a clear purchase CTA that opens Lemon Squeezy Checkout.
    > 
    > The final Lemon Squeezy product/price IDs and checkout configuration will be added after the Lemon Squeezy account has been created and configured.
    > 
    > **Access after payment:**
    > 
    > A successful payment must be communicated to Backbone's backend authorization system so the purchaser can be recognized as having an active 30-day access period.
    > 
    > The purchaser should use the **same email address for Backbone that they used when purchasing through Lemon Squeezy**.
    > 
    > **Renewal:**
    > 
    > Backbone must not automatically charge the user when their 30 days expire.
    > 
    > If the user wants another 30 days, they intentionally purchase another period.
    > 
    > **Security:**
    > 
    > Lemon Squeezy credentials, API keys, webhook secrets, and other private credentials must never be exposed in client-side code. They must be stored using appropriate secure environment variables/server-side configuration.
    > 
    > **Current status:**
    > 
    > The Lemon Squeezy account and checkout are configured. Product IDs, store URLs, webhook configuration, credentials, and final checkout implementation will be linked securely.
    > 
    > The architecture should therefore be designed so these values can be added without restructuring the website.
    > 
- 5.4 Purchase & Access Authorization
    
    **Purchase flow**
    
    Users should be able to purchase Backbone through either of two entry points:
    
    1. From the Backbone website.
    2. From within the Backbone application, which opens the payment checkout in the user's browser.
    
    Both entry points must use the **same Lemon Squeezy checkout/product** and ultimately produce the same authorization result.
    
    **After successful payment:**
    
    1. Lemon Squeezy confirms the transaction.
    2. The purchaser's email address is recorded as having an active Backbone entitlement.
    3. The entitlement is stored in the Backbone backend/database using Supabase.
    4. Backbone checks the user's email against this authorization record.
    5. If the email has an active entitlement, Backbone unlocks the application.
    
    **Email matching**
    
    The email used for the Lemon Squeezy purchase must be the same email the user uses to access Backbone.
    
    The system should clearly communicate this to the user during the purchase flow.
    
    **Access duration**
    
    A successful purchase grants 30 days of access.
    
    When the 30-day period expires, the entitlement becomes inactive.
    
    There is no automatic renewal. The user must intentionally purchase another 30-day period.
    
    **Important architectural principle**
    
    The website and Backbone application should not maintain separate payment or authorization systems. Both should ultimately rely on the same Lemon Squeezy product and the same backend authorization state.
    
- 5.5 backend responsibility
    
    The website should remain as independent and simple as possible.
    
    Supabase is primarily used by the Backbone application and its authorization system, rather than as the general backend for the marketing website.
    
    The website should only communicate with backend services where necessary for functionality such as:
    
    - Lemon Squeezy purchase/checkout integration.
    - Communicating successful purchases to the authorization system where required.
    
    The website should not duplicate Backbone's application database, user data, task data, usage patterns, or other application functionality.
    
    The existing Backbone application and its backend remain the source of truth for user access and application data.
    
    Technical implementation details for connecting Lemon Squeezy, the authorization system, and Supabase should be determined during development after the Lemon Squeezy account and production configuration are available.
    
- 5.6 Analytics — posthog
    
    > **Analytics — PostHog**
    > 
    > 
    > The website should use PostHog for basic website analytics.
    > 
    > Preserve the existing PostHog integration from the current website where appropriate.
    > 
    > Analytics should be limited to information useful for understanding website usage and improving the website.
    > 
    > Do not collect unnecessary personal information.
    > 
    > PostHog configuration must not expose private credentials or secrets in the codebase.
    > 
    > The final implementation should comply with the website's privacy policy and applicable privacy requirements.
    > 

**6. Development Instructions**

This document is the source of truth for the website.

Implement the website according to the specifications above.

Do not add features, sections, animations, copy, SaaS-style elements, or functionality that are not specified.

When an existing implementation is referenced, reuse or adapt it rather than recreating it unnecessarily.

When a requirement is ambiguous, preserve the minimalist approach and ask for clarification rather than inventing additional functionality.