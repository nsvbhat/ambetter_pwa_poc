# Ambetter Health PWA - Quick Start Guide

## 🎉 Your PWA is Ready!

The Ambetter Health PWA project has been successfully created and is now running on `http://localhost:3000`

### What You Have

A fully functional Progressive Web App (PWA) that demonstrates:

1. **Dynamic Image Updates** - Change images on the server without redeploying the app
2. **Field Name Changes** - Modify form structures on the server without redeploying the app  
3. **New Services/Pages** - Add new features on the server without redeploying the app

---

## 🚀 Quick Start

### Development Server
```bash
npm run dev
# Runs on http://localhost:3000
```

### Production Build
```bash
npm run build
npm start
```

---

## 📋 Project Overview

### Key Folders
- **`src/app/`** - Pages and API routes
- **`src/components/`** - React components (Navigation, PWA Setup)
- **`public/`** - Static assets (manifest, offline page, icons)

### Key Files

#### Pages
- **`src/app/page.tsx`** - Home page with 3 scenario cards
- **`src/app/scenario-1/page.tsx`** - Demo: Dynamic image updates
- **`src/app/scenario-2/page.tsx`** - Demo: Field name changes
- **`src/app/scenario-3/page.tsx`** - Demo: New services

#### API Routes
- **`src/app/api/config/logo/route.ts`** - Serves dynamic logo URL
- **`src/app/api/schema/fields/route.ts`** - Serves form schema
- **`src/app/api/services/list/route.ts`** - Serves available services
- **`src/app/api/scenarios/route.ts`** - Serves scenario list

#### PWA Configuration
- **`public/manifest.json`** - Web App Manifest for installation
- **`src/app/sw.js/route.ts`** - Service Worker (caching & offline)
- **`src/components/PWAInstall.tsx`** - Install prompt UI
- **`src/components/PWAInit.tsx`** - Service worker registration

---

## 🎯 How Each Scenario Works

### Scenario 1: Dynamic Image Updates
**What it does**: Fetch logo URL from the server at runtime

**Files involved**:
- `src/components/Navigation.tsx` - Displays logo
- `src/app/api/config/logo/route.ts` - Returns logo URL from env var
- `src/app/scenario-1/page.tsx` - Demo page

**How to test**:
```bash
# 1. Edit .env.local
LOGO_URL=/your-new-logo.png

# 2. Refresh browser
# 3. Logo updates immediately without app redeployment!
```

**Real use case**: Change Ambetter branding, seasonal logos, promotional images without app update

---

### Scenario 2: Field Name Changes
**What it does**: Fetch form schema from server, render form dynamically

**Files involved**:
- `src/app/api/schema/fields/route.ts` - Returns form field definitions
- `src/app/scenario-2/page.tsx` - Renders form from schema

**How to test**:
```bash
# 1. Edit src/app/api/schema/fields/route.ts
# Change field objects:
{
  id: 'contactNumber',  // Change this
  label: 'Contact Number', // Or this
  type: 'tel',
  required: true,
}

# 2. Refresh browser
# 3. Form automatically updates without app redeployment!
```

**Real use case**: Rename fields for compliance, change validation, add new required fields

---

### Scenario 3: New Services & Pages
**What it does**: Fetch services list from server, display dynamically

**Files involved**:
- `src/app/api/services/list/route.ts` - Returns list of available services
- `src/app/scenario-3/page.tsx` - Displays services from API

**How to test**:
```bash
# 1. Edit src/app/api/services/list/route.ts
# Add new service:
{
  id: 'telehealth',
  name: 'Telehealth Visits',
  description: 'Schedule virtual doctor visits',
  icon: '💻',
  url: '/services/telehealth',
  isNew: true  // Shows "NEW" badge
}

# 2. (Optional) Create new page:
# src/app/services/telehealth/page.tsx

# 3. Refresh browser
# 4. New service appears immediately without app redeployment!
```

**Real use case**: Launch telehealth, add wellness programs, introduce new health services

---

## 🔧 Configuration

### Environment Variables
Create `.env.local`:
```env
LOGO_URL=/ambetter-logo.png
```

### PWA Manifest
Edit `public/manifest.json`:
- App name, icons, colors
- Shortcuts, categories
- Display mode

### Service Worker
Edit `src/app/sw.js/route.ts`:
- Caching strategies
- Offline behavior
- Cache versioning

---

## 🎨 Customization

### Change App Branding
1. **App name**: Edit `public/manifest.json` → `name`
2. **Colors**: Edit metadata in `src/app/layout.tsx` → `theme-color`
3. **Icons**: Replace PNGs in `public/`

### Modify Navigation
Edit `src/components/Navigation.tsx`:
- Fetch scenarios from API
- Add/remove navigation items
- Change styling

### Update Scenarios
- Add new scenario pages in `src/app/scenario-N/`
- Create corresponding API route
- Link from home page

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys on push
```

**Benefits**:
- Automatic HTTPS
- Service worker friendly
- Global CDN
- One-click deployments

### Self-Hosted
```bash
# Build
npm run build

# Run on your server
npm start
```

**Important**: Service workers require HTTPS in production

---

## 📱 Testing as PWA

### Desktop (Chrome/Edge)
1. Open DevTools (F12)
2. Go to "Application" tab
3. Click "Install app"

### iOS (Safari)
1. Open in Safari
2. Tap Share
3. Select "Add to Home Screen"

### Android (Chrome)
1. Open in Chrome
2. Tap ⋮ (menu)
3. Select "Install app"

---

## 🐛 Troubleshooting

### API returns 404
```bash
# Restart dev server
# Check file names are route.ts
# Verify paths match
```

### Service Worker not updating
```bash
# Clear cache:
# DevTools → Application → Cache Storage → Delete cache
# Then reload
```

### Changes not visible
```bash
# Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
# Or clear browser cache
```

### Images not loading
```bash
# Check public/ folder
# Verify path in code matches file name
# Check for CORS errors in console
```

---

## 📊 Key Concepts

### What Makes This a PWA?

1. **Installable** - Web App Manifest allows installation on home screen
2. **Offline First** - Service Worker caches pages and data
3. **Responsive** - Works on all device sizes
4. **Secure** - HTTPS required in production (automatic on Vercel)

### How Dynamic Updates Work?

```
Traditional App          →  Your PWA
├─ Update code          ├─ Update server
├─ Deploy to store      ├─ Deploy API
├─ User downloads       ├─ App fetches from server
└─ Takes 1-5 days       └─ Changes instant!
```

### Service Worker Cache Strategy

```
Browser Request
    ↓
Network (try first)
    ↓
If offline or fails → Cache (fallback)
    ↓
If no cache → Offline page
```

---

## 💡 Real-World Examples

### Health Insurance (Ambetter)
```
Scenario 1 (Logo): Update seasonal branding for different states
Scenario 2 (Fields): Add new required fields for compliance
Scenario 3 (Services): Launch new telehealth partners
```

### Financial Services
```
Scenario 1: Update rates and exchange rates
Scenario 2: Add new form fields for regulations
Scenario 3: Launch new investment products
```

### E-Commerce
```
Scenario 1: Update product images for sales
Scenario 2: Change form fields for new checkout flow
Scenario 3: Add new product categories
```

---

## 📚 Learn More

### Next.js
- [Next.js Docs](https://nextjs.org/docs)
- [API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

### PWA
- [MDN Web Docs - PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

### Web Standards
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)

---

## 🎓 Next Steps

1. ✅ **Run the app** - `npm run dev` (already running!)
2. 🔍 **Explore pages** - Visit all 3 scenarios
3. ✏️ **Modify API** - Change field names, add services
4. 📱 **Test as PWA** - Install on your device
5. 🚀 **Deploy** - Push to Vercel or your server

---

## 📞 Support

For issues:
1. Check the README.md
2. Review error messages in console (F12)
3. Check DevTools Application tab for caching issues
4. Verify API routes exist and return JSON

---

## 🎉 Summary

You now have a production-ready PWA that showcases:
- ✅ Dynamic image updates without app redeployment
- ✅ Field name changes without app redeployment
- ✅ New services/pages without app redeployment
- ✅ Offline functionality with service workers
- ✅ Installable on iOS, Android, and desktop

**Happy building!** 🚀
