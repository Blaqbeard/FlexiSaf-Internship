import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";

// Styled Components
const AppContainer = styled.div`
  max-width: 980px;
  margin: 0 auto;
  padding: 2.5rem 1.25rem 4rem;
  background: radial-gradient(
      1200px 600px at 20% -10%,
      #6a5af9 0%,
      transparent 45%
    ),
    radial-gradient(1200px 600px at 110% 10%, #00d4ff 0%, transparent 40%),
    #0f1020;
  min-height: 100vh;
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  color: #e9e9ff;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.4rem;
  letter-spacing: 0.3px;
  background: linear-gradient(90deg, #6a5af9, #00d4ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: float 8s ease-in-out infinite;

  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-4px);
    }
  }
`;

const Subtitle = styled.p`
  margin-top: 0.25rem;
  color: #a3a6c2;
`;

const Converter = styled.main`
  display: grid;
  gap: 1.25rem;
`;

const Card = styled.div`
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.04),
    rgba(255, 255, 255, 0.02)
  );
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.25rem;
  backdrop-filter: blur(8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
`;

const GlowCard = styled(Card)`
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: -2px;
    background: conic-gradient(
      from 180deg at 50% 50%,
      #6a5af9,
      #00d4ff,
      transparent 40%
    );
    filter: blur(12px);
    opacity: 0.5;
    z-index: -1;
    animation: spin 8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const AmountRow = styled.div`
  display: grid;
  gap: 0.35rem;
`;

const SelectRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0.75rem;
  align-items: end;
`;

const SelectContainer = styled.div`
  display: grid;
  gap: 0.35rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #a3a6c2;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 0.9rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: #0e0f22;
  color: #e9e9ff;
  outline: none;
  transition: border-color 0.25s, transform 0.06s ease-out;

  &:focus {
    border-color: #00d4ff;
  }

  &:active {
    transform: scale(0.997);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 0.9rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: #0e0f22;
  color: #e9e9ff;
  outline: none;
  transition: border-color 0.25s, transform 0.06s ease-out;

  &:focus {
    border-color: #00d4ff;
  }
`;

const SwapButton = styled.button`
  margin: 0 0 0.3rem;
  height: 42px;
  width: 42px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: radial-gradient(circle at 30% 30%, #1d1f3b, #0e0f22);
  color: #e9e9ff;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 0 0 6px rgba(0, 212, 255, 0.12);
  }

  &.spin {
    animation: twist 0.4s linear;
  }

  @keyframes twist {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(180deg);
    }
  }
`;

const ConvertButton = styled.button`
  margin-top: 0.6rem;
  width: 100%;
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  border: none;
  background: linear-gradient(90deg, #6a5af9, #00d4ff);
  color: #051018;
  font-weight: 700;
  letter-spacing: 0.2px;
  cursor: pointer;
  box-shadow: 0 12px 30px rgba(0, 212, 255, 0.25);
  transition: transform 0.08s ease-out, filter 0.2s ease;

  &:hover {
    filter: brightness(1.05);
  }

  &:active {
    transform: translateY(1px) scale(0.998);
  }
`;

const Result = styled.p`
  margin: 0.8rem 0 0.25rem;
  font-size: 1.05rem;

  .amount {
    font-weight: 700;
  }

  .highlight {
    color: #00d4ff;
  }

  .rate {
    margin-left: 6px;
    color: #a3a6c2;
    font-size: 0.95rem;
  }

  &.error {
    color: #ff5c7a;
    font-weight: 600;
  }

  &.pop {
    animation: pop 0.45s ease;
  }

  @keyframes pop {
    0% {
      transform: scale(0.97);
    }
    60% {
      transform: scale(1.02);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const Updated = styled.p`
  color: #a3a6c2;
  font-size: 0.9rem;
  margin: 0;
`;

const InfoSection = styled.section`
  h2 {
    margin: 0 0 0.5rem;
  }

  ul {
    margin: 0.5rem 0 0;
    padding-left: 1.2rem;
  }

  li {
    margin: 0.25rem 0;
  }
`;

const CodeBlock = styled.pre`
  margin-top: 0.6rem;
  background: #0e0f22;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0.8rem;
  overflow-x: auto;
`;

// Currency Converter Component
const CURRENCY_CODES = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "CAD",
  "AUD",
  "NGN",
  "GHS",
  "KES",
  "ZAR",
  "INR",
  "CNY",
  "BRL",
  "MXN",
  "CHF",
  "SEK",
  "NOK",
  "DKK",
  "PLN",
  "TRY",
];

function App() {
  const [amount, setAmount] = useState("100");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("NGN");
  const [result, setResult] = useState("");
  const [updated, setUpdated] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const convertCurrency = async (e) => {
    e?.preventDefault();
    const amountNum = Number(amount);

    if (!Number.isFinite(amountNum) || amountNum <= 0) {
      setError("Please enter a valid amount greater than 0.");
      setResult("");
      setUpdated("");
      return;
    }

    setError("");
    setIsLoading(true);
    setResult("Converting…");

    try {
      const base = fromCurrency;
      const symbols = toCurrency;

      const fetchRate = async () => {
        try {
          const url1 = `https://api.exchangerate.host/latest?base=${encodeURIComponent(
            base
          )}&symbols=${encodeURIComponent(symbols)}`;
          const { data } = await axios.get(url1, {
            timeout: 10000,
            headers: { Accept: "application/json" },
          });
          const rate1 = data?.rates?.[symbols];
          if (rate1) {
            return {
              rate: rate1,
              dateText: dayjs(data.date).format("MMM D, YYYY"),
            };
          }
          throw new Error("Primary API returned no rate");
        } catch (_) {
          const url2 = `https://open.er-api.com/v6/latest/${encodeURIComponent(
            base
          )}`;
          const { data } = await axios.get(url2, {
            timeout: 10000,
            headers: { Accept: "application/json" },
          });
          const rate2 = data?.rates?.[symbols];
          if (!rate2) throw new Error("Fallback API returned no rate");
          const date =
            typeof data?.time_last_update_utc === "string"
              ? data.time_last_update_utc
              : undefined;
          const dateText = date ? dayjs(date).format("MMM D, YYYY") : "";
          return { rate: rate2, dateText };
        }
      };

      const { rate, dateText } = await fetchRate();
      const converted = amountNum * rate;

      setResult(
        `${amountNum.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })} ${base} = ${converted.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        })} ${symbols} (rate: ${rate.toFixed(4)})`
      );
      setUpdated(dateText ? `Last updated: ${dateText}` : "");
    } catch (err) {
      setError("Conversion failed. Please check your network and try again.");
      setResult("");
      setUpdated("");
    } finally {
      setIsLoading(false);
    }
  };

  // Run initial conversion on load
  useEffect(() => {
    const timer = setTimeout(() => {
      convertCurrency(new Event("submit"));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppContainer>
      <Header>
        <Title>Currency Converter</Title>
        <Subtitle>
          Built with React, styled-components, axios and dayjs
        </Subtitle>
      </Header>

      <Converter>
        <GlowCard as="form" onSubmit={convertCurrency}>
          <AmountRow>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="100"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </AmountRow>

          <SelectRow>
            <SelectContainer>
              <Label htmlFor="from">From</Label>
              <Select
                id="from"
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {CURRENCY_CODES.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </Select>
            </SelectContainer>

            <SwapButton
              type="button"
              title="Swap"
              aria-label="Swap"
              onClick={swapCurrencies}
            >
              ⟷
            </SwapButton>

            <SelectContainer>
              <Label htmlFor="to">To</Label>
              <Select
                id="to"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {CURRENCY_CODES.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </Select>
            </SelectContainer>
          </SelectRow>

          <ConvertButton type="submit" disabled={isLoading}>
            {isLoading ? "Converting..." : "Convert"}
          </ConvertButton>

          {error ? (
            <Result className="error">{error}</Result>
          ) : result ? (
            <Result className="pop">
              <span className="amount">{result.split(" = ")[0]}</span>
              {" = "}
              <span className="amount highlight">
                {result.split(" = ")[1]?.split(" (rate:")[0]}
              </span>
              <span className="rate">
                ({result.split("(rate: ")[1]?.replace(")", "")})
              </span>
            </Result>
          ) : null}

          {updated && <Updated>{updated}</Updated>}
        </GlowCard>

        <InfoSection as={Card}>
          <h2>Packages Used (npm)</h2>
          <ul>
            <li>
              <strong>styled-components</strong>: CSS-in-JS library that allows
              you to write actual CSS in your JavaScript.
            </li>
            <li>
              <strong>axios</strong>: Promise-based HTTP client used here to
              fetch live exchange rates from <code>exchangerate.host</code>.
            </li>
            <li>
              <strong>dayjs</strong>: Lightweight date library used to format
              the "last updated" timestamp.
            </li>
          </ul>
          <details>
            <summary>How I built this</summary>
            <CodeBlock>
              npm create vite@latest task-7 -- --template react cd task-7 npm
              install npm install styled-components axios dayjs npm run dev
            </CodeBlock>
          </details>
        </InfoSection>
      </Converter>
    </AppContainer>
  );
}

export default App;
