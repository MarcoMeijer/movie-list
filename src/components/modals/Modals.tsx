"use client";
import React, {
  createContext,
  ReactElement,
  useContext,
  useState,
} from "react";
import styles from "./Modals.module.css";

export type ModalParamList = Record<string, object | undefined>;

export type ModalComponentProps<T extends ModalParamList, K extends keyof T> = {
  route: T[K];
  closeModal: () => void;
};

export type ModalComponentType<
  T extends ModalParamList,
  K extends keyof T
> = React.ComponentType<ModalComponentProps<T, K>>;

export interface ModalProps<T extends ModalParamList, K extends keyof T> {
  name: K;
  component: ModalComponentType<T, K>;
  componentProps?: {
    props: T[K];
  };
  show?: boolean;
  handleClose?: () => void;
}

export type CurrentModal<
  T extends ModalParamList,
  K extends keyof T = keyof T
> = {
  name: K;
  props: T[K];
};

export type SetModal<T extends ModalParamList> = <K extends keyof T>(
  name: K,
  props: T[K]
) => void;

export interface ModalContext<T extends ModalParamList> {
  currentModal: CurrentModal<T> | null;
  setModal: SetModal<T>;
  closeModal: () => void;
}

export interface ChildrenProps {
  children: React.ReactNode;
}

export interface ModalContainerProps<T extends ModalParamList> {
  children:
    | React.ReactElement<ModalProps<T, keyof T>>[]
    | React.ReactElement<ModalProps<T, keyof T>>;
}

export interface ModalGroup<T extends ModalParamList> {
  Provider: React.FC<ChildrenProps>;
  Container: React.FC<ModalContainerProps<T>>;
  useModal: () => ModalContext<T>;
}

export function Modal<T extends ModalParamList, K extends keyof T>(
  props: ModalProps<T, K>
): ReactElement<ModalProps<T, K>> {
  const Comp = props.component;

  return (
    <>
      {props.componentProps && props.handleClose && props.show && (
        <div className={styles.modalBackground}>
          <Comp
            route={props.componentProps?.props}
            closeModal={props.handleClose}
          />
        </div>
      )}
    </>
  );
}

function useModalInternal<T extends ModalParamList>(): ModalContext<T> {
  const [currentModal, setCurrentModal] = useState<CurrentModal<T> | null>(
    null
  );

  const setModal = <K extends keyof T>(name: K, props: T[K]) => {
    if (currentModal?.name !== name) {
      setCurrentModal({ name, props });
    }
  };

  const closeModal = () => {
    if (currentModal !== null) {
      setCurrentModal(null);
    }
  };

  return { currentModal, setModal, closeModal };
}

export function createModalGroup<T extends ModalParamList>(): ModalGroup<T> {
  const Context = createContext<ModalContext<T>>({
    currentModal: null,
    setModal: () => {
      // do nothing
    },
    closeModal: () => {
      // do nothing
    },
  });

  const Provider = ({ children }: ChildrenProps) => {
    const { currentModal, setModal, closeModal } = useModalInternal<T>();

    return (
      <Context.Provider value={{ currentModal, setModal, closeModal }}>
        {children}
      </Context.Provider>
    );
  };

  const useModal = () => useContext(Context);

  const Container = ({ children }: ModalContainerProps<T>) => {
    const { currentModal, closeModal } = useModal();

    return (
      <>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            ...child.props,
            show: child.props.name === currentModal?.name,
            handleClose: () => closeModal(),
            componentProps:
              currentModal === null
                ? undefined
                : {
                    props: currentModal.props,
                  },
          });
        })}
      </>
    );
  };

  return {
    Provider,
    Container,
    useModal,
  };
}
