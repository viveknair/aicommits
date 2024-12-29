# Interactive Commit Message Refinement - Product Requirements Document

## Overview

This enhancement to AICommits introduces an interactive commit message refinement feature, allowing users to iteratively improve AI-generated commit messages through natural language feedback before final confirmation.

## Problem Statement

Currently, users must either accept the generated commit message or manually edit it. This leads to:

- Wasted time when generated messages are close but not perfect
- Friction in the commit workflow when messages need minor adjustments
- Missed opportunities to leverage the AI's capabilities for refinement

## Solution

Introduce an interactive refinement loop that:

1. Shows the generated commit message
2. Accepts natural language feedback from the user
3. Regenerates the message incorporating the feedback
4. Only commits when explicitly confirmed with "yes"

## Core Features

### 1. Interactive Feedback Loop

- Display generated commit message and prompt for feedback
- Accept natural language suggestions (e.g., "make it more concise", "mention the bug fix")
- Regenerate message incorporating user feedback
- Continue loop until user is satisfied

### 2. Explicit Confirmation

- Require explicit "yes" confirmation to proceed with commit
- Clear indication of how to accept or continue refinement
- Easy way to cancel the process

### 3. User Experience

Example interaction:

```
$ aicommits
→ Generated: "Add user authentication middleware for API endpoints"
? Is this message good? (Type feedback or 'yes' to accept)
> mention it uses JWT
→ Updated: "Add JWT-based user authentication middleware for API endpoints"
? Is this message good? (Type feedback or 'yes' to accept)
> yes
✓ Commit created successfully
```

## Technical Requirements

### Implementation Details

- Maintain state between refinement iterations
- Preserve context from original diff analysis
- Efficient prompt construction incorporating feedback
- Clear terminal UI for interaction

### Performance Considerations

- Quick response time for refinements (<5 seconds)
- Minimal additional API usage
- Memory-efficient state management

## Success Metrics

- Reduction in manual commit message edits
- Increased user satisfaction with final messages
- Decreased time spent on commit message creation
- Usage metrics of refinement feature

## Limitations

- Additional API costs for each refinement iteration
- Slightly longer commit process for interactive refinement
- Potential for increased API rate limiting

## Future Considerations

- Shortcuts for common refinement requests
- History of successful refinement patterns
- Team-specific refinement templates
- Batch refinement for multiple commits
