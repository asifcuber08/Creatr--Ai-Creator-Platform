# 🎨 Creatr AI Platform

Creatr AI Platform is a full-stack AI-powered content creation and social engagement platform. It allows creators to post content, track analytics, interact with followers, and manage posts seamlessly—all with a modern, responsive design.

> 🔐 Auth powered by [Clerk](https://clerk.dev)  

> 🖼️ Images stored via [ImageKit.io](https://imagekit.io)  

> 📷 Stock photos fetched from [Unsplash](https://unsplash.com)  

> ⚡ Realtime backend using [Convex](https://convex.dev)

> 🖼️ AI-powered content management

> 📊 Analytics and dashboards with real-time updates

---

## 🚀 Features

- 📝 Create & Manage Posts: Draft, publish, and track posts.
    - 🧠 AI-powered content generation: Automatically generate captions, descriptions, or content ideas.
    - ✂️ AI Background Removal: Remove or replace image backgrounds.

    - 🎨 Image editing & enhancement: Resize, crop, and apply visual adjustments.

- 👥 Followers & Engagement: Follow/unfollow, comment, like posts.

- 📊 Analytics Dashboard: Views, likes, comments, followers, and growth tracking.

- 🏷️ Draft System: Badge indicators for in-progress posts.

- ⚡ Realtime Backend: Powered by Convex queries & mutations.

- 🔐 Authentication: Sign-up/sign-in with Clerk (email & social).

- 💻 Fully responsive design with mobile-friendly sidebar overlay and blurred, translucent top navbar.
---

## ⚙️ Tech Stack

- **Frontend**: Next.js 14+, Tailwind CSS, React
- **Backend**: [Convex](https://convex.dev)
- **Auth**: [Clerk.dev](https://clerk.dev)
- **Image Storage**: [ImageKit.io](https://imagekit.io)
- **Stock Photos**: [Unsplash API](https://unsplash.com/developers)
- **UI Components**: shadcn/ui
- **Icons/Spinners**: lucide-react, react-spinners
- **State Management**: Context API

---

## 🧪 Local Development

```bash
git clone https://github.com/asifcuber08/Creatr--Ai-Creator-Platform
cd Creatr--Ai-Creator-Platform

npm install
npm run dev
&&
npx convex dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

---
## 📁 Environment Variables (.env)
# Local Deployment
Get the all Environments Variable From Convex, Clerk, ImageKit and Gemini Api Key

```bash
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in #use as it is
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up #use as it is

CLERK_JWT_ISSUER_DOMAIN=

NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=

GEMINI_API_KEY=
```

---
## 📁 Environment Variables (.env)
# Vercel Deployment
Sign up and get all the Environments Variable From Convex, Clerk, ImageKit and Gemini Api Key

```bash
CONVEX_DEPLOY_KEY=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in #use as it is
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up #use as it is

CLERK_JWT_ISSUER_DOMAIN=

NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=

GEMINI_API_KEY=
```

---

## 📊 Dashboard & Analytics
- Track views, likes, comments per post.
- Monitor follower growth.
- See recent activity like likes, comments, and follows in real-time.
- Daily and monthly analytics charts for post engagement trends.

---

## 📱 Responsive Design
- Blurred and translucent top navbar for a modern look.
- Mobile sidebar overlay with darkened background for clarity.
- Smooth animations and transitions for interactions.

---


## 🔐 Authentication with Clerk
#### Clerk handles:
- Signup/Login (email, social)
- Auth state
- Session and secure user data

---

## 🚀 Deployment
#### Hosted on Vercel
⚠️ Note: File and folder names are case-sensitive on Vercel

---

## 📥 Contributing
Pull requests are welcome!
If you find a bug or want to add a feature, feel free to open an issue.

---

## 👤 Author
Made with ❤️ by [Asif Shamim](https://github.com/asifcuber08)
