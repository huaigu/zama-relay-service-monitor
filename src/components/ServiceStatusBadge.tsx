import React, { useState } from 'react';
import type { ServiceStatusBadgeProps } from '../types';
import { useServiceStatus } from '../hooks/useServiceStatus';
import { StatusPopover } from './StatusPopover';
import { getStatusColorHex } from '../utils/statusMapper';

const DEFAULT_SERVICE_NAME = 'Relayer - Testnet';
const DEFAULT_API_URL = 'https://status.zama.ai/index.json';
const DEFAULT_REFRESH_INTERVAL = 60; // seconds
const DEFAULT_POSITION = 'bottom-right';

/**
 * ServiceStatusBadge - Main component to display service status badge
 */
export const ServiceStatusBadge: React.FC<ServiceStatusBadgeProps> = ({
  serviceName = DEFAULT_SERVICE_NAME,
  apiUrl = DEFAULT_API_URL,
  refreshInterval = DEFAULT_REFRESH_INTERVAL,
  position = DEFAULT_POSITION,
  className = '',
  style = {},
  onStatusChange,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Validate refresh interval
  const validatedInterval = Math.max(30, Math.min(300, refreshInterval));

  const statusData = useServiceStatus({
    serviceName,
    apiUrl,
    refreshInterval: validatedInterval,
    onStatusChange,
  });

  const { status, isLoading } = statusData;

  const handleBadgeClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const handleClosePopover = () => {
    setIsPopoverOpen(false);
  };

  const positionClass = `zss-position-${position}`;
  const statusColor = getStatusColorHex(status);

  return (
    <>
      <div
        className={`zss-badge ${positionClass} ${className}`}
        onClick={handleBadgeClick}
        style={style}
        role="button"
        tabIndex={0}
        aria-label={`Service status: ${status}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleBadgeClick();
          }
        }}
      >
        <div className="zss-badge-content">
          <span
            className={`zss-indicator ${isLoading ? 'zss-pulse' : ''}`}
            style={{ backgroundColor: statusColor }}
            aria-hidden="true"
          />
          <span className="zss-badge-text">Zama Status</span>
        </div>
      </div>

      {isPopoverOpen && (
        <StatusPopover statusData={statusData} onClose={handleClosePopover} />
      )}
    </>
  );
};

// Default export
export default ServiceStatusBadge;
