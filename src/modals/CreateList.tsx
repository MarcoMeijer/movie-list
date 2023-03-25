import { TextButton } from "@/components/button/TextButton";
import ModalBox from "@/components/modals/ModalBox";
import Textarea from "@/components/textarea/Textarea";
import { useState } from "react";
import { modals } from "./ModalsWrapper";
import styles from "./CreateList.module.css";
import { ModalComponentProps } from "@/components/modals/Modals";
import { ModalTypes } from "@/types/modals";

export default function CreateListModal({
  route: { onCreate },
}: ModalComponentProps<ModalTypes, "createList">): JSX.Element {
  const [listName, setListName] = useState("");
  const { closeModal } = modals.useModal();

  return (
    <ModalBox>
      <Textarea
        placeholder="Enter list name here"
        title="List name"
        maxLength={150}
        value={listName}
        setValue={setListName}
      />
      <div className={styles.buttons}>
        <TextButton title="CANCEL" onClick={closeModal} />
        <TextButton
          title="CREATE LIST"
          active={listName.length > 0 && listName.length <= 150}
          onClick={() => {
            closeModal();
            onCreate(listName);
          }}
        />
      </div>
    </ModalBox>
  );
}
