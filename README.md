# 🚀 Muhammad Huzaifa — Flutter Developer Portfolio

A premium, award-worthy developer portfolio built with:
- **HTML5** + **Tailwind CSS** (CDN)
- **Vanilla JavaScript** (modular architecture)
- **GSAP 3** (animations + ScrollTrigger)
- **Three.js** (3D particle background)
- **AOS** (Animate on Scroll)
- **Lenis** (smooth scrolling)
- **Firebase Firestore** (contact form backend)
- **Vercel** ready deployment

---

## 📁 Project Structure

```
/portfolio
├── public/
│   ├── images/              ← OG image, general images
│   ├── profile/             ← Your profile photo (alex-profile.jpg)
│   ├── icons/               ← favicon.svg
│   └── project-screenshots/ ← App screenshots
│
├── src/
│   ├── components/          ← UI components (each has its own .js)
│   ├── animations/          ← GSAP & scroll animations
│   ├── data/                ← All editable content lives here
│   ├── services/            ← Firebase service
│   ├── utils/               ← Helpers, theme manager
│   └── styles/              ← global.css
│
├── index.html               ← Single page entry point
├── vercel.json              ← Vercel deployment config
├── tailwind.config.js       ← Tailwind config (for local builds)
├── package.json
└── robots.txt
```

---

## ✏️ How to Customize

### 1. Update your info
Edit these data files in `src/data/`:
- `projects.js`   — Add/edit your projects
- `skills.js`     — Update skill levels
- `experience.js` — Your work history
- `social.js`     — Your social links

### 2. Add your profile photo
Place your photo at: `public/profile/alex-profile.jpg`

### 3. Add project screenshots
Place screenshots at: `public/project-screenshots/<name>.png`

### 4. Update personal details
Search for "Muhammad Huzaifa" in `index.html` and replace with your name/info.

---

## 🔥 Firebase Setup

1. Go to https://console.firebase.google.com
2. Create a new project
3. Enable **Firestore Database**
4. Go to Project Settings → Your Apps → Add Web App
5. Copy the config and paste into the `<script type="module">` block in `index.html`

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  ...
};
```

6. Add Firestore Security Rules:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contacts/{doc} {
      allow create: if request.resource.data.name is string
                    && request.resource.data.email is string
                    && request.resource.data.message is string;
      allow read: if false;
    }
  }
}
```

---

## 🪟 Windows 11 — Local Development

### Step 1: Install Node.js
```powershell
# Download from https://nodejs.org (LTS version)
# Or use winget:
winget install OpenJS.NodeJS.LTS
```

### Step 2: Verify installation
```powershell
node --version
npm --version
```

### Step 3: Navigate to project folder
```powershell
cd C:\Users\YourName\Documents\portfolio
```

### Step 4: Install dependencies
```powershell
npm install
```

### Step 5: Start dev server
```powershell
npm run dev
```
Open http://localhost:3000 in your browser.

---

## 🚀 Vercel Deployment (Windows 11)

### Step 1: Install Vercel CLI
```powershell
npm install -g vercel
```

### Step 2: Verify Vercel CLI
```powershell
vercel --version
```

### Step 3: Login to Vercel
```powershell
vercel login
```
Follow the browser prompt to authenticate.

### Step 4: Navigate to your portfolio folder
```powershell
cd C:\Users\YourName\Documents\portfolio
```

### Step 5: Deploy (first time — links project)
```powershell
vercel
```
Answer the prompts:
- **Set up and deploy?** → Y
- **Which scope?** → Select your account
- **Link to existing project?** → N
- **Project name?** → alex-rivera-portfolio
- **Directory?** → ./  (press Enter)
- **Override settings?** → N

### Step 6: Deploy to Production
```powershell
vercel --prod
```

### Step 7: Add custom domain (optional)
```powershell
vercel domains add alexrivera.dev
```
Then configure DNS at your domain registrar:
- Type: A, Name: @, Value: 76.76.21.21
- Type: CNAME, Name: www, Value: cname.vercel-dns.com

---

## 🔄 Subsequent Deployments

After making changes:
```powershell
vercel --prod
```

---

## 📦 Environment Variables (Vercel Dashboard)

If you prefer not to expose Firebase config in index.html, set these in Vercel:
- Go to vercel.com → Your Project → Settings → Environment Variables
- Add your Firebase config values

---

## ⚡ Performance Tips

- Compress images with https://squoosh.app before adding to `/public`
- Use WebP format for project screenshots
- Profile photo: aim for < 200KB
- Screenshots: aim for < 500KB each

---

## 📄 License

MIT — feel free to use and customize for your own portfolio.
