# Flavorodo - Cafe themed Pomodoro Timer

A cute, hopefully animated cafe-themed pomodor timer to help people focus and get tasks done ON TIME.

## Project Overview

Flavorodo is a web-based pomodoro timer featuring:
- **25-minute work sessions** with cute cafe animations
- **5-minute breaks** with relaxing coffee brewing animations
- **15-minute long breaks** after 4 work sessions
- **Adorable cafe-themed visuals** including coffee cups, pastries, and cozy cafe ambiance with steam animations
- **Gentle sound effects** for notifications
- **Session tracking** with visual progress indicators
- **Responsive design** that works on all devices


## Development Plan

### Phase 1: Next.js Setup and Core Structure
- [ ] Initialize Next.js project with `npx create-next-app@latest flavorodo --typescript`
- [ ] Set up TypeScript configs
- [ ] Configure Tailwind for styling
- [ ] Create project folder structure

### Phase 2: Core Components and State Management
- [ ] Create TypeScript interfaces for timer state
- [ ] Build custom `useTimer` hook with React hooks
- [ ] Create main `Timer` component with countdown logic
- [ ] Implement `CoffeeCup` component with CSS animations
- [ ] Build `Controls` component (Start/Paause/Reset buttons)
- [ ] Create `SessionTracker` component for visual progress
- [ ] Set up state management with useState and useEffect

###Phase 3: Styling with Tailwind & Animations
- [ ] Configure Tailwind with custom cafe-themed colors
- [ ] Style the main timer container with card design
- [ ] Create coffee cup illustration using Tailwind utilities
- [ ] Add CSS animations for steam effects
- [ ] Style timer display with proper typography
- [ ] Design control buttons with hover effects
- [ ] Add floating pastry decorations with animations
- [ ] Implement responsive design with Tailwind breakpoints
- [ ] Add break-time theme variations


### Phase 4: Advanced Features & Interactivity
- [ ] Add notification sound using Next.js audio handling
- [ ] Implement browser notifications with Web Notifications API
- [ ] Add settings panel for customizable durations
- [ ] Implement keyboard shortcuts with event listeners
- [ ] Add local storage for user preference
- [ ] Create progress statistics tracking & dashboard
- [ ] Add dark/light theme toggle (Sunny day, Moon night??)


### Phase 5: Next.js Optimications & Deploy!
- [ ] Optimize components with React.memo
- [ ] Implement proper SEO with Next.js metadata
- [ ] Add PWA capabilities for mobile app experience
- [ ] Set up build optimization
- [ ] Deploy to Vercel
- [ ] Add analytics and error tracking

