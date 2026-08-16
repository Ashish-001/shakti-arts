// Fallback catalog shown until the admin uploads real products to Firebase.
// Images are cropped from the Shakti Arts lookbook for demonstration purposes.
import embroideredWideLeg from "../assets/products/embroidered-wide-leg.jpg";
import metallicWashWideLeg from "../assets/products/metallic-wash-wide-leg.jpg";
import classicFlared from "../assets/products/classic-flared.jpg";
import ruffleHemSkirt from "../assets/products/ruffle-hem-skirt.jpg";
import distressedWideLeg from "../assets/products/distressed-wide-leg.jpg";
import asymmetricWrapTrouser from "../assets/products/asymmetric-wrap-trouser.jpg";

export const SAMPLE_PRODUCTS = [
  {
    id: "sample-embroidered-wide-leg",
    name: "Mirror-Embroidered Wide-Leg Jeans",
    category: "jeans",
    price: 3499,
    discountPrice: 2799,
    isHotDeal: true,
    description:
      "Complex hem detailing with precision cutwork and advanced mirror-embroidery application, cut in a flowing wide-leg silhouette.",
    sizes: ["26", "28", "30", "32", "34"],
    colors: ["Light Wash"],
    images: [embroideredWideLeg],
  },
  {
    id: "sample-metallic-wash-wide-leg",
    name: "Metallic Foil Wide-Leg Jeans",
    category: "jeans",
    price: 3199,
    discountPrice: 2559,
    isHotDeal: true,
    description:
      "Trend-adaptive fabric treatment featuring specialized metallic foil washing techniques for a directional, high-shine finish.",
    sizes: ["26", "28", "30", "32"],
    colors: ["Silver Mist"],
    images: [metallicWashWideLeg],
  },
  {
    id: "sample-classic-flared",
    name: "Heritage Flared Jeans",
    category: "jeans",
    price: 2699,
    isHotDeal: false,
    description:
      "Mastery over fit, stretch retention, and timeless form construction — a dark-wash flared silhouette built for everyday wear.",
    sizes: ["26", "28", "30", "32", "34", "36"],
    colors: ["Indigo"],
    images: [classicFlared],
  },
  {
    id: "sample-ruffle-hem-skirt",
    name: "Button-Front Ruffle Denim Skirt",
    category: "skirts",
    price: 2299,
    isHotDeal: false,
    description:
      "Hardware integration and fluid denim draping with precision-gathered ruffle hems, in a full-length A-line cut.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Acid Wash"],
    images: [ruffleHemSkirt],
  },
  {
    id: "sample-distressed-wide-leg",
    name: "Ombre Distressed Wide-Leg Jeans",
    category: "jeans",
    price: 3899,
    discountPrice: 2999,
    isHotDeal: true,
    description:
      "Controlled vintage finishing with localized distressing and a specialized ombre wash development, in an oversized wide-leg fit.",
    sizes: ["26", "28", "30", "32"],
    colors: ["Ombre Grey"],
    images: [distressedWideLeg],
  },
  {
    id: "sample-asymmetric-wrap-trouser",
    name: "Asymmetric Wrap-Waist Trousers",
    category: "trousers",
    price: 4299,
    isHotDeal: false,
    description:
      "Complex pattern-making with unconventional waistline tailoring and contemporary structural alignment, finished in a smoky black wash.",
    sizes: ["26", "28", "30", "32"],
    colors: ["Smoke Black"],
    images: [asymmetricWrapTrouser],
  },
];
