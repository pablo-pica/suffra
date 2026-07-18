# Style Guide — Suffra

## Visual Direction
Clean governance/civic design — inspired by Linear, Notion, Vercel.
Conveys: **trust**, **transparency**, **professionalism**.
This is NOT a gaming/crypto-bro aesthetic — it's a serious governance tool.

---

## Color System

### Core Palette
| Token | Hex | Usage |
|:--|:--|:--|
| `--navy-950` | `#0a1628` | Darkest backgrounds, footer |
| `--navy-900` | `#0f1d32` | Dark card backgrounds |
| `--navy-800` | `#162a46` | Elevated dark surfaces |
| `--navy-700` | `#1e3a5f` | Dark borders, secondary elements |
| `--slate-50` | `#f8fafc` | Primary light background |
| `--slate-100` | `#f1f5f9` | Secondary light background |
| `--slate-200` | `#e2e8f0` | Light borders |
| `--slate-300` | `#cbd5e1` | Disabled states |
| `--slate-500` | `#64748b` | Muted text |
| `--slate-700` | `#334155` | Secondary text |
| `--slate-900` | `#0f172a` | Primary text |

### Accent Colors
| Token | Hex | Usage |
|:--|:--|:--|
| `--accent-blue` | `#3b82f6` | Primary actions, links, focus rings |
| `--accent-indigo` | `#6366f1` | Hover states, emphasis, gradients |
| `--success` | `#22c55e` | Confirmations, vote counted |
| `--warning` | `#f59e0b` | Cautions, pending states |
| `--error` | `#ef4444` | Errors, rejections |

### Privacy Indicators
| State | Color | Icon |
|:--|:--|:--|
| Private (hidden) | `#22c55e` (green) | 🟢 Shield icon |
| Public (visible) | `#f59e0b` (amber) | 🟡 Eye icon |
| Proved (ZK verified) | `#6366f1` (indigo) | 🟣 Checkmark icon |

---

## Typography

### Font Stack
| Role | Font | Fallback | Weight |
|:--|:--|:--|:--|
| Body | Inter | system-ui, sans-serif | 400, 500 |
| Headings | Plus Jakarta Sans | system-ui, sans-serif | 600, 700 |
| Code/Addresses | JetBrains Mono | monospace | 400 |

### Scale
| Element | Size | Weight | Line Height |
|:--|:--|:--|:--|
| H1 | 2.25rem (36px) | 700 | 1.2 |
| H2 | 1.875rem (30px) | 600 | 1.3 |
| H3 | 1.5rem (24px) | 600 | 1.3 |
| Body | 1rem (16px) | 400 | 1.5 |
| Small | 0.875rem (14px) | 400 | 1.4 |
| Caption | 0.75rem (12px) | 500 | 1.4 |

### Google Fonts Import
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700&family=JetBrains+Mono:wght@400&display=swap');
```

---

## Shadows & Elevation

| Token | Value | Usage |
|:--|:--|:--|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle depth |
| `--shadow-card` | `0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)` | Cards |
| `--shadow-elevated` | `0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)` | Modals, dropdowns |
| `--shadow-focus` | `0 0 0 3px rgba(59,130,246,0.3)` | Focus ring (accent-blue) |

---

## Border Radius

| Token | Value | Usage |
|:--|:--|:--|
| `--radius-sm` | `0.375rem` (6px) | Badges, small elements |
| `--radius-md` | `0.5rem` (8px) | Inputs, buttons |
| `--radius-lg` | `0.75rem` (12px) | Cards |
| `--radius-xl` | `1rem` (16px) | Modals, large cards |

---

## Spacing

Use Tailwind's default spacing scale (4px base):
- `p-4` (16px) — Standard card padding
- `p-6` (24px) — Large card padding
- `gap-4` (16px) — Standard grid gap
- `gap-6` (24px) — Section spacing
- `space-y-2` (8px) — Tight vertical stacking
- `space-y-4` (16px) — Standard vertical stacking

---

## Framer Motion Presets

### Spring Animation
```typescript
const spring = { type: "spring", stiffness: 400, damping: 25 };
```

### Button Interactions
```typescript
const buttonVariants = {
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};
```

### Page/Component Enter
```typescript
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: "easeOut" },
};
```

### Toast Notification
```typescript
const toastVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
  transition: { type: "spring", stiffness: 300, damping: 30 },
};
// Auto-dismiss after 4 seconds
```

### Loading Spinner
```typescript
const spinnerVariants = {
  animate: { rotate: 360 },
  transition: { duration: 1, repeat: Infinity, ease: "linear" },
};
```

### Skeleton Pulse
```typescript
const skeletonVariants = {
  animate: { opacity: [0.5, 1, 0.5] },
  transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
};
```

---

## Component Patterns

### Card
```
rounded-xl shadow-card p-6 bg-white border border-slate-200
hover:shadow-elevated transition-shadow duration-200
```

### Primary Button
```
rounded-lg bg-accent-blue text-white font-medium px-4 py-2.5
hover:bg-indigo-600 active:scale-98 transition-all
min-h-[44px] (touch target)
```

### Secondary Button
```
rounded-lg bg-slate-100 text-slate-700 font-medium px-4 py-2.5
hover:bg-slate-200 active:scale-98 transition-all
```

### Input Field
```
rounded-lg border border-slate-200 px-3 py-2.5 text-sm
focus:ring-2 focus:ring-accent-blue focus:border-transparent
placeholder:text-slate-400
```

### Privacy Badge
```
inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium
Private: bg-green-50 text-green-700 border border-green-200
Public:  bg-amber-50 text-amber-700 border border-amber-200
Proved:  bg-indigo-50 text-indigo-700 border border-indigo-200
```

---

## Responsive Breakpoints

| Breakpoint | Width | Layout |
|:--|:--|:--|
| Default | < 768px | Single column, stacked |
| `md` | ≥ 768px | Two columns where appropriate |
| `lg` | ≥ 1024px | Full desktop layout |
| `xl` | ≥ 1440px | Max-width container centered |

Desktop-first design: start with full layout, simplify for smaller screens.
Max content width: `max-w-6xl` (1152px) centered with `mx-auto`.
