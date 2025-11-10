import { supabase, isSupabaseConfigured } from './supabaseClient';
import { UserSettings, defaultSettings } from './settings-types';

export class SettingsService {
  /**
   * Get user settings from Supabase
   */
  static async getUserSettings(userId: string): Promise<UserSettings | null> {
    if (!isSupabaseConfigured) {
      console.warn('Supabase not configured, returning null');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No settings found, return default
          return null;
        }
        throw error;
      }

      return {
        userId: data.user_id,
        theme: data.theme,
        language: data.language,
        emailNotifications: data.email_notifications,
        pushNotifications: data.push_notifications,
        marketingEmails: data.marketing_emails,
        aiTemperature: data.ai_temperature,
        aiMaxTokens: data.ai_max_tokens,
        aiModel: data.ai_model,
        autoSaveProgress: data.auto_save_progress,
        showCompletionBadges: data.show_completion_badges,
        privacyMode: data.privacy_mode,
        updatedAt: data.updated_at
      };
    } catch (error) {
      console.error('Error fetching user settings:', error);
      return null;
    }
  }

  /**
   * Save complete user settings to Supabase
   */
  static async saveUserSettings(settings: UserSettings): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: settings.userId,
          theme: settings.theme,
          language: settings.language,
          email_notifications: settings.emailNotifications,
          push_notifications: settings.pushNotifications,
          marketing_emails: settings.marketingEmails,
          ai_temperature: settings.aiTemperature,
          ai_max_tokens: settings.aiMaxTokens,
          ai_model: settings.aiModel,
          auto_save_progress: settings.autoSaveProgress,
          show_completion_badges: settings.showCompletionBadges,
          privacy_mode: settings.privacyMode,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error saving user settings:', error);
      return false;
    }
  }

  /**
   * Update specific settings fields
   */
  static async updateUserSettings(
    userId: string, 
    updates: Partial<Omit<UserSettings, 'userId'>>
  ): Promise<boolean> {
    try {
      const dbUpdates: any = {
        updated_at: new Date().toISOString()
      };

      // Map camelCase to snake_case
      if (updates.theme !== undefined) dbUpdates.theme = updates.theme;
      if (updates.language !== undefined) dbUpdates.language = updates.language;
      if (updates.emailNotifications !== undefined) dbUpdates.email_notifications = updates.emailNotifications;
      if (updates.pushNotifications !== undefined) dbUpdates.push_notifications = updates.pushNotifications;
      if (updates.marketingEmails !== undefined) dbUpdates.marketing_emails = updates.marketingEmails;
      if (updates.aiTemperature !== undefined) dbUpdates.ai_temperature = updates.aiTemperature;
      if (updates.aiMaxTokens !== undefined) dbUpdates.ai_max_tokens = updates.aiMaxTokens;
      if (updates.aiModel !== undefined) dbUpdates.ai_model = updates.aiModel;
      if (updates.autoSaveProgress !== undefined) dbUpdates.auto_save_progress = updates.autoSaveProgress;
      if (updates.showCompletionBadges !== undefined) dbUpdates.show_completion_badges = updates.showCompletionBadges;
      if (updates.privacyMode !== undefined) dbUpdates.privacy_mode = updates.privacyMode;

      const { error } = await supabase
        .from('user_settings')
        .update(dbUpdates)
        .eq('user_id', userId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating user settings:', error);
      return false;
    }
  }

  /**
   * Initialize default settings for a new user
   */
  static async initializeUserSettings(userId: string): Promise<UserSettings> {
    const settings: UserSettings = {
      userId,
      ...defaultSettings
    };

    await this.saveUserSettings(settings);
    return settings;
  }
}