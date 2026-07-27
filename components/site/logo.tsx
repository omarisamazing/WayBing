import { cn } from '@/lib/utils'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 2464.48 1659.76"
      role="img"
      aria-label="WayBing"
      fill="currentColor"
      className={cn('h-4 w-auto', className)}
    >
      <path d="M1583.68,1.62C1778.54,12.82,1996-35.5,2171.41,69.91c241.92,147.88,273.93,523,51.09,702.55,236.75,99.67,312,425,171,637.7-136.39,210.07-414.33,231.59-648.17,239-186.14,21.68-95.18-2.52-36.75-164.37,75.44-233,160.28-99.78,326.3-176.94,135.59-61.57,126.11-263-5.87-323.12-91.31-52.53-204.12-1.17-297.64-42.08-73.41-75-94.15-194-142-287,140-20.3,370.31,61.07,443.1-106.2C2108.21,210.79,1703.33,314,1501.15,299c-108.26,7-110.66-134.07-154.66-204.72-12.68-30.55-27.4-60.34-38.49-91.51C1399.89,1.5,1491.79,1.6,1583.68,1.62Z" />
      <path d="M191.72,2.63c68.39,9,158.64-22.4,210.28,34.11,159.11,327.33,293.49,668.14,443.94,1000,21.59,58.36,55.61,104.79,63.22,163.75-44.9,156.66-132.35,302.12-194.16,453.3C457.91,1077.51,286.5,664.63,0,3.75,108.42,3,115.85,2.68,191.72,2.63Z" />
      <path d="M860.84,7.72c61.54,8.64,141.18-19.19,189.16,29C1236.33,407,1386.1,799.5,1558.31,1177.35c18.44,81.92-110.56,283.54-142.25,376.42-17,34.49-30.74,75.1-50,106C1168,1200.64,897.35,580,654,8.75,720.92,8.34,795.65,8,860.84,7.72Z" />
    </svg>
  )
}

const SIZES = {
  sm: { mark: 'h-4', word: 'text-[13px] tracking-[0.16em]', gap: 'gap-2' },
  md: { mark: 'h-6', word: 'text-[17px] tracking-[0.14em]', gap: 'gap-2.5' },
  lg: { mark: 'h-9', word: 'text-2xl tracking-[0.12em]', gap: 'gap-3' },
} as const

export function Logo({
  size = 'md',
  className,
  markClassName,
}: {
  size?: keyof typeof SIZES
  className?: string
  markClassName?: string
}) {
  const s = SIZES[size]
  return (
    <span className={cn('group/logo inline-flex items-center', s.gap, className)}>
      <LogoMark
        className={cn(
          s.mark,
          'transition-transform duration-500 ease-out group-hover/logo:-translate-y-px motion-reduce:transition-none motion-reduce:group-hover/logo:translate-y-0',
          markClassName
        )}
      />
      <span className={cn('font-sans font-semibold uppercase leading-none', s.word)}>WayBing</span>
    </span>
  )
}
