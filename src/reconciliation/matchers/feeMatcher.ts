import Stripe from 'stripe';

export interface ReconciliationIssue {
  type: 'partial_refund' | 'fee_mismatch' | 'fx_drift' | 'dispute_timing';
  stripeId: string;
  amount: number;
  expected: number;
  actual: number;
  description: string;
}

export class FeeMatcher {
  static match(charge: Stripe.Charge, balanceTransaction: Stripe.BalanceTransaction): ReconciliationIssue[] {
    const issues: ReconciliationIssue[] = [];
    const gross = charge.amount;
    const fees = balanceTransaction.fee;
    const net = gross - fees;
    
    // Check if fees are properly accounted for
    if (Math.abs(fees - (gross * 0.029 + 30)) > 1) { // Approximate Stripe fee
      issues.push({
        type: 'fee_mismatch',
        stripeId: charge.id,
        amount: gross,
        expected: net,
        actual: gross - fees,
        description: `Fee mismatch: expected ~${(gross * 0.029 + 30) / 100}, got ${fees / 100}`,
      });
    }
    
    return issues;
  }
}

