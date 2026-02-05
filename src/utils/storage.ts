import type { GameState } from "@/types/game";

const STORAGE_KEY = "corgi-clicker-save";
const BACKUP_KEY = "corgi-clicker-backup";

/**
 * Manually save game state to localStorage
 * Note: Zustand persist middleware handles this automatically,
 * but this is useful for forced saves and backups
 */
export function saveGame(state: GameState): boolean {
  try {
    const saveData = {
      state,
      timestamp: Date.now(),
      version: state.schemaVersion,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
    return true;
  } catch (error) {
    console.error("Failed to save game:", error);
    return false;
  }
}

/**
 * Load game state from localStorage
 * Returns null if no save exists or save is corrupted
 */
export function loadGame(): GameState | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;

    const parsed = JSON.parse(saved);

    // Handle both Zustand persist format and our manual format
    if (parsed.state) {
      return parsed.state as GameState;
    }

    return parsed as GameState;
  } catch (error) {
    console.error("Failed to load game:", error);
    return null;
  }
}

/**
 * Create a backup of the current save
 * Useful before risky operations like prestige
 */
export function createBackup(): boolean {
  try {
    const current = localStorage.getItem(STORAGE_KEY);
    if (current) {
      localStorage.setItem(BACKUP_KEY, current);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Failed to create backup:", error);
    return false;
  }
}

/**
 * Restore from backup
 */
export function restoreBackup(): boolean {
  try {
    const backup = localStorage.getItem(BACKUP_KEY);
    if (backup) {
      localStorage.setItem(STORAGE_KEY, backup);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Failed to restore backup:", error);
    return false;
  }
}

/**
 * Check if a save exists
 */
export function hasSaveData(): boolean {
  return localStorage.getItem(STORAGE_KEY) !== null;
}

/**
 * Delete all save data
 */
export function deleteSaveData(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(BACKUP_KEY);
}

/**
 * Export save data as a downloadable JSON file
 * For manual backup by users
 */
export function exportSave(): void {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    console.warn("No save data to export");
    return;
  }

  const blob = new Blob([saved], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `corgi-clicker-save-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Import save data from a JSON file
 */
export function importSave(file: File): Promise<boolean> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);

        // Validate it looks like a save
        if (parsed.state || parsed.schemaVersion !== undefined) {
          localStorage.setItem(STORAGE_KEY, content);
          resolve(true);
        } else {
          console.error("Invalid save file format");
          resolve(false);
        }
      } catch (error) {
        console.error("Failed to import save:", error);
        resolve(false);
      }
    };

    reader.onerror = () => {
      console.error("Failed to read file");
      resolve(false);
    };

    reader.readAsText(file);
  });
}

/**
 * Get save data age in seconds
 */
export function getSaveAge(): number | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;

    const parsed = JSON.parse(saved);
    const timestamp = parsed.timestamp || parsed.state?.lastSaved;

    if (timestamp) {
      return Math.floor((Date.now() - timestamp) / 1000);
    }

    return null;
  } catch {
    return null;
  }
}
