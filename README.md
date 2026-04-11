# High Dee Dev — Portfolio Website

A modern, production-ready developer portfolio built with HTML, CSS, JavaScript, and Bootstrap 5.

## Project Structure

```
portfolio/
├── index.html              # Main HTML file (all sections)
├── assets/
│   ├── css/
│   │   └── style.css       # All custom styles (CSS variables, components, responsive)
│   ├── js/
│   │   └── main.js         # All interactivity (terminal, filtering, animations, form)
│   └── images/             # Add your photo as profile.jpg
└── README.md               # This file
```

## Features

- **Dark / Light Mode** toggle with localStorage persistence
- **Interactive Terminal** — type `help`, `whoami`, `skills`, `projects`, `contact`, `experience`, `philosophy`, `clear`
- **Project Filtering** — filter by tech tag (Laravel, PHP, JavaScript, MySQL, Bootstrap)
- **Animated Skill Bars** — IntersectionObserver-triggered progress bars
- **Typewriter Hero** — rotating role titles
- **Simulated GitHub Contribution Grid** — realistic heat-map pattern
- **Ajax Contact Form** — swap in your backend URL in `main.js`
- **Scroll Reveal Animations** — staggered fade-in on scroll
- **Custom Cursor Dot** — subtle cyan accent
- **Mobile-First Responsive** — full mobile nav overlay
- **Smooth Scroll Navigation** — active section highlighting

---

## Customisation Checklist

### 1. Add Your Photo
Place your photo at `assets/images/profile.jpg` and update the About section in `index.html`:
```html
<!-- Replace the placeholder div with: -->
<img src="assets/images/profile.jpg" alt="High Dee Dev" style="width:100%;height:100%;object-fit:cover;" />
```

### 2. Update Links
Search for `highDee-dev` in `index.html` and replace with your actual GitHub username.
Update LinkedIn, email, and live demo URLs throughout.

### 3. Connect the Contact Form
In `assets/js/main.js`, find the `initContactForm()` function and uncomment the fetch block:
```js
const res = await fetch('/contact.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
```
Create a `contact.php` file at your server root:
```php
<?php
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);
$to      = 'hello@highdeedev.com';
$subject = htmlspecialchars($data['subject'] ?? 'Portfolio Contact');
$body    = "Name: {$data['name']}\nEmail: {$data['email']}\n\n{$data['message']}";
$headers = "From: {$data['email']}";
$ok = mail($to, $subject, $body, $headers);
echo json_encode(['success' => $ok]);
```

### 4. Add Real Projects
Update the project cards in `index.html` with your actual:
- Project title & description
- `data-tags` attribute for filtering (space-separated: `laravel mysql bootstrap`)
- GitHub repo URL
- Live demo URL
- Thumbnail gradient color (CSS in `style=""`)

---

## Deployment

### Option A — GitHub Pages (Free, recommended)

1. Create a repository named `<your-username>.github.io` on GitHub
2. Push all files to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio launch"
   git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```
3. Go to **Settings → Pages → Source → main branch → / (root)**
4. Your site will be live at `https://<your-username>.github.io`

> **Note:** The Ajax contact form won't work on GitHub Pages (static only).
> Use a service like [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com) instead:
> ```js
> const res = await fetch('https://formspree.io/f/YOUR_ID', {
>   method: 'POST',
>   headers: { 'Content-Type': 'application/json' },
>   body: JSON.stringify(data),
> });
> ```

### Option B — Shared Hosting / VPS

1. Upload all files to your `public_html` or `www` directory via FTP/SFTP
2. Ensure `contact.php` is in the same root directory
3. Set file permissions: `644` for files, `755` for directories

### Option C — Vercel (Recommended for static)

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the portfolio directory
3. Follow the prompts — your site will be deployed instantly

---

## Tech Stack Used to Build This

| Layer      | Technology                      |
|------------|---------------------------------|
| Markup     | HTML5 (semantic, accessible)    |
| Styling    | CSS3 (custom properties, grid)  |
| Framework  | Bootstrap 5.3                   |
| JavaScript | Vanilla ES6+ (no dependencies)  |
| Fonts      | Google Fonts (Syne, JetBrains Mono, DM Sans) |

---

## Performance Notes

- Zero JS framework dependencies (pure vanilla JS)
- CSS variables for instant theme switching
- IntersectionObserver for efficient scroll animations
- Lazy skill bar animations (only fire when visible)
- No runtime CSS-in-JS overhead

---

## License

MIT — free to use, modify, and deploy for personal and commercial use.

---

> Built with ☕ and clean code by **High Dee Dev**
