export interface StorageItem {
  key: string;
  value: any;
  timestamp: number;
}

// Save data to local storage
export const saveToStorage = (key: string, data: any): void => {
  try {
    const item: StorageItem = {
      key,
      value: data,
      timestamp: Date.now(),
    };
    
    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error(`Error saving to storage (${key}):`, error);
  }
};

// Get data from local storage
export const getFromStorage = <T>(key: string): T | null => {
  try {
    const storedItem = localStorage.getItem(key);
    
    if (!storedItem) {
      return null;
    }
    
    const item: StorageItem = JSON.parse(storedItem);
    return item.value as T;
  } catch (error) {
    console.error(`Error getting from storage (${key}):`, error);
    return null;
  }
};

// Check if we're online
export const isOnline = (): boolean => {
  return navigator.onLine;
};

// Queue for pending actions to be executed when online
export const addToPendingQueue = (action: { type: string; payload: any }): void => {
  try {
    const queue = getFromStorage<Array<{ type: string; payload: any }>>('pendingActions') || [];
    queue.push(action);
    saveToStorage('pendingActions', queue);
  } catch (error) {
    console.error('Error adding to pending queue:', error);
  }
};

// Process pending actions when back online
export const processPendingActions = async (): Promise<void> => {
  const pendingActions = getFromStorage<Array<{ type: string; payload: any }>>('pendingActions');
  
  if (!pendingActions || pendingActions.length === 0) {
    return;
  }
  
  // Process each action - in a real app this would call appropriate API endpoints
  for (const action of pendingActions) {
    try {
      console.log(`Processing offline action: ${action.type}`);
      // Example of how we'd process different action types
      switch (action.type) {
        case 'SUBMIT_COMPLAINT':
          // In a real app: await api.submitComplaint(action.payload);
          console.log('Would submit complaint:', action.payload);
          break;
        case 'UPDATE_COMPLAINT':
          // In a real app: await api.updateComplaint(action.payload);
          console.log('Would update complaint:', action.payload);
          break;
        default:
          console.warn(`Unknown action type: ${action.type}`);
      }
    } catch (error) {
      console.error(`Error processing action ${action.type}:`, error);
      // If we failed, we could keep the action in the queue for retry
      continue;
    }
  }
  
  // Clear the queue after successful processing
  saveToStorage('pendingActions', []);
};

// Setup online/offline event listeners
export const setupOfflineListeners = (): void => {
  window.addEventListener('online', () => {
    console.log('App is back online, processing pending actions');
    processPendingActions();
  });
  
  window.addEventListener('offline', () => {
    console.log('App is offline, changes will be queued');
  });
};
