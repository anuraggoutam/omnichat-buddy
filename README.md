# OmniChat Buddy - Web Application

This is the web application for OmniChat Buddy, a SaaS platform for multi-channel communication, marketing, and business automation.

## Tech Stack

- **Framework:** [React](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI:** [Shadcn UI](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/), [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **Routing:** [React Router](https://reactrouter.com/)
- **Data Fetching & State:** [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Authentication:** [Supabase](https://supabase.com/)

---

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Bun](https://bun.sh/) (optional, but recommended for faster dependency management)
- A [Supabase](https://supabase.com/) account and a new project.

### Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd omnichat-buddy
    ```

2.  **Install dependencies:**
    ```bash
    # Using npm
    npm install

    # Or using bun
    bun install
    ```

3.  **Set up environment variables:**
    - Copy the example environment file:
      ```bash
      cp .env.example .env.local
      ```
    - Open `.env.local` and add your Supabase project URL and anon key. You can find these in your Supabase project's "API" settings.
      ```env
      VITE_SUPABASE_URL="your-supabase-url"
      VITE_SUPABASE_PUBLISHABLE_KEY="your-supabase-anon-key"
      ```

4.  **Run the development server:**
    ```bash
    # Using npm
    npm run dev

    # Or using bun
    bun run dev
    ```
    The application should now be running on `http://localhost:5173` (or another port if 5173 is in use).

---

## Project Architecture

- **`src/pages`**: Contains the top-level component for each page/route in the application.
- **`src/components`**: Contains all reusable components, organized by feature (e.g., `leads`, `layout`, `ui`).
- **`src/lib`**: Contains shared libraries, utilities (`utils.ts`), and the API service layer (`api/`).
- **`src/integrations`**: Contains code for integrating with third-party services like Supabase.
- **`src/App.tsx`**: The main application component where routing is defined.

### Key Architectural Patterns

- **Routing:** The app uses `react-router-dom` for all routing. A nested route structure is used with a `ProtectedLayout` to ensure that all business-related routes require authentication.
- **Authentication:** User authentication is handled by Supabase. The `src/components/ProtectedRoute.tsx` component checks for an active session and redirects to the `/auth` page if the user is not logged in.
- **Data Fetching:** Data fetching is managed by `@tanstack/react-query`. API calls are centralized in the `src/lib/api/` directory.
- **UI:** The UI is built using Shadcn UI, which is a collection of reusable components built on top of Tailwind CSS and Radix UI.

---

## Current Status & Next Steps

This project is currently a **high-fidelity prototype**.

### What's Working:
- **UI/UX:** Most of the user interface is built and visually functional.
- **Authentication:** User sign-up, sign-in, and session management with Supabase are fully functional.
- **Routing:** All application routes are defined and protected by authentication.
- **Leads Page:** The Leads page has been refactored to use a mock API layer with `react-query`, serving as a template for other pages.

### What's NOT Working (Next Steps):
- **Backend Integration:** The application is **not connected to a real backend API**. All data, except for user authentication, is currently mocked or returns empty from the placeholder API service in `src/lib/api/`. The immediate next step is to build out a backend and connect the frontend API services to it.
- **Feature Completeness:** Many features outlined in the product specification (such as workflows, campaigns, AI engine) are only UI shells. The business logic needs to be implemented.
- **Placeholder Actions:** Many buttons and actions (e.g., "Create Order", "Start Workflow") are placeholders and do not have any functionality.

This README provides a starting point for developing the full application and connecting it to a live backend.
