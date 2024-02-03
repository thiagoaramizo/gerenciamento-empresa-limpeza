import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function phoneMask( value: string): string {
  if (!value) return ""
  value = value.replace(/\D/g,'')
  value = value.replace(/(\d{2})(\d)/,"($1) $2")
  value = value.replace(/(\d)(\d{4})$/,"$1-$2")
  return value
}

export function phoneRemoveMask( value: string): string {
  if (!value) return ""
  value = value.replace(/\D/g,'')
  return value
}

export function getRouteTotalDistance ( distances: number[] ): number {
   const totalDistance = distances.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  )
  return totalDistance
}

export function formatDistance ( distance: number ): string {
  return new Intl.NumberFormat('pt-BR', {maximumFractionDigits: 2}).format(distance) + " pt"
}