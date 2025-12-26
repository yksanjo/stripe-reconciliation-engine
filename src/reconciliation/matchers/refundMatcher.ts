import Stripe from 'stripe';

export interface ReconciliationIssue {
  type: 'partial_refund' | 'fee_mismatch' | 'fx_drift' | 'dispute_timing';
  stripeId: string;
  amount: number;
  expected: number;
  actual: number;
  description: string;
}

export class RefundMatcher {
  static match(charge: Stripe.Charge, refunds: Stripe.Refund[]): ReconciliationIssue[] {
    const issues: ReconciliationIssue[] = [];
    const totalRefunded = refunds.reduce((sum, r) => sum + r.amount, 0);
    
    if (totalRefunded > 0 && totalRefunded < charge.amount) {
      issues.push({
        type: 'partial_refund',
        stripeId: charge.id,
        amount: charge.amount,
        expected: charge.amount - totalRefunded,
        actual: charge.amount - totalRefunded,
        description: `Partial refund of ${totalRefunded / 100} - ensure accounting reflects net amount`,
      });
    }
    
    return issues;
  }
}

