import Stripe from 'stripe';

export interface ReconciliationIssue {
  type: 'partial_refund' | 'fee_mismatch' | 'fx_drift' | 'dispute_timing';
  stripeId: string;
  amount: number;
  expected: number;
  actual: number;
  description: string;
}

export class FXMatcher {
  static match(balanceTransaction: Stripe.BalanceTransaction): ReconciliationIssue[] {
    const issues: ReconciliationIssue[] = [];
    
    if (balanceTransaction.exchange_rate && balanceTransaction.exchange_rate !== 1) {
      const fxGainLoss = balanceTransaction.amount - (balanceTransaction.amount / balanceTransaction.exchange_rate);
      
      if (Math.abs(fxGainLoss) > 1) {
        issues.push({
          type: 'fx_drift',
          stripeId: balanceTransaction.id,
          amount: balanceTransaction.amount,
          expected: balanceTransaction.amount / balanceTransaction.exchange_rate,
          actual: balanceTransaction.amount,
          description: `FX drift: ${fxGainLoss / 100} due to exchange rate ${balanceTransaction.exchange_rate}`,
        });
      }
    }
    
    return issues;
  }
}

