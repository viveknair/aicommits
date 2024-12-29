# AICommits - Product Requirements Document

## Overview

AICommits is a command-line interface (CLI) tool that uses AI to generate meaningful git commit messages. By automatically analyzing staged changes, it provides high-quality, descriptive commit messages that save time and promote consistent version history documentation.

## Problem Statement

Manually writing clear commit messages can be time-consuming and inconsistent. This frequently leads to:

- Unclear commit histories
- Wasted developer time
- Inconsistent commit message standards
- Difficulties with code review and maintenance

## Solution

AICommits addresses these challenges by:

1. Analyzing staged changes (via `git diff`)
2. Generating contextual commits using OpenAI’s GPT models
3. Integrating seamlessly with existing git workflows
4. Allowing flexible formatting and customization

## Core Features

### 1. Basic Commit Message Generation

- Automatically generate commit messages from staged changes
- Integrate with standard git commit commands
- Use OpenAI’s GPT models for contextual, descriptive messages

### 2. Multiple Message Options

- Produce several commit messages
- Let users select their preferred option
- Configurable number of messages generated

### 3. Conventional Commits Support

- Optionally follow conventional commit standards
- Support semantic versioning
- Provide consistent commit categorization

### 4. Git Hook Integration

- Easily integrate via a prepare-commit-msg hook
- Allow manual override when needed
- Work smoothly with existing commit editor flows

### 5. Configuration Management

- Manage OpenAI API keys securely
- Customize message length, language, model choices
- Provide proxy and request timeout settings

## Technical Requirements

### System Requirements

- Node.js v14 or later
- Git installed
- OpenAI API access

### Dependencies

- OpenAI API client
- Git CLI tools
- CLI utility libraries
- TypeScript support

### Security

- Secure handling of API keys
- Local configuration file management
- Proxy support for secure environments

## User Experience

### Installation Flow

1. Install globally via npm
2. Provide OpenAI API key
3. Optionally set up a git hook

### Usage Patterns

1. Direct CLI:
   ```
   git add <files>
   aicommits
   ```
2. Git hook:
   ```
   git commit
   ```
3. Multiple messages:
   ```
   aicommits --generate <count>
   ```

### Configuration Interface

- Command-line based configuration
- Global and project-specific settings

## Performance Requirements

- Generate commit messages in under 10 seconds
- Lightweight memory usage
- Efficient diff parsing
- Stable and reliable API interaction

## Future Considerations

- Collaboration features for teams
- Custom message templates
- Advanced enterprise deployments
- Support for multiple AI models
- Analytics on commit messages

## Success Metrics

- Adoption rate
- Improved clarity in commit messages
- Reduced time spent drafting commits
- Positive user feedback
- Community engagement (e.g., GitHub stars)

## Limitations

- Requires active OpenAI API and internet connection
- Potential x costs for API usage
- Rate limits from OpenAI
- Context length restrictions in GPT models

## Release Strategy

1. Initial CLI release
2. Git hook integration
3. Conventional commits support
4. Expanded configuration options
5. Ongoing maintenance and improvements
