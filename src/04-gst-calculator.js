/**
 * 🧾 GST Calculator - Tax Lagao Bhai!
 *
 * Bunty apni dukaan ke liye GST calculator bana raha hai. Customer ko bill
 * dena hai jisme base price, GST amount, aur total clearly dikhna chahiye.
 * GST rate category ke hisaab se change hota hai.
 *
 * GST Rates (by category string, case-insensitive):
 *   - "essential"   => 0% GST  (dal, chawal, atta, etc.)
 *   - "food"        => 5% GST  (packaged food, restaurant below Rs 7500)
 *   - "standard"    => 12% GST (processed food, business class tickets)
 *   - "electronics" => 18% GST (phones, laptops, etc.)
 *   - "luxury"      => 28% GST (cars, aerated drinks, tobacco)
 *   - Any other category => return null
 *
 * Rules:
 *   - Calculate: gstAmount = amount * rate / 100
 *   - Calculate: totalAmount = amount + gstAmount
 *   - Round gstAmount aur totalAmount to 2 decimal places using
 *     parseFloat(value.toFixed(2))
 *   - Return object: { baseAmount, gstRate, gstAmount, totalAmount }
 *   - category ko lowercase mein compare karo (case-insensitive)
 *   - Hint: Use toFixed(), parseFloat(), Number.isFinite(), toLowerCase()
 *
 * Validation:
 *   - Agar amount positive finite number nahi hai, return null
 *   - Agar category string nahi hai, return null
 *   - Agar category unknown hai, return null
 *
 * @param {number} amount - Base amount before tax
 * @param {string} category - Product category
 * @returns {{ baseAmount: number, gstRate: number, gstAmount: number, totalAmount: number } | null}
 *
 * @example
 *   calculateGST(1000, "electronics")
 *   // => { baseAmount: 1000, gstRate: 18, gstAmount: 180, totalAmount: 1180 }
 *
 *   calculateGST(500, "essential")
 *   // => { baseAmount: 500, gstRate: 0, gstAmount: 0, totalAmount: 500 }
 */
export function calculateGST(amount, category) {
  if (!Number.isFinite(amount) || amount < 0 || amount === 0) return null;
  if (typeof category !== "string" || typeof category === undefined)
    return null;

  category = category.toLowerCase();

  let catData = ["essential", "food", "standard", "electronics", "luxury"];
  if (!catData.includes(category)) return null;

  let gstAmt = 0;
  let totalAmt = 0;
  let gstRate = 0;

  if (category === "luxury") {
    gstAmt += (amount * 28) / 100;
    totalAmt += amount + gstAmt;
    gstRate += 28;
  } else if (category === "electronics") {
    gstAmt += (amount * 18) / 100;
    totalAmt += amount + gstAmt;
    gstRate += 18;
  } else if (category === "standard") {
    gstAmt += (amount * 12) / 100;
    totalAmt += amount + gstAmt;
    gstRate += 12;
  } else if (category === "food") {
    gstAmt += (amount * 5) / 100;
    totalAmt += amount + gstAmt;
    gstRate += 5;
  } else if (category === "essential") {
    gstAmt += 0;
    totalAmt += amount + gstAmt;
    gstRate += 0;
  }
  return {
    baseAmount: amount,
    gstRate: gstRate,
    gstAmount: parseFloat(Number(gstAmt).toFixed(2)),
    totalAmount: parseFloat(Number(totalAmt).toFixed(2)),
  };
}
