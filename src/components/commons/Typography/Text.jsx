import { createElement } from 'react';

const allowedTagNames = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'label'];

/**
 * @param {string} variant - The variant of the heading.
 * - EBH1
 * - BH2
 * - BH3
 * - BH4
 * @param {string} [as] - The tag name of the heading. (optional)
 * @param {string} children - The content of the heading.
 * @param {string} [className] - The additional class name of the heading.
 * @param {string} color - color of heading
 * @additional The rest of the props are passed to the underlying component.
 */
const Heading = ({ variant, as, children, className, color, style, margin, ...rest }) => {
  let tagName = as || variant?.slice(-2)?.toLowerCase();
  if (!allowedTagNames.includes(tagName)) {
    tagName = 'p';
  }

  return createElement(
    tagName,
    {
      className: `${variant.toLowerCase()} ${className ? className : ''}`,
      style: {
        margin,
        ...style,
        color
      },
      ...rest
    },
    children
  );
};

export default Heading;
