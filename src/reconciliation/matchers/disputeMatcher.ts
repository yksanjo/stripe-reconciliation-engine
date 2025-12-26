import Stripe from 'stripe';

export interface ReconciliationIssue {
  type: 'partial_refund' | 'fee_mismatch' | 'fx_drift' | 'dispute_timing';
  stripeId: string;
  amount: number;
  expected: number;
  actual: number;
  description: string;
}

export class DisputeMatcher {
  static match(dispute: Stripe.Dispute, charge: Stripe.Charge): ReconciliationIssue[] {
    const issues: ReconciliationIssue[] = [];
    
    // Disputes have timing mismatches - charge happens immediately, dispute fee happens later
    if (dispute.status === 'lost' || dispute.status === 'warning_needs_response') {
      issues.push({
        type: 'dispute_timing',
        stripeId: dispute.id,
        amount: dispute.amount,
        expected: -dispute.amount - (dispute.charge?.amount || 0),
        actual: -dispute.amount,
        description: `Dispute timing: charge at ${new Date(charge.created * 1000).toISOString()}, dispute at ${new Date(dispute.created * 1000).toISOString()}`,
      });
    }
    
    return issues;
  }
}

