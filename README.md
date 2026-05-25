# Craigslist Redesign — Interactive Prototype

**CSE/SER 463 Final Project — Spring 2026**
**Student:** Jacob

---

## How to use this prototype

The prototype is a single-page web app. It runs in any modern browser with no install or setup.

**To open:** Double-click `index.html`, or visit the deployed link in the project presentation.

A small demo banner in the bottom-right corner shows the two tasks. You can hide it with the "Hide" button if it gets in the way.

---

## Tasks the prototype supports

### Task 1 — Find and buy a used laptop under $300

Suggested walkthrough:

1. From the homepage, click the **"For Sale"** category card (or click **Search** in the hero).
2. On the search results page, the filter sidebar on the left is preset to show laptops under $300, brands HP and Dell, condition Excellent or Good. Try toggling filters on/off — the results update in real time.
3. Click the **"Save Search"** button (top right of results) to see the saved search modal with notification toggles.
4. Click any listing card to view its detail page. The HP 14" Laptop ($290) is the showcase listing.
5. On the detail page, notice the **seller profile card** showing James K., 4.9 stars, verified badge, and stats (member since, items sold, response time).
6. Click **"Message Seller"** to open the chat. Type a message and press Enter — the seller will auto-reply after a moment.
7. Click **"Buy with Buyer Protection"** to go to the secure checkout, which shows the buyer protection card and itemized totals.
8. Click **"Pay Securely"** to see the purchase success screen.

### Task 2 — Post an item for sale

Suggested walkthrough:

1. Click **"+ Post an Ad"** in the top-right of the navigation bar.
2. Pick a category. The structured form opens.
3. Required fields are marked with a red asterisk. As you fill fields, the **progress bar** at the bottom updates and the publish button stays disabled until all required fields are complete.
4. To skip ahead, click **"Auto-fill Demo Data"** to populate every field at once.
5. Click **"Publish Listing"** to see the success page.

---

## How the prototype maps to the rubric

The prototype directly demonstrates each of the 10 redesign improvements documented in the project presentation.

| # | Redesign Goal | Where to see it in the prototype |
|---|---|---|
| 1 | Modernize Visual Design | Homepage — card-based categories, icons, hierarchy |
| 2 | User Profiles & Trust System | Listing detail page — seller card with rating, verified badge, stats |
| 3 | Simplify Homepage Hierarchy | Homepage — main categories shown as cards, no wall of links |
| 4 | Breadcrumb Navigation | Top of every internal page (search, detail, post) — clickable trail |
| 5 | Standardized Listing Fields | Posting form — required structured fields with progress indicator |
| 6 | Smart Category Filters | Search page sidebar — brand, storage, screen size tagged "SMART" |
| 7 | Saved Searches | Search page — "Save Search" button opens modal with notification toggles |
| 8 | Universal Chat | Listing detail — "Message Seller" opens persistent chat panel |
| 9 | In-App Payment Protection | Listing detail — "Buy with Buyer Protection" → secure checkout flow |
| 10 | Mobile Responsiveness | Resize the browser window to a phone width to see the responsive layout |

---

## Notes on the prototype

- All data is mocked. The seller, listings, prices, and messages are sample data for demonstration purposes.
- The chat auto-reply is scripted to demonstrate the flow — a real implementation would connect to a messaging backend.
- The payment flow does not actually charge anything; the success screen is a static confirmation.
- The prototype is built as a single-page app with vanilla JavaScript (no framework dependencies). All source is in `index.html`, `styles.css`, and `app.js`.

---

## Project structure

```
prototype/
├── index.html      # HTML shell + demo banner
├── styles.css      # All styling (design system, layouts, responsive)
├── app.js          # State management + screen rendering for all flows
└── README.md       # This file
```
