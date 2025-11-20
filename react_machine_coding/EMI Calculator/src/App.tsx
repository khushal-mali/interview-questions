import { useState } from "react";

const tenureData = [12, 24, 36, 48, 60];

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-5 py-10">
      <EMICalculator />
    </div>
  );
};

const EMICalculator = () => {
  const [cost, setCost] = useState<number>();
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [emi, setEmi] = useState<number>();
  const [tenure, setTenure] = useState(12);

  // 🧮 Calculate EMI from down payment
  const calculateEMI = (downPayment: number) => {
    if (!cost) return 0;

    const loanAmt = cost - downPayment;
    const monthlyInterest = interest / 100 / 12;
    const numberOfMonths = tenure;

    if (monthlyInterest === 0) return loanAmt / numberOfMonths;

    const EMI =
      (loanAmt * monthlyInterest * Math.pow(1 + monthlyInterest, numberOfMonths)) /
      (Math.pow(1 + monthlyInterest, numberOfMonths) - 1);

    return Number(EMI.toFixed(0));
  };

  // 🔁 Calculate Down Payment from EMI
  const calculateDP = (emi: number) => {
    if (!cost) return 0;

    const monthlyInterest = interest / 100 / 12;
    const numberOfMonths = tenure;

    const loanAmt =
      (emi * (Math.pow(1 + monthlyInterest, numberOfMonths) - 1)) /
      (monthlyInterest * Math.pow(1 + monthlyInterest, numberOfMonths));

    const dp = cost - loanAmt;
    return Math.max(0, Number(dp.toFixed(0)));
  };

  // 📉 Handle DP slider
  const updateEMI = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!cost) return;
    const dp = Number(e.target.value);
    setDownPayment(dp);
    setEmi(calculateEMI(dp));
  };

  // 📈 Handle EMI slider
  const updateDownPayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!cost) return;
    const emiValue = Number(e.target.value);
    setEmi(emiValue);
    setDownPayment(calculateDP(emiValue));
  };

  // 💰 Extra Calculations
  const processingFee = cost ? (cost * fee) / 100 : 0;
  const totalPayment = emi ? tenure * emi + downPayment + processingFee : 0;
  const dpPercent = cost ? ((downPayment / cost) * 100).toFixed(1) : "0";

  return (
    <div className="bg-white shadow-lg rounded-2xl w-full max-w-xl p-8 space-y-6">
      <h1 className="text-center font-semibold text-2xl text-blue-600">
        💰 EMI Calculator
      </h1>

      {/* Total Cost */}
      <InputField
        label="Total Cost of Asset"
        type="number"
        value={cost || ""}
        onChange={(e) => setCost(Number(e.target.value))}
        placeholder="Enter total cost"
      />

      {/* Interest */}
      <InputField
        label="Interest Rate (in %)"
        type="number"
        value={interest}
        onChange={(e) => setInterest(Number(e.target.value))}
        placeholder="e.g. 10"
      />

      {/* Processing Fee */}
      <InputField
        label="Processing Fee (in %)"
        type="number"
        value={fee}
        onChange={(e) => setFee(Number(e.target.value))}
        placeholder="e.g. 1"
      />

      {/* Down Payment Slider */}
      {cost ? (
        <div className="flex flex-col gap-2">
          <span className="font-medium">Down Payment</span>
          <input
            type="range"
            value={downPayment}
            onChange={updateEMI}
            step={500}
            min={0}
            max={cost}
            className="w-full accent-blue-500"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹0</span>
            <span className="font-semibold text-blue-600">₹{downPayment}</span>
            <span>₹{cost}</span>
          </div>
          <p className="text-right text-gray-500 text-sm">{dpPercent}% of total cost</p>
        </div>
      ) : null}

      {/* EMI Slider */}
      {cost && (
        <div className="flex flex-col gap-2">
          <span className="font-medium">EMI per Month</span>
          <input
            type="range"
            step={500}
            value={emi || 0}
            min={calculateEMI(cost)}
            max={calculateEMI(0)}
            onChange={updateDownPayment}
            className="w-full accent-green-500"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹{calculateEMI(cost)}</span>
            <span className="font-semibold text-green-600">₹{emi || 0}</span>
            <span>₹{calculateEMI(0)}</span>
          </div>
        </div>
      )}

      {/* Tenure Buttons */}
      <div className="flex flex-col gap-2">
        <span className="font-medium">Tenure (Months)</span>
        <div className="flex flex-wrap gap-3 justify-between">
          {tenureData.map((t) => (
            <button
              key={t}
              onClick={() => {
                setTenure(t);
                if (cost) setEmi(calculateEMI(downPayment));
              }}
              className={`px-4 py-2 rounded-xl w-[70px] transition ${
                tenure === t ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      {emi && cost ? (
        <div className="bg-gray-100 rounded-xl p-4 space-y-2 border text-gray-700">
          <div className="flex justify-between">
            <span>Processing Fee:</span>
            <b>₹{processingFee.toFixed(0)}</b>
          </div>
          <div className="flex justify-between">
            <span>Total Payment (EMI + DP + Fee):</span>
            <b>₹{totalPayment.toFixed(0)}</b>
          </div>
          <div className="flex justify-between">
            <span>Loan Amount:</span>
            <b>₹{cost - downPayment}</b>
          </div>
        </div>
      ) : null}
    </div>
  );
};

// 🔧 Reusable Input Component
const InputField = ({
  label,
  type,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) => (
  <div className="flex flex-col gap-1">
    <span className="font-medium">{label}</span>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="bg-gray-100 rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

export default App;
