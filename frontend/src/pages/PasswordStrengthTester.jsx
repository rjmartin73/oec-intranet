import { InformationCircleIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import zxcvbn from "zxcvbn";

export default function PasswordStrengthTester() {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState(zxcvbn(""));
  const [entropy, setEntropy] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const strengthLables = ["Too Weak", "Weak", "Fair", "Strong", "Very Strong"];
  const crackSeconds =
    result.crack_times_seconds.offline_fast_hashing_1e10_per_second;
  const crackTimeLabel = formatCrackTimeLabel(crackSeconds);
  const riskLevel = getRiskLevel(crackSeconds);

  // Custom entropy estimate
  function estimateEntropy(pw) {
    let charsetSize = 0;
    if (/[a-z]/.test(pw)) charsetSize += 26;
    if (/[A-Z]/.test(pw)) charsetSize += 26;
    if (/[0-9]/.test(pw)) charsetSize += 10;
    if (/[^a-zA-Z0-9]/.test(pw)) charsetSize += 33;

    return pw.length * Math.log2(charsetSize || 1);
  }

  function getRiskLevel(seconds) {
    if (seconds < 1) return "Very High Risk";
    if (seconds < 60) return "High Risk";
    if (seconds < 3600) return "Moderate Risk";
    if (seconds < 86400) return "Low Risk";
    return "Very Low Risk";
  }

  function formatCrackTimeLabel(seconds) {
    if (seconds < 1) return "< 1 Second";
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours`;
    if (seconds < 31536000) return `${Math.floor(seconds / 86400)} days`;
    return `${Math.floor(seconds / 31536000)} years`;
  }

  function getStengthLevel(score, crackSeconds) {
    if (score >= 3 && crackSeconds >= 60) return "Strong";
    if (score >= 3 && crackSeconds < 60) return "Moderate";
    return strengthLables[score];
  }

  // Update zxcvbn + entropy when password changes
  useEffect(() => {
    setResult(zxcvbn(password));
    setEntropy(estimateEntropy(password));
  }, [password]);

  return (
    <div className="max-w-md mx-auto bg-white shadow rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-bold">🔐 Password Strength Checker</h2>

      <input
        type={showPassword ? "text" : "password"}
        className="w-full border p-2 rounded"
        placeholder="Enter a password..."
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="button"
        onClick={() => setPassword((prev) => !prev)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500"
      >
        {/* {showPassword ? "Hide" : "Show"} */}
      </button>

      {password && (
        <>
          <div className={`h-2 w-full rounded bg-gray-200`}>
            <div
              className={`h-full rounded ${
                [
                  "bg-red-500",
                  "bg-orange-500",
                  "bg-yellow-500",
                  "bg-green-400",
                  "bg-green-600",
                ][result.score]
              } transition-all duration-300`}
              style={{ width: `${(result.score + 1) * 20}%` }}
            />
          </div>
          <p className="text-sm">
            Strength: <strong>{getStengthLevel(result.score)}</strong>
          </p>
          <p className="text-sm">
            Estimated crack time: <strong>{crackTimeLabel}</strong>
            <details className="text-sm text-gray-600 mt-2">
              <summary className="flex items-center gap-1 cursor-pointer text-blue-600 hover:underline">
                <InformationCircleIcon className="w-4 h-4 text-owen-green" />
                Why does crack time matter?
              </summary>
              <p className="mt-2">
                Passwords that contain dictionary words or predictable patterns
                can be guessed much faster than random strings - even if they
                look complex. Attackers often use advanced tools that exploit
                these patterns. This tool estimates how quickly a high-powered
                system could guess your password.
              </p>
            </details>
          </p>
          <p className="text-sm">
            Estimated Entropy: <strong>{entropy.toFixed(2)} bits</strong>
            <br />
            Risk Level: <strong>{riskLevel}</strong> (assuming offline GPU
            attack)
          </p>
          <p className="text-sm text-gray-500 italic">
            This check runs entirely in your browser - no data is stored or sent
            anywhere.
          </p>
          <p className="text-sm">{result.feedback.suggestions.join(" ")}</p>
          {entropy > 70 && crackSeconds < 60 && (
            <p className="mt-2 p-2 border-1-4 border-yellow-400 bg-yellow-50 text-sm text-yellow-800">
              ⚠️ This password appears strong due to its length or character
              mix, but contains patterns that may be vulnerable to advanced
              cracking tools. Consider using a more randomized password.
            </p>
          )}
          <p className="text-xs text-gray-500 italic mt-2">
            
            Owen Electric recommends using a passphrase or password manager for
            enhanced security.
          </p>
        </>
      )}
    </div>
  );
}
