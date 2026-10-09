# Security Policy

## Supported Versions

RTGamingHub is a static-site project with no backend. Security updates apply only to the latest default branch.

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |

## Reporting a Vulnerability

**No sensitive data is stored or processed.** This project serves only static HTML/CSS/JS and uses browser localStorage for game scores.

If you discover a vulnerability (e.g., XSS in game logic, CSP bypass, service worker issue):

1. **Do not open a public issue.**
2. Email: **rajeshbiswas@example.com** (replace with real contact) with:
   - Description of the issue
   - Steps to reproduce
   - Impact assessment
   - Suggested fix (if any)
3. Expect acknowledgment within 72 hours.
4. We will coordinate a fix and public disclosure timeline.

## Scope

- **In scope**: Client-side game logic, service worker, manifest, localStorage handling, CSP headers if configured on host.
- **Out of scope**: Infrastructure (GitHub Pages, Netlify, Cloudflare, etc.), browser bugs, third-party CDN (Google Fonts, Tailwind CDN if used).

## Disclosure

Vulnerabilities will be disclosed via GitHub Security Advisories after a fix is released. Credit given to reporters unless anonymity requested.
