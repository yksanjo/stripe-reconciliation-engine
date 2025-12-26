# Stripe Reconciliation Engine 🔄

[![GitHub stars](https://img.shields.io/github/stars/yksanjo/stripe-reconciliation-engine?style=social)](https://github.com/yksanjo/stripe-reconciliation-engine)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Stripe](https://img.shields.io/badge/Stripe-635BFF?logo=stripe&logoColor=white)](https://stripe.com/)

Reconciliation layer that balances Stripe vs accounting books. Handles partial refunds, fees vs gross, multi-currency FX drift, and disputes timing mismatches.

## 📸 Screenshots

### Reconciliation API Response
![API Response](https://via.placeholder.com/800x600/1F2937/FFFFFF?text=Reconciliation+API+Response)

*JSON response showing reconciliation issues and mismatches*

### CSV Export
![CSV Export](https://via.placeholder.com/800x400/10B981/FFFFFF?text=Reconciliation+Report+CSV)

*Exported reconciliation report in CSV format*

### Reconciliation Dashboard
![Dashboard](https://via.placeholder.com/1200x800/3B82F6/FFFFFF?text=Reconciliation+Dashboard)

*Visual dashboard showing Stripe vs books reconciliation (if implemented)*

*Note: Add actual screenshots after running the service*

## 🎯 Why Stripe Would Care

- **Biggest enterprise complaint** - CFOs struggle with reconciliation
- **Blocks adoption at scale** - Enterprises need accurate books
- **High CFO pain** - This directly addresses it
- **Strategic value** - Helps Stripe sell to enterprise customers

## ✨ Features

- 🔄 **Automatic Reconciliation**: Matches Stripe transactions with accounting
- 💰 **Fee Matching**: Identifies fee discrepancies
- 🌍 **FX Drift Detection**: Tracks currency exchange rate differences
- ⚖️ **Dispute Timing**: Handles timing mismatches for disputes
- 📊 **Export Reports**: CSV and JSON export
- 🔗 **Webhook Integration**: Real-time sync via webhooks

## 📦 Installation

```bash
git clone https://github.com/yksanjo/stripe-reconciliation-engine.git
cd stripe-reconciliation-engine
npm install
npm run build
```

## 🚀 Quick Start

1. Set environment variable:
```bash
export STRIPE_SECRET_KEY=sk_test_...
```

2. Start the server:
```bash
npm start
```

3. Access the API:
```bash
# Get reconciliation issues
curl http://localhost:3000/reconcile?days=30

# Export as CSV
curl http://localhost:3000/reconcile/export?format=csv&days=30 -o reconciliation.csv
```

## 🔌 API Endpoints

### GET /reconcile
Get reconciliation issues for a period.

**Query Parameters:**
- `days` (optional): Number of days to reconcile (default: 30)

**Response:**
```json
{
  "issues": [
    {
      "type": "partial_refund",
      "stripeId": "ch_...",
      "amount": 10000,
      "expected": 5000,
      "actual": 5000,
      "description": "Partial refund of 50.00"
    }
  ],
  "count": 1
}
```

### GET /reconcile/export
Export reconciliation report.

**Query Parameters:**
- `format`: `csv` or `json` (default: `json`)
- `days` (optional): Number of days to reconcile (default: 30)

## 🔍 What It Reconciles

### Partial Refunds
Identifies charges with partial refunds and ensures accounting reflects net amounts.

### Fee Mismatches
Detects discrepancies between expected Stripe fees and actual fees charged.

### FX Drift
Tracks currency exchange rate differences that cause reconciliation issues.

### Dispute Timing
Handles timing mismatches where charges happen immediately but disputes are processed later.

## 🛠️ Development

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Run in development
npm run dev

# Start production server
npm start
```

## 📁 Project Structure

```
stripe-reconciliation-engine/
├── src/
│   ├── reconciliation/
│   │   ├── engine.ts
│   │   ├── matchers/
│   │   │   ├── refundMatcher.ts
│   │   │   ├── feeMatcher.ts
│   │   │   ├── fxMatcher.ts
│   │   │   └── disputeMatcher.ts
│   │   └── reporter.ts
│   ├── api/
│   │   └── server.ts
│   ├── webhooks/
│   │   └── handler.ts
│   └── exports/
│       └── csvExporter.ts
└── package.json
```

## 🔐 Permissions

Requires Stripe API key with read permissions for:
- `charges:read`
- `refunds:read`
- `balance_transactions:read`
- `disputes:read`

## 🤝 Contributing

Contributions welcome! This tool helps CFOs maintain accurate books.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

MIT License - see LICENSE file for details

## 🔗 Related Projects

- [Stripe Revenue Leak Detector](https://github.com/yksanjo/stripe-revenue-leak-detector)
- [Stripe Account Health Scoring](https://github.com/yksanjo/stripe-account-health-scoring)
- [Stripe Compliance-as-Code](https://github.com/yksanjo/stripe-compliance-as-code)

## 📧 Support

For issues, questions, or contributions, please open an issue on GitHub.

---

**Made with ❤️ for the Stripe ecosystem**
