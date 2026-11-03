export const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: 'Sparkles', count: 20 },
  { id: 'electronics', name: 'Electronics', icon: 'Smartphone', count: 5 },
  { id: 'audio', name: 'Audio & Sound', icon: 'Headphones', count: 4 },
  { id: 'fashion', name: 'Fashion & Wear', icon: 'Shirt', count: 5 },
  { id: 'home', name: 'Home & Living', icon: 'Home', count: 3 },
  { id: 'accessories', name: 'Accessories', icon: 'Watch', count: 3 },
];

export const PROMO_COUPONS = {
  'SAVE10': { code: 'SAVE10', discountType: 'percentage', discountValue: 10, description: '10% off entire order' },
  'SUMMER20': { code: 'SUMMER20', discountType: 'percentage', discountValue: 20, description: '20% off summer special' },
  'FREESHIP': { code: 'FREESHIP', discountType: 'shipping', discountValue: 100, description: 'Free Express Shipping' },
  'AURA15': { code: 'AURA15', discountType: 'fixed', discountValue: 15, description: '$15 off orders over $75' },
};

export const PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Aura Studio Wireless ANC Headphones',
    brand: 'AuraSound',
    category: 'audio',
    price: 189.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviewCount: 342,
    isNew: true,
    isFeatured: true,
    inStock: true,
    stockCount: 18,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Immerse yourself in pure studio-grade audio with active noise cancellation, 40-hour battery life, spatial audio processing, and memory foam ear cushions.',
    features: [
      'Active Noise Cancellation (ANC) with Transparency Mode',
      'Up to 40 Hours of Playtime with Quick Charge (10 min = 4 hrs)',
      'Custom 40mm Titanium Drivers for deep bass & clear trebles',
      'Multipoint Bluetooth 5.3 connection'
    ],
    variants: {
      colors: ['Matte Black', 'Silver Luxe', 'Midnight Blue'],
      sizes: []
    },
    tags: ['wireless', 'headphones', 'anc', 'audio', 'bluetooth']
  },
  {
    id: 'prod-2',
    name: 'Apex Ultra Smart Watch Series 7',
    brand: 'ApexTech',
    category: 'electronics',
    price: 299.00,
    originalPrice: 349.00,
    rating: 4.9,
    reviewCount: 512,
    isNew: true,
    isFeatured: true,
    inStock: true,
    stockCount: 12,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Track your health metrics, ECG, blood oxygen, workouts, and stay connected with a vibrant Always-On AMOLED retina display housed in aircraft-grade aluminum.',
    features: [
      '1.9-inch Always-On Retina AMOLED Display',
      'Waterproof up to 50 meters (5 ATM)',
      'Advanced ECG, Heart Rate, and Blood Oxygen SpO2 sensor',
      'Built-in GPS & Cellular connectivity options'
    ],
    variants: {
      colors: ['Space Gray', 'Starlight Gold', 'Ocean Green'],
      sizes: ['41mm', '45mm']
    },
    tags: ['smartwatch', 'fitness', 'wearable', 'tech', 'gadgets']
  },
  {
    id: 'prod-3',
    name: 'Minimalist Ultra-Soft Heavyweight Hoodie',
    brand: 'UrbanCraft',
    category: 'fashion',
    price: 64.50,
    originalPrice: 85.00,
    rating: 4.7,
    reviewCount: 219,
    isNew: false,
    isFeatured: true,
    inStock: true,
    stockCount: 25,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Crafted from 100% organic heavy fleece cotton (450 GSM). Designed for a relaxed, modern streetwear silhouette with double-layered hood and reinforced stitching.',
    features: [
      '450 GSM 100% Organic Ring-spun Cotton',
      'Preshrunk fabric to prevent shrink after wash',
      'Kangaroo pocket with secret zip compartment',
      'Ribbed cuffs and hem with stretch retention'
    ],
    variants: {
      colors: ['Charcoal Gray', 'Sage Green', 'Oatmeal Beige', 'Obsidian Black'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL']
    },
    tags: ['clothing', 'hoodie', 'fashion', 'streetwear', 'cotton']
  },
  {
    id: 'prod-4',
    name: 'Ergonomic Breathable Mesh Desk Chair',
    brand: 'ErgoPositure',
    category: 'home',
    price: 249.99,
    originalPrice: 319.99,
    rating: 4.6,
    reviewCount: 184,
    isNew: false,
    isFeatured: false,
    inStock: true,
    stockCount: 8,
    image: 'https://images.unsplash.com/photo-1580481072645-022f9a6d85d0?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1580481072645-022f9a6d85d0?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Engineered for all-day comfort with dynamic 3D lumbar support, adjustable 4D armrests, headrest tilt, and cooling high-tension Korean mesh backrest.',
    features: [
      'Self-adjusting 3D Lumbar Support system',
      '4D Armrests with soft-touch PU padding',
      'High-grade aluminum alloy 5-star swivel base',
      'Class-4 Heavy Duty Gas Cylinder (Supports up to 330 lbs)'
    ],
    variants: {
      colors: ['Graphite Black', 'Pure White', 'Slate Gray'],
      sizes: []
    },
    tags: ['furniture', 'chair', 'office', 'ergonomic', 'home']
  },
  {
    id: 'prod-5',
    name: 'Precision Wireless Mechanical Keyboard',
    brand: 'KeyNexus',
    category: 'electronics',
    price: 139.00,
    originalPrice: 169.00,
    rating: 4.9,
    reviewCount: 420,
    isNew: true,
    isFeatured: true,
    inStock: true,
    stockCount: 15,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Hot-swappable Gateron Pro switches, gasket mount design for creamy acoustic sound signature, South-facing RGB lighting, and Bluetooth 5.1/2.4Ghz tri-mode connectivity.',
    features: [
      'Tri-mode Connection (Bluetooth 5.1, 2.4GHz Wireless, USB-C)',
      'Pre-lubed Hot-Swappable Switches & PCB stabilizers',
      'Double-shot PBT Keycaps for durable legends',
      '4000mAh battery offering up to 200 hours of continuous typing'
    ],
    variants: {
      colors: ['Retro Beige', 'Cyber RGB Black', 'Nordic White'],
      sizes: ['75% Compact', '96% Full Layout']
    },
    tags: ['keyboard', 'mechanical', 'electronics', 'gaming', 'setup']
  },
  {
    id: 'prod-6',
    name: 'Polarized Vintage Acetate Sunglasses',
    brand: 'Solstice Eyewear',
    category: 'accessories',
    price: 49.99,
    originalPrice: 79.99,
    rating: 4.5,
    reviewCount: 95,
    isNew: false,
    isFeatured: false,
    inStock: true,
    stockCount: 30,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Handcrafted Italian acetate frame with TAC 7-layer polarized lenses providing 100% UV400 protection and glare elimination for driving, beach, and daily style.',
    features: [
      'Hand-polished bio-acetate frame with metal core wire',
      'UV400 Polarized Lenses with anti-reflective coating',
      'Durable 5-barrel stainless steel hinges',
      'Includes hardshell leather case and microfiber cleaning cloth'
    ],
    variants: {
      colors: ['Tortoise Shell', 'Classic Black', 'Crystal Amber'],
      sizes: []
    },
    tags: ['sunglasses', 'accessories', 'fashion', 'summer']
  },
  {
    id: 'prod-7',
    name: 'Smart Ambient LED Light Bar Pair',
    brand: 'LuminaGlow',
    category: 'home',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.7,
    reviewCount: 168,
    isNew: true,
    isFeatured: false,
    inStock: true,
    stockCount: 22,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Transform your TV or desktop setup with 16 million colors, music sync micro-sensors, voice control via Alexa/Google Assistant, and dynamic scene modes.',
    features: [
      'Smart App control & Voice assistant integration',
      'Built-in high-sensitivity microphone for real-time audio sync',
      'Multiple mounting options (Vertical standing or TV back mount)',
      '16 Million RGB colors & customizable DIY scenes'
    ],
    variants: {
      colors: ['Matte Black'],
      sizes: []
    },
    tags: ['lighting', 'smart home', 'rgb', 'home', 'decor']
  },
  {
    id: 'prod-8',
    name: 'Waterproof Adventure Travel Backpack 35L',
    brand: 'TerraExplorer',
    category: 'accessories',
    price: 89.00,
    originalPrice: 119.00,
    rating: 4.8,
    reviewCount: 275,
    isNew: false,
    isFeatured: true,
    inStock: true,
    stockCount: 19,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Rugged 35L expandable travel pack with padded 16-inch laptop compartment, TSA-friendly 180° opening, anti-theft hidden pockets, and waterproof Cordura fabric.',
    features: [
      'Weatherproof 900D Cordura Ripstop fabric',
      'Dedicated padded 16" MacBook/Laptop sleeve',
      'Integrated USB-C charging port external pass-through',
      'Ergonomic airflow back panel with luggage strap'
    ],
    variants: {
      colors: ['Stealth Black', 'Olive Drab', 'Navy Blue'],
      sizes: []
    },
    tags: ['backpack', 'travel', 'accessories', 'waterproof', 'bag']
  },
  {
    id: 'prod-9',
    name: 'Portable HIFI Waterproof Bluetooth Speaker',
    brand: 'AuraSound',
    category: 'audio',
    price: 74.99,
    originalPrice: 99.99,
    rating: 4.6,
    reviewCount: 310,
    isNew: false,
    isFeatured: false,
    inStock: true,
    stockCount: 40,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Punchy 360° stereo sound with dual passive radiators, IPX7 fully waterproof construction, 24-hour battery endurance, and wireless stereo pairing mode.',
    features: [
      '30W Peak Stereo Output with BassBoost technology',
      'IPX7 Waterproof - Can be submerged up to 1m for 30 min',
      'TWS Mode: Pair 2 speakers for left/right wireless stereo',
      'Rugged rubberized housing with carabiner loop'
    ],
    variants: {
      colors: ['Midnight Black', 'Forest Green', 'Sunset Red'],
      sizes: []
    },
    tags: ['speaker', 'bluetooth', 'audio', 'waterproof', 'music']
  },
  {
    id: 'prod-10',
    name: 'Leather Minimalist RFID Slim Wallet',
    brand: 'ArtisanHide',
    category: 'accessories',
    price: 34.99,
    originalPrice: 45.00,
    rating: 4.7,
    reviewCount: 520,
    isNew: false,
    isFeatured: false,
    inStock: true,
    stockCount: 50,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Handcrafted full-grain Italian leather slim card holder with integrated RFID blocking shield, quick-access thumb slot, and capacity for up to 10 cards + folded cash.',
    features: [
      '100% Full-grain vegetable tanned Italian leather',
      'Certified RFID Blocking technology (13.56 MHz frequency)',
      'Ultra-thin 0.3-inch profile fits seamlessly in front pocket',
      'Discreet pull-tab for quick card retrieval'
    ],
    variants: {
      colors: ['Cognac Brown', 'Matte Black', 'Dark Chestnut'],
      sizes: []
    },
    tags: ['wallet', 'leather', 'accessories', 'rfid', 'slim']
  },
  {
    id: 'prod-11',
    name: 'Classic White Leather Minimalist Sneakers',
    brand: 'Vanguard Kicks',
    category: 'fashion',
    price: 119.00,
    originalPrice: 149.00,
    rating: 4.8,
    reviewCount: 164,
    isNew: true,
    isFeatured: true,
    inStock: true,
    stockCount: 14,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Versatile low-top sneakers crafted from soft calfskin leather, durable Margom-style rubber cupsole, and memory foam insoles for timeless everyday sophistication.',
    features: [
      'Full-grain Italian calfskin upper',
      'Removable cushioned antimicrobial ortholite insole',
      'Durable stitched rubber outsole for traction',
      'Breathable leather lining'
    ],
    variants: {
      colors: ['Clean White', 'White/Gum Sole', 'All Black'],
      sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12']
    },
    tags: ['shoes', 'sneakers', 'footwear', 'fashion', 'leather']
  },
  {
    id: 'prod-12',
    name: 'Ceramic Pour-Over Specialty Coffee Set',
    brand: 'BaristaCraft',
    category: 'home',
    price: 42.50,
    originalPrice: 55.00,
    rating: 4.9,
    reviewCount: 88,
    isNew: false,
    isFeatured: false,
    inStock: true,
    stockCount: 16,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Artisanal matte ceramic coffee dripper V60 with heat-resistant borosilicate glass carafe (600ml) and 50 natural unbleached paper filters.',
    features: [
      'Spiral interior ribs for optimal extraction speed',
      '600ml Borosilicate glass server with ergonomic silicone band',
      'Includes 50 cone paper filters & measuring scoop',
      'Dishwasher safe & heat resistant'
    ],
    variants: {
      colors: ['Matte Black', 'Nordic White', 'Terracotta'],
      sizes: []
    },
    tags: ['coffee', 'kitchen', 'home', 'ceramic', 'decor']
  },
  {
    id: 'prod-13',
    name: 'True Wireless Noise-Isolating Earbuds',
    brand: 'AuraSound',
    category: 'audio',
    price: 119.99,
    originalPrice: 159.99,
    rating: 4.7,
    reviewCount: 289,
    isNew: true,
    isFeatured: false,
    inStock: true,
    stockCount: 22,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Compact ergonomic earbuds featuring hybrid ANC, quad-mic crystal clear call technology, IPX5 sweat resistance, and wireless charging case.',
    features: [
      'Hybrid ANC blocking up to 35dB ambient noise',
      'Wireless Qi Charging & USB-C fast charging',
      'IPX5 Sweat & Rain Resistant rating',
      'Quad-mic ENC array for HD crystal clear phone calls'
    ],
    variants: {
      colors: ['Polar White', 'Obsidian Black'],
      sizes: []
    },
    tags: ['earbuds', 'audio', 'wireless', 'bluetooth', 'gadgets']
  },
  {
    id: 'prod-14',
    name: 'All-Weather Tech Shell Performance Jacket',
    brand: 'UrbanCraft',
    category: 'fashion',
    price: 145.00,
    originalPrice: 185.00,
    rating: 4.8,
    reviewCount: 142,
    isNew: true,
    isFeatured: false,
    inStock: true,
    stockCount: 10,
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    ],
    description: '3-Layer waterproof breathable shell engineered with taped seams, YKK AquaGuard zippers, adjustable storm hood, and packable design for urban commuting.',
    features: [
      '20,000mm Waterproof & 15,000g Breathability rating',
      'YKK AquaGuard weather-resistant zips',
      'Underarm pit zips for ventilation on warm hikes',
      'Reflective detail accents for night safety'
    ],
    variants: {
      colors: ['Stealth Black', 'Alpine Gray', 'Midnight Navy'],
      sizes: ['S', 'M', 'L', 'XL']
    },
    tags: ['jacket', 'outerwear', 'fashion', 'waterproof', 'techwear']
  },
  {
    id: 'prod-15',
    name: '3-in-1 Fast Wireless Magnetic Charging Station',
    brand: 'ApexTech',
    category: 'electronics',
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.6,
    reviewCount: 380,
    isNew: false,
    isFeatured: false,
    inStock: true,
    stockCount: 35,
    image: 'https://images.unsplash.com/photo-1622445268465-8438565763a6?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1622445268465-8438565763a6?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Declutter your nightstand or desk. Simultaneously fast-charge your Smartphone (15W MagSafe), Smart Watch (5W), and Wireless Earbuds (5W).',
    features: [
      'Strong magnetic alignment for iPhone & Qi2 devices',
      'Includes 30W USB-C PD Power Adapter & 1.5m braided cable',
      'Foreign Object Detection (FOD) & Temperature control sensors',
      'Discreet LED night indicator with auto-dimming sensor'
    ],
    variants: {
      colors: ['Matte Black', 'Soft White'],
      sizes: []
    },
    tags: ['charger', 'wireless', 'electronics', 'magsafe', 'desk']
  }
];
