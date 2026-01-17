# Deployment Guide - Ambetter PWA

## 🚀 Deployment Options

### Option 1: Vercel (Recommended - 5 minutes)

**Why Vercel?**
- Made by Next.js creators
- One-click deployment
- Automatic HTTPS
- Service worker friendly
- Global CDN

**Steps:**

1. **Connect to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Import your GitHub repo
   - Click "Deploy"

3. **Set Environment Variables**
   - In Vercel Dashboard → Settings → Environment Variables
   - Add: `LOGO_URL=/ambetter-logo.png`
   - Redeploy

4. **Done!** Your app is live with:
   - Automatic HTTPS
   - Service workers active
   - CDN distribution
   - Analytics included

---

### Option 2: Netlify (5 minutes)

**Steps:**

1. **Build and Deploy**
   ```bash
   npm install -g netlify-cli
   netlify deploy
   ```

2. **Or Connect GitHub**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Select repository
   - Build command: `npm run build`
   - Publish: `.next`
   - Deploy

3. **Set Environment Variables**
   - Site settings → Build & deploy → Environment
   - Add `LOGO_URL` variable
   - Redeploy

---

### Option 3: AWS Amplify (10 minutes)

**Steps:**

1. **Create Amplify App**
   ```bash
   npm install -g @aws-amplify/cli
   amplify init
   amplify add hosting
   amplify publish
   ```

2. **Or use AWS Console**
   - Go to AWS Amplify
   - Connect your GitHub repo
   - Configure build settings:
     - Build: `npm run build`
     - Output: `.next`
   - Deploy

---

### Option 4: Self-Hosted (Your Server)

**Prerequisites:**
- Node.js 18+
- HTTPS certificate (required for PWA)
- Server with 512MB+ RAM

**Steps:**

1. **SSH into your server**
   ```bash
   ssh user@your-server.com
   ```

2. **Clone and setup**
   ```bash
   git clone <repo-url>
   cd ambetter_pwa
   npm install
   ```

3. **Create `.env.local`**
   ```bash
   LOGO_URL=/ambetter-logo.png
   NODE_ENV=production
   ```

4. **Build**
   ```bash
   npm run build
   ```

5. **Start with PM2** (Keep running)
   ```bash
   npm install -g pm2
   pm2 start npm --name "ambetter-pwa" -- start
   pm2 save
   pm2 startup
   ```

6. **Setup HTTPS with Let's Encrypt**
   ```bash
   sudo apt install certbot
   sudo certbot certonly --standalone -d your-domain.com
   ```

7. **Reverse Proxy with Nginx**
   ```nginx
   server {
     listen 443 ssl http2;
     server_name your-domain.com;
     
     ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
     ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
     
     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

8. **Restart Nginx**
   ```bash
   sudo systemctl restart nginx
   ```

---

### Option 5: Docker (Containerized)

**Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy files
COPY package*.json ./
RUN npm ci

COPY . .

# Build
RUN npm run build

# Start
EXPOSE 3000
CMD ["npm", "start"]
```

**Build and Run:**
```bash
# Build image
docker build -t ambetter-pwa .

# Run container
docker run -p 3000:3000 \
  -e LOGO_URL=/ambetter-logo.png \
  ambetter-pwa
```

**Docker Compose:**
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      LOGO_URL: /ambetter-logo.png
      NODE_ENV: production
```

Run with: `docker-compose up -d`

---

## 🔐 Security Checklist

Before going to production:

- [ ] Enable HTTPS (required for PWA)
- [ ] Set `NODE_ENV=production`
- [ ] Update `manifest.json` branding
- [ ] Test offline functionality
- [ ] Test service worker updates
- [ ] Verify API routes don't expose secrets
- [ ] Set up monitoring/error tracking
- [ ] Configure CORS if needed
- [ ] Enable security headers

**Add Security Headers:**
```javascript
// next.config.js
headers: async () => {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        }
      ]
    }
  ];
}
```

---

## 📊 Performance Optimization

### Before Deployment:

1. **Optimize Images**
   ```bash
   # Install ImageMagick
   brew install imagemagick
   
   # Compress PNG icons
   convert icon-512.png -strip -quality 80 icon-512-optimized.png
   ```

2. **Build Analysis**
   ```bash
   npm install --save-dev @next/bundle-analyzer
   ```

3. **Run Lighthouse**
   - DevTools → Lighthouse tab
   - Run audit for Mobile
   - Target score: 90+

4. **Test on Real Devices**
   - iOS device with Safari
   - Android device with Chrome
   - Test offline mode
   - Test installation

---

## 🔄 Continuous Deployment

### GitHub Actions (Auto-deploy on push)

**.github/workflows/deploy.yml:**
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 🚨 Monitoring & Updates

### Setup Error Tracking

**Sentry Integration:**
```bash
npm install @sentry/nextjs
```

**next.config.js:**
```javascript
const withSentryConfig = require("@sentry/nextjs/withSentryConfig");

module.exports = withSentryConfig(nextConfig, {
  org: "your-org",
  project: "ambetter-pwa",
  authToken: process.env.SENTRY_AUTH_TOKEN,
});
```

### Service Worker Update Strategy

Update version when deploying:
```typescript
// src/app/sw.js/route.ts
const CACHE_NAME = 'ambetter-pwa-v2'; // Increment for new deployment
```

Users will automatically get new version on next visit!

---

## 📈 Scaling

### High Traffic Considerations

1. **Enable Caching**
   ```javascript
   // next.config.js
   headers: async () => {
     return [{
       source: '/_next/static/:path*',
       headers: [{
         key: 'cache-control',
         value: 'public, max-age=31536000, immutable',
       }],
     }];
   }
   ```

2. **Database for Dynamic Content**
   ```typescript
   // src/app/api/services/list/route.ts
   import { getServices } from '@/lib/db';
   
   export async function GET() {
     const services = await getServices();
     return NextResponse.json({ services });
   }
   ```

3. **Use CDN for Assets**
   - Move images to Cloudflare/CloudFront
   - Use custom domain
   - Serve globally

---

## 🆘 Troubleshooting Deployments

### Service Worker Not Working
```
Solution: Ensure HTTPS is enabled
Vercel: Automatic ✓
Netlify: Automatic ✓
Self-hosted: Use Let's Encrypt
```

### Stale Content Showing
```
Solution: Increment CACHE_NAME version
Service workers cache aggressively by design
Update version → New deployment → Users get fresh content
```

### Environment Variables Not Loading
```
Solution: Set in deployment platform
NOT in .env.local (local only)
Redeploy after setting variables
```

### API Returns 404 After Deploy
```
Solution: API routes must be in app/ directory
Check file structure: src/app/api/
Files must be named route.ts
Restart/redeploy
```

---

## ✅ Post-Deployment Checklist

After deploying to production:

- [ ] Test homepage loads
- [ ] Test all 3 scenarios work
- [ ] Verify images load (check Network tab)
- [ ] Test offline mode (DevTools → Throttle)
- [ ] Install PWA on device
- [ ] Verify manifest.json served correctly
- [ ] Check service worker registered (DevTools → Application)
- [ ] Test form submission (Scenario 2)
- [ ] Test service navigation (Scenario 3)
- [ ] Run Lighthouse audit
- [ ] Monitor errors (Sentry/logs)
- [ ] Share with team!

---

## 🎯 Summary

**Recommended**: Deploy to Vercel (easiest, best PWA support)

**Quick Setup**:
1. Push to GitHub
2. Connect to Vercel
3. Set env variables
4. Done! 🎉

**For Production**:
- Enable monitoring (Sentry)
- Setup CI/CD (GitHub Actions)
- Configure security headers
- Test on real devices
- Monitor performance

---

**Ready to launch your PWA?** 🚀
