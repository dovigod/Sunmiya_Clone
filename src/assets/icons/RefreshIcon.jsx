export const RefreshIcon = ({ size = 1, color = 'var(--color-white-600)', ...rest }) => {
  return (
    <svg width={16 * size} height={16 * size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...rest}>
      <g fill={color} fillRule="evenodd">
        <path d="M13 10.5v-2h4v-4h2v6h-6z"></path>
        <path
          d="M12 5c1.754 0 3.408.65 4.716 1.831l.227.214.798.883L16.26 9.27l-.758-.84A5 5 0 1 0 16.9 13h2.029A7.002 7.002 0 0 1 5 12a7 7 0 0 1 7-7z"
          fillRule="nonzero"
        ></path>
      </g>
    </svg>
  );
};
