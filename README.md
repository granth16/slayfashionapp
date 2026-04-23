# 👗 FashionApp

**Your brand. Your app. Built in minutes.**

SlayFashionApp is a dynamic, Shopify-powered React Native app builder for fashion brands. Simply enter your brand name and Shopify store details — the app automatically fetches all your store data and generates a fully personalized, ready-to-ship mobile shopping experience tailored to your brand.

---

## ✨ What It Does

- 🔗 **Connects to your Shopify store** — just provide your brand name, store URL, and API credentials
- 🛍️ **Auto-fetches your catalog** — products, collections, pricing, inventory, and media pulled live from Shopify
- 🎨 **Personalizes the UI to your brand** — colors, typography, and layout adapt to your store identity
- 📦 **Dynamic shipping & checkout** — real-time shipping options and a seamless checkout flow
- ⚡ **No hardcoding needed** — everything is driven by your Shopify data

---

## 🚀 Getting Started

### Prerequisites

Make sure you've completed the [Set Up Your Environment](https://reactnative.dev/docs/environment-setup) guide before proceeding.

You'll also need:
- A Shopify store with Storefront API access enabled
- Your Shopify **store domain** (e.g. `your-brand.myshopify.com`)
- Your Shopify **Storefront API token**

---

### Step 1: Install Dependencies

```bash
npm install
# OR
yarn install
```

For iOS, install CocoaPods dependencies:

```bash
bundle install
bundle exec pod install
```

---

### Step 2: Configure Your Brand

Create a `.env` file in the root of the project and add your Shopify store details:

```env
SHOPIFY_STORE_DOMAIN=your-brand.myshopify.com
SHOPIFY_STOREFRONT_TOKEN=your_storefront_api_token
BRAND_NAME=Your Brand Name
```

> 💡 The app will use these details to fetch your catalog and personalize the entire experience automatically.

---

### Step 3: Start Metro

```bash
npm start
# OR
yarn start
```

---

### Step 4: Run the App

**Android:**
```bash
npm run android
# OR
yarn android
```

**iOS:**
```bash
npm run ios
# OR
yarn ios
```

---

## 🛠️ Tech Stack

- **React Native** — cross-platform mobile framework
- **Shopify Storefront API** — live product and store data
- **React Navigation** — smooth in-app navigation
- **Fast Refresh** — instant UI updates during development

---

## 📖 Learn More

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Shopify Storefront API](https://shopify.dev/docs/api/storefront)
- [Troubleshooting](https://reactnative.dev/docs/troubleshooting)

---

> Built with 🖤 for fashion brands that want to slay — online and on mobile.
