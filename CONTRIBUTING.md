# Contributing to YuelinBlog

First off, thank you for considering contributing to YuelinBlog! It's people like you that make the open source community such a fantastic place to learn, inspire, and create.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title** for the issue to identify the problem
- **Describe the exact steps which reproduce the problem** in as many details as possible
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior
- **Explain which behavior you expected to see instead and why**
- **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title** for the issue to identify the suggestion
- **Provide a step-by-step description of the suggested enhancement** in as many details as possible
- **Provide specific examples to demonstrate the steps** or mockups if applicable
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why
- **Explain why this enhancement would be useful** to most YuelinBlog users

### Pull Requests

1. Fork the repository
2. Create a new branch from `main` for your feature or fix
3. Make your changes in your feature branch
4. Add or update tests as needed
5. Ensure your code follows the existing code style
6. Update documentation if necessary
7. Commit your changes with a clear commit message
8. Push your branch to your fork
9. Submit a pull request to the main repository

#### Pull Request Guidelines

- **Include a clear description** of what your PR does
- **Reference any related issues** in your PR description
- **Include tests** for new functionality
- **Update documentation** as needed
- **Keep commits atomic** - one feature/fix per commit when possible
- **Write clear commit messages** following conventional commit format

## Development Setup

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Setup Steps

1. Fork and clone the repository
```bash
git clone https://github.com/yourusername/next-blog.git
cd next-blog
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Development Workflow

1. Create a new branch for your feature
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and test them
3. Run the linter to ensure code quality
```bash
npm run lint
```

4. Build the project to ensure it compiles
```bash
npm run build
```

5. Commit your changes
```bash
git commit -m "feat: add your feature description"
```

6. Push your branch and create a pull request

## Project Structure

```
├── app/                 # Next.js App Router pages
├── components/         # Reusable React components
├── content/           # MDX blog posts
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── styles/            # CSS and styling
└── public/            # Static assets
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` types when possible

### React

- Use functional components with hooks
- Follow React best practices
- Use proper prop types

### Styling

- Use Tailwind CSS classes
- Follow the existing design system
- Ensure responsive design

### Code Formatting

- Use Prettier for code formatting
- Follow ESLint rules
- Use meaningful variable and function names

## Testing

- Write tests for new functionality
- Ensure existing tests pass
- Test your changes thoroughly before submitting

## Documentation

- Update README.md if you change functionality
- Add JSDoc comments for new functions
- Update type definitions as needed

## Community

- Be respectful and inclusive
- Help other contributors
- Share knowledge and best practices

## Questions?

If you have questions about contributing, feel free to:

- Open an issue for discussion
- Reach out on GitHub
- Check existing documentation

Thank you for contributing to YuelinBlog! 🎉