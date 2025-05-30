# Lumora Website - Deployment Guide

## Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm package manager
- Git

## Local Development

1. **Clone the repository:**
   \`\`\`bash
   git clone <your-repo-url>
   cd lumora-website
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Run the development server:**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Vercel Deployment

### Option 1: Deploy via Vercel Dashboard

1. **Connect your repository:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository

2. **Configure build settings:**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Environment Variables (if needed):**
   - Add any required environment variables in the Vercel dashboard

4. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically build and deploy your site

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   \`\`\`bash
   npm i -g vercel
   \`\`\`

2. **Login to Vercel:**
   \`\`\`bash
   vercel login
   \`\`\`

3. **Deploy:**
   \`\`\`bash
   vercel
   \`\`\`

## Troubleshooting Three.js Issues

### Common Three.js Deployment Issues:

1. **Server-Side Rendering (SSR) Issues:**
   - Three.js components are wrapped with `dynamic` imports and `ssr: false`
   - This prevents hydration mismatches

2. **Build Optimization:**
   - Three.js packages are optimized in `next.config.mjs`
   - Webpack externals are configured for better performance

3. **Memory Issues:**
   - Large 3D models should be optimized before deployment
   - Consider using compressed textures and models

### If Three.js Animation Still Fails:

1. **Check browser console for errors**
2. **Verify WebGL support:**
   \`\`\`javascript
   // Add this to debug WebGL support
   const canvas = document.createElement('canvas');
   const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
   console.log('WebGL supported:', !!gl);
   \`\`\`

3. **Fallback for unsupported devices:**
   - The components include fallback content for devices without WebGL support

## Build Commands

- **Development:** `npm run dev`
- **Build:** `npm run build`
- **Start production:** `npm run start`
- **Lint:** `npm run lint`

## Performance Optimization

1. **Images are optimized** using Next.js Image component
2. **Three.js packages are tree-shaken** for smaller bundle size
3. **Components are lazy-loaded** where appropriate
4. **CSS is optimized** with Tailwind CSS purging

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## File Structure

\`\`\`
lumora-website/
├── app/                    # Next.js app directory
├── components/             # React components
│   ├── ui/                # shadcn/ui components
│   └── three-components/  # Three.js components
├── public/                # Static assets
│   └── images/           # Image assets
├── lib/                   # Utility functions
└── styles/               # Global styles
\`\`\`

## Support

If you encounter any deployment issues:

1. Check the Vercel deployment logs
2. Verify all dependencies are correctly installed
3. Ensure Three.js components have proper fallbacks
4. Contact support if issues persist

## Environment Variables

No environment variables are required for basic functionality. If you add external APIs or services, configure them in the Vercel dashboard under Project Settings > Environment Variables.
