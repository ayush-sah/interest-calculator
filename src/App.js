import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function InterestCalculator() {
  const [amount, setAmount] = useState(0);
  const [monthlyRate, setMonthlyRate] = useState(0);
  const [period, setPeriod] = useState(0);
  const [interestType, setInterestType] = useState("simple");
  const [compoundFreq, setCompoundFreq] = useState("monthly");
  const [result, setResult] = (useState < number) | (null > null);

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
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Interest Calculator</h1>
      <Card>
        <CardContent className="space-y-4 pt-4">
          <div>
            <Label>Amount</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>

          <div>
            <Label>Monthly Interest Rate (%)</Label>
            <Input
              type="number"
              value={monthlyRate}
              onChange={(e) => setMonthlyRate(Number(e.target.value))}
            />
          </div>

          <div>
            <Label>Period (in months)</Label>
            <Input
              type="number"
              value={period}
              onChange={(e) => setPeriod(Number(e.target.value))}
            />
          </div>

          <div>
            <Label>Interest Type</Label>
            <select
              value={interestType}
              onChange={(e) => setInterestType(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="simple">Simple</option>
              <option value="compound">Compound</option>
            </select>
          </div>

          {interestType === "compound" && (
            <div>
              <Label>Compounded</Label>
              <select
                value={compoundFreq}
                onChange={(e) => setCompoundFreq(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          )}

          <Button onClick={calculateInterest}>Calculate</Button>

          {result !== null && (
            <div className="text-lg font-semibold">Final Amount: ₹{result}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
