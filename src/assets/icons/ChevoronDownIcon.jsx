import styled from 'styled-components';
import { useState } from 'react';
export const ChevoronDownIcon = ({ size = 1, color = 'var(--color-white-600)', rotate = false, ...rest }) => {
  return (
    <Svg
      rotate={rotate}
      xmlns="http://www.w3.org/2000/svg"
      width={size * 16}
      height={size * 16}
      fill="currentColor"
      className="bi bi-chevron-down"
      viewBox="0 0 16 16"
      {...rest}
    >
      <path
        fillRule="evenodd"
        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
        fill={color}
      />
    </Svg>
  );
};

const Svg = styled.svg`
  transform-origin: center center;
  transform: ${({ rotate }) => (rotate ? 'rotateZ(180deg)' : 'rotateZ(0deg)')};
`;
