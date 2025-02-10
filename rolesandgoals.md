## Project Overview

**Goal:**  
Develop a lightweight ad blocker extension for Chrome that uses the new Declarative Net Request API (Manifest V3) to block common ad domains.

**Features:**  
- Block requests to known ad networks (using predefined URL patterns).  
- A minimal user interface (a popup) indicating that the blocker is active.  
- Logging on installation for debugging purposes.

---

## Team Roles & Responsibilities

1. **Project Manager / Team Lead**  
   - **Responsibilities:** Define overall scope, coordinate tasks, schedule reviews, and handle integration.  
   - **Milestones:** Finalize requirements, oversee code reviews, and manage testing.

2. **Extension Developer 1 (Manifest & Background)**  
   - **Responsibilities:** Develop the manifest file and background service worker.  
   - **Milestones:** Ensure correct permissions, rule resource configuration, and that the service worker logs events correctly.

3. **Extension Developer 2 (Ad Blocking Rules)**  
   - **Responsibilities:** Design and implement the ad filter rules (e.g., rules.json) that block known ad domains.  
   - **Milestones:** Research common ad domains (e.g., from sources like Google’s ad network patterns) and develop robust rules.

4. **QA & Documentation Specialist**  
   - **Responsibilities:** Test the extension on various websites, document installation and usage instructions, and gather user feedback.  
   - **Milestones:** Create test cases, verify that ads are blocked on test sites, and document the project in a user guide.

---

## Development Process & Timeline

1. **Requirement & Research (Day 1–2):**  
   - Define the list of ad domains to block.
   - Review Chrome’s Manifest V3 documentation and sample ad blocking rules (see, for example, citeturn0search16).

2. **Initial Coding (Day 3–5):**  
   - Developer 1 creates the manifest file and background service worker.
   - Developer 2 writes the rules file (rules.json) with sample blocking rules.
   - Create a basic popup interface (optional but useful for demo).

3. **Integration & Testing (Day 6–7):**  
   - QA loads the unpacked extension using Chrome’s “Load Unpacked” mode.
   - Test on pages known to serve ads.
   - All team members review logs and behavior.

4. **Documentation & Final Review (Day 8):**  
   - QA documents installation instructions and usage.
   - Project Manager conducts a final code review and prepares the extension for packaging.

5. **Packaging & Deployment:**  
   - Package the extension folder.
   - Prepare listing information if publishing to the Chrome Web Store.

---

## Final Notes

- **Testing:** Load the extension in Chrome via `chrome://extensions` by enabling Developer Mode and clicking “Load Unpacked.” Visit websites known to display ads (e.g., pages with Google ads) to verify that the specified ad scripts are blocked.
- **Scalability:** For a production-ready blocker, research additional ad domains and update rules accordingly. You might also implement a user interface for toggling rules.
- **Documentation:** Ensure the QA & Documentation specialist records the installation and usage process, as well as test cases and any feedback for further iterations.
