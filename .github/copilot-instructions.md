# AI Coding Instructions for Education At Work Website

## Project Overview
This is a single-page educational website for Education At Work built as a GIT 418 final project. The site emphasizes student career opportunities through a clean, responsive design with embedded video content and application forms.

## Architecture & File Structure
- **`index.html`**: Single-page application with semantic sections (`#careers`, `#pro-staff`, `#partners`, `#impact`)
- **`styles.css`**: CSS-only styling with CSS variables for theming and mobile-first responsive design
- **`main.js`**: jQuery-based JavaScript (minimal implementation currently)
- **`img/`**: Contains EAW logos and brand assets

## Key Design Patterns

### CSS Variable System
Use the established color palette in `:root`:
```css
--primary-color: #FF6600;    /* Orange - primary actions */
--secondary-color: #607A75;  /* Gray - secondary elements */
--text-color: #333;          /* Dark gray - main text */
--link-color: #4D9FB2;       /* Blue - links and highlights */
```

### Responsive Layout Strategy
- **Mobile-first approach**: Base styles for mobile, then enhance with media queries
- **Breakpoint at 768px**: Stack video/form vertically below, side-by-side above
- **Breakpoint at 769px**: Optimize video sizing and layout proportions
- **Flexbox-based**: `.video-container` uses flex for video/form positioning

### Section-Based Navigation
- Sticky header with anchor-link navigation to section IDs
- Each major section has consistent spacing and theming
- `#careers` section gets special dark background treatment

## Component Patterns

### Video Integration
YouTube embeds in responsive containers:
```html
<div class="video-container">
    <section id="video">
        <iframe width="560" height="315" src="...youtube.com/embed/...">
    </section>
</div>
```

### Form Styling
Forms use flexbox column layout with consistent gap spacing:
```css
form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 400px;
}
```

### Button Components
Two button patterns:
1. **`.job-btn`**: Link styled as button for external navigation
2. **`button[type="submit"]`**: Form submission buttons

## jQuery Integration
- jQuery 3.7.1 loaded via CDN before `main.js`
- `main.js` uses strict mode and jQuery ready function
- Currently minimal JS implementation - ready for plugin additions

## Development Workflows
- **Testing**: Open `index.html` directly in browser (no build process)
- **Responsive Testing**: Use browser dev tools to test breakpoints at 768px and 769px
- **Image Assets**: Place in `img/` directory, reference with relative paths

## Critical Conventions
- All navigation uses anchor links to section IDs (not separate pages)
- Video and form must be side-by-side on desktop, stacked on mobile
- Orange (#FF6600) is the primary brand color for CTAs and highlights
- Sticky header with transparent background and blur effect
- Form submissions are placeholder (no backend integration)

## External Dependencies
- **jQuery 3.7.1**: For future plugin integration and DOM manipulation
- **YouTube embeds**: For video content delivery
- **Google Fonts**: Ready for variable font integration (mentioned in conversations)

When modifying this codebase, maintain the single-page architecture, respect the established responsive breakpoints, and use the CSS variable system for consistent theming.
