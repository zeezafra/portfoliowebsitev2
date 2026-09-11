---
name: zee-zafra-portfolio-v2
description: >
  Phased implementation guide for improving Zee Zafra's Portfolio V2.
  Use this skill when reviewing, redesigning, implementing, debugging,
  or QA-testing the portfolio website. Execute the phases sequentially,
  preserve the existing visual identity, and prioritize responsive layout,
  truthful content, service positioning, and production readiness.
---

# Zee Zafra Portfolio V2 — Implementation Skill

## Purpose

Use this document as the authoritative implementation guide for the Portfolio V2 redesign.

Primary website:
https://portfoliowebsitev2.vercel.app/

### Core rule

Treat the redesign as a **phased implementation**, not a single large rewrite.

- Complete one phase at a time.
- Verify the phase before proceeding.
- Do not unnecessarily rewrite working code.
- Preserve the existing dark sidebar/developer portfolio identity.
- Never invent credentials, statistics, certifications, clients, results, or experience.
- Never leave placeholder content in production.
- Never allow unwanted horizontal page scrolling.

## Claude Execution Instructions

When this skill is loaded:

1. Inspect the existing project before making changes.
2. Identify the relevant files/components for the current phase.
3. Work only on the current phase unless a dependency requires another change.
4. Preserve existing working functionality.
5. Reuse existing components and design tokens where practical.
6. Avoid unnecessary dependencies.
7. Run/build/test the project after meaningful changes.
8. Check responsive behavior at the required viewport sizes.
9. Do not mark a phase complete until its acceptance criteria pass.
10. Report:
   - What was changed
   - Files affected
   - What was tested
   - Any remaining issue
   - Whether the phase is complete
11. Then proceed to the next phase only when appropriate.

## Source of Truth

The user's provided resume is `Zee_Zafra_Resume.pdf`.

Supported resume information includes:
- Zee T. Zafra
- Native Cebuano Speaker | AI Tools & Technical Support Specialist | Computer Engineering Graduate (Cum Laude)
- Talisay City, Cebu
- Computer Engineering graduate, Cum Laude
- Technical troubleshooting and support
- LAN/networking
- Windows 10/11
- Python OOP basics
- HTML/CSS/JavaScript
- ChatGPT, Claude, Whisper
- Technical Assistant experience
- Freelance Technical Support Specialist
- Multi-Purpose Training Board project
- CompTIA A+ — In Progress

Only use verified information for public claims.

---

ZEE ZAFRA PORTFOLIO V2 PHASED WEBSITE IMPROVEMENT & REDESIGN
SPECIFICATION ====================================================

SOURCE / CONTEXT

Primary website: https://portfoliowebsitev2.vercel.app/

The current Portfolio V2 uses a dark, developer/technical
dashboard-style design with: - Left sidebar navigation - Zee Zafra
profile / role - “Available for work” status - Home / Projects /
Services / Certifications / Hackathon / About / Contact navigation -
Hero headline: “I build reliable systems and practical web
experiences.” - Hero supporting statement: “From hands-on hardware
diagnostics to full web builds, I help people and small teams keep their
tech running smoothly.” - Profile image on the hero - Statistics / trust
cards - Projects - Services - Certifications - Hackathon - About -
Contact - Theme switcher

IMPORTANT: Do NOT throw away the existing visual identity and replace it
with an unrelated template. The current dark sidebar/dashboard identity
is a good foundation for an IT Technician + Web Developer portfolio. The
goal is to improve the existing V2: 1. Fix layout and responsiveness. 2.
Remove unfinished/placeholder content. 3. Improve information hierarchy.
4. Expand service positioning. 5. Improve project presentation. 6.
Improve client conversion. 7. Polish the visual system.

The user’s uploaded resume is: Zee_Zafra_Resume.pdf

Resume-supported information includes: - Zee T. Zafra - Native Cebuano
Speaker | AI Tools & Technical Support Specialist | Computer Engineering
Graduate (Cum Laude) - Talisay City, Cebu - Computer Engineering
graduate, Cum Laude - Technical troubleshooting and support -
LAN/networking - Windows 10/11 - Python OOP basics -
HTML/CSS/JavaScript - ChatGPT, Claude, Whisper - Technical Assistant
experience - Freelance Technical Support Specialist - Multi-Purpose
Training Board project - CompTIA A+ — In Progress

Do not invent credentials, client counts, satisfaction percentages, or
certifications. Only display numerical claims that can be supported.

==================================================== OVERALL DESIGN
DIRECTION ====================================================

Design goal: “Professional technical portfolio + practical digital
services.”

The website should work for two audiences: A. Employers / recruiters B.
Potential freelance clients

Core positioning: Zee Zafra IT Technician & Web Developer

Recommended broader positioning: Technology & Digital Solutions

The site should communicate: - Technical reliability - Practical problem
solving - Web development capability - Computer / IT support - Digital
services - Professional but approachable personality

Visual direction: - Keep the dark theme. - Keep the blue accent. - Keep
the left sidebar on desktop. - Improve spacing and hierarchy. - Use
consistent card radius. - Use consistent typography scale. - Avoid
excessive borders. - Avoid too many competing colors. - Use subtle hover
and transition effects. - Do not over-animate. - Maintain strong
readability and accessibility.

==================================================== CRITICAL ISSUE:
WHOLE PAGE / HORIZONTAL OVERFLOW
====================================================

This is the highest priority issue.

The current screenshot shows horizontal page scrolling at the bottom.
The content is wider than the viewport, causing the user to scroll
horizontally.

The website must NEVER require horizontal scrolling on normal desktop or
mobile viewport widths.

Expected behavior:

Desktop: [ Sidebar ][ Responsive Main Content ]

Tablet: [ Compact Sidebar / navigation ][ Main Content ]

Mobile: [ Top/mobile navigation ] [ Full-width Main Content ]

There should be no horizontal scrollbar caused by the page itself.

IMPORTANT: Do not simply hide overflow with overflow-x: hidden and
consider the issue solved. Find and fix the underlying cause.

Investigate: - width: 100vw - fixed-width components - min-width on
cards - flex children without min-width: 0 - oversized grid columns -
large images - absolute-positioned elements - horizontal skill strips -
fixed sidebar width combined with viewport width - sections wider than
their parent - cards with hard-coded widths - long unbroken text -
mobile layouts that retain desktop dimensions

Recommended main layout concept:

      {children}
    </div>

Important CSS/layout principle: The flexible main content area should
use min-width: 0.

Use responsive max-width containers rather than hard-coded page widths.

Suggested content container: - width: 100% - max-width: 1200px to
1280px - margin-inline: auto - responsive horizontal padding

Required viewport testing: - 1440px - 1280px - 1024px - 768px - 480px -
375px

No horizontal page scrolling at any of these widths.

==================================================== PHASE 1 — LAYOUT
FOUNDATION & RESPONSIVENESS
====================================================

Priority: P0 / MUST FIX FIRST

Goal: Make the entire website behave as one cohesive responsive
interface.

Tasks:

1.  Fix horizontal overflow.
2.  Fix sidebar/main content relationship.
3.  Create a stable responsive content container.
4.  Ensure all grids collapse correctly.
5.  Ensure cards cannot force the viewport wider.
6.  Ensure images are responsive.
7.  Ensure text wraps correctly.
8.  Ensure buttons do not overflow.
9.  Ensure navigation works on smaller screens.
10. Ensure every section stays inside its parent container.
11. Ensure modal/dialog content is responsive.
12. Check the theme switcher on all breakpoints.
13. Check the sidebar collapse behavior.
14. Check footer width.
15. Check every section individually.

Desktop target: Sidebar approximately 240–270px wide. Main area fills
remaining space. Main content has max-width around 1200–1280px.

Tablet: Reduce sidebar footprint or allow collapse.

Mobile: Do NOT squeeze the desktop sidebar into a narrow screen. Use a
mobile navigation pattern.

Recommended mobile behavior: - Compact top bar - Menu button -
Slide-out/drawer navigation OR bottom navigation - Main content uses
full width - No horizontal scrolling

Acceptance criteria: - Entire site can be viewed without horizontal
scrolling. - No clipped cards. - No content hidden off-screen. - Hero
adapts to one column on mobile. - Project cards adapt. - Service cards
adapt. - Contact form adapts. - Sidebar/navigation adapts.

==================================================== PHASE 2 — REMOVE
PLACEHOLDERS & UNFINISHED CONTENT
====================================================

Priority: P1 / MUST COMPLETE BEFORE POLISH

Goal: The production site must not look unfinished.

Remove/replace any placeholder content such as: - “Add certification” -
“Based in: add this” - “Add your event name, placement/result…” -
Generic placeholder project descriptions - Fake statistics - Empty
social/contact values - Empty image slots - Empty buttons

IMPORTANT: If information is unavailable, either: A. Remove the section
until it has real content, or B. Use a neutral “Coming soon” state only
where appropriate.

Do NOT use fake-looking numbers.

Examples of information supported by the resume: - Computer Engineering
— Cum Laude - CompTIA A+ — In Progress - Technical Assistant
experience - Freelance Technical Support - Multi-Purpose Training
Board - AI tool experience - HTML/CSS/JavaScript - Python basics -
Networking / LAN - Windows - ChatGPT / Claude / Whisper

==================================================== PHASE 3 — TRUST /
STATISTICS SECTION ====================================================

Priority: P1

Problem: The current design uses numerical statistics. Unsupported
values such as “0+”, “0%” or arbitrary client satisfaction numbers
should not appear.

Replace generic metrics with verified achievements or remove the
statistics section.

Recommended structure:

2+ Years Technical Experience

10+ Projects / Builds ONLY if this number is actually verified from the
user’s project history.

4th Hackathon Placement ONLY if this achievement is part of the user’s
confirmed portfolio information.

Cum Laude Computer Engineering

Alternative: If a number cannot be verified, use an achievement card
instead of a statistic.

Example: “Computer Engineering” “Cum Laude”

Example: “Technical Support” “Hands-on troubleshooting experience”

==================================================== PHASE 4 — HERO
SECTION ====================================================

Priority: P1

Keep the current hero concept.

Current headline: “I build reliable systems and practical web
experiences.”

Keep it because it is clear and aligned with the user’s positioning.

Recommended structure:

Badge: IT Technician & Web Developer

Headline: I build reliable systems and practical web experiences.

Supporting copy: From computer troubleshooting and hardware support to
business websites and digital solutions, I help people and small teams
solve technology problems.

Primary CTA: Let’s work together

Secondary CTA: View my work

Hero layout: Desktop: Text left / photo right

Tablet: Text + photo with reduced spacing

Mobile: Text first / photo second

Photo: Use the user’s existing professional portrait. Keep the image
contained. Do not allow it to create overflow.

==================================================== PHASE 5 — SERVICES
EXPANSION ====================================================

Priority: P2

The service offering should expand from hardware/IT support to include
the user’s actual freelance direction.

Service categories:

1.  WEB DEVELOPMENT

Title: Web Development

Description: Modern, responsive websites for businesses, personal
brands, portfolios, and projects.

Possible services: - Business websites - Portfolio websites - Landing
pages - Responsive web development - Website updates - Website
maintenance

CTA: View services

2.  COMPUTER & IT SUPPORT

Title: Computer & IT Support

Description: Practical troubleshooting and technical support for
computers, devices, and small-office setups.

Possible services: - Computer repair - PC assembly - Hardware
diagnostics - Windows installation - Software setup - Printer
troubleshooting - Networking - Device configuration - CCTV-related
technical work where applicable

3.  META ADS MANAGEMENT

Title: Meta Ads Management

Description: Campaign setup and management for businesses using Facebook
and Instagram advertising.

Possible services: - Meta Ads setup - Campaign configuration - Audience
setup - Ad management - Monitoring - Basic optimization

IMPORTANT: Do not claim guaranteed sales, guaranteed leads, or
guaranteed ROI.

4.  META INSTANT FORMS

Title: Meta Instant Forms

Description: Lead-generation forms designed to collect customer
inquiries directly through Facebook and Instagram.

Possible services: - Instant Form creation - Custom questions - Lead
qualification questions - Customer information collection - Lead
workflow planning - Form optimization

Do not claim integrations unless actually implemented.

==================================================== PHASE 6 — “HOW I
CAN HELP” CLIENT SECTION
====================================================

Priority: P2

Add a client-oriented section after Services.

Heading: What can I help you with?

Four scenarios:

Need a website? I’ll build a responsive website tailored to your
business, brand, or project.

Computer having problems? I’ll help diagnose the issue and work toward a
practical solution.

Want more customers? I can help set up and manage Meta advertising
campaigns.

Want to collect leads? I can create Meta Instant Forms for customer
inquiries.

CTA: Let’s discuss your project

Purpose: This section translates technical services into customer
problems and outcomes.

==================================================== PHASE 7 — PROJECTS
/ CASE STUDIES ====================================================

Priority: P2

Problem: Simple project cards are not enough to demonstrate the user’s
actual capabilities.

Convert important projects into case-study style cards.

Each project should contain:

Project name Category Short description Problem Role Tools /
technologies Solution Outcome Screenshots Live demo (if available)
Source code (if available)

Example:

MULTI-PURPOSE TRAINING BOARD

Category: Embedded Systems / Electronics / Education

Description: An interactive training board designed to help Computer
Engineering students understand basic electronics and logic circuits
through hands-on experimentation.

Tools: Arduino Embedded Systems Electronics

Case study sections: Problem Students need practical ways to connect
theoretical electronics concepts with physical circuit experimentation.

Role Design, wiring, component integration, programming, testing.

Solution Interactive modules for circuit analysis, logic circuits, and
microcontroller-based experiments.

Outcome Validated through iterative testing.

Only include details that are actually true and supported by the user’s
project.

Other projects should be rewritten similarly.

Recommended project filters: - All - Web - IT & Hardware - Embedded -
Digital - Achievements

==================================================== PHASE 8 —
TECHNOLOGIES VS CAPABILITIES
====================================================

Priority: P2

Separate “what I use” from “what I can do.”

TECHNOLOGIES:

-   HTML
-   CSS
-   JavaScript
-   TypeScript
-   React
-   Next.js
-   Tailwind CSS
-   Python
-   Arduino
-   Git / GitHub
-   VS Code
-   Photoshop
-   Canva
-   AI tools where appropriate

Only list technologies the user is actually comfortable representing
publicly.

TECHNICAL CAPABILITIES:

-   Computer Diagnostics
-   Hardware Troubleshooting
-   PC Assembly
-   Windows Setup
-   Networking / LAN
-   Printer Troubleshooting
-   System Maintenance
-   Technical Documentation
-   Client Support

DIGITAL SERVICES:

-   Web Development
-   Meta Ads
-   Meta Instant Forms
-   Digital content / graphics where actually offered

Do not overstate skill levels.

==================================================== PHASE 9 — ABOUT
SECTION ====================================================

Priority: P2

Goal: Connect the technical background with the current service
direction.

Suggested structure:

About Me

I’m Zee Zafra, a Computer Engineering graduate and IT Technician & Web
Developer focused on practical technology solutions.

My experience spans hands-on computer troubleshooting, system setup,
networking, hardware work, web development, and technical support.

I also work with modern AI tools and digital platforms, and I’m
continuously expanding my skills toward software development and digital
solutions.

Supporting information: - Computer Engineering graduate — Cum Laude -
Technical support experience - Freelance technical support - Web
development - Embedded systems / electronics - AI tools

Avoid copying the resume word-for-word. The website should be concise
and client-friendly.

==================================================== PHASE 10 —
CERTIFICATIONS ====================================================

Priority: P2

Use actual certifications only.

Currently supported: CompTIA A+ — In Progress

Display:

CompTIA A+ Currently pursuing

If more certificates are provided later: Add: - Certificate name -
Issuer - Date - Credential ID where appropriate - Verification link if
available

Do not create fake certifications.

==================================================== PHASE 11 —
HACKATHON / ACHIEVEMENTS
====================================================

Priority: P2

Give the achievement its own visual treatment.

Suggested:

4th Place Solana x AI Consumer Hack Hackathon 2024

Add: - Event name - Placement - Project name if verified - Short
explanation - Technologies - Screenshot/photo if available

Use an achievement badge/card.

Do not fabricate event details.

==================================================== PHASE 12 — FAQ
====================================================

Priority: P3

FAQ should be service-focused.

Recommended questions:

1.  What services do you offer? Answer: I offer practical digital and
    technical services including web development, website creation,
    computer repair and troubleshooting, Meta Ads management, and Meta
    Instant Forms setup.

2.  Can you build a website for my business? Answer: Yes. I can build a
    responsive website tailored to your business, personal brand,
    portfolio, or project.

3.  Do you maintain existing websites? Answer: Yes. I can help with
    website updates, content changes, layout improvements,
    troubleshooting, and maintenance depending on the website
    technology.

4.  Do you repair computers and laptops? Answer: Yes. I provide
    troubleshooting, hardware diagnostics, PC assembly, Windows
    installation, software setup, and related technical support.

5.  Can you help if my computer is slow or having problems? Answer: Yes.
    I can diagnose common hardware and software issues and recommend or
    perform appropriate solutions.

6.  Do you offer Meta Ads management? Answer: Yes. I can help set up and
    manage Meta advertising campaigns, including campaign configuration,
    audience setup, monitoring, and basic optimization.

7.  Can you create Meta Instant Forms? Answer: Yes. I can create and
    configure Meta Instant Forms designed to collect customer inquiries
    from Facebook and Instagram.

8.  Can you connect Instant Forms to my business workflow? Answer: I can
    help structure the form and lead-collection workflow. External CRM,
    email, or automation integrations should be discussed based on the
    specific requirements.

9.  How do I get started? Answer: Send a message describing what you
    need. I’ll review your requirements, discuss the available options,
    and provide the next steps.

10. Do you offer customized packages? Answer: Yes. Services can be
    tailored depending on project scope, complexity, and requirements.

FAQ UI: Use accordion behavior. Only one or a small number of items
should expand at a time. Keep answers concise. Use smooth but subtle
animation.

==================================================== PHASE 13 — CONTACT
SECTION ====================================================

Priority: P3

The contact form should be UI-only for now.

Do NOT integrate email delivery yet.

Heading: Have a project or technical problem?

Supporting copy: Tell me what you need. I’ll help you figure out the
next step.

Fields:

Name Email Service Message

Service options: - Web Development - Computer / IT Support - Meta Ads -
Meta Instant Forms - Other

Button: Send inquiry

For now: - Validate fields on the client side if desired. - Show a local
success state if desired. - Do NOT pretend an email was actually sent. -
Keep the architecture ready for future backend/email integration.

Future email provider can be selected later.

==================================================== PHASE 14 — RESUME
DOWNLOAD ====================================================

Priority: P3

The user has provided: Zee_Zafra_Resume.pdf

Recommended Next.js file structure:

public/ Zee_Zafra_Resume.pdf

Button:

Download Resume

Implementation:

Download Resume

Make sure: - The file exists in /public. - The button works in
production. - The filename is stable. - The PDF opens/downloads
correctly. - No external service is required.

==================================================== PHASE 15 —
NAVIGATION / INFORMATION ARCHITECTURE
====================================================

Priority: P3

Recommended desktop sidebar:

Zee Zafra IT Technician & Web Developer

● Available for work

Home Services Projects About Certifications Hackathon FAQ Contact

Theme switcher

Optional: Resume download

Navigation order should prioritize client conversion.

Recommended order: Home Services Projects About Certifications Hackathon
FAQ Contact

Reason: A visitor should understand: 1. Who you are 2. What you offer 3.
What you’ve built 4. Why they should trust you 5. How to contact you

==================================================== PHASE 16 — SIDEBAR
& MOBILE NAVIGATION ====================================================

Priority: P3

Desktop: Keep sidebar.

Suggested width: 240–270px.

Sidebar should: - Remain visually clean. - Not dominate the page. -
Highlight active section. - Maintain consistent spacing. - Not cause
horizontal overflow.

Mobile: Do not force the desktop sidebar into the mobile viewport.

Recommended: - Top mobile header - Zee Zafra name/logo - Menu button -
Drawer navigation

Alternative: Bottom navigation for primary sections only.

Mobile navigation should prioritize: Home Services Projects Contact

Secondary sections can remain inside the menu.

==================================================== PHASE 17 — VISUAL
POLISH ====================================================

Priority: P4

Once layout/content is correct, polish the visual system.

Typography: - One primary font family. - Strong heading hierarchy. -
Comfortable body line-height. - Avoid too many font weights.

Spacing: - Consistent section spacing. - Consistent card padding. -
Consistent grid gaps.

Cards: - Consistent border radius. - Consistent border treatment. -
Subtle background difference. - Avoid excessive shadows.

Color: - Dark background - Slightly lighter card/sidebar surfaces - Blue
primary accent - Neutral text - Green only for availability/success
states

Do not introduce many accent colors.

Buttons: Primary: Let’s work together

Secondary: View my work Download Resume

Ensure buttons have: - Clear hover state - Focus state - Disabled state
where applicable

==================================================== PHASE 18 —
ACCESSIBILITY ====================================================

Priority: P4

Check: - Keyboard navigation - Visible focus indicators - Proper button
labels - Proper form labels - Image alt text - Sufficient color
contrast - Accordion keyboard behavior - Modal keyboard behavior if
used - Escape closes dialogs - Links have meaningful names

Do not rely on color alone to communicate state.

==================================================== PHASE 19 —
PERFORMANCE ====================================================

Priority: P4

Check: - Image sizes - Next.js image optimization - Unnecessary
animations - Large background assets - Font loading - Client components
used only where necessary - Excessive JavaScript - Unnecessary
dependencies

Keep the portfolio fast.

Do not add a heavy animation library just for decorative effects unless
justified.

==================================================== PHASE 20 — FINAL QA
====================================================

Priority: P4 / RELEASE CHECK

Test:

Desktop: 1440 x 900 1366 x 768 1280 x 800 1024 x 768

Tablet: 768 x 1024

Mobile: 430 x 932 390 x 844 375 x 812

Check every page/section:

HOME - No overflow - Hero fits - Photo fits - CTA works - Navigation
works

SERVICES - Cards fit - Four service categories are readable - No
overflow

PROJECTS - Cards fit - Filters work - Modal/case study works - Images
fit

ABOUT - Text readable - No placeholder values

CERTIFICATIONS - No placeholder cards - CompTIA A+ correctly marked “In
Progress”

HACKATHON - Achievement displays correctly

FAQ - Accordion works - Answers readable - Keyboard accessible

CONTACT - Form responsive - Fields work - Service selector works - No
false email success

RESUME - Download button works - PDF opens/downloads

SIDEBAR - Active section correct - Mobile navigation works

THEME - Dark mode correct - Light mode correct if supported - Text
remains readable - Borders remain visible

==================================================== FINAL DESIGN
STRUCTURE ====================================================

Recommended complete flow:

SIDEBAR / NAVIGATION

HOME - Badge - Hero headline - Supporting statement - Primary CTA -
Secondary CTA - Professional photo - Trust / achievement cards

SERVICES - Web Development - Computer & IT Support - Meta Ads
Management - Meta Instant Forms

HOW I CAN HELP - Website - Computer problems - Customer acquisition -
Lead generation

PROJECTS - Featured projects - Case studies - Filters - Live demo /
GitHub where available

ABOUT - Short professional story - Technical background - Current
direction

TECHNOLOGIES / CAPABILITIES - Technologies - Technical capabilities -
Digital tools

CERTIFICATIONS - CompTIA A+ — In Progress - Future certifications

HACKATHON / ACHIEVEMENTS - 4th Place — Solana x AI Consumer Hack
Hackathon 2024 - Other verified achievements

FAQ - Service questions - Process questions - Website questions - IT
support questions - Meta Ads / Instant Forms questions

CONTACT - Client-oriented headline - Name - Email - Service - Message -
Send inquiry

RESUME - Download Resume

FOOTER - Zee Zafra - IT Technician & Web Developer - Social links -
Copyright - Resume link

==================================================== IMPLEMENTATION
RULES FOR AI/CODE ASSISTANT
====================================================

When implementing this specification:

1.  Work in phases.
2.  Finish and verify one phase before moving to the next.
3.  Do not rewrite the whole project unnecessarily.
4.  Preserve working components unless a change is required.
5.  Inspect the existing component structure before editing.
6.  Reuse existing design tokens/components where possible.
7.  Avoid unnecessary dependency installation.
8.  Do not introduce fake content.
9.  Do not invent statistics.
10. Do not invent certifications.
11. Do not claim services that the user did not approve.
12. Keep contact email delivery disabled for now.
13. Use the provided resume PDF for the resume download.
14. Keep the existing dark portfolio identity.
15. Prioritize responsive behavior over decorative effects.
16. Never allow horizontal page scrolling.
17. Test desktop and mobile after major layout changes.
18. Do not finish a phase if its acceptance criteria fail.
19. Keep code maintainable.
20. Avoid hard-coded dimensions that create viewport overflow.

==================================================== PHASE EXECUTION
ORDER ====================================================

PHASE 1 Layout Foundation & Responsiveness STATUS: FIRST

PHASE 2 Remove Placeholders & Unfinished Content

PHASE 3 Trust / Statistics

PHASE 4 Hero

PHASE 5 Services Expansion

PHASE 6 How I Can Help

PHASE 7 Projects / Case Studies

PHASE 8 Technologies vs Capabilities

PHASE 9 About

PHASE 10 Certifications

PHASE 11 Hackathon / Achievements

PHASE 12 FAQ

PHASE 13 Contact

PHASE 14 Resume Download

PHASE 15 Navigation / Information Architecture

PHASE 16 Sidebar & Mobile Navigation

PHASE 17 Visual Polish

PHASE 18 Accessibility

PHASE 19 Performance

PHASE 20 Final QA / Release

==================================================== SUCCESS CRITERIA
====================================================

The redesigned Portfolio V2 is successful when:

-   The website has ZERO unwanted horizontal scrolling.
-   The entire design feels like one coherent system.
-   Desktop, tablet, and mobile layouts are intentionally designed.
-   No placeholder content remains.
-   No fake statistics remain.
-   Services clearly include Web Development, IT Support, Meta Ads, and
    Meta Instant Forms.
-   Projects demonstrate actual work using case-study presentation.
-   Resume can be downloaded successfully.
-   FAQ answers real client questions.
-   Contact form UI is complete but email delivery is not falsely
    represented as active.
-   Sidebar navigation is clear.
-   Mobile navigation is usable.
-   The visual identity remains recognizable as Zee Zafra Portfolio V2.
-   The website looks finished and professional rather than like a
    development template.
-   A visitor can understand who Zee is, what he can do, what he has
    built, and how to contact him within a few seconds.

==================================================== END OF
SPECIFICATION ====================================================
