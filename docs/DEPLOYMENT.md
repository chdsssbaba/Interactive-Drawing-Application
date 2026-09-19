# Deployment Guide — Render

This guide provides instructions for deploying CanvasCraft on **Render** as a Static Site service.

---

## 1. Prerequisites
- A GitHub or GitLab account with the CanvasCraft repository pushed.
- A free [Render account](https://render.com/).

---

## 2. Recommended Service: Render Static Site

Because CanvasCraft is an optimized client-side React single-page application built with Vite, deploying as a **Static Site** offers optimal performance, zero cost, global CDN distribution, and instant cache invalidation.

### Configuration Details

| Property | Value | Notes |
|---|---|---|
| **Service Type** | Static Site | Instant CDN hosting |
| **Name** | `canvascraft-studio` | Or custom name |
| **Branch** | `main` | Production branch |
| **Build Command** | `npm install && npm run build` | Compiles Tailwind & Vite bundle |
| **Publish Directory** | `dist` | Generated build output directory |

---

## 3. Step-by-Step Deployment Walkthrough

1. **Log in to Render**: Navigate to [dashboard.render.com](https://dashboard.render.com/).
2. **Create New Static Site**:
   - Click the **New +** button in the upper right header.
   - Select **Static Site**.
3. **Connect Repository**:
   - Choose your Git provider (GitHub / GitLab).
   - Authorize access and select your `build-interactive-drawing-application-with-react-and-canvas-api` repository.
4. **Configure Build Settings**:
   - **Name**: `canvascraft-studio`
   - **Branch**: `main`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. **Deploy**:
   - Click **Create Static Site**.
   - Render will clone the repository, run `npm install`, compile the assets via Vite, and deploy the `dist/` directory across its global CDN edge network.
6. **Access Application**:
   - Once the build log displays `Your site is live at https://<your-service>.onrender.com`, click the link to launch the studio.

---

## 4. Alternative: Deploying as a Web Service (Node.js)

If you prefer to run a continuous Node.js server rather than a static site:
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run preview -- --port $PORT --host`
- **Environment Variables**:
  - `NODE_VERSION`: `20.x` or `22.x`

---

## 5. Troubleshooting Common Issues

### Issue 1: Build fails with "Command not found: vite"
- **Cause**: Dependencies were not installed before running the build command.
- **Solution**: Ensure your Render Build Command is set to `npm install && npm run build`.

### Issue 2: 404 on page refresh or direct navigation
- **Cause**: Client-side routing rewrite rule missing.
- **Solution**: In your Render Static Site settings under **Redirects/Rewrites**:
  - **Source**: `/*`
  - **Destination**: `/index.html`
  - **Action**: `Rewrite`

### Issue 3: Blank page or MIME type error
- **Cause**: Incorrect publish directory specified in Render dashboard.
- **Solution**: Verify that the Publish Directory is strictly configured as `dist`.
