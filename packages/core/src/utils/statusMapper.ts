import type { ServiceStatus, StatusColor } from '../types';

/**
 * Maps service status to color
 */
export function getStatusColor(status: ServiceStatus): StatusColor {
  const colorMap: Record<ServiceStatus, StatusColor> = {
    operational: 'green',
    degraded: 'yellow',
    downtime: 'red',
    maintenance: 'gray',
  };
  return colorMap[status];
}

/**
 * Maps service status to hex color code
 */
export function getStatusColorHex(status: ServiceStatus): string {
  const hexMap: Record<ServiceStatus, string> = {
    operational: '#10b981', // green-500
    degraded: '#f59e0b', // yellow-500
    downtime: '#ef4444', // red-500
    maintenance: '#6b7280', // gray-500
  };
  return hexMap[status];
}

/**
 * Maps service status to display text
 */
export function getStatusText(status: ServiceStatus): string {
  const textMap: Record<ServiceStatus, string> = {
    operational: 'Operational',
    degraded: 'Degraded',
    downtime: 'Down',
    maintenance: 'Maintenance',
  };
  return textMap[status];
}

/**
 * Formats availability percentage
 */
export function formatAvailability(availability: number): string {
  return `${(availability * 100).toFixed(2)}%`;
}

/**
 * Formats timestamp to readable string
 */
export function formatTimestamp(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
}
