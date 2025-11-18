/**
 * Utilitário de logging que evita logs em produção
 * Só exibe logs quando NODE_ENV !== 'production'
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * Verifica se o ambiente atual é de desenvolvimento
 */
const isDevelopment = (): boolean => {
  return process.env.NODE_ENV !== 'production';
};

/**
 * Logger que só exibe logs em ambiente de desenvolvimento
 */
export const logger = {
  /**
   * Log de debug (apenas em desenvolvimento)
   */
  debug: (...args: any[]): void => {
    if (isDevelopment()) {
      console.debug('[DEBUG]', ...args);
    }
  },

  /**
   * Log de informação (apenas em desenvolvimento)
   */
  info: (...args: any[]): void => {
    if (isDevelopment()) {
      console.info('[INFO]', ...args);
    }
  },

  /**
   * Log de aviso (apenas em desenvolvimento)
   */
  warn: (...args: any[]): void => {
    if (isDevelopment()) {
      console.warn('[WARN]', ...args);
    }
  },

  /**
   * Log de erro (apenas em desenvolvimento)
   */
  error: (...args: any[]): void => {
    if (isDevelopment()) {
      console.error('[ERROR]', ...args);
    }
  },

  /**
   * Log condicional baseado no nível
   */
  log: (level: LogLevel, ...args: any[]): void => {
    if (isDevelopment()) {
      switch (level) {
        case 'debug':
          console.debug(`[${level.toUpperCase()}]`, ...args);
          break;
        case 'info':
          console.info(`[${level.toUpperCase()}]`, ...args);
          break;
        case 'warn':
          console.warn(`[${level.toUpperCase()}]`, ...args);
          break;
        case 'error':
          console.error(`[${level.toUpperCase()}]`, ...args);
          break;
      }
    }
  }
};

export default logger;
