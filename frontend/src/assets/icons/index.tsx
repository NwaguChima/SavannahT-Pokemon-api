interface IconProps {
  fill?: string;
  width?: string;
  height?: string;
  viewBox?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
}

export const SearchIcon: React.FC<IconProps> = ({
  width,
  height,
  fill,
  viewBox,
  style,
  className,
  onClick,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width ?? '25'}
    height={height ?? '25'}
    viewBox={viewBox ?? '0 0 30 30'}
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"
      fill={fill ?? '#a1a0a0'}
    ></path>
  </svg>
);

export const StarIcon: React.FC<IconProps> = ({
  width,
  height,
  fill,
  viewBox,
  style,
  className,
  onClick,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width ?? '17'}
    height={height ?? '17'}
    viewBox={viewBox ?? '0 0 256 256'}
    className={className}
    style={style}
    onClick={onClick}
  >
    <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
      <path
        d="M 45 2.024 C 45 2.024 45 2.024 45 2.024 c -1.398 0 -2.649 0.778 -3.268 2.031 L 29.959 27.911 c -0.099 0.2 -0.29 0.338 -0.51 0.37 L 3.122 32.107 c -1.383 0.201 -2.509 1.151 -2.941 2.48 c -0.432 1.329 -0.079 2.76 0.922 3.736 l 19.049 18.569 c 0.16 0.156 0.233 0.38 0.195 0.599 L 15.85 83.71 c -0.236 1.377 0.319 2.743 1.449 3.564 c 1.129 0.821 2.6 0.927 3.839 0.279 l 23.547 -12.381 c 0.098 -0.051 0.206 -0.077 0.314 -0.077 C 51.721 53.905 50.301 28.878 45 2.024 z"
        stroke="rgb(255,220,100)"
        fill={fill ?? '#ffdc64'}
        transform=" matrix(1 0 0 1 0 0) "
        strokeLinecap="round"
      />
      <path
        d="M 45 2.024 C 45 2.024 45 2.024 45 2.024 c 1.398 0 2.649 0.778 3.268 2.031 l 11.773 23.856 c 0.099 0.2 0.29 0.338 0.51 0.37 l 26.326 3.826 c 1.383 0.201 2.509 1.151 2.941 2.48 c 0.432 1.329 0.079 2.76 -0.922 3.736 L 69.847 56.892 c -0.16 0.156 -0.233 0.38 -0.195 0.599 L 74.15 83.71 c 0.236 1.377 -0.319 2.743 -1.449 3.564 c -1.129 0.821 -2.6 0.927 -3.839 0.279 L 45.315 75.172 c -0.098 -0.051 -0.206 -0.077 -0.314 -0.077 C 37.08 54.593 38.849 29.395 45 2.024 z"
        stroke="rgb(255,220,100)"
        fill={fill ?? 'rgb(255,220,100)'}
        strokeLinecap="round"
      />
    </g>
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({
  width,
  height,
  fill,
  viewBox,
  style,
  className,
  onClick,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width ?? '25'}
    height={height ?? '25'}
    viewBox={viewBox ?? '0 0 24 24'}
    className={className}
    style={style}
    onClick={onClick}
  >
    <path
      d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"
      fill={fill ?? 'currentColor'}
    ></path>
  </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({
  width,
  height,
  fill,
  viewBox,
  style,
  className,
  onClick,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width ?? '17'}
    height={height ?? '17'}
    viewBox={viewBox ?? '0 0 256 256'}
    className={className}
    style={style}
    onClick={onClick}
  >
    <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
      <path
        d="M 86 49 H 4 c -2.209 0 -4 -1.791 -4 -4 s 1.791 -4 4 -4 h 82 c 2.209 0 4 1.791 4 4 S 88.209 49 86 49 z"
        transform=" matrix(1 0 0 1 0 0) "
        stroke-linecap="round"
      />
      <path
        d="M 73.007 61.993 c -1.023 0 -2.048 -0.391 -2.828 -1.172 c -1.563 -1.562 -1.563 -4.095 0 -5.656 L 80.343 45 L 70.179 34.836 c -1.563 -1.562 -1.563 -4.095 0 -5.657 c 1.561 -1.562 4.094 -1.562 5.656 0 l 12.993 12.993 C 89.578 42.922 90 43.939 90 45 c 0 1.061 -0.422 2.078 -1.172 2.828 L 75.835 60.821 C 75.055 61.603 74.03 61.993 73.007 61.993 z"
        transform=" matrix(1 0 0 1 0 0) "
        stroke-linecap="round"
      />
    </g>
  </svg>
);

export const HeightIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width ?? '24'}
    height={props.height ?? '24'}
    viewBox={props.viewBox ?? '0 0 24 24'}
    fill="none"
    stroke="currentColor"
    className={props.className}
    style={props.style}
    onClick={props.onClick}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
    />
  </svg>
);

export const WeightIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width ?? '24'}
    height={props.height ?? '24'}
    viewBox={props.viewBox ?? '0 0 24 24'}
    fill="none"
    stroke="currentColor"
    className={props.className}
    style={props.style}
    onClick={props.onClick}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
    />
  </svg>
);

export const AbilitiesIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width ?? '24'}
    height={props.height ?? '24'}
    viewBox={props.viewBox ?? '0 0 24 24'}
    fill="none"
    stroke="currentColor"
    className={props.className}
    style={props.style}
    onClick={props.onClick}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

export const EvolutionIcon: React.FC<IconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width ?? '24'}
    height={props.height ?? '24'}
    viewBox={props.viewBox ?? '0 0 24 24'}
    fill="none"
    stroke="currentColor"
    className={props.className}
    style={props.style}
    onClick={props.onClick}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    />
  </svg>
);
