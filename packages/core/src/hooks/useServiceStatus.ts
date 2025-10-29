import { useState, useEffect, useCallback, useRef } from 'react';
import type {
  ServiceStatusData,
  BetterstackApiResponse,
  ServiceStatus,
} from '../types';

export interface UseServiceStatusOptions {
  serviceName: string;
  apiUrl: string;
  refreshInterval: number;
  onStatusChange?: (status: ServiceStatus) => void;
}

/**
 * Custom hook to fetch and monitor service status from Betterstack API
 */
export function useServiceStatus({
  serviceName,
  apiUrl,
  refreshInterval,
  onStatusChange,
}: UseServiceStatusOptions): ServiceStatusData {
  const [status, setStatus] = useState<ServiceStatus>('operational');
  const [availability, setAvailability] = useState<number>(1);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const previousStatusRef = useRef<ServiceStatus>('operational');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: BetterstackApiResponse = await response.json();

      // Find the service by name in the included array
      const service = data.included.find(
        (item) =>
          item.type === 'status_page_resource' &&
          item.attributes.public_name === serviceName
      );

      if (!service) {
        throw new Error(`Service "${serviceName}" not found in API response`);
      }

      const newStatus = service.attributes.status;
      const newAvailability = service.attributes.availability;

      setStatus(newStatus);
      setAvailability(newAvailability);
      setLastUpdated(new Date());
      setIsLoading(false);

      // Trigger status change callback if status has changed
      if (previousStatusRef.current !== newStatus && onStatusChange) {
        onStatusChange(newStatus);
      }
      previousStatusRef.current = newStatus;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch service status';
      setError(errorMessage);
      setIsLoading(false);
      console.error('[useServiceStatus] Error:', errorMessage);
    }
  }, [apiUrl, serviceName, onStatusChange]);

  // Initial fetch
  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  // Setup auto-refresh interval
  useEffect(() => {
    if (refreshInterval > 0) {
      intervalRef.current = setInterval(() => {
        fetchStatus();
      }, refreshInterval * 1000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [refreshInterval, fetchStatus]);

  return {
    status,
    availability,
    serviceName,
    lastUpdated,
    isLoading,
    error,
    refresh: fetchStatus,
  };
}
