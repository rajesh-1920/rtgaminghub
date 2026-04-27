# Contributing to RTGamingHub

Thank you for your interest in contributing to RTGamingHub! We welcome contributions from the community. Here's how you can help:

## Code of Conduct

Please be respectful and inclusive in all interactions. We're committed to providing a welcoming and harassment-free experience.

## How to Contribute

### Reporting Bugs
1. Check if the bug has already been reported
2. Provide a clear description and steps to reproduce
3. Include browser and device information
4. Attach screenshots if applicable

### Suggesting Features
1. Check if the feature has been suggested before
2. Clearly describe the feature and its benefits
3. Provide examples of how it would work
4. Explain why this feature would be valuable

### Submitting Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/rtgaminghub.git
   cd rtgaminghub
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Write clean, documented code
   - Test your changes thoroughly

4. **Commit your changes**
   ```bash
   git commit -m "Add your meaningful commit message"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Provide a clear description of changes
   - Reference any related issues
   - Include screenshots if UI changes

## Development Guidelines

### Code Style
- Use consistent indentation (2 spaces)
- Write meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### JavaScript Standards
- Use vanilla JavaScript (no frameworks)
- Avoid global variables when possible
- Use ES6 features when appropriate
- Write comments for function purposes

### CSS Guidelines
- Use Tailwind CSS utility classes
- Create reusable components
- Follow mobile-first approach
- Test responsive design

### HTML Best Practices
- Use semantic HTML
- Include proper accessibility attributes
- Optimize images
- Validate HTML5

## Testing

Before submitting:
1. Test on multiple browsers
2. Test on mobile devices
3. Check for console errors
4. Verify links work correctly
5. Test game functionality

## File Naming Conventions

- Use lowercase with hyphens: `file-name.js`
- CSS files: `style.css`
- HTML files: `index.html` or `home.html`
- JavaScript files: `script.js` or `[name].js`

## Adding a New Game

1. Create folder in `/games/[game-name]/`
2. Add `home.html`, `assets/css/home.css`, `assets/js/home.js`
3. Update `public/data/games.json`
4. Add game link to landing page or JSON-based loading
5. Include README in game folder
6. Test thoroughly

## Commit Message Guidelines

Use clear commit messages:
- ✨ `feat:` - New feature
- 🐛 `fix:` - Bug fix
- 📚 `docs:` - Documentation
- 🎨 `style:` - Code style
- ♻️ `refactor:` - Code refactoring
- 🚀 `perf:` - Performance improvements
- ✅ `test:` - Tests

Example: `feat: add leaderboard system`

## Documentation

- Update README.md for significant changes
- Add comments to complex code
- Document new functions and features
- Include examples where applicable

## Questions?

- Open an issue for discussion
- Check existing issues and discussions
- Reach out to maintainers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

We appreciate your contributions and look forward to seeing RTGamingHub grow!

Happy coding! 🎮
