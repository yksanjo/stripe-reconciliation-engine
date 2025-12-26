# Stripe Reconciliation Engine

Reconciliation layer that balances Stripe vs accounting books. Handles partial refunds, fees vs gross, multi-currency FX drift, and disputes timing mismatches.

## Why Stripe Would Care

- **Biggest enterprise complaint** - CFOs struggle with reconciliation
- **Blocks adoption at scale** - Enterprises need accurate books
- **High CFO pain** - This directly addresses it

## Features

- 🔄 **Automatic Reconciliation**: Matches Stripe transactions with accounting
- 💰 **Fee Matching**: Identifies fee discrepancies
- 🌍 **FX Drift Detection**: Tracks currency exchange rate differences
- ⚖️ **Dispute Timing**: Handles timing mismatches for disputes
- 📊 **Export Reports**: CSV and JSON export

## Installation

```bash
npm install
npm run build
npm start
```

## API

- `GET /reconcile?days=30` - Get reconciliation issues
- `GET /reconcile/export?format=csv&days=30` - Export reconciliation report

## License

MIT

