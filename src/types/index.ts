import { CSSProperties } from 'react';

/**
 * Service status values from Betterstack API
 */
export type ServiceStatus = 'operational' | 'degraded' | 'downtime' | 'maintenance';

/**
 * Status color mapping
 */
export type StatusColor = 'green' | 'yellow' | 'red' | 'gray';

/**
 * Badge position options
 */
export type BadgePosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

/**
 * Daily status history entry
 */
export interface StatusHistoryEntry {
  day: string;
  status: ServiceStatus;
  downtime_duration: number;
  maintenance_duration: number;
}

/**
 * Service resource attributes from Betterstack API
 */
export interface ServiceResourceAttributes {
  public_name: string;
  status: ServiceStatus;
  availability: number;
  status_history: StatusHistoryEntry[];
}

/**
 * Service resource from Betterstack API
 */
export interface ServiceResource {
  id: string;
  type: string;
  attributes: ServiceResourceAttributes;
}

/**
 * Betterstack API response structure
 */
export interface BetterstackApiResponse {
  data: {
    id: string;
    type: string;
    attributes: Record<string, unknown>;
  };
  included: ServiceResource[];
}

/**
 * Service status data returned by the hook
 */
export interface ServiceStatusData {
  status: ServiceStatus;
  availability: number;
  serviceName: string;
  lastUpdated: Date;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

/**
 * Props for ServiceStatusBadge component
 */
export interface ServiceStatusBadgeProps {
  /**
   * Name of the service to monitor
   * @default "Relayer - Testnet"
   */
  serviceName?: string;

  /**
   * Betterstack API URL
   * @default "https://status.zama.ai/index.json"
   */
  apiUrl?: string;

  /**
   * Auto-refresh interval in seconds
   * @default 60
   * @min 30
   * @max 300
   */
  refreshInterval?: number;

  /**
   * Badge position on screen
   * @default "bottom-right"
   */
  position?: BadgePosition;

  /**
   * Custom CSS class name
   */
  className?: string;

  /**
   * Inline styles (supports CSS variables)
   */
  style?: CSSProperties;

  /**
   * Callback fired when service status changes
   */
  onStatusChange?: (status: ServiceStatus) => void;
}
