import Stripe from 'stripe';
import { RefundMatcher } from './matchers/refundMatcher';
import { FeeMatcher } from './matchers/feeMatcher';
import { FXMatcher } from './matchers/fxMatcher';
import { DisputeMatcher } from './matchers/disputeMatcher';
import { ReconciliationIssue } from './matchers/refundMatcher';

export class ReconciliationEngine {
  private stripe: Stripe;

  constructor(stripe: Stripe) {
    this.stripe = stripe;
  }

  async reconcile(days: number = 30): Promise<ReconciliationIssue[]> {
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - (days * 24 * 60 * 60);
    
    const issues: ReconciliationIssue[] = [];
    
    const charges = await this.stripe.charges.list({ limit: 100, created: { gte: startDate } });
    
    for (const charge of charges.data) {
      // Match refunds
      const refunds = await this.stripe.refunds.list({ charge: charge.id });
      issues.push(...RefundMatcher.match(charge, refunds.data));
      
      // Match fees
      const balanceTx = await this.stripe.balanceTransactions.retrieve(charge.balance_transaction as string);
      issues.push(...FeeMatcher.match(charge, balanceTx));
      
      // Match FX
      issues.push(...FXMatcher.match(balanceTx));
    }
    
    // Match disputes
    const disputes = await this.stripe.disputes.list({ limit: 100, created: { gte: startDate } });
    for (const dispute of disputes.data) {
      if (dispute.charge) {
        const charge = await this.stripe.charges.retrieve(dispute.charge as string);
        issues.push(...DisputeMatcher.match(dispute, charge));
      }
    }
    
    return issues;
  }
}

