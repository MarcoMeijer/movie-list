import { TextButton } from "@/components/button/TextButton";
import ModalBox from "@/components/modals/ModalBox";
import Textarea from "@/components/textarea/Textarea";
import { useState } from "react";
import { modals } from "./ModalsWrapper";
import styles from "./CreateList.module.css";
import { ModalComponentProps } from "@/components/modals/Modals";
import { ModalTypes } from "@/types/modals";
import DropDown from "@/components/dropDown/DropDown";
import { DropDownOption } from "@/components/dropDown/DropDownOption";
import { sdk } from "@/lib/client";

export default function AddToList({
  route: { imdbId, options },
}: ModalComponentProps<ModalTypes, "addToList">): JSX.Element {
  const [listId, setListId] = useState(null);
  const { closeModal } = modals.useModal();

  return (
    <ModalBox>
      <DropDown title="List name" value={listId} setValue={setListId}>
        {options.map(({ id, name }) => (
          <DropDownOption key={id} value={id} name={name} />
        ))}
      </DropDown>
      <div className={styles.buttons}>
        <TextButton title="CANCEL" onClick={closeModal} />
        <TextButton
          title="ADD MOVIE TO LIST"
          active={listId !== null}
          onClick={async () => {
            closeModal();
            if (listId !== null) {
              await sdk.AddMovie({
                imdbId,
                listId,
              });
            }
          }}
        />
      </div>
    </ModalBox>
  );
}
