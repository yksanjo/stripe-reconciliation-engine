import { ReconciliationIssue } from './matchers/refundMatcher';
import * as fs from 'fs';

export class Reporter {
  static generateCSV(issues: ReconciliationIssue[], filePath: string): void {
    const headers = ['Type', 'Stripe ID', 'Amount', 'Expected', 'Actual', 'Description'];
    const rows = issues.map(i => [
      i.type,
      i.stripeId,
      (i.amount / 100).toFixed(2),
      (i.expected / 100).toFixed(2),
      (i.actual / 100).toFixed(2),
      i.description,
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    fs.writeFileSync(filePath, csv);
  }

  static generateJSON(issues: ReconciliationIssue[], filePath: string): void {
    fs.writeFileSync(filePath, JSON.stringify(issues, null, 2));
  }
}

