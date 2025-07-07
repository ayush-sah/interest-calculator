# Interest Calculator

A modern, accessible React-based interest calculator that supports both simple and compound interest calculations.

## Features

- ✅ **Simple Interest Calculation**: Calculate interest using the formula A = P(1 + rt)
- ✅ **Compound Interest Calculation**: Calculate compound interest with monthly or yearly compounding
- ✅ **Input Validation**: Real-time validation with helpful error messages
- ✅ **Responsive Design**: Works seamlessly on desktop and mobile devices
- ✅ **Accessibility**: Full keyboard navigation and screen reader support
- ✅ **Modern UI**: Clean, intuitive interface with smooth animations
- ✅ **Error Handling**: Comprehensive error handling and user feedback
- ✅ **Currency Formatting**: Proper Indian Rupee formatting with locale support

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ayush-sah/interest-calculator.git
cd interest-calculator
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Usage

### Simple Interest Calculation

1. Enter the principal amount in rupees
2. Enter the monthly interest rate as a percentage
3. Enter the time period in months
4. Select "Simple Interest" from the interest type dropdown
5. Click "Calculate Interest" to see the results

### Compound Interest Calculation

1. Enter the principal amount in rupees
2. Enter the monthly interest rate as a percentage
3. Enter the time period in months
4. Select "Compound Interest" from the interest type dropdown
5. Choose compounding frequency (Monthly or Yearly)
6. Click "Calculate Interest" to see the results

## Formulas Used

### Simple Interest

```
A = P(1 + rt)
```

Where:

- A = Final Amount
- P = Principal Amount
- r = Monthly Interest Rate (as decimal)
- t = Time Period (in months)

### Compound Interest

```
A = P(1 + r/n)^(nt)
```

Where:

- A = Final Amount
- P = Principal Amount
- r = Annual Interest Rate (as decimal)
- n = Number of times interest is compounded per year
- t = Time Period (in years)

## Project Structure

```
src/
├── components/
│   ├── InputField.js          # Reusable input component
│   ├── SelectField.js         # Reusable select component
│   └── ResultDisplay.js       # Results display component
├── hooks/
│   └── useValidatedInput.js   # Custom hook for input validation
├── utils/
│   ├── calculations.js        # Calculation utilities
│   └── calculations.test.js   # Tests for calculations
├── App.js                     # Main application component
├── App.css                    # Application styles
├── App.test.js               # Application tests
└── index.js                  # Application entry point
```

## Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm test -- --coverage
```

## Building for Production

Create a production build:

```bash
npm run build
```

The build folder will contain the optimized production files.

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **High Contrast Mode**: Supports high contrast display preferences
- **Reduced Motion**: Respects user's motion preferences
- **Focus Management**: Clear focus indicators and logical tab order

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- Icons and styling inspired by modern design principles
- Accessibility guidelines following WCAG 2.1 standards
