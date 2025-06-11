// Import clsx: a utility for conditionally joining classNames together
import { clsx } from "clsx";

// Import twMerge: a utility to intelligently merge Tailwind CSS class names
import { twMerge } from "tailwind-merge";

// Combines class names using `clsx`, then resolves Tailwind CSS conflicts using `twMerge`
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
