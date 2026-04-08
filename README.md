# GitHub Explorer

A polished React app for searching GitHub users, comparing profiles, and exploring public developer data with a clean, responsive UI.
<img width="1180" height="622" alt="image" src="https://github.com/user-attachments/assets/158b40d4-2d49-47fc-b216-8d545f5572e3" />

Vercel link - https://github-stats-tracker-three.vercel.app/

## Overview

GitHub Explorer is a frontend project built to practice modern React patterns and API-driven UI design. It lets users search for GitHub profiles, view user details, compare two profiles, and visualize profile data with charts.

## Features

- Search GitHub users by username.
- View profile details such as avatar, bio, followers, following, and public repositories.
- Compare two GitHub profiles side by side.
- Show recent searches for quick access.
- Display repository and user data visually with charts.
- Handle loading and error states cleanly.

## Tech Stack

- **React** – component-based UI development.
- **React Router** – client-side routing for search, profile, and compare pages.
- **Zustand** – lightweight state management for recent searches and UI state.
- **React Query** – data fetching, caching, and request state management.
- **GitHub API** – source of user and repository data.
- **Recharts** – charts and data visualizations for profile insights.

## What I Learned

This project helped reinforce:
- route-based UI structure with React Router,
- global state management with Zustand,
- async data fetching patterns with React Query,
- working with a public API,
- building reusable components,
- creating charts with Recharts,
- and designing a clean user experience with proper loading and error handling.

## Getting Started

### Prerequisites

- Node.js installed
- npm or yarn installed

### Installation

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
npm install
npm run dev
```

## Project Structure

```txt
src/
  components/
  pages/
  store/
  services/
```

## Usage

1. Enter a GitHub username in the search bar.
2. Open a profile page to view details.
3. Compare two users to see their profile stats side by side.
4. Explore charts and visual summaries built with Recharts.

## Future Improvements

- Add repository sorting and filtering.
- Add more detailed chart breakdowns.
- Improve error handling for API rate limits.
- Add dark mode support if not already included.
- Add tests for key UI flows.

## License

This project is open source and available under the MIT License.
