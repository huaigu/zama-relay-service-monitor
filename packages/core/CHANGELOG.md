# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-XX

### Added
- Initial release of @zama-ai/service-status-monitor
- ServiceStatusBadge component for displaying service status
- StatusPopover component for detailed service information
- useServiceStatus hook for data fetching and state management
- Auto-refresh with configurable intervals (30-300 seconds)
- Support for monitoring any Betterstack service by name
- CSS variables for easy customization
- Full TypeScript support with type definitions
- SSR support for Next.js
- Responsive design for mobile and desktop
- Multiple badge positions (bottom-right, bottom-left, top-right, top-left)
- Status change callback support
- Comprehensive documentation and examples

### Features
- Lightweight (<5KB gzipped)
- Zero dependencies (only React peer dependency)
- Real-time status updates
- Error handling and retry mechanism
- Accessibility support (keyboard navigation, ARIA labels)
- Dark mode ready (via CSS variables)

[1.0.0]: https://github.com/zama-ai/service-status-monitor/releases/tag/v1.0.0
