import { Injectable } from '@nestjs/common';
import { ChatSession } from './chat-session.interface';

/**
 * @class ChatSessionService
 * @description Gestiona las sesiones de chat de los usuarios en memoria.
 * Este servicio es responsable de crear, recuperar, actualizar y eliminar
 * las sesiones de chat. Cada sesión se almacena en un mapa utilizando el ID de sesión como clave.
 */
@Injectable()
export class ChatSessionService {
  /**
   * @private
   * @property {Map<string, ChatSession>} sessions - Almacenamiento en memoria para las sesiones de chat.
   * La clave es el ID de la sesión y el valor es el objeto ChatSession.
   */
  private readonly sessions = new Map<string, ChatSession>();

  /**
   * @method getSession
   * @description Recupera una sesión por su ID. Si no existe, crea una nueva.
   * @param {string} sessionId - El identificador único para la sesión.
   * @returns {ChatSession} La sesión de chat existente o recién creada.
   */
  getSession(sessionId: string): ChatSession {
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, {
        sessionId,
        messages: [],
      });
    }
    return this.sessions.get(sessionId)!;
  }

  /**
   * @method updateSession
   * @description Actualiza el estado de una sesión de chat específica.
   * @param {string} sessionId - El ID de la sesión a actualizar.
   * @param {Partial<ChatSession>} updates - Un objeto que contiene las propiedades de la sesión a actualizar.
   * @returns {ChatSession} La sesión de chat actualizada.
   */
  updateSession(sessionId: string, updates: Partial<ChatSession>): ChatSession {
    const session = this.getSession(sessionId);
    const updatedSession = { ...session, ...updates };
    this.sessions.set(sessionId, updatedSession);
    return updatedSession;
  }

  /**
   * @method clearSession
   * @description Elimina una sesión de la memoria.
   * @param {string} sessionId - El ID de la sesión a eliminar.
   */
  clearSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }
}
