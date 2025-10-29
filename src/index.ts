// Main component export
export { ServiceStatusBadge, default } from './components/ServiceStatusBadge';

// Additional component export
export { StatusPopover } from './components/StatusPopover';

// Hook export
export { useServiceStatus } from './hooks/useServiceStatus';

// Type exports
export type {
  ServiceStatus,
  StatusColor,
  BadgePosition,
  StatusHistoryEntry,
  ServiceResourceAttributes,
  ServiceResource,
  BetterstackApiResponse,
  ServiceStatusData,
  ServiceStatusBadgeProps,
} from './types';

// Utility exports
export {
  getStatusColor,
  getStatusColorHex,
  getStatusText,
  formatAvailability,
  formatTimestamp,
} from './utils/statusMapper';

// Import styles
import './styles/index.css';
