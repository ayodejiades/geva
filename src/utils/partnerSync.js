// src/utils/partnerSync.js
class PartnerSync {
  constructor() {
    this.channel = typeof window !== 'undefined' && 'BroadcastChannel' in window
      ? new BroadcastChannel('geva_partner_sync')
      : null;
  }

  broadcast(type, payload) {
    if (!this.channel) return;
    this.channel.postMessage({
      type,
      payload,
      timestamp: new Date().toISOString()
    });
  }

  subscribe(callback) {
    if (!this.channel) return () => {};
    const handler = (event) => callback(event.data);
    this.channel.addEventListener('message', handler);
    return () => this.channel.removeEventListener('message', handler);
  }
}

export const partnerSync = new PartnerSync();
