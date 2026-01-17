# 🧪 Testing Guide - Try the Examples

## ✅ Quick Test Checklist

This guide walks you through testing each scenario with concrete examples you can run right now.

---

## 📋 Pre-Test Setup

Make sure the dev server is running:
```bash
npm run dev
# Server running on http://localhost:3000
```

---

## 🧪 Test 1: Dynamic Image Updates

### What You'll See
A logo fetched from the server that you can change without redeploying the app.

### Instructions

**Step 1: Open the Home Page**
```
Go to: http://localhost:3000
Look for the Ambetter logo in the header
Click "Scenario 1" or navigate to http://localhost:3000/scenario-1
```

**Step 2: Note Current Logo**
```
Current logo shows: /ambetter-logo.png
This is fetched from the API
```

**Step 3: Create .env.local (if not exists)**
```bash
touch .env.local
# Add this:
LOGO_URL=/ambetter-logo.png
```

**Step 4: Create a Test Logo File**
```bash
# Create a simple SVG logo for testing
cat > public/test-logo.png.txt << 'EOF'
[This would be your test logo image]
EOF

# Or download a simple PNG and place in public/
```

**Step 5: Update Environment Variable**
```bash
# Edit .env.local
LOGO_URL=/test-logo.png
```

**Step 6: Restart Dev Server**
```bash
# Stop: Ctrl+C
# Start: npm run dev
```

**Step 7: Refresh Browser**
```
Go to: http://localhost:3000
Look at header - logo should show from new URL
```

**Step 8: Verify API Response**
```bash
# Open DevTools (F12)
# Go to Network tab
# Refresh page
# Find request: api/config/logo
# Click it
# See response: { "url": "/test-logo.png", ... }
```

### Expected Result ✅
```
✓ Logo changed without app redeployment
✓ API returned new URL
✓ No code changes needed
✓ Works on browser refresh
```

### Real-World Scenario
```
Manager says: "Update logo for New Year"
You do:
  1. Upload new logo to public/
  2. Update LOGO_URL in .env or database
  3. Deploy API (not app)
Users see: New logo on next refresh
Time to update: 5 minutes
App marketplace updates needed: 0
```

---

## 🧪 Test 2: Field Name Changes

### What You'll See
A form that updates its field names and structure when you change the API response.

### Instructions

**Step 1: Open Scenario 2**
```
Go to: http://localhost:3000/scenario-2
You see a form with fields:
- Contact Number (tel input)
- Email Address (email input)
- Membership Status (dropdown)
```

**Step 2: Inspect Current Schema**
```bash
# Open DevTools (F12)
# Go to Console
# Run: fetch('/api/schema/fields').then(r => r.json()).then(d => console.log(d))
# You see the form schema returned from API
```

**Step 3: Edit the API**
```bash
# Open: src/app/api/schema/fields/route.ts
# Change the schema fields:

CHANGE THIS:
{
  id: 'contactNumber',
  label: 'Contact Number',    ← Change label
  type: 'tel',
}

TO THIS:
{
  id: 'contactNumber',
  label: 'Primary Phone',      ← New label
  type: 'tel',
}

AND add new field:
{
  id: 'memberIdentifier',      ← New field
  label: 'Member ID',
  type: 'text',
  required: true,
  helpText: 'Found on your card'
}
```

**Step 4: Save File**
```
Save src/app/api/schema/fields/route.ts
Dev server auto-refreshes
```

**Step 5: Refresh Browser**
```
Go to: http://localhost:3000/scenario-2
Look at form:
- "Contact Number" now shows "Primary Phone"
- New "Member ID" field appears
```

**Step 6: Test the New Form**
```
Fill in the form:
- Primary Phone: +1-555-123-4567
- Email Address: test@example.com
- Member ID: AMB-12345
- Status: Active
Click Submit
```

**Step 7: Verify API Response**
```bash
# DevTools → Network tab
# Refresh page
# Find: /api/schema/fields request
# See response shows new field structure
```

### Expected Result ✅
```
✓ Form fields updated without app redeployment
✓ New "Primary Phone" label shows
✓ New "Member ID" field appears
✓ Help text displays correctly
✓ Form still works perfectly
✓ No user app update needed
```

### Real-World Scenario
```
Compliance Officer says: "HIPAA requires MRN field"
You do:
  1. Add field to /api/schema/fields/route.ts
  2. Deploy API
Users see: New field on next refresh
Time to implement: 10 minutes
App marketplace updates needed: 0
Existing users impacted: None (no redeployment)
```

---

## 🧪 Test 3: New Services & Pages

### What You'll See
A list of services that you can add to without updating the app.

### Instructions

**Step 1: Open Scenario 3**
```
Go to: http://localhost:3000/scenario-3
You see available services:
- Primary Care
- Prescription Management
- Claims Status
- Urgent Care Locator
- Telehealth Visits (NEW)
- Wellness Programs (NEW)
```

**Step 2: Check Current Service List**
```bash
# Open DevTools (F12)
# Go to Console
# Run: fetch('/api/services/list').then(r => r.json()).then(d => console.log(d))
# You see 6 services with 2 marked as isNew: true
```

**Step 3: Add a New Service**
```bash
# Edit: src/app/api/services/list/route.ts
# Add to services array:

{
  id: 'mental-health',
  name: 'Mental Health Support',
  description: 'Access mental health counseling and therapy',
  icon: '🧠',
  url: '/services/mental-health',
  isNew: true   ← This marks it as new with badge
}

# Add another:
{
  id: 'diabetes-care',
  name: 'Diabetes Care Program',
  description: 'Specialized diabetes management support',
  icon: '🏥',
  url: '/services/diabetes-care',
  isNew: true
}
```

**Step 4: Save File**
```
Save src/app/api/services/list/route.ts
Dev server auto-refreshes
```

**Step 5: Refresh Browser**
```
Go to: http://localhost:3000/scenario-3
Look at services list - new ones appear:
✨ Mental Health Support (NEW badge)
✨ Diabetes Care Program (NEW badge)
Total services now: 8 (was 6)
```

**Step 6: Test Service Navigation**
```
Click on "Mental Health Support"
Alert shows: "Navigation to: /services/mental-health"
This is where you'd link to new pages
```

**Step 7: Create New Service Page (Optional)**
```bash
# Create new page:
mkdir -p src/app/services/mental-health
touch src/app/services/mental-health/page.tsx

# Add content:
export default function MentalHealthPage() {
  return (
    <div>
      <h1>Mental Health Support</h1>
      <p>Find counseling and therapy services...</p>
    </div>
  )
}
```

**Step 8: Test Navigation**
```
Click on Mental Health Support service
Browser navigates to /services/mental-health
New page loads
No app redeployment needed!
```

**Step 9: Update Service Metadata**
```bash
# In /api/services/list/route.ts
# Change existing service:
{
  id: 'telehealth',
  name: 'Video Doctor Visits',  ← Changed from "Telehealth Visits"
  description: 'Schedule virtual appointments 24/7',
  icon: '📱',  ← Changed icon
  url: '/services/telehealth',
  isNew: false  ← No longer new
}
```

**Step 10: Refresh Browser**
```
Go to: http://localhost:3000/scenario-3
See updated service:
- Name changed to "Video Doctor Visits"
- Icon changed to 📱
- No longer shows "NEW" badge
```

### Expected Result ✅
```
✓ New services appear without app redeployment
✓ Services show with "NEW" badge
✓ Service list updates instantly
✓ Can navigate to new service pages
✓ Can update existing service metadata
✓ Total service count increases
✓ No user app update needed
```

### Real-World Scenario
```
Business says: "Launch partnership with major telehealth provider"
You do:
  1. Add service to /api/services/list/route.ts
  2. Create service page at /services/telehealth
  3. Deploy API + new page
Users see: New service on next app visit
Time to implement: 30 minutes
App marketplace updates needed: 0
Rollout time: Can do gradual (if using flags)
```

---

## 🔄 Advanced Test: Feature Flags

Combine all three scenarios for powerful control:

```bash
# Edit: src/app/api/services/list/route.ts

const NEW_SERVICES_ENABLED = true;  // Toggle feature

export async function GET() {
  let services = [...coreServices];
  
  if (NEW_SERVICES_ENABLED) {
    services.push(...newBetaServices);
  }
  
  return NextResponse.json({ services });
}
```

**Benefits:**
- Control feature rollout without app update
- Enable/disable features server-side
- A/B test new services
- Gradual rollouts to user groups

---

## 🎯 Complete Test Workflow

```
Start:     http://localhost:3000
           ↓
Test Scenario 1:
├─ Check logo in header
├─ Update LOGO_URL
├─ Restart server
├─ Verify logo changed
└─ No app redeployment needed ✓
           ↓
Test Scenario 2:
├─ Open scenario-2 page
├─ Update field schema
├─ Verify form changed
├─ Fill and submit form
└─ No app redeployment needed ✓
           ↓
Test Scenario 3:
├─ Open scenario-3 page
├─ Add new service to API
├─ Verify service appears
├─ Navigate to new service
└─ No app redeployment needed ✓
           ↓
Conclusion: All 3 scenarios work!
           PWA is powerful! 🎉
```

---

## 📊 Monitoring Changes

### DevTools Application Tab

1. **Service Worker Status**
   ```
   DevTools → Application → Service Workers
   Check: Registration status
   Check: Cache updates
   ```

2. **Cache Storage**
   ```
   DevTools → Application → Cache Storage
   View: ambetter-pwa-v1 cache
   See: Cached pages and APIs
   ```

3. **Network Tab**
   ```
   DevTools → Network
   Filter: XHR
   See: API calls
   See: JSON responses
   ```

### Browser Console

```javascript
// Check service worker registration
navigator.serviceWorker.getRegistrations()
  .then(r => console.log(r))

// Fetch and log API response
fetch('/api/config/logo')
  .then(r => r.json())
  .then(d => console.log('Logo URL:', d.url))

// Get all cached items
caches.keys().then(names => {
  names.forEach(name => {
    caches.open(name).then(cache => {
      cache.keys().then(requests => {
        console.log(name, requests.map(r => r.url))
      })
    })
  })
})
```

---

## 🐛 Common Issues & Solutions

### Change Not Showing

**Problem**: Updated API but page still shows old content

**Solution**:
```bash
# Hard refresh:
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)

# Or clear service worker cache:
DevTools → Application → Cache Storage
Delete "ambetter-pwa-v1"
Refresh page
```

### API Returns 404

**Problem**: fetch('/api/...') returns 404

**Solution**:
```bash
# Check file exists:
ls src/app/api/schema/fields/route.ts

# Restart dev server:
npm run dev

# Verify route name is exactly "route.ts"
```

### Dev Server Doesn't Reload

**Problem**: Changes to API not reflected

**Solution**:
```bash
# Stop and restart:
Ctrl+C
npm run dev

# Or check if file was saved:
Look for auto-save indicator in VS Code
```

### Images/Icons Not Loading

**Problem**: Logo or icons don't show

**Solution**:
```bash
# Check public folder:
ls public/

# Verify path is correct:
LOGO_URL=/ambetter-logo.png
(File should be at public/ambetter-logo.png)

# Check browser console for errors
F12 → Console tab
```

---

## 📱 Mobile Testing

### iPhone/iPad (Safari)

```
1. Share button → Add to Home Screen
2. Open from home screen (fullscreen PWA mode)
3. Make API change on server
4. Pull down to refresh
5. New content appears!
```

### Android (Chrome)

```
1. Menu (⋮) → Install app
2. Open from launcher
3. Make API change on server
4. Swipe down to refresh (or wait for SW to update)
5. New content appears!
```

### Desktop (Chrome DevTools Simulation)

```
1. F12 → Device toolbar
2. Select mobile device
3. Test responsive design
4. Check service worker works
5. Simulate offline mode
```

---

## ✅ Test Success Criteria

All tests pass when:

```
✓ Scenario 1: Logo updates without app deployment
✓ Scenario 2: Form fields change without app deployment
✓ Scenario 3: Services appear without app deployment
✓ Service Worker caches content
✓ App works offline
✓ Install prompt appears on first visit
✓ No errors in DevTools console
✓ Lighthouse score 90+
✓ All API routes return JSON
✓ All pages load correctly
```

---

## 🎉 You're Ready!

You now have a fully tested PWA that demonstrates:
- ✅ Dynamic image updates
- ✅ Field name changes
- ✅ New services/pages
- ✅ All without app marketplace redeployment

**Next Steps:**
1. Run through all tests above
2. Try your own modifications
3. Deploy to production
4. Monitor user adoption
5. Celebrate success! 🎉

---

Happy testing! If you hit any issues, check the README.md or VISUAL_GUIDE.md. 🚀
