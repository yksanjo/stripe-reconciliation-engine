import express from 'express';
import Stripe from 'stripe';
import { ReconciliationEngine } from '../reconciliation/engine';
import { Reporter } from '../reconciliation/reporter';

const app = express();
app.use(express.json());

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-11-20.acacia' });
const engine = new ReconciliationEngine(stripe);

app.get('/reconcile', async (req, res) => {
  const days = parseInt(req.query.days as string || '30');
  const issues = await engine.reconcile(days);
  res.json({ issues, count: issues.length });
});

app.get('/reconcile/export', async (req, res) => {
  const days = parseInt(req.query.days as string || '30');
  const format = req.query.format as string || 'json';
  const issues = await engine.reconcile(days);
  
  if (format === 'csv') {
    const filePath = `/tmp/reconciliation-${Date.now()}.csv`;
    Reporter.generateCSV(issues, filePath);
    res.download(filePath);
  } else {
    const filePath = `/tmp/reconciliation-${Date.now()}.json`;
    Reporter.generateJSON(issues, filePath);
    res.download(filePath);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Reconciliation engine listening on port ${port}`);
});

