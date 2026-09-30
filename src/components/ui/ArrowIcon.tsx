import type { SVGProps } from 'react';

export type ArrowDirection = 'right' | 'up-right' | 'down-right' | 'down' | 'left' | 'chevron-down';

type Props = Omit<SVGProps<SVGSVGElement>, 'viewBox' | 'children'> & {
  direction?: ArrowDirection;
};

const paths: Record<ArrowDirection, string[]> = {
  right: ['M4 12h15', 'm13 6 6 6-6 6'],
  'up-right': ['m6 18 12-12', 'M8 6h10v10'],
  'down-right': ['m6 6 12 12', 'M18 8v10H8'],
  down: ['M12 4v15', 'm6 13 6 6 6-6'],
  left: ['M20 12H5', 'm11 6-6 6 6 6'],
  'chevron-down': ['m5 9 7 7 7-7'],
};

export default function ArrowIcon({ direction = 'right', className, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={['site-arrow-icon', className].filter(Boolean).join(' ')}
      {...props}
    >
      {paths[direction].map((d) => <path key={d} d={d} />)}
    </svg>
  );
}
