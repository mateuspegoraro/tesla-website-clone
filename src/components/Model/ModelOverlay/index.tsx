import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useTransform } from 'framer-motion';
import { CarModel } from '../ModelsContext';
import useWrapperScroll from '../useWrapperScroll';

import { Container } from './styles';

interface Props {
  model: CarModel;
}

type SectionDimentions = Pick<HTMLDivElement, 'offsetTop' | 'offsetHeight'>;

const ModelOverlay: React.FC<Props> = ({ model, children }) => {
  const getSectionDimentions = useCallback(() => {
    return {
      offsetTop: model.sectionRef.current?.offsetTop,
      offsetHeight: model.sectionRef.current?.offsetHeight,
    } as SectionDimentions;
  }, [model.sectionRef]);

  const [dimentions, setDimentions] = useState<SectionDimentions>(
    getSectionDimentions(),
  );

  useLayoutEffect(() => {
    function onResize() {
      window.requestAnimationFrame(() => setDimentions(getSectionDimentions()));
    }

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [getSectionDimentions]);

  const { scrollY } = useWrapperScroll();

  const sectionScrollProgress = useTransform(
    scrollY,
    y => (y - dimentions.offsetTop) / dimentions.offsetHeight,
  );

  const opacity = useTransform(
    sectionScrollProgress,
    [-0.42, -0.05, 0.05, 0.45],
    [0, 1, 1, 0],
  );

  const pointerEvents = useTransform(opacity, value =>
    value > 0 ? 'auto' : 'none',
  );

  return <Container style={{ opacity, pointerEvents }}>{children}</Container>;
};

export default ModelOverlay;
