import styled from 'styled-components';
import { memo, useState, useLayoutEffect } from 'react';

/**
 * A simple component that displays an image without distortion.
 * @param {string} src - The source of the image.
 * @param {string} [srcset] - The source set of the image.
 * @param {string} [width] - The width of the image.
 * @param {string} [height] - The height of the image. If not provided, the image will be square.
 * @param {string} [radius] - The border radius of the image.
 * @param {boolean} contain - Whether the image should be contained.
 * @param {function} [skeleton] - function which returns Skeleton component, which will be present while loading src
 * @param {string} margin
 * @additionalProps - Any additional props to be passed to the image.
 */
const LazyImage = ({
  src,
  width = 'auto',
  height = 'auto',
  radius,
  contain = 'cover',
  className,
  skeleton,
  srcset,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(null);
  useLayoutEffect(() => {
    const imageToLoad = new Image();
    imageToLoad.src = src;
    imageToLoad.onload = () => setImageSrc(src);
  }, []);
  return (
    <ImageContainer width={width} height={height} radius={radius} className={className}>
      {src && imageSrc ? (
        <Img srcset={srcset} src={imageSrc} {...props} contain={contain} />
      ) : skeleton ? (
        skeleton()
      ) : (
        <Skeleton />
      )}
    </ImageContainer>
  );
};

export default LazyImage;

const ImageContainer = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: ${({ radius }) => radius};
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: ${(props) => (props.contain ? 'contain' : 'cover')};
  object-position: ${(props) => props.position || 'center'};
`;

const Skeleton = styled.div`
  background: linear-gradient(
    110deg,
    var(--color-black-700) 8%,
    var(--color-black-600) 18%,
    var(--color-black-700) 33%
  );
  border-radius: 5px;
  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;
  width: 100%;
  aspect-ratio: 3 / 4;
`;
