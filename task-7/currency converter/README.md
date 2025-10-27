# Task 7: Styled Components Currency Converter

This project demonstrates the use of **styled-components** in React by converting the currency converter from Task 5 into a modern React application.

## Features

- **Styled Components**: All styling is done using styled-components CSS-in-JS library
- **Currency Conversion**: Real-time currency conversion using live exchange rates
- **Modern UI**: Beautiful gradient design with animations and hover effects
- **Responsive Design**: Works on all screen sizes
- **Error Handling**: Graceful fallback for API failures
- **Loading States**: Visual feedback during conversion

## Technologies Used

- **React 19**: Latest React with hooks
- **Styled Components**: CSS-in-JS styling library
- **Axios**: HTTP client for API requests
- **Day.js**: Lightweight date manipulation
- **Vite**: Fast build tool and dev server

## Styled Components Features Demonstrated

1. **Component Styling**: Each UI element is a styled component
2. **Props-based Styling**: Dynamic styling based on component props
3. **Nested Styling**: Child element styling within components
4. **Animations**: CSS animations defined within styled components
5. **Pseudo-selectors**: Hover, focus, and active states
6. **Media Queries**: Responsive design within components
7. **Theme-like Variables**: Consistent color scheme throughout

## Key Styled Components

- `AppContainer`: Main application wrapper with gradient background
- `GlowCard`: Animated card with rotating gradient border
- `Title`: Animated gradient text with floating effect
- `Input` & `Select`: Form elements with focus states
- `SwapButton`: Circular button with hover and spin animations
- `ConvertButton`: Gradient button with press animations
- `Result`: Dynamic result display with pop animation

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## API Integration

The app uses two currency exchange APIs with fallback:

1. **Primary**: `api.exchangerate.host`
2. **Fallback**: `open.er-api.com`

## Styling Approach

All styles are written as JavaScript template literals within styled components, providing:

- Type safety (with TypeScript)
- Dynamic styling based on props
- Scoped CSS (no global conflicts)
- Easy maintenance and refactoring
- Better developer experience

This implementation showcases the power and flexibility of styled-components in modern React development.

## Task 7 Requirements Met

✅ **Learning Objective**: Learn how to use styled components  
✅ **Duration**: 1 week  
✅ **Difficulty**: Intermediate  
✅ **Resource**: [styled-components.com/docs/basics](https://styled-components.com/docs/basics)  
✅ **Learning Outcome**: Presentation of Study/Practice of learning outcome

The currency converter from Task 5 has been successfully converted to use styled-components, demonstrating practical application of CSS-in-JS styling in React.

## 🤝 Contributing

This is an internship deliverable project. For suggestions or improvements, please reach out through the appropriate channels.

## 📄 License

This project is part of the FlexiSaf Internship Program. All rights reserved.

## 👨‍💻 Author

**Blaqbeard** - FlexiSaf Intern

- **Project:** Task 7 Intermediate Deliverable
- **Focus:** Styled-component Implementation
- **Duration:** 1 week development cycle

---

_Built with dedication and attention to detail for the FlexiSaf Internship Program_

**Last Updated:** October 2025
**Version:** 2.7.0
**Status:** Complete ✅
