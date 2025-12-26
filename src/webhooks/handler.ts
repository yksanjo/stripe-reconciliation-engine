import Stripe from 'stripe';
import { ReconciliationEngine } from '../reconciliation/engine';

export class WebhookHandler {
  private stripe: Stripe;
  private engine: ReconciliationEngine;

  constructor(stripe: Stripe, engine: ReconciliationEngine) {
    this.stripe = stripe;
    this.engine = engine;
  }

  async handle(event: Stripe.Event): Promise<void> {
    // Real-time reconciliation on webhook events
    if (event.type === 'charge.refunded' || event.type === 'charge.dispute.created') {
      // Trigger reconciliation for affected period
      await this.engine.reconcile(1); // Last day
    }
  }
}

