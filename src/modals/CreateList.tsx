import ModalBox from "@/components/modals/ModalBox";
import Textarea from "@/components/textarea/Textarea";
import { useState } from "react";

export default function CreateListModal(): JSX.Element {
  const [listName, setListName] = useState("");

  return (
    <ModalBox>
      <Textarea
        placeholder="Enter list name here"
        title="List name"
        maxLength={150}
        value={listName}
        setValue={setListName}
      />
      <p>Create list</p>
    </ModalBox>
  );
}
