import React, { useCallback, useRef, useState } from 'react';

import { Container } from './styles';
import ModelsContext, { CarModel } from '../ModelsContext';

const ModelsWrapper: React.FC = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [registeredModels, setRegisteredModels] = useState<CarModel[]>([]);

  const registerModel = useCallback(
    (model: CarModel) => {
      setRegisteredModels([...registeredModels, model]);
    },
    [registeredModels],
  );

  const unregisterModel = useCallback((modelName: string) => {
    setRegisteredModels(state =>
      state.filter(model => model.modelName !== modelName),
    );
  }, []);

  const getModelByName = useCallback(
    (modelName: string) => {
      return (
        registeredModels.find(model => model.modelName === modelName) || null
      );
    },
    [registeredModels],
  );

  return (
    <ModelsContext.Provider
      value={{
        wrapperRef,
        registeredModels,
        registerModel,
        unregisterModel,
        getModelByName,
      }}
    >
      <Container ref={wrapperRef}>{children}</Container>
    </ModelsContext.Provider>
  );
};

export default ModelsWrapper;
