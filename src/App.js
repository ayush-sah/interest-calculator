import { useState } from "react";

export default function InterestCalculator() {
  const [amount, setAmount] = useState(0);
  const [monthlyRate, setMonthlyRate] = useState(0);
  const [period, setPeriod] = useState(0);
  const [interestType, setInterestType] = useState("simple");
  const [compoundFreq, setCompoundFreq] = useState("monthly");
  const [result, setResult] = useState(null);

  const calculateInterest = () => {
    const P = amount;
    const r = monthlyRate / 100;
    const t = period;
    let A = 0;

    if (interestType === "simple") {
      A = P + P * r * t;
    } else {
      const n = compoundFreq === "monthly" ? 12 : 1;
      const yearlyRate = r * 12;
      A = P * Math.pow(1 + yearlyRate / n, n * (t / 12));
    }

    setResult(parseFloat(A.toFixed(2)));
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '1rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Interest Calculator</h1>
      <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', marginTop: '1rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Monthly Interest Rate (%)</label>
          <input
            type="number"
            value={monthlyRate}
            onChange={(e) => setMonthlyRate(Number(e.target.value))}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Period (in months)</label>
          <input
            type="number"
            value={period}
            onChange={(e) => setPeriod(Number(e.target.value))}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Interest Type</label>
          <select
            value={interestType}
            onChange={(e) => setInterestType(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          >
            <option value="simple">Simple</option>
            <option value="compound">Compound</option>
          </select>
        </div>

        {interestType === "compound" && (
          <div style={{ marginBottom: '1rem' }}>
            <label>Compounded</label>
            <select
              value={compoundFreq}
              onChange={(e) => setCompoundFreq(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        )}

        <button onClick={calculateInterest} style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Calculate
        </button>

        {result !== null && (
          <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>Final Amount: ₹{result}</div>
        )}
      </div>
    </div>
  );
}
