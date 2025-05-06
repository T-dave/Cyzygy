import { useEffect, useState } from 'react';
import { getPreference, PreferenceValue, setPreference } from './database';

export const usePreferences = () => {
  const [isReady, setIsReady] = useState(false);

  // Initialize on mount
  useEffect(() => {
    const init = async () => {
      try {
        // Just ensure database is ready
        await getPreference('__ready_check');
        setIsReady(true);
      } catch (error) {
        console.error('Preferences initialization failed:', error);
      }
    };
    init();
  }, []);

  const getPreferenceWithDefault = async <T extends PreferenceValue>(
    key: string, 
    defaultValue: T
  ): Promise<T> => {
    const value = await getPreference<T>(key);
    return value !== null ? value : defaultValue;
  };

  return {
    isReady,
    getPreference,
    setPreference,
    getPreferenceWithDefault
  };
};