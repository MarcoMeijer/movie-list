"use client";

import {
  createModalGroup,
  ChildrenProps,
  Modal,
} from "@/components/modals/Modals";
import { ModalTypes } from "@/types/modals";
import AddToList from "./AddToList";
import CreateListModal from "./CreateList";

export const modals = createModalGroup<ModalTypes>();

export default function ModalsWrapper({ children }: ChildrenProps) {
  return (
    <modals.Provider>
      {children}
      <modals.Container>
        <Modal name="createList" component={CreateListModal} />
        <Modal name="addToList" component={AddToList} />
      </modals.Container>
    </modals.Provider>
  );
}
