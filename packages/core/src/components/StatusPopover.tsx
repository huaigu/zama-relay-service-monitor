import React from 'react';
import type { ServiceStatusData } from '../types';
import {
  getStatusText,
  formatAvailability,
  formatTimestamp,
  getStatusColorHex,
} from '../utils/statusMapper';

export interface StatusPopoverProps {
  statusData: ServiceStatusData;
  onClose: () => void;
}

export const StatusPopover: React.FC<StatusPopoverProps> = ({
  statusData,
  onClose,
}) => {
  const { status, availability, serviceName, lastUpdated, isLoading, error, refresh } =
    statusData;

  const handleRefresh = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await refresh();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="zss-popover-backdrop" onClick={handleBackdropClick}>
      <div className="zss-popover">
        <div className="zss-popover-header">
          <h3 className="zss-popover-title">Service Status</h3>
          <button
            className="zss-popover-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="zss-popover-content">
          {error ? (
            <div className="zss-error">
              <div className="zss-error-icon">⚠️</div>
              <p className="zss-error-message">{error}</p>
              <button className="zss-refresh-button" onClick={handleRefresh}>
                Retry
              </button>
            </div>
          ) : (
            <>
              <div className="zss-status-row">
                <span className="zss-label">Service:</span>
                <span className="zss-value">{serviceName}</span>
              </div>

              <div className="zss-status-row">
                <span className="zss-label">Status:</span>
                <div className="zss-status-badge">
                  <span
                    className="zss-status-indicator"
                    style={{ backgroundColor: getStatusColorHex(status) }}
                  />
                  <span className="zss-status-text">{getStatusText(status)}</span>
                </div>
              </div>

              <div className="zss-status-row">
                <span className="zss-label">Uptime (30d):</span>
                <span className="zss-value zss-availability">
                  {formatAvailability(availability)}
                </span>
              </div>

              <div className="zss-status-row">
                <span className="zss-label">Last Updated:</span>
                <span className="zss-value zss-timestamp">
                  {formatTimestamp(lastUpdated)}
                </span>
              </div>

              <button
                className="zss-refresh-button"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                {isLoading ? 'Refreshing...' : 'Refresh Now'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
