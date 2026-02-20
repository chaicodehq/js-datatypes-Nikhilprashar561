/**
 * 🍕 Zomato Order Builder
 *
 * Zomato jaisa order summary banana hai! Cart mein items hain (with quantity
 * aur addons), ek optional coupon code hai, aur tujhe final bill banana hai
 * with itemwise breakdown, taxes, delivery fee, aur discount.
 *
 * Rules:
 *   - cart is array of items:
 *
 *     [{ name: "Butter Chicken", price: 350, qty: 2, addons: ["Extra Butter:50", "Naan:40"] }, ...]
 *
 *   - Each addon string format: "AddonName:Price" (split by ":" to get price)
 *
 *   - Per item total = (price + sum of addon prices) * qty
 *
 *   - Calculate:
 *     - items: array of { name, qty, basePrice, addonTotal, itemTotal }
 *
 *     - subtotal: sum of all itemTotals
 *
 *     - deliveryFee: Rs 30 if subtotal < 500, Rs 15 if 500-999, FREE (0) if >= 1000
 *
 *     - gst: 5% of subtotal, rounded to 2 decimal places parseFloat(val.toFixed(2))
 *
 *     - discount: based on coupon (see below)
 *
 *     - grandTotal: subtotal + deliveryFee + gst - discount (minimum 0, use Math.max)
 *
 *     - Round grandTotal to 2 decimal places
 *
 *   Coupon codes (case-insensitive):
 *     - "FIRST50"  => 50% off subtotal, max Rs 150 (use Math.min)
 *     - "FLAT100"  => flat Rs 100 off
 *     - "FREESHIP" => delivery fee becomes 0 (discount = original delivery fee value)
 *     - null/undefined/invalid string => no discount (0)
 *
 *   - Items with qty <= 0 ko skip karo
 *   - Hint: Use map(), reduce(), filter(), split(), parseFloat(),
 *     toFixed(), Math.max(), Math.min(), toLowerCase()
 *
 * Validation:
 *   - Agar cart array nahi hai ya empty hai, return null
 *
 * @param {Array<{ name: string, price: number, qty: number, addons?: string[] }>} cart
 * @param {string} [coupon] - Optional coupon code
 * @returns {{ items: Array<{ name: string, qty: number, basePrice: number, addonTotal: number, itemTotal: number }>, subtotal: number, deliveryFee: number, gst: number, discount: number, grandTotal: number } | null}
 *
 * @example
 *   buildZomatoOrder([{ name: "Biryani", price: 300, qty: 1, addons: ["Raita:30"] }], "FLAT100")
 *   // subtotal: 330, deliveryFee: 30, gst: 16.5, discount: 100
 *   // grandTotal: 330 + 30 + 16.5 - 100 = 276.5
 *
 *   buildZomatoOrder([{ name: "Pizza", price: 500, qty: 2, addons: [] }], "FIRST50")
 *   // subtotal: 1000, deliveryFee: 0, gst: 50, discount: min(500, 150) = 150
 *   // grandTotal: 1000 + 0 + 50 - 150 = 900
 */
export function buildZomatoOrder(cart, coupon) {
  if (!Array.isArray(cart) || cart.length === 0) {
    return null;
  }

  const cartItem = cart.filter((e) => e.qty > 0);

  if (cartItem.length === 0) {
    return null;
  }

  const temp = cartItem.map((e) => {
    let addon = 0;
    if (Array.isArray(e.addons)) {
      addon = e.addons.reduce((sum, price) => {
        const splitPrice = price.split(":");
        const getPrice = parseFloat(splitPrice[1]);
        return sum + getPrice;
      }, 0);
    }
    const perItem = (e.price + addon) * e.qty;

    return {
      name: e.name,
      qty: e.qty,
      basePrice: e.price,
      addonTotal: addon,
      itemTotal: perItem,
    };
  });

  const subTotal = temp.reduce((sum, subTtl) => {
    return sum + subTtl.itemTotal;
  }, 0);

  let deliveryFee = 0;

  if (subTotal < 500) deliveryFee = 30;
  else if (subTotal >= 500 && subTotal < 1000) deliveryFee = 15;
  else {
    deliveryFee = 0
  }

  let gst = (subTotal * 5) / 100;
  gst = parseFloat(gst.toFixed(2));

  let discount = 0;
  let lowerCase = typeof coupon === "string" ? coupon.toLowerCase() : null;

  if (lowerCase === "first50") {
    let half = subTotal * 0.5;
    discount = Math.min(half, 150);
  } else if (lowerCase === "flat100") {
    discount = 100;
  } else if (lowerCase === "freeship") {
    discount = deliveryFee;
    deliveryFee = 0;
  } else {
    discount = 0;
  }

  let grandTotal = subTotal + deliveryFee + gst - discount;
  grandTotal = Math.max(grandTotal, 0);
  grandTotal = parseFloat(grandTotal.toFixed(2));

  return {
    items: temp,
    subtotal: subTotal,
    deliveryFee,
    gst,
    discount,
    grandTotal,
  };
}
